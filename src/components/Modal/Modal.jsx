import "./Modal.css";
//import { useGlobalDB } from "../hooks/useGlobalDB";
import { ModalTransfer } from "./ModalTransfer";
import { ModalArchivements } from "./ModalArchivements";

export const Modal = ({ modalOpen, setModalOpen, type }) => {
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
        {type === "transfer" && <ModalTransfer />}
        {type === "archivements" && <ModalArchivements />}
      </div>
    </article>
  );
};
