import { useState, useEffect, useRef } from "react";
import { useGlobalDB } from "../../hooks/useGlobalDB";
import { historyStages } from "../../api/gameHistory";
import { ScoreGame } from "../../components/ScoreGame/ScoreGame";
import { setPlayerLevelScore } from "../../functions/gameFunctions";
import "./SkillPage.css";

export const SkillPage = () => {
  const { vikingGamesdb, user } = useGlobalDB();

  const currentStage = vikingGamesdb?.Games?.currentPage || "loading";
  const [progressValue, setProgressValue] = useState(0);
  const [direction, setDirection] = useState("right");
  const [lvl, setLvl] = useState(0);
  const [arrRes, setArrRes] = useState([]);
  const [downloadSpeed, setDownloadSpeed] = useState(0.5); // Convertido a estado
  const progressRef = useRef(null);
  const [timeLeft, setTimeLeft] = useState(10);
  const [redTimer, setRedTimer] = useState(false);
  const progressIntervalRef = useRef(null);
  const lvlMax = 10;
  const dbEntry = Object.entries(vikingGamesdb?.Users || {}).find(
    ([id, u]) => u.email === user?.email,
  );
  const dbUserId = dbEntry?.[0];

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

  //ordered from 0 to 100
  const progressSuccess = [
    {
      success: [
        [15, 20],
        [80, 90],
      ],
    },
    {
      success: [
        [3, 10],
        [40, 43],
      ],
      epicwin: [[0, 1]],
      epicfail: [
        [10, 15],
        [43, 50],
      ],
    },
    {
      success: [
        [15, 20],
        [80, 90],
      ],
      epicwin: [[2, 3]],
      epicfail: [
        [20, 25],
        [90, 95],
      ],
    },
    {
      success: [
        [3, 10],
        [40, 43],
      ],
      epicwin: [[1, 2]],
      epicfail: [
        [10, 15],
        [43, 50],
      ],
    },
    {
      success: [
        [15, 20],
        [80, 90],
      ],
      epicwin: [[0, 1]],
      epicfail: [
        [20, 25],
        [90, 95],
      ],
    },
    {
      success: [
        [3, 10],
        [40, 43],
      ],
      epicwin: [[2, 3]],
      epicfail: [
        [10, 15],
        [43, 50],
      ],
    },
    {
      success: [
        [15, 20],
        [80, 90],
      ],
      epicwin: [[1, 2]],
      epicfail: [
        [20, 25],
        [90, 95],
      ],
    },
    {
      success: [
        [3, 10],
        [40, 43],
      ],
      epicwin: [[0, 1]],
      epicfail: [
        [10, 15],
        [43, 50],
      ],
    },
    {
      success: [
        [15, 20],
        [80, 90],
      ],
      epicwin: [[2, 3]],
      epicfail: [
        [20, 25],
        [90, 95],
      ],
    },
    {
      success: [
        [3, 10],
        [40, 43],
      ],
      epicwin: [[1, 2]],
      epicfail: [
        [10, 15],
        [43, 50],
      ],
    },
  ]; // Cada nivel tiene su propio conjunto de rangos

  const getComputedGradient = () => {
    let computedGradientSuccess = "linear-gradient(90deg";

    const allRanges = [
      ...(progressSuccess[lvl].success?.map((range) => ({
        range,
        color: "#0e8208ff",
      })) || []), // Green
      ...(progressSuccess[lvl].epicwin?.map((range) => ({
        range,
        color: "#ffec9f",
      })) || []), // Light Green
      ...(progressSuccess[lvl].epicfail?.map((range) => ({
        range,
        color: "#a70000ff",
      })) || []), // Dark Red
    ];

    allRanges.sort((a, b) => a.range[0] - b.range[0]); // Sort by start of range

    allRanges.forEach((el, i) => {
      if (i === 0 && el.range[0] > 0) {
        computedGradientSuccess += `, #ff0000 0% ${el.range[0]}%`; // Red for gaps
      }
      computedGradientSuccess += `, ${el.color} ${el.range[0]}% ${el.range[1]}%`;
      if (i < allRanges.length - 1 && el.range[1] < allRanges[i + 1].range[0]) {
        computedGradientSuccess += `, #ff0000 ${el.range[1]}% ${allRanges[i + 1].range[0]}%`; // Red for gaps
      }
    });

    const lastRange = allRanges[allRanges.length - 1];
    if (lastRange && lastRange.range[1] < 100) {
      computedGradientSuccess += `, #ff0000 ${lastRange.range[1]}% 100%`; // Red for remaining gap
    }

    computedGradientSuccess += ")";
    return computedGradientSuccess;
  };

  const checkIfSuccess = (prog) => {
    let result = "❌"; // Default to fail

    progressSuccess[lvl].success?.forEach((el) => {
      if (prog >= el[0] && prog <= el[1]) {
        result = "✅";
      }
    });

    progressSuccess[lvl].epicwin?.forEach((el) => {
      if (prog >= el[0] && prog <= el[1]) {
        result = "🎯";
      }
    });

    progressSuccess[lvl].epicfail?.forEach((el) => {
      if (prog >= el[0] && prog <= el[1]) {
        result = "☠️";
      }
    });

    setArrRes(result);

    if (result === "✅") {
      setLvl((prevLvl) => Math.min(prevLvl + 1, lvlMax));
      setDownloadSpeed((prevSpeed) => Math.min(prevSpeed + 0.5, 5)); // Increment speed
    } else if (result === "🎯") {
      setLvl((prevLvl) => Math.min(prevLvl + 2, lvlMax));
      setDownloadSpeed((prevSpeed) => Math.min(prevSpeed + 1, 5)); // Increment speed more
    } else if (result === "❌") {
      setLvl((prevLvl) => Math.max(prevLvl - 1, 0));
      setDownloadSpeed((prevSpeed) => Math.max(prevSpeed - 0.5, 0.5)); // Decrease speed
    } else if (result === "☠️") {
      setLvl((prevLvl) => Math.max(prevLvl - 2, 0));
      setDownloadSpeed((prevSpeed) => Math.max(prevSpeed - 1, 0.5)); // Decrease speed more
    }
  };

  useEffect(() => {
    // Recuperar el nivel del jugador al cargar el componente
    if (dbUserId && vikingGamesdb?.Users?.[dbUserId]?.stageScore) {
      setLvl(vikingGamesdb.Users[dbUserId].stageScore);
    }
  }, [dbUserId, vikingGamesdb?.Users]);

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
          if (!vikingGamesdb.Users?.[dbUserId]?.stageScore) {
            console.log("Setting player level score to", lvl);
            setPlayerLevelScore(dbUserId, lvl + 1);
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
  }, [vikingGamesdb?.Games?.start, lvl, dbUserId]);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  useEffect(() => {
    progressIntervalRef.current = setInterval(() => {
      if (progressValue < 100 && direction === "right") {
        const newProgress = progressValue + downloadSpeed;
        setProgressValue(Math.min(newProgress, 100));
      } else if (progressValue > 0 && direction === "left") {
        const newProgress = progressValue - downloadSpeed;
        setProgressValue(Math.max(newProgress, 0));
      } else {
        // Change direction when progress reaches end
        if (progressValue === 0) {
          setDirection("right");
        } else if (progressValue === 100) {
          setDirection("left");
        }
      }
    }, 20); // Adjust this interval for smoother animation

    return () => clearInterval(progressIntervalRef.current);
  }, [progressValue, direction, downloadSpeed]);

  const stopProgress = () => {
    // You can handle the progress value here
    console.log("Progress stopped at", progressValue);
    checkIfSuccess(progressValue);
    //clearInterval(progressIntervalRef.current)
  };

  useEffect(() => {
    if (progressRef.current) {
      progressRef.current.style.width = `${progressValue}%`;
    }
  }, [progressValue]);
  //--------------

  return (
    <div className="skill-page">
      {timeLeft > 0 ? (
        <>
          <div className={"exam-timer " + (redTimer ? "timer-red" : "")}>
            Tiempo restante: {formatTime(timeLeft)}
          </div>
          <h1 className="skill-page-title">Proba d'habilitat</h1>
          <h3 className="skill-page-level">
            LVL <strong className="skill-page-level-number">{lvl + 1}</strong>
          </h3>
          <div className="skill-page-game-area">
            <div
              className="skill-page-progress-bar"
              style={{
                backgroundImage: getComputedGradient(),
                height: "30px",
                width: "100%",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <div
                ref={progressRef}
                style={{
                  /* backgroundColor: '#000000', opacity: 0.7, */ borderRight:
                    "5px solid black",
                  height: "100%",
                  width: "100%",
                  transition: "transform 0.5s linear",
                }}
              >
                <span
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    color: "#fff",
                  }}
                >
                  {Math.floor(progressValue)}%
                </span>
              </div>
            </div>
            <span className="last-click-result-container">
              Ultim click:{" "}
              <strong className="last-click-result">{arrRes}</strong>
            </span>
            <button onClick={stopProgress} className="stop-button">
              Atura't
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
    </div>
  );
};
