import "./ModalEasterEgg.css";

export const ModalEasterEgg = ({ claimedBefore }) => {
  return (
    <div className="c-modal-content-easter-egg">
      <h3>✨🦄🎊 Moltes felicitats! 🎊🦄✨</h3>
      {!claimedBefore ? (
        <p>
          Has sigut el primer en trobar la contrassenya i per tant el guanyador
          del premi del Easter Egg 🎉
        </p>
      ) : (
        <p>
          Has decovert la contrassenya de l'Easter Egg. Lamentablement, un altre
          jugador ha sigut mes ràpid i el premi ja ha estat reclamat... 🍳
        </p>
      )}
      <br />
    </div>
  );
};
