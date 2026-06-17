import "./AdminGames.css";
import { useGlobalDB } from "../../hooks/useGlobalDB";
import { AdminMenu } from "../../components/AdminMenu/AdminMenu";
import {
  loadLocalDB,
  updateNextGameStage,
  toggleHappyHour,
  updateArrayPlayerScores,
  updateArrayPlayerClasificate,
  updateSinglePlayerScore,
  generateBingoCards,
  toggleActivateShop,
} from "../../functions/adminFunctions";
import { historyStages } from "../../api/gameHistory";
import { useState, useEffect, useMemo } from "react";
import { ToastContainer } from "react-toastify";

export const AdminGames = () => {
  const { user, vikingGamesdb } = useGlobalDB();
  const currentStage = vikingGamesdb?.Games?.currentPage || "loading";
  const happyHour = vikingGamesdb?.Games?.happyHour || false;
  const [selectedStage, setSelectedStage] = useState(currentStage);
  const [coins, setCoins] = useState(0);
  const [score, setScore] = useState(0);
  const [openMultiselector, setOpenMultiselector] = useState(false);
  const [multiselectorPlayers, setMultiselectorPlayers] = useState([]);
  const [singleselectorPlayer, setSingleselectorPlayer] = useState(null);
  const [activeTab, setActiveTab] = useState("multiselector");
  const [activateShop, setActivateShop] = useState(
    vikingGamesdb?.Games?.activateShop || false,
  );

  const infoPlayers = useMemo(
    () =>
      Object.entries(vikingGamesdb?.Users || {})
        .filter(
          ([, player]) => !player.eliminated, // Filtrar jugadores eliminados
        )
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

  const infoAllPlayers = useMemo(
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

  useEffect(() => {
    setActivateShop(vikingGamesdb?.Games?.activateShop || false);
  }, [vikingGamesdb?.Games?.activateShop]);

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
        "Segur que vols recarregar la DB local? Aquesta acció pot sobrescriure les dades actuals i no es podrà desfer.",
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

  const handleBingoCardsGeneration = async () => {
    if (
      !window.confirm(
        "Segur que vols generar noves tarjetes de Bingo? Aquesta acció pot sobrescriure les tarjetes actuals i no es podrà desfer.",
      )
    ) {
      return;
    }

    try {
      await generateBingoCards();
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

  const handleUpdatePlayerClasificate = async (players, coins, score) => {
    try {
      await updateArrayPlayerClasificate(players, coins, score);
      setCoins(0);
      setScore(0);
      setMultiselectorPlayers([]);
    } catch (e) {
      console.error(e);
    }
  };

  const handleUpdateSinglePlayerScore = async (player, coins, score) => {
    try {
      await updateSinglePlayerScore(player, coins, score);
      setCoins(0);
      setScore(0);
      setSingleselectorPlayer(null);
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
      {user?.email === "enricmoriche91@hotmail.com" ||
      user?.email === "oriolroigcanal@gmail.com" ? (
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
              {historyStages[currentStage]?.rewardResume && (
                <p className="admin-reward-resume">
                  <u>Recompensa:</u> {historyStages[currentStage]?.rewardResume}
                </p>
              )}
              <div className="admin-games-divider" />
              <div className="admin-rewards-block">
                <div className="admin-tabs">
                  <button
                    className={`admin-tab ${activeTab === "multiselector" ? "admin-tab-active" : ""}`}
                    onClick={() => setActiveTab("multiselector")}
                    type="button"
                  >
                    Multiselector
                  </button>
                  <button
                    className={`admin-tab ${activeTab === "clasificate" ? "admin-tab-active" : ""}`}
                    onClick={() => setActiveTab("clasificate")}
                    type="button"
                  >
                    Cua classificatoria
                  </button>
                  <button
                    className={`admin-tab ${activeTab === "single" ? "admin-tab-active" : ""}`}
                    onClick={() => setActiveTab("single")}
                    type="button"
                  >
                    Individual
                  </button>
                </div>
                {activeTab === "multiselector" && (
                  <div className="admin-multiselector-container">
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
                        (openMultiselector
                          ? " admin-games__multiselector--open"
                          : "")
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
                          handleUpdatePlayerScores(
                            multiselectorPlayers,
                            coins,
                            score,
                          )
                        }
                        type="button"
                      >
                        💾
                      </button>
                    </div>
                  </div>
                )}
                {activeTab === "clasificate" && (
                  <div className="admin-clasificate-container">
                    <button
                      className="btn btn-multiselector"
                      onClick={() => setOpenMultiselector((prev) => !prev)}
                      type="button"
                    >
                      Cua de Jugadors
                    </button>
                    <div
                      className={
                        "admin-games__multiselector" +
                        (openMultiselector
                          ? " admin-games__multiselector--open"
                          : "")
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
                    <div className="admin-games__clasificate-selected">
                      {multiselectorPlayers
                        ?.slice()
                        .reverse()
                        .map((player, index) => (
                          <div
                            key={player.id}
                            className="admin-games__clasificate-player-selected"
                          >
                            <span>
                              {index + 1} - {player.username}
                            </span>
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
                          handleUpdatePlayerClasificate(
                            multiselectorPlayers,
                            coins,
                            score,
                          )
                        }
                        type="button"
                      >
                        💾
                      </button>
                    </div>
                  </div>
                )}
                {activeTab === "single" && (
                  <div className="admin-single-reward-container">
                    <button
                      className="btn btn-multiselector"
                      onClick={() => setOpenMultiselector((prev) => !prev)}
                      type="button"
                    >
                      Seleccionar jugador
                    </button>
                    <div
                      className={
                        "admin-games__multiselector" +
                        (openMultiselector
                          ? " admin-games__multiselector--open"
                          : "")
                      }
                    >
                      {infoAllPlayers.map((player) => (
                        <div
                          key={player.id}
                          className="admin-games__multiselector-player"
                          onClick={() => {
                            setSingleselectorPlayer(player);
                            setOpenMultiselector((prev) => !prev);
                          }}
                        >
                          <span>
                            {player.id} - {player.username}
                          </span>
                        </div>
                      ))}
                    </div>
                    <div className="admin-games__single-reward-selected">
                      {singleselectorPlayer && (
                        <div
                          key={singleselectorPlayer.id}
                          className="admin-games__single-reward-player-selected"
                        >
                          <img
                            src={`/Players/${singleselectorPlayer.id}.png`}
                            alt={singleselectorPlayer.username}
                            className="admin-games__single-reward-avatar"
                          />
                          <div className="admin-games__single-reward-info">
                            <span>
                              {singleselectorPlayer.id} -{" "}
                              {singleselectorPlayer.username}
                            </span>
                            <img
                              className="c-modal--cross"
                              alt="cross-icon"
                              src="/icons/cross-icon.svg"
                              onClick={() => setSingleselectorPlayer(null)}
                            />
                          </div>
                        </div>
                      )}
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
                          ((coins !== 0 || score !== 0) && singleselectorPlayer
                            ? "admin-group-save--active"
                            : "")
                        }
                        onClick={() =>
                          handleUpdateSinglePlayerScore(
                            singleselectorPlayer,
                            coins,
                            score,
                          )
                        }
                        type="button"
                      >
                        💾
                      </button>
                    </div>
                  </div>
                )}
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
              <div className="admin-games-shop-state">
                <label className="switch">
                  <input
                    className="switch-checkbox"
                    type="checkbox"
                    checked={activateShop}
                    onChange={() => toggleActivateShop(activateShop)}
                  />
                  <span className="slider round"></span>
                </label>
                <span>
                  {activateShop
                    ? "Tienda Activada 🛒"
                    : "Tienda Desactivada 🚫"}
                </span>
              </div>
              <div className="admin-games-divider" />
              <button
                className={`btn btn-generate-bingo`}
                onClick={handleBingoCardsGeneration}
                type="button"
              >
                🎟️ Generate Bingo Cards
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
      <ToastContainer />
    </>
  );
};
