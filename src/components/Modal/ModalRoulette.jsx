import { useState, useEffect } from "react";
import { useGlobalDB } from "../../hooks/useGlobalDB";
import { Wheel } from "react-custom-roulette";
import { Modal } from "./Modal";
import "./ModalRoulette.css";
import { toast } from "react-toastify";
import { playRoulette, addScoreReward } from "../../functions/gameFunctions";

const data = [
  { option: "1", style: { backgroundColor: "#028900" } },
  { option: "2", style: { backgroundColor: "#fc0303" }, optionSize: 2 },
  {
    option: "3",
    style: { backgroundColor: "#fecf00", textColor: "black" },
    optionSize: 2,
  },
  { option: "4", style: { backgroundColor: "#78c1ecff", textColor: "black" } },
  { option: "5", style: { backgroundColor: "#fc0303" }, optionSize: 2 },
  { option: "6", style: { backgroundColor: "#028900" }, optionSize: 2 },
  { option: "7", style: { backgroundColor: "#fc0303" } },
  { option: "8", style: { backgroundColor: "#78c1ecff", textColor: "black" } },
  { option: "9", style: { backgroundColor: "#fc0303" }, optionSize: 2 },
  {
    option: "10",
    style: { backgroundColor: "#9ae70b", textColor: "black" },
    optionSize: 2,
  },
  { option: "11", style: { backgroundColor: "#78c1ecff", textColor: "black" } },
  { option: "12", style: { backgroundColor: "#fc0303" }, optionSize: 2 },
  { option: "13", style: { backgroundColor: "#78c1ecff", textColor: "black" } },
  { option: "14", style: { backgroundColor: "#028900" } },
  { option: "15", style: { backgroundColor: "#fc0303" }, optionSize: 2 },
  {
    option: "16",
    style: { backgroundColor: "#a200ff" },
  },
];

//REPLICATED in ModalRouletteRewards.jsx, keep them in sync
const rewards = [
  { number: 1, prize: 300 },
  { number: 2, prize: 0 },
  { number: 3, prize: 50 },
  { number: 4, prize: 0, clue: 1 },
  { number: 5, prize: 0 },
  { number: 6, prize: 200 },
  { number: 7, prize: 0 },
  { number: 8, prize: 0, clue: 2 },
  { number: 9, prize: 0 },
  { number: 10, prize: 100 },
  { number: 11, prize: 0, clue: 3 },
  { number: 12, prize: 0 },
  { number: 13, prize: 0, clue: 4 },
  { number: 14, prize: 250 },
  { number: 15, prize: 0 },
  { number: 16 },
];

export const ModalRoulette = () => {
  const { vikingGamesdb, user } = useGlobalDB();
  const [modalRouletteRewardsOpen, setModalRouletteRewardsOpen] =
    useState(false);
  const [modalClueOpen, setModalClueOpen] = useState(false);
  const [rewardClueNumber, setRewardClueNumber] = useState(0);

  const dbEntry = Object.entries(vikingGamesdb?.Users || {}).find(
    ([id, u]) => u.email === user?.email,
  );
  const dbUserId = dbEntry?.[0]; // "001"

  const [coins, setCoins] = useState(0);

  useEffect(() => {
    if (dbUserId && vikingGamesdb?.Users?.[dbUserId]?.coins != null) {
      setCoins(vikingGamesdb.Users[dbUserId].coins);
    }
  }, [vikingGamesdb, dbUserId]);

  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);

  const handleSpinClick = async () => {
    if (!mustSpin) {
      const newPrizeNumber = Math.floor(Math.random() * data.length);
      // const newPrizeNumber = 15;
      console.log(newPrizeNumber);
      let reward = rewards[newPrizeNumber].prize || 0;
      let clue = rewards[newPrizeNumber].clue || null;
      if (coins < 100) {
        toast.error(
          "No tens prou monedes per jugar! Guanya més monedes jugant als altres jocs.",
        );
        return;
      } else {
        if (newPrizeNumber === 15) {
          //Random option - win score or coins or clue or nothing
          const newRandomNumber = Math.floor(Math.random() * 4);
          console.log("Random option selected:", newRandomNumber);
          if (newRandomNumber === 0) {
            setTimeout(() => {
              toast("Guanyes un premi de 1000🪙 🤑");
            }, 3500);
            reward = 1000; // Win 1000 coins
          } else if (newRandomNumber === 1) {
            reward = 0; // Win nothing
            setTimeout(() => {
              toast("No has guanyat res... 🫠");
            }, 3500);
          } else if (newRandomNumber === 2) {
            clue = 5; // Win a secret clue
            setTimeout(() => {
              toast("Has guanyat la cinquena pista secreta 🕵🏻‍♂️");
            }, 3500);
          } else if (newRandomNumber === 3) {
            // Win 25 score points
            setTimeout(() => {
              toast("Has sumat 25 punts a la teva puntuació 🚀");
            }, 3500);
            addScoreReward(dbUserId, 25);
          }
        }
        await playRoulette(dbUserId, 100, reward, clue);
        setPrizeNumber(newPrizeNumber);
        setMustSpin(true);
        if (clue) {
          setRewardClueNumber(clue);
          if (newPrizeNumber !== 15) {
            setTimeout(() => {
              toast("Has guanyat una pista 🔬");
            }, 3500);
          }
          setTimeout(() => {
            setModalClueOpen(true);
          }, 3800);
        }
        if (reward > 0 && newPrizeNumber !== 15) {
          setTimeout(() => {
            toast("Has guanyat " + reward + "🪙");
          }, 3500);
        } else if (!clue && reward === 0 && newPrizeNumber !== 15) {
          setTimeout(() => {
            toast("Mala sort, no has guanyat res... 🤕");
          }, 3500);
        }
      }
    }
  };

  return (
    <div className="c-modal-content-roulette">
      <h2>Ruleta de la sort</h2>
      <p>Avui podria ser el teu dia de sort. T'esperen grans premis!</p>
      <p>Saldo actual: {coins} 🪙</p>
      <p>Cost de la jugada: 100 🪙</p>
      <div className="roulette-wrapper">
        <Wheel
          mustStartSpinning={mustSpin}
          prizeNumber={prizeNumber}
          data={data}
          spinDuration={0.3}
          innerRadius={30}
          innerBorderWidth={5}
          textColors={["#fff"]}
          perpendicularText={true}
          onStopSpinning={() => {
            setMustSpin(false);
          }}
        />
        <button className="spin-button" onClick={handleSpinClick}>
          TIRA LA <br />
          RULETA!
        </button>
        <div className="roulette-border" />
      </div>
      <button className="btn" onClick={() => setModalRouletteRewardsOpen(true)}>
        Veure taula de recompenses
      </button>
      <Modal
        modalOpen={modalRouletteRewardsOpen}
        setModalOpen={setModalRouletteRewardsOpen}
        type="roulette-rewards"
      />
      <Modal
        modalOpen={modalClueOpen}
        setModalOpen={setModalClueOpen}
        type="roulette-clue"
        extraParam={rewardClueNumber}
      />
    </div>
  );
};
