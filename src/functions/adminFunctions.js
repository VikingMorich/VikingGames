import { getDatabase, ref, update, set, get, child } from "firebase/database";
import { app } from "../firebase/config.js";
import gameHistory from "../api/localDB.json";

export const toggleUserElimination = async (
  userId,
  currentEliminated = false,
) => {
  if (!userId) throw new Error("userId is required");
  const newValue = !Boolean(currentEliminated);
  try {
    const db = getDatabase(app);
    const nodeRef = ref(db, `Users/${userId}`);
    await update(nodeRef, { eliminated: newValue });
    return newValue;
  } catch (error) {
    console.error("toggleUserElimination error:", error);
    throw error;
  }
};

export const updateUserScores = async (
  userId,
  currentScore = 0,
  currentCoins = 0,
  playerArchivements,
) => {
  if (!userId) throw new Error("userId is required");
  try {
    const db = getDatabase(app);
    const nodeRef = ref(db, `Users/${userId}`);
    const nodeUsersRef = ref(db, `Users`);
    const usersSnapshot = (await get(child(nodeUsersRef, "/"))).val() || [];
    //Mirar las diferencias con los archivements actuales y actualizar tambien las coins i score correspondientes segun se este añadiendo o quitando un archivment
    const archivRef = ref(db, `Archivements`);
    const currentArchivements = (await get(child(archivRef, "/"))).val() || [];
    const oldUserInfo = (await get(child(nodeRef, "/"))).val() || [];

    const addedArchivements =
      playerArchivements?.filter(
        (id) => !oldUserInfo?.archivements?.includes(id),
      ) || [];

    const removedArchivements =
      oldUserInfo?.archivements?.filter(
        (id) => !playerArchivements.includes(id),
      ) || [];
    if (addedArchivements.length > 0) {
      // Si se han añadido nuevos logros, sumar las coins y score correspondientes
      addedArchivements.forEach((aArchId) => {
        const coinsToAdd = parseInt(currentArchivements[aArchId]?.coins || 0);
        const scoreToAdd = parseInt(currentArchivements[aArchId]?.score || 0);
        currentCoins += coinsToAdd;
        currentScore += scoreToAdd;

        oldUserInfo.CoinsHistory = [
          ...(oldUserInfo.CoinsHistory || []),
          {
            date: new Date().toISOString(),
            concept: `Fita dels VikingGames aconseguida (${currentArchivements[aArchId]?.title})`,
            amount: coinsToAdd,
            total: currentCoins,
            type: "add",
          },
        ];
      });
    }

    if (removedArchivements.length > 0) {
      // Si se han eliminado logros, restar las coins y score correspondientes
      removedArchivements.forEach((rArchId) => {
        const coinsToRemove = parseInt(
          currentArchivements[rArchId]?.coins || 0,
        );
        const scoreToRemove = parseInt(
          currentArchivements[rArchId]?.score || 0,
        );
        currentCoins -= coinsToRemove;
        currentScore -= scoreToRemove;

        oldUserInfo.CoinsHistory = [
          ...(oldUserInfo.CoinsHistory || []),
          {
            date: new Date().toISOString(),
            concept: `Fita dels VikingGames retirada (${currentArchivements[rArchId]?.title})`,
            amount: -coinsToRemove,
            total: currentCoins,
            type: "remove",
          },
        ];
      });
    }

    if (
      addedArchivements.length === 0 &&
      removedArchivements.length === 0 &&
      currentCoins - (oldUserInfo.coins || 0) !== 0
    ) {
      oldUserInfo.CoinsHistory = [
        ...(oldUserInfo.CoinsHistory || []),
        {
          date: new Date().toISOString(),
          concept: "Ajustaments VikingGames",
          amount: currentCoins - (oldUserInfo.coins || 0),
          total: currentCoins,
          type: "correction",
        },
      ];
    }

    await update(nodeRef, {
      coins: currentCoins,
      score: currentScore,
      archivements: playerArchivements || null,
      CoinsHistory: oldUserInfo.CoinsHistory,
    });

    if (addedArchivements.length > 0) {
      addedArchivements.forEach((arch) => {
        if (!currentArchivements[arch].used) {
          update(child(archivRef, `${arch}`), { used: true });
        }
      });
    } else if (removedArchivements.length > 0) {
      removedArchivements.forEach((archId) => {
        //comprobar si el archivment eliminado no esta siendo usado por ningun otro jugador, si no esta siendo usado por ningun otro jugador, poner el used a false
        const isUsedByOtherPlayer = Object.entries(usersSnapshot).some(
          ([uid, user]) => {
            return user.archivements?.includes(archId) && userId !== uid;
          },
        );
        console.log("used: ", isUsedByOtherPlayer);
        if (!isUsedByOtherPlayer)
          update(child(archivRef, `${archId}`), { used: null });
      });
    }
    return {
      coins: currentCoins,
      score: currentScore,
      archivements: playerArchivements,
    };
  } catch (error) {
    console.error("updateUserScores error:", error);
    throw error;
  }
};

export const loadLocalDB = async () => {
  try {
    const db = getDatabase(app);
    const rootRef = ref(db, "/");
    // Sobrescribe toda la DB con localDB.json
    await set(rootRef, gameHistory);
    // Mezcla/actualiza solo las claves presentes en gameHistory
    // await update(rootRef, gameHistory);
    return gameHistory;
  } catch (error) {
    console.error("loadLocalDB error:", error);
    throw error;
  }
};

export const updatePurchaseDeliveryStatus = async (
  purchaseId,
  currentDelivery = false,
) => {
  const newDelivery = !Boolean(currentDelivery);
  try {
    const db = getDatabase(app);
    const nodeRef = ref(db, `Purchase/${purchaseId}`);
    await update(nodeRef, { delivered: newDelivery });
    return true;
  } catch (error) {
    console.error("updatePurchaseDeliveryStatus error:", error);
    throw error;
  }
};

export const updateNextGameStage = async (newStage) => {
  const db = getDatabase(app);
  const nodeRef = ref(db, `Games`);
  const start = new Date().toISOString();
  await updateScoreWithStageScore();
  await update(nodeRef, { currentPage: newStage, start });
};

export const updateScoreWithStageScore = async () => {
  const db = getDatabase(app);
  const usersRef = ref(db, `Users`);

  try {
    // Fetch all users
    const snapshot = await get(child(usersRef, "/"));
    if (snapshot.exists()) {
      const users = snapshot.val();

      // Iterate through each user and update their score
      for (const userId in users) {
        const user = users[userId];
        const currentScore = user.score || 0;
        const stageScore = user.stageScore || 0;

        // Update user score and remove stageScore
        const userRef = ref(db, `Users/${userId}`);
        await update(userRef, {
          score: currentScore + stageScore,
          stageScore: null, // Remove stageScore key
          vote: null, // Remove vote key
        });
      }
      //si existe la rama VotationScores, eliminarla para resetear los resultados de la votación
      const votationScoresRef = ref(db, `VotationScores`);
      const votationSnapshot = await get(child(votationScoresRef, "/"));
      if (votationSnapshot.exists()) {
        await set(votationScoresRef, null);
      }
    }
  } catch (error) {
    console.error("updateScoreWithStageScore error:", error);
    throw error;
  }
};

export const toggleHappyHour = async (currentState) => {
  const db = getDatabase(app);
  const nodeRef = ref(db, `Games`);

  if (currentState) {
    // If happyHour is currently true, remove it from the database
    await update(nodeRef, { happyHour: null });
  } else {
    // If happyHour is currently false or undefined, set it to true
    await update(nodeRef, { happyHour: true });
  }
};

export const updateArrayPlayerScores = async (arrayPlayers, coins, score) => {
  const db = getDatabase(app);
  try {
    const updates = {};
    // Actualiza las coins y score de cada jugador del array con los valores pasados por parámetro + los que tenían antes.
    for (const player of arrayPlayers) {
      const userRef = ref(db, `Users/${player.id}`);
      const userSnapshot = await get(userRef);
      const userData = userSnapshot.exists() ? userSnapshot.val() : {};

      const updatedCoins = (userData.coins || 0) + coins;
      const updatedScore = (userData.score || 0) + score;
      const existingHistory = Array.isArray(userData.CoinsHistory)
        ? [...userData.CoinsHistory]
        : []; // Asegurar que el historial existente sea un array

      existingHistory.push({
        date: new Date().toISOString(),
        concept: "Premi grupal dels VikingGames",
        amount: coins,
        total: updatedCoins,
        type: "add",
      });

      updates[`Users/${player.id}/coins`] = updatedCoins;
      updates[`Users/${player.id}/score`] = updatedScore;
      updates[`Users/${player.id}/CoinsHistory`] = existingHistory;
    }
    await update(ref(db), updates);
  } catch (error) {
    console.error("updateArrayPlayerScores error:", error);
    throw error;
  }
};

export const updateArrayPlayerClasificate = async (
  arrayPlayers,
  coins,
  score,
) => {
  const db = getDatabase(app);
  try {
    const updates = {};
    // Actualiza las coins y score de cada jugador del array con los valores pasados por parámetro + los que tenían antes.
    for (const [index, player] of arrayPlayers.entries()) {
      const userRef = ref(db, `Users/${player.id}`);
      const userSnapshot = await get(userRef);
      const userData = userSnapshot.exists() ? userSnapshot.val() : {};

      const updatedCoins = (userData.coins || 0) + coins * (index + 1);
      const updatedScore = (userData.score || 0) + score * (index + 1);
      const existingHistory = Array.isArray(userData.CoinsHistory)
        ? [...userData.CoinsHistory]
        : []; // Asegurar que el historial existente sea un array

      existingHistory.push({
        date: new Date().toISOString(),
        concept: "Premi classificatori dels VikingGames",
        amount: coins * (index + 1),
        total: updatedCoins,
        type: "add",
      });

      updates[`Users/${player.id}/coins`] = updatedCoins;
      updates[`Users/${player.id}/score`] = updatedScore;
      updates[`Users/${player.id}/CoinsHistory`] = existingHistory;
    }
    await update(ref(db), updates);
  } catch (error) {
    console.error("updateArrayPlayerClasificate error:", error);
    throw error;
  }
};

export const updateSinglePlayerScore = async (player, coins, score) => {
  const db = getDatabase(app);
  try {
    const userRef = ref(db, `Users/${player.id}`);
    const userSnapshot = await get(userRef);
    const userData = userSnapshot.exists() ? userSnapshot.val() : {};

    const updatedCoins = (userData.coins || 0) + coins;
    const updatedScore = (userData.score || 0) + score;
    const existingHistory = Array.isArray(userData.CoinsHistory)
      ? [...userData.CoinsHistory]
      : []; // Asegurar que el historial existente sea un array

    existingHistory.push({
      date: new Date().toISOString(),
      concept: "Premi individual dels VikingGames",
      amount: coins,
      total: updatedCoins,
      type: "add",
    });

    await update(userRef, {
      coins: updatedCoins,
      score: updatedScore,
      CoinsHistory: existingHistory,
    });
  } catch (error) {
    console.error("updateSinglePlayerScore error:", error);
    throw error;
  }
};

export const calculateVotationResults = async () => {
  const db = getDatabase(app);
  const usersRef = ref(db, `Users`);
  try {
    const snapshot = await get(child(usersRef, "/"));
    if (snapshot.exists()) {
      const users = snapshot.val();
      const voteCounts = {};
      // Contar votos
      for (const userId in users) {
        const user = users[userId];
        if (user.vote) {
          voteCounts[user.vote] = (voteCounts[user.vote] || 0) + 1;
        }
      }
      // Guardar resultados en VotationScores
      const votationScoresRef = ref(db, `VotationScores`);
      await set(votationScoresRef, voteCounts);
      return voteCounts;
    }
  } catch (error) {
    console.error("calculateVotationResults error:", error);
    throw error;
  }
};

export const generateBingoCards = async () => {
  const db = getDatabase(app);
  try {
    const usersRef = ref(db, `Users`);
    const snapshot = await get(child(usersRef, "/"));
    if (snapshot.exists()) {
      const users = snapshot.val();
      const userIds = Object.keys(users);
      const bingoCards = [];
      // actualizar el Users[userId] añadiendo una seccion Bingo. (Generar 1 cartas de bingo [Array de IDs] con 9 IDs aleatorios no incluyendo el id del propio jugador)
      for (const userId of userIds) {
        const otherUserIds = userIds.filter((id) => id !== userId);
        const shuffledIds = otherUserIds.sort(() => 0.5 - Math.random());
        const selectedIds = shuffledIds.slice(0, 9);
        bingoCards.push({ userId, card: selectedIds });
        const userRef = ref(db, `Users/${userId}`);
        await update(userRef, { Bingo: selectedIds });
      }
      return bingoCards;
    }
  } catch (error) {
    console.error("generateBingoCards error:", error);
    throw error;
  }
};
