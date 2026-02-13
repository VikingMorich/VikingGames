import { useState, useEffect } from "react";
import "./AdminPlayer.css";
import {
  toggleUserElimination,
  updateUserScores,
} from "../../functions/adminFunctions";

export const AdminPlayer = ({ playerId, player }) => {
  const {
    username,
    score: initialScore = 0,
    eliminated,
    coins: initialCoins = 0,
  } = player;

  const [coins, setCoins] = useState(initialCoins);
  const [score, setScore] = useState(initialScore);

  const handleEliminate = async (playerId) => {
    try {
      await toggleUserElimination(playerId, eliminated);
    } catch (e) {
      console.error(e);
    }
  };

  const handleUpdatePlayerScores = async (playerId) => {
    try {
      await updateUserScores(playerId, score, coins);
    } catch (e) {
      console.error(e);
    }
  };

  // Sincroniza cuando cambian las props del player
  useEffect(() => {
    setCoins(initialCoins);
    setScore(initialScore);
  }, [initialCoins, initialScore]);

  return (
    <article
      className={`admin-player ${eliminated ? "admin-player-eliminated" : ""}`}
    >
      <div className="admin-player__media">
        <img
          src={`/Players/${playerId}.png`}
          alt={username}
          className="admin-player__image"
        />
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
