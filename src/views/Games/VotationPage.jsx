import "./VotationPage.css";
import { useState, useEffect } from "react";
import { useGlobalDB } from "../../hooks/useGlobalDB";
import { historyStages } from "../../api/gameHistory";
import { setPlayerVote } from "../../functions/gameFunctions";
import { calculateVotationResults } from "../../functions/adminFunctions";
import { VotationPlayer } from "../../components/VotationPlayer/VotationPlayer";
import { toast, ToastContainer } from "react-toastify";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export const VotationPage = () => {
  const { vikingGamesdb, user } = useGlobalDB();
  const [timeLeft, setTimeLeft] = useState(10);
  const [redTimer, setRedTimer] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const currentStage = vikingGamesdb?.Games?.currentPage || "loading";

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
  usersEntries = usersEntries
    .filter(
      ([, user]) =>
        user.email !== "enricmoriche91@hotmail.com" &&
        user.email !== "oriolroigcanal@gmail.com",
    )
    .filter(([, u]) => !u.eliminated && u.email !== user?.email);

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
          if (!vikingGamesdb?.VotationScores) {
            //Calcular resultados y guardar en VotationScores
            calculateVotationResults();
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

  const handleVote = () => {
    if (selectedOption) {
      setPlayerVote(dbUserId, selectedOption);
    } else {
      toast.error("Has de seleccionar una opció per votar", {
        autoClose: 700,
        theme: "colored",
      });
    }
  };

  const generateVoteData = () => {
    return Object.entries(vikingGamesdb?.VotationScores || {})
      .map(([id, score]) => ({
        name: `${id}\n${vikingGamesdb.Users[id]?.username}`, // Usar ID y nombre de usuario en dos líneas
        votes: score, // Número de votos
      }))
      .sort((a, b) => b.votes - a.votes); // Ordenar de más a menos votos
  };

  return (
    <>
      {timeLeft <= 0 ? (
        <div className="vote-results">
          <h2>Resultats de la votació</h2>
          <ResponsiveContainer width="85%" height={300}>
            <BarChart layout="vertical" data={generateVoteData()} barSize={30}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" allowDecimals={false} />
              <YAxis
                type="category"
                dataKey="name"
                tick={{
                  textAnchor: "middle", // Alinear al final del eje
                  verticalAnchor: "middle", // Centrar verticalmente
                  dx: -30, // Desplazar hacia el eje
                }}
              />
              <Tooltip />
              <Bar dataKey="votes" fill="#716ea9ff" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      ) : dbUser?.vote ? (
        <div className="vote-thanks">
          <h4>🎉 Gràcies per participar! 🎉</h4>
          <p>Espera a que acabi el temps de votació.</p>
          <h3>Queden: {formatTime(timeLeft)}</h3>
        </div>
      ) : (
        <>
          <div className={"exam-timer " + (redTimer ? "timer-red" : "")}>
            Tiempo restante: {formatTime(timeLeft)}
          </div>
          <div className="games-text-wrapper">
            <h1 className="games-text-title">
              {historyStages[currentStage]?.title}
            </h1>
            <p className="games-text-description">
              {historyStages[currentStage]?.description}
            </p>
            <div className="vote-options">
              {usersEntries.map(([id, u]) => (
                <div
                  key={id}
                  className={`vote-option ${selectedOption === id ? "selected" : ""}`}
                  onClick={() => setSelectedOption(id)}
                >
                  <VotationPlayer playerId={id} player={u} />
                </div>
              ))}
            </div>
            <button className="vote-button" onClick={() => handleVote()}>
              Votar
            </button>
          </div>
        </>
      )}
      <ToastContainer />
    </>
  );
};
