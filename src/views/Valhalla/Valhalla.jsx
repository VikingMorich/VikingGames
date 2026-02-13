import "./Valhalla.css";
import { useGlobalDB } from "../../hooks/useGlobalDB";
import { AdminPlayer } from "../../components/AdminPlayer/AdminPlayer";
import { AdminMenu } from "../../components/AdminMenu/AdminMenu";

export const Valhalla = () => {
  const { user, vikingGamesdb } = useGlobalDB();
  const usersEntries =
    vikingGamesdb &&
    vikingGamesdb.Users &&
    typeof vikingGamesdb.Users === "object"
      ? Object.entries(vikingGamesdb.Users)
      : [];

  return (
    <>
      {user?.email === "enricmoriche91@hotmail.com" ? (
        <>
          <AdminMenu />
          <div className="section-view">
            <h1 className="section-title">Administrador</h1>
            <div className="valhalla-players-container">
              {vikingGamesdb
                ? usersEntries.map(([id, player]) => (
                    <AdminPlayer key={id} playerId={id} player={player} />
                  ))
                : null}
            </div>
          </div>
        </>
      ) : (
        <>Usuari no autoritzat.</>
      )}
    </>
  );
};
