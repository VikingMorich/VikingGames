import "./Scores.css";
import { BasicMenu } from "../../components/BasicMenu/BasicMenu";
import { useGlobalDB } from "../../hooks/useGlobalDB";
import { ScorePlayer } from "../../components/ScorePlayer/ScorePlayer";
import { Modal } from "../../components/Modal/Modal";
import { useState, useEffect } from "react";

export const Scores = () => {
  const { vikingGamesdb } = useGlobalDB();
  const [modalOpen, setModalOpen] = useState(false);
  const [currentStage, setCurrentStage] = useState("loading");

  useEffect(() => {
    if (vikingGamesdb?.Games?.currentPage) {
      setCurrentStage(vikingGamesdb.Games.currentPage);
    }
  }, [vikingGamesdb]);

  // seguridad: convertir a array vacío si no hay Users
  let usersEntries =
    vikingGamesdb &&
    vikingGamesdb.Users &&
    typeof vikingGamesdb.Users === "object"
      ? Object.entries(vikingGamesdb.Users)
      : [];

  //filtramos a los admin
  usersEntries = usersEntries.filter(
    ([i, user]) =>
      user.email !== "enricmoriche91@hotmail.com" &&
      user.email !== "oriolroigcanal@gmail.com",
  );
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
      {currentStage === "loading" ? (
        <div className="loader-container">
          <img src="/icons/loader.png" alt="Loading..." className="loader" />
        </div>
      ) : (
        <>
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
      )}
    </>
  );
};
