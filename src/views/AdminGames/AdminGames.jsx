import "./AdminGames.css";
import { useGlobalDB } from "../../hooks/useGlobalDB";
import { AdminMenu } from "../../components/AdminMenu/AdminMenu";
import {
  loadLocalDB,
  updateNextGameStage,
} from "../../functions/adminFunctions";
import { historyStages } from "../../api/gameHistory";
import { useState, useEffect } from "react";

export const AdminGames = () => {
  const { user, vikingGamesdb } = useGlobalDB();
  const currentStage = vikingGamesdb?.Games?.currentPage || "loading";
  const [selectedStage, setSelectedStage] = useState(currentStage);
  const nextStage = (() => {
    const stageKeys = Object.keys(historyStages);
    const currentIndex = stageKeys.indexOf(currentStage);
    return currentIndex >= 0 && currentIndex < stageKeys.length - 1
      ? stageKeys[currentIndex + 1]
      : stageKeys[stageKeys.length - 1]; // Devuelve el último valor si es el último
  })();

  useEffect(() => {
    setSelectedStage(currentStage);
    console.log("Current stage updated:", currentStage);
  }, [currentStage]);

  const handleLoadLocal = async () => {
    try {
      await loadLocalDB({ overwrite: true });
      console.log("DB actualizada");
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      {user?.email === "enricmoriche91@hotmail.com" ? (
        <>
          <AdminMenu />
          <div className="section-view">
            <h1 className="section-title">Admin Games</h1>
            <div className="admin-games-container">
              <div>
                <span>Current Stage: </span>
                <select
                  value={selectedStage} // Valor seleccionado
                  onChange={(e) => setSelectedStage(e.target.value)} // Actualiza el estado
                >
                  {Object.keys(historyStages).map((stageKey) => (
                    <option key={stageKey} value={stageKey}>
                      {historyStages[stageKey].title} {/* Muestra el título */}
                    </option>
                  ))}
                </select>
              </div>
              <div className="admin-games-buttons">
                <button
                  className="btn btn-play"
                  onClick={() => {
                    updateNextGameStage(nextStage);
                  }}
                  type="button"
                >
                  ▶
                </button>
                <button
                  className="btn btn-save"
                  onClick={() => {
                    updateNextGameStage(selectedStage);
                  }}
                  type="button"
                >
                  Save
                </button>
              </div>
              <div className="admin-games-divider" />
              <button className="btn" onClick={handleLoadLocal} type="button">
                Reload DB
              </button>
            </div>
          </div>
        </>
      ) : (
        <>Usuari no autoritzat.</>
      )}
    </>
  );
};
