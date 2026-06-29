import "./ModalRouletteClue.css";

export const ModalRouletteClue = ({ clueNumber }) => {
  //REPLICATED in ModalRoulette.jsx, keep them in sync
  const clues = [
    {
      number: 1,
      title: "Pista 1",
      description:
        "S'accedeix a l'Easter Egg a traves de la pestanya d'usuari.",
    },
    {
      number: 2,
      title: "Pista 2",
      description: "El movil ha d'estar en posició horitzontal.",
    },
    {
      number: 3,
      title: "Pista 3",
      description: "El zoom del navegador hi juga un paper clau.",
    },
    {
      number: 4,
      title: "Pista 4",
      description:
        "L'Easter Egg s'activa al canviar el nom d'usuari per la contrassenya.",
    },
    {
      number: 5,
      title: "Pista 5 - (Secreta)",
      description:
        "El missatge copiat esta invertit, recorda ordenar-lo correctament per obtenir la contrassenya correcta.",
    },
  ];
  return (
    <div className="c-modal-content-roulette-clue">
      <h2>{clues[clueNumber - 1]?.title || "Pista no disponible"}</h2>
      <p>
        Es recomana fer una captura de pantalla de la pista per a futurs
        recordatoris. Un cop tanquis la finestra, la pista no estarà disponible.
      </p>
      <p>
        Recorda que només tu tens la informació d'aquesta pista, i que la pots
        guardar, compartir, vendre o mentir sobre ella... 😈
      </p>
      <br />
      <h3>
        <b>
          La pista es:{" "}
          {clues[clueNumber - 1]?.description || "Pista no disponible"}
        </b>
      </h3>
      <br />
    </div>
  );
};
