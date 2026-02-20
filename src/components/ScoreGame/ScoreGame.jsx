import "./ScoreGame.css";

export const ScoreGame = ({ playerId, player, index }) => {
  const { username, stageScore = "en proces..." } = player;
  return (
    <article className={`score-game`}>
      <span className="score-game__score-label">{index + 1}.</span>
      <div className="score-game__media">
        <img
          src={`/Players/${playerId}.png`}
          alt={username}
          className="score-game__image"
        />
      </div>
      <div className="score-game__body">
        <h3 className="score-game__title">{username}</h3>
        <div className="score-game__score">
          <span className="score-game__score-label">Score:</span>
          <span className="score-game__score-value">{stageScore}</span>
        </div>
      </div>
    </article>
  );
};
