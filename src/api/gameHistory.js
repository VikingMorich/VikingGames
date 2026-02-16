export const historyStages = {
  welcome: {
    title: "Welcome",
    description: "Welcome to the Viking Games!",
    type: "text",
  },
  gameplay: {
    title: "Gameplay",
    description: "Enjoy the game!",
    type: "text",
  },
  examLvl1: {
    title: "Proba d'inteligencia",
    description:
      "Marca la resposta correcta a les seguents preguntes. ⚠️ Recorda validar les respostes abans de que s'acabi el temps!",
    questions: [
      {
        question:
          "L'engranatge marcat amb la letra A gira en el sentit de les agulles del rellotge, com es mostra en la figura. Quines dues caixes es mouran cap amunt?",
        image: "/exam/france.jpg",
        options: ["1 i 4", "2 i 3", "1 i 3", "2 i 4", "No es pot determinar"],
        answer: "2 i 3",
      },
    ],
    type: "exam",
  },
  gameOver: {
    title: "Game Over",
    description: "Thank you for playing!",
    type: "text",
  },
};
