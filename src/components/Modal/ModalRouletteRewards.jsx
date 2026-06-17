import "./ModalRouletteRewards.css";

export const ModalRouletteRewards = () => {
  //REPLICATED in ModalRoulette.jsx, keep them in sync
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
  return (
    <div className="c-modal-content-roulette-rewards">
      <h2>Taula de recompenses</h2>
      <table className="rewards-table">
        <thead>
          <tr>
            <th>Numero</th>
            <th>Premi</th>
          </tr>
        </thead>
        <tbody>
          {rewards.map((reward) => (
            <tr key={reward.number}>
              <td>{reward.number}</td>
              <td>{reward.prize} 🪙</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
