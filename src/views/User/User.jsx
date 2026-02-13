import "./User.css";
import { BasicMenu } from "../../components/BasicMenu/BasicMenu";
import { useGlobalDB } from "../../hooks/useGlobalDB";
import { Modal } from "../../components/Modal/Modal";
import { ToastContainer } from "react-toastify";
import { useState } from "react";

export const User = () => {
  const { user, vikingGamesdb, logoutAdmin } = useGlobalDB();
  const [modalOpen, setModalOpen] = useState(false);

  // busca la entrada [id, userObj] cuyo email coincide
  const dbEntry = Object.entries(vikingGamesdb?.Users || {}).find(
    ([id, u]) => u.email === user?.email,
  );
  const dbUserId = dbEntry?.[0]; // "001"
  const dbUser = dbEntry?.[1];

  return (
    <>
      {user ? (
        <>
          <BasicMenu />
          <div className="section-view">
            <h1 className="section-title">El teu espai</h1>
            <div className="user-info">
              <img
                src={"/Players/" + dbUserId + ".png"}
                alt="User Avatar"
                className="user-avatar"
              />
              <p>
                <strong>Username:</strong> {dbUser?.username}
              </p>
              <p>
                <strong>Email:</strong> {dbUser?.email}
              </p>
              <p>
                <strong>Score:</strong> {dbUser?.score || 0}
              </p>
              <p>
                <strong>MoricheCoins:</strong>{" "}
                {dbUser?.coins
                  ? dbUser.coins
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ".")
                  : "0"}{" "}
                🪙
              </p>
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
          <Modal modalOpen={modalOpen} setModalOpen={setModalOpen} />
          <ToastContainer />
        </>
      ) : null}
    </>
  );
};
