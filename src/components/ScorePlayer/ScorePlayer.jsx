import "./ScorePlayer.css";
//import { useGlobalDB } from "../hooks/useGlobalDB";

export const ScorePlayer = ({ playerId, player }) => {
  const { username, score = 0, eliminated, coins = 0 } = player;
  return (
    <article
      className={`score-player ${eliminated ? "player-eliminated" : ""}`}
    >
      <div className="score-player__media">
        <img
          src={`/Players/${playerId}.png`}
          alt={username}
          className="score-player__image"
        />
        <img
          src={`/Players/eliminated.png`}
          alt="Eliminated"
          className="score-player__image-eliminated"
        />
      </div>

      <div className="score-player__body">
        <h3 className="score-player__title">{username}</h3>
        <span className="score-player__price">
          {coins.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} 🪙
        </span>
        <div className="score-player__score">
          <span className="score-player__score-label">Score:</span>
          <span className="score-player__score-value">{score}</span>
        </div>
      </div>
    </article>
  );
};
