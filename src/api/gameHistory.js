export const historyStages = {
  welcome: {
    title: "Pròleg",
    description:
      "Benvinguts als VikingGames! Prepareu-vos per a una aventura èpica plena de diversió i reptes! \n\nDurant els jocs anireu guanyant punts i MoricheCoins que podreu intercanviar per recompenses a la pestanya de 'Botiga', aixo si, l'stock dels productes es limitat. La resta d'usos que pogueu donar a les MoricheCoins el deixo a les vostres mans. (Es poden utilitzar per sobornar a altres jugadors)\n\nDe tots els participants, només un serà declarat campió dels VikingGames i rebrà el trofeu i la fama que li pertoquen.\n\nDins d'aquesta eina podreu anar veient el progres del joc i el desenvolupament d'algunes de les proves. Poseu-vos comodes, agafeu un refrijeri i aneu familiaritzant-vos amb el funcionament de l'eina.",
    type: "text",
  },
  roundDescription: {
    title: "Explicació fases",
    description:
      "<p>Els jocs es dividiran en 4 fases. A continuació una breu explicació de les normes especials de cada fase i el seu numero de probes.</p><h3>Fase 0</h3><p>Un únic joc que no otorga punts als participants, pero tindrà MoricheCoins de recompensa.</p><h3>Fase 1</h3><p>En la primera fase es jugaran 7 probes, després de cada repte es repartiran punts als millors jugadors segons la proba. Un cop acabin totes les probes de la fase, s'eliminaran els X jugadors amb pitjor puntuació. (Es classifiquen els 14 millors)</p><h3>Fase 2</h3><p>En aquesta fase, s'eliminarà al jugador amb pitjor puntuació segons la classificació global després de cada proba.</p><h3>Fase 3</h3><p>L'ultima fase eliminarà el pitjor jugador despres de cada proba independentment de la seva puntuació global.</p><h4>Notes especials</h4><p>En algun moment del joc també hi haurà una fase de repesca en la que algun jugador eliminat podrà tornar a entrar al joc.</p>",
    type: "text",
  },
  round0: {
    title: "Fase 0",
    number: "0",
    description: "No s'aconsegueixen punts, només es reparteixen MoricheCoins.",
    type: "stage",
  },
  flagSpeed: {
    title: "🚩 Carrera de Banderes",
    description:
      "<p>En aquesta prova apareixeran un total de 13 banderes repartides per l'espai de joc. Sota cada bandera hi haurà un premi ocult en MoricheCoins, que els jugadors no podran veure abans d'escollir.</p><h4>⚙️ Funcionament del joc</h4><p>Quan soni el senyal d'inici (xiulet), la prova començarà.</p><p>En aquell moment, els jugadors que ho desitgin podran començar a córrer per intentar aconseguir una bandera.</p><p><b>⚠️ Important:</b> un cop un jugador <b>creua la línia de sortida</b> per participar, <b>ja no podrà tornar enrere ni participar en les rondes següents d'aquesta prova.</b></p><h4>🏁 Objectiu</h4><p>Cada jugador haurà d'intentar arribar a una de les banderes abans que la resta de participants.</p><p> La primera persona que arribi a una bandera i la reclami s'endurà el premi ocult que hi ha sota aquella bandera.</p><h4>📌 Normes importants</h4><ul><li>Hi ha un total de 13 banderes, però no estaran disponibles totes al mateix temps.</li><li>Les banderes aniran apareixent al llarg de la prova.</li><li>Un cop una bandera ha estat reclamada, ja no es podrà tornar a agafar.</li><li>Cada jugador només podrà obtenir una única bandera.</li></ul><h4>❌ Eliminacions</h4><p>No hi ha eliminacions en aquesta prova.</p><p>Tots els participants continuaran al joc independentment del resultat obtingut.</p>",
    type: "text",
    reward: "TO DO",
    rewardResume: "TO DO",
  },
  round1: {
    title: "Fase 1",
    number: "1",
    description:
      "7 proves on es repartiran punts. Els X pitjors al acabar la fase seran eliminats. (Es classifiquen els 14 millors)",
    type: "stage",
  },
  tinderblox: {
    title: "🔥 TinderBlox",
    description:
      "<p>En aquesta prova, els participants hauran de posar a prova el seu pols, la seva precisió i paciència.</p><p>Utilitzant peces de gran format, els jugadors hauran d'anar construint una torre cada vegada més alta i inestable, augmentant la dificultat del repte.</p><h4>⚙️ Funcionament del joc</h4><p>Els participants jugaran per torns.</p><p>En cada torn, el jugador corresponent haurà d'agafar una peça i col·locar-la a la part superior de la torre, seguint les indicacions de l'organització.</p><p>Després de col·locar la peça, el torn passarà al següent jugador.</p><h4>🏁 Objectiu</h4><p>L'objectiu és colocar les peces a la torre sense fer-la caure.</p><h4>📌 Normes importants</h4><ul><li>Els jugadors hauran de respectar l'ordre dels torns establert per l'organització.</li><li>Només es podrà manipular la peça corresponent al torn del jugador.</li><li>Un cop la peça hagi estat col·locada correctament i el jugador hagi deixat d'estar en contacte amb la torre, el torn es considerarà finalitzat.</li><li>La torre haurà de mantenir-se dreta després de cada moviment.</li></ul><h4>❌ Eliminacions</h4><p>Qualsevol jugador que faci caure la torre quedarà eliminat d'aquesta prova.</p><p>La resta de participants continuaran jugant fins que només en quedi un.</p>",
    type: "text",
    reward: "TO DO",
    rewardResume: "TO DO",
  },
  basket: {
    title: "🏀 Relleus de Basket",
    description:
      "<p>Els participants es dividiran en dos equips per competir en una cursa d'encistellades.</p><h4>🏁 Objectiu</h4><p>Ser el primer equip a aconseguir que tots els seus integrants encistellin des de la línia de tir lliure.</p><h4>📌 Normes</h4><ul><li>Quan soni el xiulet, començarà la prova.</li><li>Els jugadors hauran de seguir l'ordre establert dins del seu equip.</li><li>Tots els llançaments s'hauran de fer des de la línia de tir lliure.</li><li>Cada jugador disposarà d'intents il·limitats fins a encistellar.</li><li>Un cop un jugador encistelli, el següent membre del seu equip podrà començar a llançar.</li><li>Si el llançador falla, un company del seu equip podrà recuperar la pilota i retornar-la-hi perquè pugui continuar intentant-ho més ràpidament.</li><li>Guanyarà l'equip que aconsegueixi completar la prova abans que l'altre.</li></ul>",
    type: "text",
    reward: "TO DO",
    rewardResume: "TO DO",
  },
  balontir: {
    title: "🔪 Joc de matar",
    description:
      "<p>Els participants es dividiran en dos equips, que es col·locaran en camps oposats.</p><h4>🏁 Objectiu</h4><p>Eliminar tots els jugadors de l'equip contrari.</p><h4>📌 Normes</h4><ul><li>Quan soni el xiulet, començarà la partida.</li><li>Cada equip ocuparà una meitat del terreny de joc.</li><li>Els jugadors hauran de llançar la pilota per intentar tocar els rivals.</li><li>Si un jugador és tocat per la pilota i aquesta cau a terra, quedarà eliminat i passarà a la zona dels eliminats, situada darrere del camp rival.</li><li>Si un jugador agafa la pilota al vol, el llançador quedarà eliminat.</li><li>Si la pilota toca a terra abans de tocar un jugador, no hi haurà eliminació.</li><li>Els jugadors eliminats podran tornar al joc si aconsegueixen eliminar un rival des de la zona d'eliminats.</li><li>Si un jugador trepitja una línia o surt del seu camp, quedarà eliminat.</li><li>No es permet llançar la pilota intencionadament al cap. Cal respectar els companys i jugar net.</li></ul><h4>❌ Eliminacions</h4><p>Els jugadors eliminats passaran a la zona posterior del camp contrari, des d'on encara podran intentar tornar al joc.</p><h4>🏆 Guanyador</h4><p>Guanyarà l'equip que aconsegueixi deixar sense jugadors actius l'equip rival.</p>",
    type: "text",
    reward:
      "Cada jugador de l'equip guanyador rebrà 500 MoricheCoins i 10 punts.",
    rewardResume: "500🪙 i 10 punts a equip guanyador",
  },
  votation1: {
    title: "📊 Votació penalització",
    description:
      "Escull el teu jugador que vols penalitzar. Clica sobre seu i apreta el boto per votar abans de que s'acabi el temps.",
    type: "votation",
    duration: 60000, // 1 minut
  },
  findClue: {
    title: "🔍 Troba Tiquets",
    description:
      "<h4>🏁 Objectiu</h4><p>Trobar el màxim nombre de tiquets amagats pel recinte abans que s'acabi el temps.</p><h4>📌 Normes</h4><ul><li>Quan soni el xiulet, començarà la cerca.</li><li>Els participants disposaran de 20 minuts per trobar tants tiquets com puguin.</li><li>Cada tiquet trobat atorgarà punts per avançar en el joc.</li></ul><h4>🏆 Resultat</h4><p>Un cop finalitzat el temps, es farà el recompte de tots els tiquets i cada jugador obtindrà els punts corresponents.</p>",
    type: "text",
    reward: "TO DO",
    rewardResume: "TO DO",
  },
  memoryRules: {
    title: "📖🧐 Explicació Memory",
    description:
      "<p>En aquesta prova es disputaran dues rondes amb dificultats diferents.</p><h4>🏁 Objectiu</h4><p>Recordar la imatge mostrada i reproduir-la amb la màxima precisió possible.</p><h4>📌 Normes</h4><ul><li>A l'inici de cada ronda es mostrarà una imatge durant 20 segons.</li><li>Un cop transcorregut aquest temps, la imatge desapareixerà.</li><li>Els participants disposaran de 1 minut per replicar el dibuix de memòria.</li><li>Cada coordenada encertada sumarà 1 punt.</li><li>Les respostes incorrectes restaran 1 punt, però la puntuació mínima serà sempre de 0 punts.</li><li>És imprescindible validar la resposta abans que finalitzi el temps. En cas contrari, la puntuació de la ronda serà de 0 punts.</li></ul><h4>🏆 Resultat</h4><p>Cada punt obtingut en aquesta proba es sumarà al total de la classificació global.</p>",
    type: "text",
    reward: "TO DO",
    rewardResume: "TO DO",
  },
  memory1: {
    title: "🧐 Memory Lvl 1",
    description:
      "⚠️ Recorda validar les respostes abans de que s'acabi el temps!",
    image: "/memory/memory1.png",
    answer: ["A4", "B3", "C3", "C4", "C5", "D5", "E3", "E4", "F2", "E2"],
    type: "memory",
    grid: 6,
    duration: 80000, // 1 minut i 20 segons
    delayImage: 20000, // 20 segons
    rewardResume: "Score auto",
  },
  memory2: {
    title: "🧐 Memory Lvl 2",
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
    grid: 9,
    duration: 80000, // 1 minut i 20 segons
    delayImage: 20000, // 20 segons
    rewardResume: "Score auto",
  },
  skillRules: {
    title: "📖🕹️ Explicació Prova d'Habilitat",
    description:
      "<p>Disposes d'1 minut per intentar superar els 10 nivells de dificultat. Quants nivells seràs capaç d'aconseguir?</p><h4>🏁 Objectiu</h4><p>Arribar al nivell 10 abans que s'acabi el temps.</p><h4>📌 Normes</h4><ul><li>Hauràs d'aturar la barra dins d'una de les zones de color considerades com a encert.</li><li>Cada vegada que superis un nivell, la velocitat de la barra augmentarà, fent el repte més difícil.</li><li>Si falles, retrocediràs segons la zona on s'aturi la barra.</li><li>Disposes d'1 minut per avançar tants nivells com puguis.</li></ul><h4>🎨 Resultat de cada intent</h4>",
    reward:
      "La puntuació obtinguda es sumara al marcador global de cada jugador. A més, el jugador amb millor puntuació rebràn una aventatge secreta.",
    type: "text-colors",
  },
  skill: {
    title: "🕹️ Prova d'Habilitat",
    type: "skill",
    rewardResume: "Aventatge secreta al millor (Score auto)",
    duration: 60000, // 1 minut
  },
  examRules: {
    title: "📖🧠 Explicació Examen",
    description:
      "<p>Aquesta prova consta de dues fases.</p><h4>🏁 Objectiu</h4><p>Respondre correctament el màxim nombre de preguntes possible per aconseguir punts per a la classificació final.</p><h4>📌 Normes</h4><ul><li>A cada fase es mostrarà un examen amb diverses preguntes de resposta múltiple.</li><li>Cada pregunta tindrà diverses opcions, però només una serà correcta.</li><li>Els participants disposaran de 10 minuts per completar l'examen.</li><li>Cada resposta correcta sumarà 1 punt.</li><li>Les respostes incorrectes no penalitzen.</li><li>És imprescindible validar les respostes abans que finalitzi el temps. En cas contrari, la puntuació de la fase serà de 0 punts.</li></ul><h4>🏆 Resultat</h4><p>Tots els punts aconseguits en aquesta prova es sumaran a la classificació final del joc.</p>",
    type: "text",
    reward:
      "La puntuació obtinguda a l'examen es sumara al marcador global de cada jugador. A més, els 3 jugadors amb millor nota a l'examen rebràn un bonus de 500 MoricheCoins.",
  },
  examLvl1: {
    title: "🧠 Examen IQ",
    description:
      "Marca la resposta correcta a les seguents preguntes. ⚠️ Recorda validar les respostes abans de que s'acabi el temps!",
    rewardResume: "500🪙 als 3 millors (Score auto)",
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
  examFreak: {
    title: "👾 Examen Friki ",
    description:
      "Marca la resposta correcta a les seguents preguntes. ⚠️ Recorda validar les respostes abans de que s'acabi el temps!",
    rewardResume: "500🪙 als 3 millors (Score auto)",
    questions: [
      {
        question: "Quin pokemon es aquest?",
        image: "/exam/friki/poke1.png",
        options: [
          { id: "A", text: "Pansage" },
          { id: "B", text: "Panpour" },
          { id: "C", text: "Pansear" },
          { id: "D", text: "Aipom" },
        ],
        answer: "A",
      },
      {
        question: "Quin pokemon es aquest?",
        image: "/exam/friki/poke2.png",
        options: [
          { id: "A", text: "Misdreavus" },
          { id: "B", text: "Swinub" },
          { id: "C", text: "Phanpy" },
          { id: "D", text: "Pupitar" },
        ],
        answer: "C",
      },
      {
        question: "Quin es el nom d'aquesta carta de Hearthstone?",
        image: "/exam/friki/hearthstone.png",
        options: [
          { id: "A", text: "Kel'thuzad" },
          { id: "B", text: "Leroy Jenkins" },
          { id: "C", text: "Tirion Vadín" },
          { id: "D", text: "Khadgar" },
        ],
        answer: "B",
      },
      {
        question: "Quina pel·lícula d'Studio Ghibli és més antiga?",
        image: "/exam/friki/totoro.png",
        options: [
          { id: "A", text: "La princesa Mononoke" },
          { id: "B", text: "Porco Rosso" },
          { id: "C", text: "El viaje de Chihiro" },
          { id: "D", text: "El castillo ambulante" },
        ],
        answer: "A",
      },
      {
        question:
          "Quin es el nom de l'esquirol que viu per les branques de l'arbre dels 9 mons de la mitologia nòrdica?",
        image: "/exam/friki/yggdrasil.jpg",
        options: [
          { id: "A", text: "Sleipnir" },
          { id: "B", text: "Huggin" },
          { id: "C", text: "Tanngrisnir" },
          { id: "D", text: "Ratatoskr" },
        ],
        answer: "D",
      },
      {
        question:
          "Quin mètode d'array s'utilitza per obtenir un nou array que contingui únicament els elements que compleixen una condició específica?",
        image: "/exam/friki/js.jpg",
        options: [
          { id: "A", text: ".map( )" },
          { id: "B", text: ".if( )" },
          { id: "C", text: ".filter( )" },
          { id: "D", text: ".reduce( )" },
        ],
        answer: "C",
      },
      {
        question: "A quina regió del Japó es troba la ciutat d'Osaka?",
        image: "/exam/friki/japan.jpg",
        options: [
          { id: "A", text: "Kantō" },
          { id: "B", text: "Chūbu" },
          { id: "C", text: "Kansai" },
          { id: "D", text: "Shikoku" },
        ],
        answer: "C",
      },
    ],
    type: "exam",
    duration: 600000, // 10 minuts
  },
  round2: {
    title: "Fase 2",
    number: "2",
    description:
      "Després de cada proba s'eliminarà al jugador amb pitjor puntuació segons la classificació global.",
    type: "stage",
  },
  punteria: {
    title: "🏹 Punteria: arc de flechas o dards",
    description:
      "<h4>🏁 Objectiu</h4><p>Aconseguir la màxima puntuació possible amb els teus llançaments.</p><h4>📌 Normes</h4><ul><li>Cada participant disposarà de 5 llançaments.</li><li>La puntuació obtinguda en cada llançament es sumarà per obtenir la puntuació final.</li><li>Un cop tots els jugadors hagin completat els seus intents, es farà el recompte de punts.</li></ul>",
    type: "text",
    reward: "TO DO",
    rewardResume: "TO DO",
  },
  choose: {
    title: "🔀 Elecció camí",
    description:
      "El destí us posa davant de dos camins. Teniu 4 minuts per deliberar i escollir-ne un. Un cop presa la decisió, no hi haurà marxa enrere. Trieu amb saviesa... o amb valentia.",
    type: "choose",
    duration: 240000, // 4 minuts
  },
  cardCasttle: {
    title: "🏰 Castell de cartes",
    description:
      "<h3>Camí de la Torre</h3><h4>🏁 Objectiu</h4><p>Construir un castell de cartes de <b>dos pisos</b> i aconseguir que es mantingui dret el més ràpid possible.</p><h4>📌 Normes</h4><ul><li>Cada participant disposarà de 7 cartes per completar la construcció.</li><li>Quan soni el xiulet, la prova començarà.</li><li>Els jugadors hauran de construir un castell de dos pisos utilitzant únicament les cartes proporcionades.</li><li>El castell només es considerarà complet quan es mantingui estable sense ajuda del jugador.</li></ul><h4>❌ Eliminacions</h4><p>Els últims 2 jugadors a completar correctament el castell quedaran eliminats de la prova.</p>",
    type: "text",
    reward: "TO DO",
    rewardResume: "TO DO",
  },
  limitDisc: {
    title: "🥌 Disc al Límit",
    description:
      "<h3>Camí de la Galaxia</h3><h4>🏁 Objectiu</h4><p>Llançar el disc tan a prop de la línia objectiu com sigui possible, sense sobrepassar-la.</p><h4>📌 Normes</h4><ul><li>Cada participant disposarà d'un llançament.</li><li>L'objectiu és deixar el disc el més a prop possible de la línia marcada.</li><li>Si un jugador sobrepassa la línia, quedarà en risc d'eliminació.</li><li>Un cop tots els participants hagin realitzat el seu llançament, es compararan les distàncies respecte a la línia objectiu.</li></ul><h4>❌ Eliminacions</h4><p>Els 2 jugadors que hagin deixat el disc més lluny de la línia objectiu quedaran eliminats de la prova.</p>",
    type: "text",
    reward: "TO DO",
    rewardResume: "TO DO",
  },
  votation2: {
    title: "📊 Votació favorit",
    description:
      "Escull el teu jugador favorit. Clica sobre seu i apreta el boto per votar abans de que s'acabi el temps. (Si algú aconsegueix 10 vots o més obtindrà una carta de aventatge)",
    type: "votation",
    duration: 360000, // 6 minuts
  },
  stagetodo: {
    title: "??",
    description: "TO DO",
    type: "text",
    reward: "TO DO",
    rewardResume: "TO DO",
  },
  roundRepesca: {
    title: "Fase Repesca",
    description:
      "El millor jugador de la repesca tornarà a entrar al joc i obtindrà un privilegi especial.",
    number: "REPESCA",
    type: "stage",
  },
  bolos: {
    title: "🎳 Bitlles (Repesca)",
    description:
      "<h4>🏁 Objectiu</h4><p>Derribar el màxim nombre de bitlles possible per tornar a entrar al joc.</p><h4>📌 Normes</h4><ul><li>Només podran participar en aquesta prova els jugadors eliminats.</li><li>Cada participant disposarà de 2 llançaments.</li><li>La puntuació final serà la suma de totes les bitlles derribades en aquests dos intents.</li><li>En cas d'empat entre els millors participants, es disputarà una ronda de desempat entre els jugadors implicats.</li></ul><h4>🏆 Resultat</h4><p>El jugador que aconsegueixi derribar més bitlles tornarà a entrar al joc com a participant actiu. A més, obtindrà un avantatge especial, que serà revelat per l'organització un cop finalitzat el joc.</p>",
    type: "text",
    reward: "TO DO",
    rewardResume: "TO DO",
  },
  round3: {
    title: "Fase 3",
    description:
      "Elimina als pitjors jugadors despres de cada proba sense importar la puntuació.",
    number: "3",
    type: "stage",
  },
  golf: {
    title: "⛳️ Mini golf",
    description:
      "<h4>🏁 Objectiu</h4><p>Aconseguir introduir la pilota al forat amb el menor nombre de cops possible.</p><h4>📌 Normes</h4><ul><li>Tots els participants completaran el recorregut establert.</li><li>Cada cop realitzat comptarà per a la puntuació final.</li><li>Guanyarà el jugador que necessiti menys cops per completar la prova.</li></ul><h4>❌ Desempat</h4><p>Si hi ha un empat entre els jugadors amb pitjor puntuació, es disputarà una segona ronda de desempat exclusivament entre aquests participants.</p>",
    reward: "TO DO",
    rewardResume: "TO DO",
    type: "text",
  },
  maduixes: {
    title: "🍓 Fresi Fest",
    description:
      "<h4>🏁 Objectiu</h4><p>Aconseguir mantenir el màxim nombre de maduixes dins la boca sense deixar-ne caure cap.</p><h4>📌 Normes</h4><ul><li>Tots els participants jugaran al mateix temps.</li><li>Els jugadors hauran d'anar introduint una maduixa cada vegada dins la boca.</li><li>No estarà permès mastegar ni empassar-se les maduixes durant la prova.</li><li>El repte continuarà fins que un jugador:</li><ul><li>no pugui introduir una nova maduixa a la boca, o bé</li><li>deixi caure a terra alguna de les maduixes que ja tenia dins.</li></ul></ul><h4>❌ Eliminacions</h4><p>Els jugador que no puguin afegir una nova maduixa o a qui li caigui una maduixa a terra quedara eliminat.</p>",
    reward: "TO DO",
    rewardResume: "TO DO",
    type: "text",
  },
  zombieDice: {
    title: "🧟‍♂️ Zombie Dice",
    description:
      "<h4>🏁 Objectiu</h4><p>Aconseguir el màxim nombre de cervells abans que un jugador arribi als 13 cervells.</p><h4>📌 Normes</h4><ul><li>En el seu torn, cada jugador seleccionarà 3 daus a cegues del recipient.</li><li>Hi ha 3 tipus de daus, amb dificultats diferents:</li><ul><li>🟢 Verd: fàcil.</li><li>🟡 Groc: dificultat intermèdia.</li><li>🔴 Vermell: difícil.</li></ul><li>Els daus poden mostrar tres resultats:</li><ul><li>🧠 Cervell: suma 1 punt.</li><li>Petjades: el supervivent ha escapat. Si el jugador decideix continuar, aquest dau es reservarà i es tornarà a llançar en la següent tirada del mateix torn.</li><li>💥 Explosió: representa un tret rebut.</li></ul><li>Després de cada tirada, el jugador podrà decidir si:</li><ul><li>Plantar-se i conservar tots els cervells aconseguits durant aquell torn.</li><li>Continuar jugant, mantenint els daus amb petjades i completant la resta fins a tenir 3 daus per a la següent tirada.</li></ul><li>Si un jugador acumula 3 explosions en un mateix torn, el seu torn finalitzarà immediatament i perdrà tots els cervells aconseguits durant aquell torn.</li><li>El joc continuarà per torns fins que un jugador aconsegueixi 13 cervells o més.</li></ul><h4>❌ Eliminacions</h4><p>Quan un jugador arribi als 13 cervells, la partida acabarà immediatament. El participant que tingui menys cervells acumulats en aquell moment quedarà eliminat.</p>",
    reward: "TO DO",
    rewardResume: "TO DO",
    type: "text",
  },
  maletines: {
    title: "🧳 Maletins Bomba",
    description:
      "<h4>🏁 Objectiu</h4><p>Evitar escollir un maletí amb bomba i convertir-te en l'últim jugador en peu.</p><h4>📌 Normes</h4><ul><li>Hi haurà un total de 10 maletins.</li><li>En cada ronda, un jugador serà l'encarregat d'escollir un maletí.</li><li>Els altres dos jugadors amagaran una bomba cadascun dins de dos maletins diferents, sense que el jugador que ha d'escollir ho pugui veure.</li><li>Els participants podran fer preguntes entre ells abans de prendre una decisió.</li><li>El jugador que hagi d'escollir disposarà d'un màxim de 2 minuts per triar un maletí.</li><li>Si el jugador escull un maletí buit, aquest es retirarà del joc i la partida continuarà amb els maletins restants.</li><li>Si el jugador escull un maletí amb una bomba, quedarà eliminat immediatament.</li><li>Quan només quedin 2 participants, el jugador que no escull serà l'encarregat d'amagar una única bomba abans de cada ronda.</li></ul><h4>❌ Eliminacions</h4><p>Qualsevol jugador que obri un maletí amb bomba quedarà eliminat de la prova.</p>",
    reward: "TO DO",
    rewardResume: "TO DO",
    type: "text",
  },
  winner: {
    title: "🏆 Guanyador",
    description: "Felicitats! Has guanyat!",
    type: "winner",
  },
  gameOver: {
    title: "The End",
    description:
      "<p>Gràcies per haver format part d'aquesta aventura un any més. Veure-us gaudir, competir i compartir aquest dia ha fet que tot l'esforç hagi valgut la pena.</p><p>Esperem que us ho hagueu passat tan bé com nosaltres preparant-ho. Gràcies per les rialles, pels moments èpics i, sobretot, per fer dels VikingGames un dia tan especial.</p><p>Ara toca descansar, recuperar forces i recordar les gestes d'aquesta edició.</p><p>Fins a la propera edició! ❤️🪓</p></br><h3><b>🔥🍻⚔️ Ens veiem al Valhalla! ⚔️🍻🔥</b></h3>",
    type: "text",
  },
};
