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

    const addedArchivements = playerArchivements?.filter(
      (id) => !oldUserInfo?.archivements?.includes(id),
    );

    const removedArchivements = oldUserInfo?.archivements?.filter(
      (id) => !playerArchivements.includes(id),
    );
    if (addedArchivements.length > 0) {
      // Si se han añadido nuevos logros, sumar las coins y score correspondientes
      addedArchivements.forEach((aArchId) => {
        currentCoins =
          parseInt(currentCoins) +
          parseInt(currentArchivements[aArchId]?.coins || 0);
        currentScore =
          parseInt(currentScore) +
          parseInt(currentArchivements[aArchId]?.score || 0);
      });
    } else if (removedArchivements.length > 0) {
      // Si se han eliminado logros, restar las coins y score correspondientes
      removedArchivements.forEach((rArchId) => {
        currentCoins =
          parseInt(currentCoins) -
          parseInt(currentArchivements[rArchId]?.coins || 0);
        currentScore =
          parseInt(currentScore) -
          parseInt(currentArchivements[rArchId]?.score || 0);
      });
    }

    // Actualizar coins y score segun los archivements añadidos o eliminados
    await update(nodeRef, {
      coins: currentCoins,
      score: currentScore,
      archivements: playerArchivements || null,
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
        });
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
    //Actualiza las coins y score de cada jugador del array con los valores pasados por parametro + los que tenian antes.
    arrayPlayers.forEach((player) => {
      updates[`Users/${player.id}/coins`] = (player.coins || 0) + coins;
      updates[`Users/${player.id}/score`] = (player.score || 0) + score;
    });
    await update(ref(db), updates);
  } catch (error) {
    console.error("updateArrayPlayerScores error:", error);
    throw error;
  }
};
