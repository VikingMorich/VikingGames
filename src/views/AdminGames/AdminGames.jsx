import "./AdminGames.css";
import { useGlobalDB } from "../../hooks/useGlobalDB";
import { AdminMenu } from "../../components/AdminMenu/AdminMenu";
import {
  loadLocalDB,
  updateNextGameStage,
  toggleHappyHour,
  updateArrayPlayerScores,
} from "../../functions/adminFunctions";
import { historyStages } from "../../api/gameHistory";
import { useState, useEffect, useMemo } from "react";

export const AdminGames = () => {
  const { user, vikingGamesdb } = useGlobalDB();
  const currentStage = vikingGamesdb?.Games?.currentPage || "loading";
  const happyHour = vikingGamesdb?.Games?.happyHour || false;
  const [selectedStage, setSelectedStage] = useState(currentStage);
  const [coins, setCoins] = useState(0);
  const [score, setScore] = useState(0);
  const [openMultiselector, setOpenMultiselector] = useState(false);
  const [multiselectorPlayers, setMultiselectorPlayers] = useState([]);

  const infoPlayers = useMemo(
    () =>
      Object.entries(vikingGamesdb?.Users || {})
        .map(([id, player]) => ({
          id,
          username: player.username,
          coins: player.coins,
          score: player.score,
        }))
        .filter(
          (player) =>
            !multiselectorPlayers.some((selected) => selected.id === player.id),
        ),
    [vikingGamesdb, multiselectorPlayers],
  );

  useEffect(() => {}, [multiselectorPlayers]);
  const nextStage = (() => {
    const stageKeys = Object.keys(historyStages);
    const currentIndex = stageKeys.indexOf(currentStage);
    return currentIndex >= 0 && currentIndex < stageKeys.length - 1
      ? stageKeys[currentIndex + 1]
      : stageKeys[stageKeys.length - 1]; // Devuelve el último valor si es el último
  })();

  useEffect(() => {
    setSelectedStage(currentStage);
  }, [currentStage]);

  const toggleMultiselectedPlayer = (playerId) => {
    setMultiselectorPlayers((prev) => {
      if (prev.includes(playerId)) {
        return prev.filter((id) => id !== playerId);
      } else {
        return [...prev, playerId];
      }
    });
  };

  const handleLoadLocal = async () => {
    if (
      !window.confirm(
        "¿Estás seguro de que deseas recargar la base de datos? Esta acción sobrescribirá los datos actuales.",
      )
    ) {
      return;
    }

    try {
      await loadLocalDB({ overwrite: true });
      console.log("DB actualizada");
    } catch (e) {
      console.error(e);
    }
  };

  const handleUpdatePlayerScores = async (players, coins, score) => {
    try {
      await updateArrayPlayerScores(players, coins, score);
      setCoins(0);
      setScore(0);
      setMultiselectorPlayers([]);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        openMultiselector &&
        !event.target.closest(".admin-games__multiselector") &&
        !event.target.closest(".btn.btn-multiselector")
      ) {
        setOpenMultiselector(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [openMultiselector]);

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
              {/** Quiero hacer un multiselector de los players disponibles para afectar a un grupo de jugadores i añadirles coins i score. Tambien con un boton para guardar los cambios. */}
              <button
                className="btn btn-multiselector"
                onClick={() => setOpenMultiselector((prev) => !prev)}
                type="button"
              >
                Multiselector Players
              </button>
              <div
                className={
                  "admin-games__multiselector" +
                  (openMultiselector ? " admin-games__multiselector--open" : "")
                }
              >
                {infoPlayers.map((player) => (
                  <div
                    key={player.id}
                    className="admin-games__multiselector-player"
                    onClick={() => {
                      toggleMultiselectedPlayer(player);
                    }}
                  >
                    <span>
                      {player.id} - {player.username}
                    </span>
                  </div>
                ))}
              </div>
              <div className="admin-games__multiselector-selected">
                {multiselectorPlayers?.map((player) => (
                  <div
                    key={player.id}
                    className="admin-games__multiselector-player-selected"
                  >
                    <span>{player.username}</span>
                    <img
                      className="c-modal--cross"
                      alt="cross-icon"
                      src="/icons/cross-icon.svg"
                      onClick={() => toggleMultiselectedPlayer(player)}
                    />
                  </div>
                ))}
              </div>
              {/* Input editable para coins */}
              <div className="admin-games__score-wrapper">
                <div className="admin-games__score-container">
                  <label className="admin-player__field">
                    <span>🪙 Coins:</span>
                    <input
                      className="admin-player__input"
                      type="number"
                      min={0}
                      value={coins}
                      onChange={(e) =>
                        setCoins(Math.max(0, Number(e.target.value || 0)))
                      }
                    />
                  </label>
                  <label className="admin-player__field">
                    <span>🎖️ Score:</span>
                    <input
                      className="admin-player__input"
                      type="number"
                      min={0}
                      value={score}
                      onChange={(e) =>
                        setScore(Math.max(0, Number(e.target.value || 0)))
                      }
                    />
                  </label>
                </div>
                <button
                  className={
                    "admin-group-save " +
                    ((coins !== 0 || score !== 0) &&
                    multiselectorPlayers.length > 0
                      ? "admin-group-save--active"
                      : "")
                  }
                  onClick={() =>
                    handleUpdatePlayerScores(multiselectorPlayers, coins, score)
                  }
                  type="button"
                >
                  💾
                </button>
              </div>
              <div className="admin-games-divider" />
              <button
                className={`btn btn-happy-hour ${happyHour ? "btn-happy-hour-active" : "btn-happy-hour-inactive"}`}
                onClick={() => toggleHappyHour(happyHour)}
                type="button"
              >
                {happyHour
                  ? "🍺 Deactivate Happy Hour 🍺"
                  : "🍺 Activate Happy Hour 🍺"}
              </button>
              <div className="admin-games-divider" />
              <button
                className="btn btn-reload-db"
                onClick={handleLoadLocal}
                type="button"
              >
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
