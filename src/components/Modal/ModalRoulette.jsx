import { useState, useEffect } from "react";
import { useGlobalDB } from "../../hooks/useGlobalDB";
import { Wheel } from "react-custom-roulette";
import { Modal } from "./Modal";
import "./ModalRoulette.css";
import { toast } from "react-toastify";
import { playRoulette } from "../../functions/gameFunctions";

const data = [
  { option: "1", style: { backgroundColor: "green" } },
  { option: "2", style: { backgroundColor: "red" } },
  { option: "3", style: { backgroundColor: "gold", textColor: "black" } },
  { option: "4", style: { backgroundColor: "red" } },
  { option: "5", style: { backgroundColor: "green" } },
  { option: "6", style: { backgroundColor: "red" } },
  { option: "7", style: { backgroundColor: "#78c1ecff", textColor: "black" } },
  { option: "8", style: { backgroundColor: "red" }, optionSize: 2 },
];

//REPLICATED in ModalRouletteRewards.jsx, keep them in sync
const rewards = [
  { number: 1, prize: 300 },
  { number: 2, prize: 100 },
  { number: 3, prize: 50 },
  { number: 4, prize: 0 },
  { number: 5, prize: 0 },
  { number: 6, prize: 0 },
  { number: 7, prize: 0 },
  { number: 8, prize: 0 },
];

export const ModalRoulette = () => {
  const { vikingGamesdb, user } = useGlobalDB();
  const [modalRouletteRewardsOpen, setModalRouletteRewardsOpen] =
    useState(false);

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
      if (coins < 100) {
        toast.error(
          "No tens prou monedes per jugar! Guanya més monedes jugant als altres jocs.",
        );
        return;
      } else {
        await playRoulette(dbUserId, 100, rewards[newPrizeNumber].prize);
        setPrizeNumber(newPrizeNumber);
        setMustSpin(true);
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
    </div>
  );
};
