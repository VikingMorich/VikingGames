import { useState, useEffect } from "react";
import "./MemoryPage.css";
import { useGlobalDB } from "../../hooks/useGlobalDB";
import { historyStages } from "../../api/gameHistory";
import { updateStageScore } from "../../functions/gameFunctions";
import { ScoreGame } from "../../components/ScoreGame/ScoreGame";

export const MemoryPage = () => {
  const { vikingGamesdb, user } = useGlobalDB();
  const currentStage = vikingGamesdb?.Games?.currentPage || "loading";
  const gridVal = historyStages[currentStage]?.grid;

  const computeGridSide = (g) => {
    if (typeof g === "number") {
      const sqrt = Math.sqrt(g);
      if (Number.isInteger(sqrt) && sqrt >= 1) return sqrt; // g is total cells (perfect square)
      if (Number.isInteger(g) && g >= 1) return g; // g is side length
    }
    return 3; // fallback to 3x3
  };

  const side = computeGridSide(gridVal);

  const getLetterLabel = (index) => {
    let label = "";
    let i = index;
    while (i >= 0) {
      label = String.fromCharCode(65 + (i % 26)) + label;
      i = Math.floor(i / 26) - 1;
    }
    return label;
  };

  const letras = Array.from({ length: side }, (_, i) => getLetterLabel(i));
  const numeros = Array.from({ length: side }, (_, i) => i + 1);

  const [selected, setSelected] = useState(new Set());
  const [timeLeft, setTimeLeft] = useState(10);
  const [showImage, setShowImage] = useState(true);
  const [redTimer, setRedTimer] = useState(false);

  const dbEntry = Object.entries(vikingGamesdb?.Users || {}).find(
    ([id, u]) => u.email === user?.email,
  );
  const dbUserId = dbEntry?.[0];
  const dbUser = dbEntry?.[1];

  let usersEntries =
    vikingGamesdb &&
    vikingGamesdb.Users &&
    typeof vikingGamesdb.Users === "object"
      ? Object.entries(vikingGamesdb.Users)
      : [];

  usersEntries = usersEntries
    .filter(
      ([, user]) =>
        user.email !== "enricmoriche91@hotmail.com" &&
        user.email !== "oriolroigcanal@gmail.com",
    )
    .filter(([, u]) => !u.eliminated);
  usersEntries.sort(([, a], [, b]) => {
    return (b.stageScore || 0) - (a.stageScore || 0);
  });

  useEffect(() => {
    if (vikingGamesdb?.Games?.start) {
      const startTime = new Date(vikingGamesdb.Games.start).getTime();
      const endTime = startTime + historyStages[currentStage].duration;
      const imageEndTime = startTime + historyStages[currentStage].delayImage;
      let timer;

      const updateTimer = () => {
        const currentTime = new Date().getTime();
        const remainingTime = Math.max(
          0,
          Math.floor((endTime - currentTime) / 1000),
        );
        const remainingTimeImg = Math.max(
          0,
          Math.floor((imageEndTime - currentTime) / 1000),
        );
        setTimeLeft(remainingTimeImg <= 0 ? remainingTime : remainingTimeImg);

        if (
          remainingTime === 30 || // 30 seconds
          remainingTime === 15 ||
          remainingTime === 5 ||
          remainingTime === 3 ||
          remainingTime === 1
        ) {
          setRedTimer(true);
        } else {
          setRedTimer(false);
        }

        if (currentTime >= imageEndTime) {
          setShowImage(false);
        }

        if (remainingTime <= 0) {
          clearInterval(timer);
        }
      };

      updateTimer();
      timer = setInterval(updateTimer, 1000);

      return () => clearInterval(timer);
    }
  }, [vikingGamesdb?.Games?.start]);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const resetSelection = () => {
    setSelected(new Set());
  };

  const validateSelection = async () => {
    const seleccionados = Array.from(selected);
    // console.log("Seleccionados:", seleccionados);
    const correctAnswers = historyStages[currentStage]?.answer || [];
    const correctCount = seleccionados.filter((id) =>
      correctAnswers.includes(id),
    ).length;
    const incorrectCount = seleccionados.length - correctCount;
    const totalScore = Math.max(0, correctCount - incorrectCount); // Ensure score is not negative
    // console.log(`Puntuació: ${totalScore}`);
    await updateStageScore(dbUserId, totalScore);
  };

  const toggleCell = (id) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <div className="memory-view">
      <div className={"exam-timer " + (redTimer ? "timer-red" : "")}>
        Tiempo restante: {formatTime(timeLeft)}
      </div>
      {timeLeft > 0 && dbUser?.stageScore == null ? (
        showImage ? (
          <>
            <h1 className="memory-title">Recorda aquesta imatge</h1>
            <div className="memory-image">
              <img
                src={historyStages[currentStage]?.image}
                alt="Memory Challenge"
              />
            </div>
          </>
        ) : (
          <>
            <h1 className="memory-title">Memory</h1>
            <div className="tablero-container">
              <div className="tablero">
                {letras.map((letra) => (
                  <div key={letra} className="fila">
                    {numeros.map((numero) => {
                      const id = letra + numero;
                      const isSelected = selected.has(id);
                      return (
                        <div
                          key={id}
                          className={`celda ${isSelected ? "selected" : ""}`}
                          onClick={() => toggleCell(id)}
                        >
                          {/* {id} */}
                        </div>
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>
            <p className="memory-text-description">
              {historyStages[currentStage]?.description}
            </p>
            <div className="controls">
              <button
                className="btn reset"
                onClick={resetSelection}
                type="button"
              >
                Reset
              </button>
              <button
                className="btn validate"
                onClick={validateSelection}
                type="button"
              >
                Validar
              </button>
            </div>
          </>
        )
      ) : (
        <>
          <h1 className="memory-title">Taula classificatoria</h1>
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
    </div>
  );
};
