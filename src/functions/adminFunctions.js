import { getDatabase, ref, update, set } from "firebase/database";
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
) => {
  if (!userId) throw new Error("userId is required");
  try {
    const db = getDatabase(app);
    const nodeRef = ref(db, `Users/${userId}`);
    await update(nodeRef, { coins: currentCoins, score: currentScore });
    return { coins: currentCoins, score: currentScore };
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
  await update(nodeRef, { currentPage: newStage });
};
