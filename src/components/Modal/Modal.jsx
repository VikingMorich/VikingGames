import "./Modal.css";
//import { useGlobalDB } from "../hooks/useGlobalDB";
import { ModalTransfer } from "./ModalTransfer";

export const Modal = ({ modalOpen, setModalOpen }) => {
  return (
    <article
      className={`c-modal-background ${modalOpen ? "modal--open" : ""}`}
      onClick={() => setModalOpen(false)}
    >
      <div className="c-modal" onClick={(e) => e.stopPropagation()}>
        <img
          className="c-modal--cross"
          alt="menu-icon"
          src="/icons/cross-icon.svg"
          onClick={() => setModalOpen(false)}
        />
        <ModalTransfer />
      </div>
    </article>
  );
};
