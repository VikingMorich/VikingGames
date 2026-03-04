import { useState } from "react";
import { useGlobalDB } from "../../hooks/useGlobalDB";
import { Wheel } from "react-custom-roulette";
import "./ModalRoulette.css";

const data = [
  { option: "1", style: { backgroundColor: "green", textColor: "black" } },
  { option: "2" },
  { option: "3" },
  { option: "4" },
  { option: "5" },
  { option: "6" },
  { option: "7" },
  { option: "8" },
];

export const ModalRoulette = () => {
  const { vikingGamesdb, user } = useGlobalDB();

  const dbEntry = Object.entries(vikingGamesdb?.Users || {}).find(
    ([id, u]) => u.email === user?.email,
  );
  const dbUserId = dbEntry?.[0]; // "001"

  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);

  const handleSpinClick = () => {
    if (!mustSpin) {
      const newPrizeNumber = Math.floor(Math.random() * data.length);
      setPrizeNumber(newPrizeNumber);
      setMustSpin(true);
    }
  };

  return (
    <div className="c-modal-content-roulette">
      <h2>Ruleta de la sort</h2>
      <p>Avui podria ser el teu dia de sort. T'esperen grans premis!</p>
      <p>Saldo actual: 1000</p>
      <p>Cost de la jugada: 100</p>
      <div className="roulette-wrapper">
        <Wheel
          mustStartSpinning={mustSpin}
          prizeNumber={prizeNumber}
          data={data}
          spinDuration={0.3}
          innerRadius={30}
          innerBorderWidth={5}
          perpendicularText={true}
          onStopSpinning={() => {
            setMustSpin(false);
          }}
        />
        <button className="spin-button" onClick={handleSpinClick}>
          GIRA!
        </button>
      </div>
    </div>
  );
};
