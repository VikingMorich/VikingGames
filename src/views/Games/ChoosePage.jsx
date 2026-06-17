import "./Games.css";
import { useGlobalDB } from "../../hooks/useGlobalDB";
import { historyStages } from "../../api/gameHistory";
import { useState, useEffect } from "react";
import { updateStageScore } from "../../functions/gameFunctions";
import { ScoreGame } from "../../components/ScoreGame/ScoreGame";

export const ChoosePage = () => {
  const { vikingGamesdb, user } = useGlobalDB();
  const currentStage = vikingGamesdb?.Games?.currentPage || "loading";
  const [timeLeft, setTimeLeft] = useState(10); // Time left in seconds
  const [redTimer, setRedTimer] = useState(true);
  const dbEntry = Object.entries(vikingGamesdb?.Users || {}).find(
    ([id, u]) => u.email === user?.email,
  );
  const dbUserId = dbEntry?.[0];
  const dbUser = dbEntry?.[1];

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
      {dbUser?.stageScore == null && timeLeft > 0 ? (
        <>
          <div className="games-text-wrapper">
            <h1 className="games-text-title">
              {historyStages[currentStage]?.title}
            </h1>
            <p className="games-text-description">
              {historyStages[currentStage]?.description}
            </p>
            <button
              className="btn exam-button"
              onClick={() => {}}
              type="button"
            >
              Enviar
            </button>
          </div>
        </>
      ) : (
        <>
          <h1>Camí escollit</h1>
        </>
      )}
    </>
  );
};
