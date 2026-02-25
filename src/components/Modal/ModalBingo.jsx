// import { useState, useEffect } from "react";
import { useGlobalDB } from "../../hooks/useGlobalDB";
import "./ModalBingo.css";

export const ModalBingo = () => {
  const { vikingGamesdb } = useGlobalDB();

  return (
    <div className="c-modal-content-bingo">
      <h2>Bingo</h2>
    </div>
  );
};
