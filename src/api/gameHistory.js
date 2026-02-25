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
    description:
      "A continuació es mostraran les preguntes d'un examen. Cada pregunta tindrà diverses opcions, però només hi ha una resposta correcta. Disposareu de 10 minuts per respondre. El jugador que respongui correctament a més preguntes serà el guanyador d'aquesta prova. Les resposten incorrectes no penalitzen, però recorda validar les respostes abans de que s'acabi el temps o obtindreu 0 punts...",
    type: "text",
  },
  examLvl1: {
    title: "Examen",
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
    description:
      "A continuació es mostrara una imatge durant 20 segons. Passat aquest temps, la imatge desapareixerà i disposareu de 1 minut per replicar el dibuix de la imatge. El jugador que acerti més coordenades serà el guanyador d'aquesta prova. Les resposten incorrectes penalitzen restant 1 punt sent 0 la minima puntuació possible. Recorda validar la resposta abans de que s'acabi el temps o obtindràs 0 punts...",
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
  skillRules: {
    title: "Explicació prova d'habilitat",
    description:
      "Tens 1 minut per superar 10 nivells de dificultat, quants podràs passar? Passar un nivell augmenta la velocitat, pero fallar et fa retrocedir. Passat el temps veurem les puntuacions globals i augmentarem els marcadors.",
    type: "text",
  },
  skill: {
    title: "Prova d'habilitat",
    type: "skill",
    duration: 60000, // 1 minut
  },
  gameOver: {
    title: "Game Over",
    description: "Thank you for playing!",
    type: "text",
  },
};
