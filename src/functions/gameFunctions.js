import { getDatabase, ref, runTransaction, push } from "firebase/database";
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
      users[originUserId] = { ...origin, coins: originCoins - amt };
      users[targetUserId] = { ...target, coins: targetCoins + amt };

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
      users[userId] = { ...user, coins: userCoins - price };
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
