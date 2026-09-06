import "./WinnerPage.css";
import { useGlobalDB } from "../../hooks/useGlobalDB";
import { historyStages } from "../../api/gameHistory";

export const WinnerPage = () => {
  const { vikingGamesdb } = useGlobalDB();
  const currentStage = vikingGamesdb?.Games?.currentPage || "loading";
  let usersEntries =
    vikingGamesdb &&
    vikingGamesdb.Users &&
    typeof vikingGamesdb.Users === "object"
      ? Object.entries(vikingGamesdb.Users)
      : [];
  let winnerId = null;

  usersEntries = usersEntries
    .filter(
      ([, user]) =>
        user.email !== "enricmoriche91@hotmail.com" &&
        user.email !== "oriolroigcanal@gmail.com",
    )
    .filter(([, u]) => !u.eliminated);
  if (usersEntries.length === 1) {
    winnerId = usersEntries[0][0];
  }

  return (
    <>
      {winnerId ? (
        <div className="winner-wrapper">
          <div className="winner-container">
            <h1 className="winner-text-title">
              {historyStages[currentStage]?.description}
            </h1>
            <img
              src={"/Players/" + winnerId + ".png"}
              alt="User Avatar"
              className="winner-avatar"
            />
          </div>
        </div>
      ) : (
        <>
          <h2>i el guanyador és...</h2>
        </>
      )}
    </>
  );
};
