import "./Games.css";
import { useGlobalDB } from "../../hooks/useGlobalDB";
import { historyStages } from "../../api/gameHistory";
import { useState, useEffect } from "react";
import { updateStageScore } from "../../functions/gameFunctions";
import { ScoreGame } from "../../components/ScoreGame/ScoreGame";

export const ExamPage = () => {
  const { vikingGamesdb, user } = useGlobalDB();
  const currentStage = vikingGamesdb?.Games?.currentPage || "loading";
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(10); // Time left in seconds
  const [redTimer, setRedTimer] = useState(true);
  const dbEntry = Object.entries(vikingGamesdb?.Users || {}).find(
    ([id, u]) => u.email === user?.email,
  );
  const dbUserId = dbEntry?.[0];
  const dbUser = dbEntry?.[1];

  // seguridad: convertir a array vacío si no hay Users
  let usersEntries =
    vikingGamesdb &&
    vikingGamesdb.Users &&
    typeof vikingGamesdb.Users === "object"
      ? Object.entries(vikingGamesdb.Users)
      : [];

  // filtrar: solo los eliminated = false; dentro de cada grupo por stageScore desc
  usersEntries = usersEntries.filter(([, u]) => !u.eliminated);
  usersEntries.sort(([, a], [, b]) => {
    return (b.stageScore || 0) - (a.stageScore || 0);
  });

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

  const handleAnswerChange = (questionId, optionId) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: optionId,
    }));
  };

  const calculateScore = async () => {
    let totalScore = 0;
    historyStages[currentStage]?.questions.forEach((question, index) => {
      if (answers[index] === question.answer) {
        totalScore += 1;
      }
    });
    console.log("Total Score:", totalScore);
    await updateStageScore(dbUserId, totalScore);
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
            <div className="exam-divider" />
            <div className="exam-content">
              {historyStages[currentStage]?.questions.map((question, index) => {
                return (
                  <div key={index} className="exam-question-card">
                    <span className="question-exam">
                      {index + 1}. {question.question}
                    </span>
                    {question.image && (
                      <img
                        src={question.image}
                        alt={"question" + index}
                        className="img-exam"
                      />
                    )}
                    <div className="options-container">
                      {question.options.map((option) => (
                        <label key={option.id} className="option-item">
                          <input
                            type="radio"
                            name={`question-${index}`}
                            value={option.id}
                            checked={answers[index] === option.id}
                            onChange={() =>
                              handleAnswerChange(index, option.id)
                            }
                          />
                          <span>
                            {option.id}) {option.text}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
            <button
              className="btn exam-button"
              onClick={() => calculateScore()}
              type="button"
            >
              Enviar
            </button>
          </div>
        </>
      ) : (
        <>
          <h1>Taula classificatoria</h1>
          <div className="game-scoreboard">
            {vikingGamesdb
              ? usersEntries.map(([id, player], index) => (
                  <ScoreGame
                    key={id}
                    playerId={id}
                    player={player}
                    index={index}
                  />
                ))
              : null}
          </div>
        </>
      )}
    </>
  );
};
