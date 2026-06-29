import "./Modal.css";
//import { useGlobalDB } from "../hooks/useGlobalDB";
import { ModalTransfer } from "./ModalTransfer";
import { ModalArchivements } from "./ModalArchivements";
import { ModalBingo } from "./ModalBingo";
import { ModalEconomy } from "./ModalEconomy";
import { ModalRoulette } from "./ModalRoulette";
import { ModalRouletteRewards } from "./ModalRouletteRewards";
import { ModalRouletteClue } from "./ModalRouletteClue";
import { ModalEasterEgg } from "./ModalEasterEgg";

export const Modal = ({ modalOpen, setModalOpen, type, extraParam }) => {
  return (
    <article
      className={`c-modal-background ${modalOpen ? "modal--open" : ""}`}
      onClick={() => setModalOpen(false)}
    >
      <div
        className={`c-modal ${type === "easter-egg" ? "bordered" : ""}`}
        onClick={(e) => e.stopPropagation()}
      >
        <img
          className="c-modal--cross"
          alt="menu-icon"
          src="/icons/cross-icon.svg"
          onClick={() => setModalOpen(false)}
        />
        {type === "transfer" && (
          <ModalTransfer closeFunc={() => setModalOpen(false)} />
        )}
        {type === "archivements" && <ModalArchivements />}
        {type === "bingo" && <ModalBingo />}
        {type === "economy" && <ModalEconomy />}
        {type === "roulette" && <ModalRoulette />}
        {type === "roulette-rewards" && <ModalRouletteRewards />}
        {type === "roulette-clue" && (
          <ModalRouletteClue clueNumber={extraParam} />
        )}
        {type === "easter-egg" && <ModalEasterEgg claimedBefore={extraParam} />}
      </div>
    </article>
  );
};
