import "./User.css";
import { BasicMenu } from "../../components/BasicMenu/BasicMenu";
import { useGlobalDB } from "../../hooks/useGlobalDB";
import { Modal } from "../../components/Modal/Modal";
import { ToastContainer, toast } from "react-toastify";
import { useState, useEffect } from "react";
import { updateUserName } from "../../functions/gameFunctions";

export const User = () => {
  const { user, vikingGamesdb, logoutAdmin } = useGlobalDB();
  const [modalOpen, setModalOpen] = useState(false);
  const [modalBingoOpen, setModalBingoOpen] = useState(false);
  const [modalRouletteOpen, setModalRouletteOpen] = useState(false);
  const [modalEconomyOpen, setModalEconomyOpen] = useState(false);
  const [dbUser, setDbUser] = useState(null);
  // busca la entrada [id, userObj] cuyo email coincide
  const dbEntry = Object.entries(vikingGamesdb?.Users || {}).find(
    ([id, u]) => u.email === user?.email,
  );
  const dbUserId = dbEntry?.[0]; // "001"

  const [newUserName, setNewUserName] = useState(dbUser?.username || "");

  useEffect(() => {
    const dbEntry = Object.entries(vikingGamesdb?.Users || {}).find(
      ([id, u]) => u.email === user?.email,
    );
    setDbUser(dbEntry?.[1]);
  }, [vikingGamesdb, user]);

  useEffect(() => {
    if (dbUser?.username) {
      setNewUserName(dbUser.username);
    }
  }, [dbUser]);

  return (
    <>
      {user ? (
        <>
          <BasicMenu />
          <div className="section-view">
            <h1 className="section-title">El teu espai</h1>
            <div className="user-info">
              <div className="user-avatar-container">
                <img
                  src={"/Players/" + dbUserId + ".png"}
                  alt="User Avatar"
                  className="user-avatar"
                />
                <div className="user-avatar-overlay">
                  {dbUser?.archivements &&
                    dbUser.archivements.map((arch) => (
                      <img
                        key={`archivement-${arch}`}
                        src={`/icons/${vikingGamesdb?.Archivements[arch]?.img}`}
                        alt={`${vikingGamesdb?.Archivements[arch]?.title}`}
                        className="user-avatar-achievement"
                      />
                    ))}
                </div>
              </div>
              <button
                className="modal-roulette-button"
                onClick={() => setModalRouletteOpen(true)}
                type="button"
              >
                <img
                  src="/icons/roulette.png"
                  alt="Roulette"
                  className="roulette-icon"
                />
              </button>
              {dbUser?.Bingo && (
                <button
                  className="modal-lottery-button"
                  onClick={() => setModalBingoOpen(true)}
                  type="button"
                >
                  <img
                    src="/icons/lottery.png"
                    alt="Lottery"
                    className="lottery-icon"
                  />
                </button>
              )}

              {/* Boton para transformar el username en un input editable amb boto per guardar els canvis si el valor es diferent a l'original */}
              <p>
                <strong>Username: </strong>
                <input
                  type="text"
                  className="username-input"
                  value={newUserName}
                  onChange={(e) => setNewUserName(e.target.value)}
                />
                {newUserName !== dbUser?.username && (
                  <button
                    className="save-username-btn"
                    onClick={async () => {
                      if (newUserName.trim() !== "") {
                        try {
                          // Actualitza el nom d'usuari a la base de dades
                          await updateUserName(dbUserId, newUserName);
                          toast.success("Nom d'usuari actualitzat amb èxit!");
                        } catch (error) {
                          toast.error(
                            "Error en actualitzar el nom d'usuari:" + error,
                          );
                        }
                      } else {
                        toast.error("El nom d'usuari no pot estar buit.");
                      }
                    }}
                    type="button"
                  >
                    💾
                  </button>
                )}
              </p>
              <p>
                <strong>Email:</strong> {dbUser?.email}
              </p>
              <p>
                <strong>Score:</strong> {dbUser?.score || 0}
              </p>
              <div className="economy-wrapper">
                <button
                  className="modal-economy-button"
                  onClick={() => setModalEconomyOpen(true)}
                  type="button"
                >
                  <img
                    src="/icons/economy.png"
                    alt="economy"
                    className="economy-icon"
                  />
                </button>
                <span>
                  <strong>MoricheCoins:</strong>{" "}
                  {dbUser?.coins
                    ? dbUser.coins
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ".")
                    : "0"}{" "}
                  🪙
                </span>
              </div>
              <button
                className="btn transfer-button"
                onClick={() => setModalOpen(true)}
                type="button"
              >
                Transferència
              </button>
            </div>
            <button
              className="btn logout-button"
              onClick={logoutAdmin}
              type="button"
            >
              Logout
            </button>
          </div>
          <Modal
            modalOpen={modalOpen}
            setModalOpen={setModalOpen}
            type="transfer"
          />
          <Modal
            modalOpen={modalBingoOpen}
            setModalOpen={setModalBingoOpen}
            type="bingo"
          />
          <Modal
            modalOpen={modalRouletteOpen}
            setModalOpen={setModalRouletteOpen}
            type="roulette"
          />
          <Modal
            modalOpen={modalEconomyOpen}
            setModalOpen={setModalEconomyOpen}
            type="economy"
          />
          <ToastContainer />
        </>
      ) : null}
    </>
  );
};
