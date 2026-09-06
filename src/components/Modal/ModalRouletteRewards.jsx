import "./ModalRouletteRewards.css";

export const ModalRouletteRewards = () => {
  //REPLICATED in ModalRoulette.jsx, keep them in sync
  const rewards = [
    { number: 1, reward: "300 🪙", color: "#028900" },
    { number: 2, reward: "-", color: "#fc0303" },
    { number: 3, reward: "50 🪙", color: "#fecf00" },
    { number: 4, reward: "Pista 1 - Easter Egg", color: "#78c1ecff" },
    { number: 5, reward: "-", color: "#fc0303" },
    { number: 6, reward: "200 🪙", color: "#028900" },
    { number: 7, reward: "-", color: "#fc0303" },
    { number: 8, reward: "Pista 2 - Easter Egg", color: "#78c1ecff" },
    { number: 9, reward: "-", color: "#fc0303" },
    { number: 10, reward: "100 🪙", color: "#b8f905" },
    { number: 11, reward: "Pista 3 - Easter Egg", color: "#78c1ecff" },
    { number: 12, reward: "-", color: "#fc0303" },
    { number: 13, reward: "Pista 4 - Easter Egg", color: "#78c1ecff" },
    { number: 14, reward: "250 🪙", color: "#028900" },
    { number: 15, reward: "-", color: "#fc0303" },
    { number: 16, reward: "??", color: "#a200ff" },
  ];
  return (
    <div className="c-modal-content-roulette-rewards">
      <h2>Taula de recompenses</h2>
      <div className="rewards-wrapper">
        <table className="rewards-table">
          <thead>
            <tr>
              <th>Numero</th>
              <th>Premi</th>
            </tr>
          </thead>
          <tbody>
            {rewards.map((reward) => (
              <tr
                key={reward.number}
                style={{ backgroundColor: reward.color }}
                className={
                  reward.color === "#fc0303" ||
                  reward.color === "#028900" ||
                  reward.color === "#a200ff"
                    ? "reward-white-text"
                    : ""
                }
              >
                <td>{reward.number}</td>
                <td>{reward.reward}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
