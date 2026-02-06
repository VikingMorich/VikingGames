import { useState, useEffect } from "react";
import { useGlobalDB } from "../../hooks/useGlobalDB";
import "./ModalTransfer.css";

export const ModalTransfer = () => {
  const { user, vikingGamesdb } = useGlobalDB();

  // busca la entrada [id, userObj] cuyo email coincide
  const dbEntry = Object.entries(vikingGamesdb?.Users || {}).find(
    ([id, u]) => u.email === user?.email,
  );
  const dbUserId = dbEntry?.[0]; // "001"
  const dbUser = dbEntry?.[1];

  const maxCoins = Number(dbUser?.coins ?? 0);
  const [amount, setAmount] = useState(0);

  // Si cambia el usuario o sus coins, ajusta el amount si hace falta
  useEffect(() => {
    setAmount((prev) => Math.min(prev, maxCoins));
  }, [maxCoins]);

  return (
    <div className="c-modal-content">
      <h2>Transferència</h2>
      <div>
        <p>Origen:</p>
        <p>{dbUser?.coins} 🪙</p>

        <p>Compte destí:</p>
        <select>
          <option>Selecciona un usuari</option>
        </select>

        <p>Import:</p>

        {/* Slider (touch-friendly) */}
        <div style={{ padding: "8px 0" }}>
          <input
            type="range"
            min={0}
            max={maxCoins}
            step={1}
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            aria-label="Import a transferir"
            style={{
              width: "100%",
              height: 36, // touch-friendly track height
              background: "transparent",
              touchAction: "manipulation",
            }}
            className="c-range"
          />

          {/* Mostrar valor actual + input numérico sincronitzat */}
          <div
            style={{
              display: "flex",
              gap: 8,
              alignItems: "center",
            }}
          >
            <input
              type="number"
              min={0}
              max={maxCoins}
              value={amount}
              onChange={(e) =>
                setAmount(
                  Math.max(0, Math.min(maxCoins, Number(e.target.value) || 0)),
                )
              }
              aria-label="Quantitat a transferir"
              style={{ width: 120, padding: 6 }}
            />
            <span>🪙</span>
          </div>
        </div>
      </div>
      <button
        className="btn btn-send-transfer"
        onClick={() => {}}
        type="button"
      >
        Enviar
      </button>
    </div>
  );
};
