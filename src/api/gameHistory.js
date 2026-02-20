export const historyStages = {
  welcome: {
    title: "Pròleg",
    description:
      "Benvinguts als VikingGames! Prepareu-vos per a una aventura èpica plena de diversió i reptes! \n\nDurant els jocs anireu guanyant punts i MoricheCoins que podreu intercanviar per recompenses a la pestanya de 'Botiga' aixo si l'stock dels productes es limitat. La resta d'usos que pogueu donar a les MoricheCoins el deixo a les vostres mans. (Es poden utilitzar per sobornar a altres jugadors)\n\nDe tots els participants, només un serà declarat campió dels VikingGames i rebrà el trofeu i la fama que li pertoquen.\n\nDins d'aquesta eina podreu anar veient el progres del joc i el desenvolupament d'algunes de les proves. Poseu-vos comodes, agafeu un refrijeri i aneu familiaritzant-vos amb el funcionament de l'eina.",
    type: "text",
  },
  roundDescription: {
    title: "Explicació fases",
    description:
      "Els jocs es dividiran en X fases. A continuació una breu explicació de les normes especials de cada fase i el seu numero de probes.",
    type: "text",
  },
  examRules: {
    title: "Explicació examen",
    description: "Enjoy the game!",
    type: "text",
  },
  examLvl1: {
    title: "Prova d'intel·ligència",
    description:
      "Marca la resposta correcta a les seguents preguntes. ⚠️ Recorda validar les respostes abans de que s'acabi el temps!",
    questions: [
      {
        question: "Si AxA = 2x2x3x3, quan val A?",
        options: [
          { id: "A", text: "2" },
          { id: "B", text: "3" },
          { id: "C", text: "6" },
          { id: "D", text: "4" },
          { id: "E", text: "9" },
        ],
        answer: "C",
      },
      {
        question:
          "L'engranatge marcat amb la letra A gira en el sentit de les agulles del rellotge, com es mostra en la figura. Quines dues caixes es mouran cap amunt?",
        image: "/exam/engranatges.png",
        options: [
          { id: "A", text: "1 y 4" },
          { id: "B", text: "2 y 3" },
          { id: "C", text: "1 y 3" },
          { id: "D", text: "2 y 4" },
          { id: "E", text: "No es possible determinar-ho" },
        ],
        answer: "B",
      },
    ],
    type: "exam",
    duration: 600000, // 10 minuts
  },
  memoryRules: {
    title: "Explicació memory",
    description: "Enjoy the game!",
    type: "text",
  },
  memory: {
    title: "Memory",
    description:
      "⚠️ Recorda validar les respostes abans de que s'acabi el temps!",
    image: "/memory/memory.png",
    answer: [
      "I6",
      "H6",
      "G6",
      "G5",
      "G4",
      "H4",
      "H3",
      "H2",
      "G2",
      "F2",
      "E2",
      "E3",
      "E4",
      "D4",
      "C4",
      "C5",
      "C6",
      "D6",
      "D7",
      "D8",
      "C8",
      "B8",
      "B7",
      "A7",
    ],
    type: "memory",
    duration: 80000, // 1 minut i 20 segons
    delayImage: 20000, // 20 segons
  },
  gameOver: {
    title: "Game Over",
    description: "Thank you for playing!",
    type: "text",
  },
};
