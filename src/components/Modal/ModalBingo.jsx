import { useState, useEffect, useMemo } from "react";
import { useGlobalDB } from "../../hooks/useGlobalDB";
import { claimBingo } from "../../functions/gameFunctions";
import "./ModalBingo.css";

export const ModalBingo = () => {
  const { vikingGamesdb, user } = useGlobalDB();
  const [isBingoUsed, setIsBingoUsed] = useState(false);

  const dbEntry = Object.entries(vikingGamesdb?.Users || {}).find(
    ([id, u]) => u.email === user?.email,
  );
  const dbUserId = dbEntry?.[0]; // "001"

  useEffect(() => {
    if (vikingGamesdb && vikingGamesdb.Archivements) {
      setIsBingoUsed(vikingGamesdb.Archivements["003"].used);
    }
  }, [vikingGamesdb]);

  const data = useMemo(() => {
    return vikingGamesdb?.Users?.[dbUserId]?.Bingo || [];
  }, [vikingGamesdb, dbUserId]);

  // Check eliminated status for each ID in data
  const eliminatedStatus = useMemo(() => {
    return data.reduce((acc, id) => {
      acc[id] = vikingGamesdb?.Users?.[id]?.eliminated || false;
      return acc;
    }, {});
  }, [vikingGamesdb, data]);

  // Check if all IDs are eliminated
  const allEliminated = useMemo(() => {
    return data.every((id) => eliminatedStatus[id]);
  }, [eliminatedStatus, data]);

  return (
    <div className="c-modal-content-bingo">
      <h2>Bingo</h2>
      <div className="bingo-grid">
        {data.map((id) => (
          <div key={id} className="bingo-cell">
            <div className="bingo-media">
              <img
                src={"/Players/" + id + ".png"}
                alt={`Player ${id}`}
                className="bingo-avatar"
              />
              {eliminatedStatus[id] && (
                <img
                  src={`/Players/eliminated.png`}
                  alt="Eliminated"
                  className="bingo-player__image-eliminated"
                />
              )}
            </div>
            <div className="bingo-id">{id}</div>
          </div>
        ))}
      </div>
      {isBingoUsed && (
        <span className="bingo-waiting-message">
          Algun jugador ja ha aconseguit cantar Bingo.
        </span>
      )}
      {!isBingoUsed && allEliminated && (
        <button
          className="btn bingo-button"
          onClick={() => claimBingo(dbUserId)}
        >
          Bingooo!!!
        </button>
      )}
      {!isBingoUsed && !allEliminated && (
        <span className="bingo-waiting-message">
          Espera a que tots els jugadors estiguin eliminats.
        </span>
      )}
    </div>
  );
};
