import "./ModalArchivementsArchivement.css";
//import { useGlobalDB } from "../hooks/useGlobalDB";

export const ModalArchivementsArchivement = ({ id, archivement }) => {
  return (
    <article
      className={`archivement-wrapper ${archivement.used ? "archivement-used" : ""}`}
    >
      <h3 className="archivement__title">{archivement.title}</h3>
      <div className="archivement__body">
        <img
          src={`/icons/${archivement.img}`}
          alt={archivement.title}
          className="archivement__image"
        />
        <div className="archivement__description">
          <span>{archivement.description}</span>
          <div className="archivement__reward">
            <span className="archivement__reward-label">Recompensa: </span>
            <span className="archivement__reward-value">
              {archivement.coins && archivement.coins + " 🪙"}
              {archivement.score && " + " + archivement.score + " punts"}
            </span>
          </div>
        </div>
      </div>
    </article>
  );
};
