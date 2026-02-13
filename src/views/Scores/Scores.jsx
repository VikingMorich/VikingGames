import "./Scores.css";
import { BasicMenu } from "../../components/BasicMenu/BasicMenu";
import { useGlobalDB } from "../../hooks/useGlobalDB";
import { ScorePlayer } from "../../components/ScorePlayer/ScorePlayer";

export const Scores = () => {
  const { vikingGamesdb } = useGlobalDB();

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

  console.log("Sorted usersEntries:", usersEntries);
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
    </>
  );
};
