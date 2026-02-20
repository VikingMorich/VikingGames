import { useState, useEffect } from "react";
import "./AdminPlayer.css";
import {
  toggleUserElimination,
  updateUserScores,
} from "../../functions/adminFunctions";
import { useGlobalDB } from "../../hooks/useGlobalDB";

export const AdminPlayer = ({ playerId, player }) => {
  const {
    username,
    score: initialScore = 0,
    eliminated,
    coins: initialCoins = 0,
    archivements,
  } = player;
  const { vikingGamesdb } = useGlobalDB();

  const [coins, setCoins] = useState(initialCoins);
  const [score, setScore] = useState(initialScore);
  const [openArchivements, setOpenArchivements] = useState(false);
  const [playerArchivements, setPlayerArchivements] = useState(
    archivements || [],
  );

  const toggleArchivement = (archId) => {
    setPlayerArchivements((prev) => {
      if (prev.includes(archId)) {
        return prev.filter((id) => id !== archId);
      } else {
        return [...prev, archId];
      }
    });
  };

  const handleEliminate = async (playerId) => {
    try {
      await toggleUserElimination(playerId, eliminated);
    } catch (e) {
      console.error(e);
    }
  };

  const handleUpdatePlayerScores = async (playerId) => {
    try {
      await updateUserScores(playerId, score, coins, playerArchivements);
      // Update local state with the latest achievements after saving
      setPlayerArchivements(playerArchivements);
    } catch (e) {
      console.error(e);
    }
  };

  const handleToggleArchivements = (id) => {
    setOpenArchivements((prevState) => (prevState === id ? null : id));
  };

  // Sincroniza cuando cambian las props del player
  useEffect(() => {
    setCoins(initialCoins);
    setScore(initialScore);
    setPlayerArchivements(archivements || []);
  }, [initialCoins, initialScore, archivements]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        openArchivements &&
        !event.target.closest(
          `.admin-player__achievements[data-id="${openArchivements}"]`,
        ) &&
        !event.target.closest(
          `.admin-player__image-container[data-id="${openArchivements}"]`,
        )
      ) {
        setOpenArchivements(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openArchivements]);

  return (
    <article
      className={`admin-player ${eliminated ? "admin-player-eliminated" : ""}`}
    >
      <div className="admin-player__media">
        <div
          className="admin-player__image-container"
          onClick={() => handleToggleArchivements(playerId)}
        >
          <img
            src={`/Players/${playerId}.png`}
            alt={username}
            className="admin-player__image"
          />
          <div className="user-avatar-overlay">
            {archivements &&
              archivements.map((arch) => (
                <img
                  key={`archivement-${arch}`}
                  src={`/icons/${vikingGamesdb?.Archivements[arch]?.img}`}
                  alt={`${vikingGamesdb?.Archivements[arch]?.title}`}
                  className="user-avatar-achievement"
                />
              ))}
          </div>
        </div>
        <div
          className={`admin-player__achievements ${openArchivements ? "admin-player__achievements--open" : ""}`}
          data-id={playerId}
        >
          {Object.entries(vikingGamesdb?.Archivements || {}).map(
            ([id, ach]) => (
              <div
                key={id}
                className={`admin-player__achievement ${playerArchivements?.includes(id) ? "admin-player__achievement--assigned" : ""}`}
              >
                <span
                  className="admin-player__achievement-title"
                  onClick={() => toggleArchivement(id)}
                >
                  {ach.title}
                </span>
              </div>
            ),
          )}
        </div>
      </div>

      <div className="admin-player__body">
        <h3 className="admin-player__title">
          {playerId} - {username}
        </h3>

        {/* Input editable para coins */}
        <label className="admin-player__field">
          <span className="admin-player__field-label">🪙 Coins:</span>
          <input
            className="admin-player__input admin-player__coins"
            type="number"
            min={0}
            value={coins}
            onChange={(e) => setCoins(Math.max(0, Number(e.target.value || 0)))}
          />
        </label>

        <div className="admin-player__score">
          <label className="admin-player__field">
            <span className="admin-player__score-label">🎖️ Score:</span>
            <input
              className="admin-player__input admin-player__score-value"
              type="number"
              min={0}
              value={score}
              onChange={(e) =>
                setScore(Math.max(0, Number(e.target.value || 0)))
              }
            />
          </label>
        </div>
      </div>

      <div className="admin-player__actions">
        <button
          className="admin-player__eliminate"
          onClick={() => handleEliminate(playerId)}
          type="button"
        >
          ☠️
        </button>
        <button
          className="admin-player__save"
          onClick={() => handleUpdatePlayerScores(playerId)}
          type="button"
        >
          💾
        </button>
      </div>
    </article>
  );
};
