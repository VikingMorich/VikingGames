import "./ChoosePage.css";
import { useGlobalDB } from "../../hooks/useGlobalDB";
import { historyStages } from "../../api/gameHistory";
import { useState, useEffect } from "react";
import { setPlayerPathChoice } from "../../functions/gameFunctions";

export const ChoosePage = () => {
  const { vikingGamesdb, user } = useGlobalDB();
  const currentStage = vikingGamesdb?.Games?.currentPage || "loading";
  const [timeLeft, setTimeLeft] = useState(10); // Time left in seconds
  const [redTimer, setRedTimer] = useState(true);
  const [pathChoice, setPathChoice] = useState(true);
  const [dbUser, setDbUser] = useState(null);

  useEffect(() => {
    const dbEntryEff = Object.entries(vikingGamesdb?.Users || {}).find(
      ([id, u]) => u.email === user?.email,
    );
    setDbUser(dbEntryEff?.[0]);
  }, [vikingGamesdb, user]);

  useEffect(() => {
    if (vikingGamesdb?.Games?.start) {
      const startTime = new Date(vikingGamesdb.Games.start).getTime();
      const endTime = startTime + historyStages[currentStage].duration;
      let timer; // Declare timer variable in the outer scope

      const updateTimer = () => {
        const currentTime = new Date().getTime();

        const remainingTime = Math.max(
          0,
          Math.floor((endTime - currentTime) / 1000),
        );
        setTimeLeft(remainingTime);
        if (
          remainingTime === 60 ||
          remainingTime === 15 ||
          remainingTime === 5 ||
          remainingTime === 3 ||
          remainingTime === 1
        ) {
          setRedTimer(true);
        } else {
          setRedTimer(false);
        }
        if (remainingTime <= 0) {
          // Check if the score already exists before setting it
          if (dbUser && !vikingGamesdb.Users?.[dbUser]?.pathChoice) {
            // Random entre "torre" y "galaxia"
            const randomPath = Math.random() < 0.5 ? "torre" : "galaxia";
            setPathChoice(randomPath);
            console.log("Setting player random path", randomPath);
            if (!dbUser) {
              console.error("Cannot set pathChoice: dbUser is undefined");
            } else {
              // Call and handle promise explicitly so failures are visible
              setPlayerPathChoice(dbUser, randomPath)
                .then((res) => console.log("setPlayerPathChoice success:", res))
                .catch((err) =>
                  console.error("setPlayerPathChoice error:", err),
                );
            }
          } else {
            console.log("Score already exists, not overwriting.");
          }
          clearInterval(timer);
        }
      };

      updateTimer(); // Initialize the timer immediately
      timer = setInterval(updateTimer, 1000); // Assign timer here
      return () => clearInterval(timer);
    }
  }, [vikingGamesdb?.Games?.start]);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <>
      <div className={"exam-timer " + (redTimer ? "timer-red" : "")}>
        Tiempo restante: {formatTime(timeLeft)}
      </div>
      {vikingGamesdb?.Users?.[dbUser]?.pathChoice == null && timeLeft > 0 ? (
        <>
          <div className="games-choice-wrapper">
            <h1 className="games-choice-title">
              {historyStages[currentStage]?.title}
            </h1>
            <p className="games-choice-description">
              {historyStages[currentStage]?.description}
            </p>
            <div className="games-choice-choices">
              <div
                className={`games-choice-choice ${pathChoice === "torre" ? "games-choice-choice--selected" : ""}`}
                onClick={() => {
                  setPathChoice("torre");
                }}
              >
                <img
                  alt="torre"
                  src="/icons/path-torre.png"
                  className="games-choice-choice-image"
                />
                <span className="games-choice-choice-text">
                  Camí de la Torre
                </span>
              </div>
              <div
                className={`games-choice-choice ${pathChoice === "galaxia" ? "games-choice-choice--selected" : ""}`}
                onClick={() => {
                  setPathChoice("galaxia");
                }}
              >
                <img
                  alt="galaxia"
                  src="/icons/path-galaxia.png"
                  className="games-choice-choice-image"
                />
                <span className="games-choice-choice-text">
                  Camí de la Galaxia
                </span>
              </div>
            </div>
            <button
              className="btn exam-button"
              onClick={() => {
                console.log("Setting player path choice:", dbUser, pathChoice);
                setPlayerPathChoice(dbUser, pathChoice);
              }}
              type="button"
            >
              Escollir
            </button>
          </div>
        </>
      ) : (
        <>
          <h1 className="your-path-title">Camí escollit</h1>
          {vikingGamesdb?.Users?.[dbUser]?.pathChoice === "torre" ? (
            <div className="your-path-choice">
              <img
                alt="torre"
                src="/icons/path-torre.png"
                className="your-path-choice-image"
              />
              <p className="your-path-choice-text">La Torre</p>
            </div>
          ) : (
            <div className="your-path-choice">
              <img
                alt="galaxia"
                src="/icons/path-galaxia.png"
                className="your-path-choice-image"
              />
              <p className="your-path-choice-text">La Galaxia</p>
            </div>
          )}
        </>
      )}
    </>
  );
};
