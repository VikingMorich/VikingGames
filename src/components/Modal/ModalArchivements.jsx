// import { useState, useEffect } from "react";
import { useGlobalDB } from "../../hooks/useGlobalDB";
import "./ModalArchivements.css";
import { ModalArchivementsArchivement } from "./ModalArchivementsArchivement";

export const ModalArchivements = () => {
  const { vikingGamesdb } = useGlobalDB();

  const archivementEntries =
    vikingGamesdb &&
    vikingGamesdb.Archivements &&
    typeof vikingGamesdb.Archivements === "object"
      ? Object.entries(vikingGamesdb.Archivements)
      : [];

  return (
    <div className="c-modal-content-archivements">
      <h2>Fites</h2>
      {archivementEntries.map(([id, archivement]) => (
        <ModalArchivementsArchivement
          key={id}
          id={id}
          archivement={archivement}
        />
      ))}
    </div>
  );
};
