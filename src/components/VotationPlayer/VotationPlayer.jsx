import "./VotationPlayer.css";
//import { useGlobalDB } from "../hooks/useGlobalDB";

export const VotationPlayer = ({ playerId, player }) => {
  const { username } = player;
  return (
    <article className={`votation-player`}>
      <div className="votation-player__media">
        <img
          src={`/Players/${playerId}.png`}
          alt={username}
          className="votation-player__image"
        />
      </div>

      <div className="votation-player__body">
        <h3 className="votation-player__title">
          {playerId} - {username}
        </h3>
      </div>
    </article>
  );
};
