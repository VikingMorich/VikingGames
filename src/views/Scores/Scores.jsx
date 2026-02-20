import "./Scores.css";
import { BasicMenu } from "../../components/BasicMenu/BasicMenu";
import { useGlobalDB } from "../../hooks/useGlobalDB";
import { ScorePlayer } from "../../components/ScorePlayer/ScorePlayer";
import { Modal } from "../../components/Modal/Modal";
import { useState } from "react";

export const Scores = () => {
  const { vikingGamesdb } = useGlobalDB();
  const [modalOpen, setModalOpen] = useState(false);

  // seguridad: convertir a array vacío si no hay Users
  const usersEntries =
    vikingGamesdb &&
    vikingGamesdb.Users &&
    typeof vikingGamesdb.Users === "object"
      ? Object.entries(vikingGamesdb.Users)
      : [];

  // ordenar: primero eliminated = false, luego eliminated = true; dentro de cada grupo por score desc
  usersEntries.sort(([, a], [, b]) => {
    const aEl = !!a.eliminated;
    const bEl = !!b.eliminated;
    if (aEl === bEl) {
      return (b.score || 0) - (a.score || 0);
    }
    return aEl ? 1 : -1;
  });

  return (
    <>
      <BasicMenu />
      <div className="section-view">
        <h1 className="section-title">Puntuacions</h1>
        <div className="scores-container">
          {vikingGamesdb
            ? usersEntries.map(([id, player]) => (
                <ScorePlayer key={id} playerId={id} player={player} />
              ))
            : null}
        </div>
      </div>
      {/* Modal archivements */}
      <div className="icon-archivements" onClick={() => setModalOpen(true)}>
        <img
          className="icon-archivements-img"
          src="/icons/archivements.png"
          alt="Archivements Icon"
        />
      </div>
      <Modal
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        type="archivements"
      />
    </>
  );
};
