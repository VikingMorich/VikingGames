import {
  getDatabase,
  ref,
  runTransaction,
  push,
  update,
  get,
} from "firebase/database";
import { app } from "../firebase/config.js";

export const userTransferCoins = async (originUserId, targetUserId, amount) => {
  if (!originUserId || !targetUserId) {
    throw new Error("originUserId and targetUserId are required");
  }
  const amt = Number(amount);
  if (!Number.isFinite(amt) || amt <= 0) {
    throw new Error("amount must be a positive number");
  }

  const db = getDatabase(app);
  const usersRef = ref(db, "Users");

  // Run a transaction on the Users node to update both accounts atomically
  const txResult = await runTransaction(
    usersRef,
    (users) => {
      if (!users) return; // abort if no users node
      const origin = users[originUserId];
      const target = users[targetUserId];
      if (!origin || !target) return; // abort if either user missing

      const originCoins = Number(origin.coins ?? 0);
      const targetCoins = Number(target.coins ?? 0);

      if (originCoins < amt) return; // abort if insufficient funds

      // apply changes
      const updatedOriginCoins = originCoins - amt;
      const updatedTargetCoins = targetCoins + amt;

      users[originUserId] = {
        ...origin,
        coins: updatedOriginCoins,
        CoinsHistory: [
          ...(origin.CoinsHistory || []),
          {
            date: new Date().toISOString(),
            concept: `Transferencia enviada a ${users[targetUserId].username || targetUserId}`,
            amount: -amt,
            total: updatedOriginCoins,
            type: "remove",
          },
        ],
      };

      users[targetUserId] = {
        ...target,
        coins: updatedTargetCoins,
        CoinsHistory: [
          ...(target.CoinsHistory || []),
          {
            date: new Date().toISOString(),
            concept: `Transferencia rebuda de ${users[originUserId].username || originUserId}`,
            amount: amt,
            total: updatedTargetCoins,
            type: "add",
          },
        ],
      };

      return users;
    },
    { applyLocally: false },
  );

  if (!txResult.committed) {
    throw new Error(
      "Transfer aborted: usuario no encontrado o saldo insuficiente (transaction no committed).",
    );
  }

  const updatedUsers = txResult.snapshot.val();
  return {
    origin: { id: originUserId, coins: updatedUsers[originUserId].coins },
    target: { id: targetUserId, coins: updatedUsers[targetUserId].coins },
  };
};

export const userShopPurchase = async (userId, itemId, itemPrice) => {
  if (!userId || !itemId) {
    throw new Error("userId and itemId are required");
  }
  const price = Number(itemPrice);
  if (!Number.isFinite(price) || price <= 0) {
    throw new Error("itemPrice must be a positive number");
  }

  const db = getDatabase(app);
  const usersRef = ref(db, "Users");
  const itemsRef = ref(db, "Shop");

  // Obtener los datos de los ítems
  const itemsSnapshot = await get(itemsRef);
  const items = itemsSnapshot.val();

  if (!items || !items[itemId]) {
    throw new Error("El item no existe en la tienda.");
  }

  // Run a transaction on the Users node to update the user's coins
  const txResult = await runTransaction(
    usersRef,
    (users) => {
      if (!users) return; // abort if no users node
      const user = users[userId];
      if (!user) return; // abort if user missing

      const userCoins = Number(user.coins ?? 0);
      if (userCoins < price) return; // abort if insufficient funds

      // apply changes
      const updatedCoins = userCoins - price;
      users[userId] = {
        ...user,
        coins: updatedCoins,
        CoinsHistory: [
          ...(user.CoinsHistory || []),
          {
            date: new Date().toISOString(),
            concept: `Compra de ${items[itemId].name} a la botiga`,
            amount: -price,
            total: updatedCoins,
            type: "remove",
          },
        ],
      };
      return users;
    },
    { applyLocally: false },
  );

  if (!txResult.committed) {
    throw new Error(
      "Purchase aborted: usuario no encontrado o saldo insuficiente (transaction no committed).",
    );
  }

  const updatedUsers = txResult.snapshot.val();

  // Update the item's stock
  const itemTxResult = await runTransaction(
    itemsRef,
    (items) => {
      if (!items) return; // abort if no items node
      const item = items[itemId];
      if (!item) return; // abort if item missing

      const itemStock = Number(item.stock ?? 0);
      if (itemStock <= 0) return; // abort if out of stock

      // apply changes
      items[itemId] = { ...item, stock: itemStock - 1 };
      return items;
    },
    { applyLocally: false },
  );

  if (!itemTxResult.committed) {
    throw new Error(
      "Purchase aborted: item no encontrado o sin stock (transaction no committed).",
    );
  }

  const updatedItems = itemTxResult.snapshot.val();

  // Registrar la compra en la rama "Purchase"
  try {
    const purchaseRef = ref(db, "Purchase");
    const purchaseData = {
      userId,
      itemId,
      price,
      delivered: false,
      purchaseDate: new Date().toISOString(),
    };
    const newPurchaseRef = await push(purchaseRef, purchaseData);

    return {
      user: { id: userId, coins: updatedUsers[userId].coins },
      item: { id: itemId, stock: updatedItems[itemId].stock },
      purchase: { id: newPurchaseRef.key, ...purchaseData },
    };
  } catch (err) {
    // Si falla el registro de la compra, la transacción principal ya se completó,
    // así que devolvemos igual la info de usuario/item y registramos el error.
    console.error("Failed to record purchase:", err);
    return {
      user: { id: userId, coins: updatedUsers[userId].coins },
      item: { id: itemId, stock: updatedItems[itemId].stock },
      purchase: null,
    };
  }
};

export const updateStageScore = async (userId, score) => {
  try {
    const db = getDatabase(app);
    const nodeRef = ref(db, `Users/${userId}`);
    await update(nodeRef, { stageScore: score });
    return true;
  } catch (error) {
    console.error("updateStageScore error:", error);
    throw error;
  }
};

export const updateUserName = async (userId, newUserName) => {
  try {
    const db = getDatabase(app);
    const nodeRef = ref(db, `Users/${userId}`);
    await update(nodeRef, { username: newUserName });
    return true;
  } catch (error) {
    console.error("updateUserName error:", error);
    throw error;
  }
};

export const setPlayerLevelScore = async (userId, level) => {
  try {
    const db = getDatabase(app);
    const nodeRef = ref(db, `Users/${userId}`);
    await update(nodeRef, { stageScore: level });
    return true;
  } catch (error) {
    console.error("setPlayerLevel error:", error);
    throw error;
  }
};

export const setPlayerVote = async (userId, vote) => {
  try {
    const db = getDatabase(app);
    const nodeRef = ref(db, `Users/${userId}`);
    await update(nodeRef, { vote });
    return true;
  } catch (error) {
    console.error("setPlayerVote error:", error);
    throw error;
  }
};

export const claimBingo = async (userId) => {
  try {
    const db = getDatabase(app);

    // Update the achievement to mark it as used
    const nodeRef = ref(db, `Archivements/003`);
    await update(nodeRef, { used: true });

    // Retrieve user and achievement data
    const userRef = ref(db, `Users/${userId}`);
    const userSnapshot = await get(userRef);
    const oldUserInfo = userSnapshot.val();

    const archivementsRef = ref(db, `Archivements`);
    const archivementsSnapshot = await get(archivementsRef);
    const currentArchivements = archivementsSnapshot.val();

    const aArchId = "003"; // Achievement ID for Bingo
    const coinsToAdd = parseInt(currentArchivements[aArchId]?.coins || 0);
    const currentCoins = (oldUserInfo.coins || 0) + coinsToAdd;

    // Update user data with new coins and achievement
    await update(userRef, {
      coins: currentCoins,
      archivements: [...(oldUserInfo.archivements || []), aArchId],
      CoinsHistory: [
        ...(oldUserInfo.CoinsHistory || []),
        {
          date: new Date().toISOString(),
          concept: `Fita dels VikingGames aconseguida (${currentArchivements[aArchId]?.title})`,
          amount: coinsToAdd,
          total: currentCoins,
          type: "add",
        },
      ],
    });

    return true;
  } catch (error) {
    console.error("claimBingo error:", error);
    throw error;
  }
};

export const playRoulette = async (userId, prizeAmount, reward) => {
  try {
    const db = getDatabase(app);
    const userRef = ref(db, `Users/${userId}`);
    const userSnapshot = await get(userRef);
    const oldUserInfo = userSnapshot.val();

    const playingCoins = (oldUserInfo.coins || 0) - prizeAmount;
    const currentCoins = (oldUserInfo.coins || 0) - prizeAmount + reward;

    let newCoinsHistory = [
      ...(oldUserInfo.CoinsHistory || []),
      {
        date: new Date().toISOString(),
        concept: `Tirada a la ruleta de la sort`,
        amount: -prizeAmount,
        total: playingCoins,
        type: "remove",
      },
    ];
    if (reward > 0) {
      newCoinsHistory.push({
        date: new Date().toISOString(),
        concept: `Premi de la ruleta de la sort`,
        amount: reward,
        total: currentCoins,
        type: "add",
      });
    }

    await update(userRef, {
      coins: currentCoins,
      CoinsHistory: newCoinsHistory,
    });

    return { coins: currentCoins };
  } catch (error) {
    console.error("playRoulette error:", error);
    throw error;
  }
};

export const setPlayerPathChoice = async (userId, pathChoice) => {
  try {
    const db = getDatabase(app);
    const nodeRef = ref(db, `Users/${userId}`);
    await update(nodeRef, { pathChoice: pathChoice });
    return true;
  } catch (error) {
    console.error("setPlayerPathChoice error:", error);
    throw error;
  }
};
