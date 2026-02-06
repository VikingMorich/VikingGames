import React, { useState } from "react";
import "./Memory.css";
export const Memory = () => {
  const letras = ["A", "B", "C", "D", "E", "F", "G", "H", "I"];
  const numeros = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  const [selected, setSelected] = useState(new Set());

  const resetSelection = () => {
    setSelected(new Set());
  };

  const validateSelection = () => {
    const seleccionados = Array.from(selected);
    // placeholder: muestra los seleccionados; reemplaza con lógica de validación real si hace falta
    alert(
      `Seleccionados (${seleccionados.length}): ${seleccionados.join(", ")}`,
    );
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
      <div className="controls">
        <button className="btn reset" onClick={resetSelection} type="button">
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
    </div>
  );
};
