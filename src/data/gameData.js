// src/data/gameData.js
export const COLORES_BURBUJA = [
  '#FF6B6B','#4ECDC4','#FFE566','#9B5DE5',
  '#F77F00','#F15BB5','#06D6A0','#118AB2',
];

export const NIVELES_DATA = [
  { id:1, nombre:'Alef-Bet',     hebreo:'אָלֶף-בֵּית', icono:'🔤', color:'#4ECDC4', screen:'Level1' },
  { id:2, nombre:'Palabras',     hebreo:'מִלִּים',      icono:'🧩', color:'#FFE566', screen:'Level2' },
  { id:3, nombre:'Oraciones',    hebreo:'מִשְׁפָּטִים', icono:'💬', color:'#9B5DE5', screen:'Level3' },
  { id:4, nombre:'Conversación', hebreo:'שִׂיחָה',      icono:'🎭', color:'#F77F00', screen:'Level4' },
];

export const ALEF_BET = [
  { id:1,  letra:'א', nombre:'Alef'  },
  { id:2,  letra:'בּ', nombre:'Bet'   },
  { id:3,  letra:'גּ', nombre:'Gimel' },
  { id:4,  letra:'ד', nombre:'Dalet' },
  { id:5,  letra:'ה', nombre:'He'    },
  { id:6,  letra:'ו', nombre:'Vav'   },
  { id:7,  letra:'ז', nombre:'Zayin' },
  { id:8,  letra:'ח', nombre:'Jet'   },
  { id:9,  letra:'ט', nombre:'Tet'   },
  { id:10, letra:'י', nombre:'Yod'   },
  { id:11, letra:'כּ', nombre:'Kaf'   },
  { id:12, letra:'ל', nombre:'Lamed' },
  { id:13, letra:'מ', nombre:'Mem'   },
  { id:14, letra:'נ', nombre:'Nun'   },
  { id:15, letra:'ס', nombre:'Samej' },
  { id:16, letra:'ע', nombre:'Ayin'  },
  { id:17, letra:'פּ', nombre:'Pe'    },
  { id:18, letra:'צ', nombre:'Tsadi' },
  { id:19, letra:'ק', nombre:'Kuf'   },
  { id:20, letra:'ר', nombre:'Resh'  },
  { id:21, letra:'שׁ', nombre:'Shin'  },
  { id:22, letra:'תּ', nombre:'Tav'   },
];

// ── NIVEL 2: 40+ palabras ─────────────────────────────────────────
export const PALABRAS = [
  // Animales
  { id:1,  hebreo:'כֶּלֶב',    español:'Perro',     emoji:'🐶' },
  { id:2,  hebreo:'חָתוּל',    español:'Gato',      emoji:'🐱' },
  { id:3,  hebreo:'דָּג',       español:'Pez',       emoji:'🐟' },
  { id:4,  hebreo:'צִפּוֹר',   español:'Pájaro',    emoji:'🐦' },
  { id:5,  hebreo:'אַרְיֵה',   español:'León',      emoji:'🦁' },
  { id:6,  hebreo:'פִּיל',     español:'Elefante',  emoji:'🐘' },
  { id:7,  hebreo:'סוּס',      español:'Caballo',   emoji:'🐴' },
  { id:8,  hebreo:'פָּרָה',    español:'Vaca',      emoji:'🐄' },
  { id:9,  hebreo:'כֶּבֶשׂ',   español:'Oveja',     emoji:'🐑' },
  { id:10, hebreo:'קוֹף',      español:'Mono',      emoji:'🐒' },
  // Colores
  { id:11, hebreo:'אָדוֹם',    español:'Rojo',      emoji:'🔴' },
  { id:12, hebreo:'כָּחוֹל',   español:'Azul',      emoji:'🔵' },
  { id:13, hebreo:'יָרֹק',     español:'Verde',     emoji:'🟢' },
  { id:14, hebreo:'צָהֹב',     español:'Amarillo',  emoji:'🟡' },
  { id:15, hebreo:'כָּתֹם',    español:'Naranja',   emoji:'🟠' },
  { id:16, hebreo:'סָגוֹל',    español:'Violeta',   emoji:'🟣' },
  { id:17, hebreo:'לָבָן',     español:'Blanco',    emoji:'⬜' },
  { id:18, hebreo:'שָׁחוֹר',   español:'Negro',     emoji:'⬛' },
  // Familia
  { id:19, hebreo:'אִמָּא',    español:'Mamá',      emoji:'👩' },
  { id:20, hebreo:'אַבָּא',    español:'Papá',      emoji:'👨' },
  { id:21, hebreo:'אָח',       español:'Hermano',   emoji:'👦' },
  { id:22, hebreo:'אָחוֹת',    español:'Hermana',   emoji:'👧' },
  { id:23, hebreo:'סָבָא',     español:'Abuelo',    emoji:'👴' },
  { id:24, hebreo:'סָבְתָא',   español:'Abuela',    emoji:'👵' },
  // Comida
  { id:25, hebreo:'תַּפּוּחַ', español:'Manzana',   emoji:'🍎' },
  { id:26, hebreo:'לֶחֶם',     español:'Pan',       emoji:'🍞' },
  { id:27, hebreo:'מַיִם',     español:'Agua',      emoji:'💧' },
  { id:28, hebreo:'חָלָב',     español:'Leche',     emoji:'🥛' },
  { id:29, hebreo:'בֵּיצָה',   español:'Huevo',     emoji:'🥚' },
  { id:30, hebreo:'גֶּזֶר',    español:'Zanahoria', emoji:'🥕' },
  { id:31, hebreo:'בָּנָנָה',  español:'Banana',    emoji:'🍌' },
  { id:32, hebreo:'עֻגָּה',    español:'Torta',     emoji:'🎂' },
  // Cuerpo
  { id:33, hebreo:'יָד',       español:'Mano',      emoji:'✋' },
  { id:34, hebreo:'רֶגֶל',     español:'Pie',       emoji:'🦶' },
  { id:35, hebreo:'עַיִן',     español:'Ojo',       emoji:'👁️' },
  { id:36, hebreo:'אֹזֶן',     español:'Oreja',     emoji:'👂' },
  { id:37, hebreo:'אַף',       español:'Nariz',     emoji:'👃' },
  { id:38, hebreo:'פֶּה',      español:'Boca',      emoji:'👄' },
  // Cosas
  { id:39, hebreo:'בַּיִת',    español:'Casa',      emoji:'🏠' },
  { id:40, hebreo:'עֵץ',       español:'Árbol',     emoji:'🌳' },
  { id:41, hebreo:'שֶׁמֶשׁ',   español:'Sol',       emoji:'☀️' },
  { id:42, hebreo:'יָרֵחַ',    español:'Luna',      emoji:'🌙' },
  { id:43, hebreo:'כּוֹכָב',   español:'Estrella',  emoji:'⭐' },
  { id:44, hebreo:'סֵפֶר',     español:'Libro',     emoji:'📚' },
];

// ── NIVEL 3: Oraciones de 2 a 6 palabras, ordenadas por dificultad
export const ORACIONES = [
  // 2 palabras
  { id:1,  español:'Buenos días',         palabras:['בֹּקֶר','טוֹב'],                              emojis:['🌅','😊'],             dificultad:1 },
  { id:2,  español:'Buenas noches',       palabras:['לַיְלָה','טוֹב'],                             emojis:['🌙','😴'],             dificultad:1 },
  { id:3,  español:'Muchas gracias',      palabras:['תּוֹדָה','רַבָּה'],                            emojis:['🙏','💛'],             dificultad:1 },
  { id:4,  español:'Por favor',           palabras:['בְּבַקָּשָׁה','תּוֹדָה'],                      emojis:['🙏','😊'],             dificultad:1 },
  // 3 palabras
  { id:5,  español:'Yo quiero agua',      palabras:['אֲנִי','רוֹצֶה','מַיִם'],                     emojis:['👤','🤲','💧'],        dificultad:2 },
  { id:6,  español:'Yo amo a mamá',       palabras:['אֲנִי','אוֹהֵב','אִמָּא'],                    emojis:['👤','❤️','👩'],        dificultad:2 },
  { id:7,  español:'Yo tengo hambre',     palabras:['אֲנִי','רָעֵב','מְאוֹד'],                     emojis:['👤','🍽️','💥'],        dificultad:2 },
  { id:8,  español:'El gato es grande',   palabras:['הַחָתוּל','הוּא','גָּדוֹל'],                  emojis:['🐱','➡️','📏'],        dificultad:2 },
  { id:9,  español:'La manzana es roja',  palabras:['הַתַּפּוּחַ','הוּא','אָדוֹם'],                 emojis:['🍎','➡️','🔴'],        dificultad:2 },
  { id:10, español:'Yo quiero dormir',    palabras:['אֲנִי','רוֹצֶה','לִישֹׁן'],                   emojis:['👤','🤲','😴'],        dificultad:2 },
  // 4 palabras
  { id:11, español:'Yo quiero comer pan', palabras:['אֲנִי','רוֹצֶה','לֶאֱכֹל','לֶחֶם'],           emojis:['👤','🤲','🍽️','🍞'],   dificultad:3 },
  { id:12, español:'El perro es muy grande', palabras:['הַכֶּלֶב','הוּא','גָּדוֹל','מְאוֹד'],       emojis:['🐶','➡️','📏','💥'],   dificultad:3 },
  { id:13, español:'Yo amo a mi papá',    palabras:['אֲנִי','אוֹהֵב','אֶת','אַבָּא'],              emojis:['👤','❤️','🔗','👨'],   dificultad:3 },
  { id:14, español:'La luna es muy linda',palabras:['הַיָּרֵחַ','הוּא','יָפֶה','מְאוֹד'],          emojis:['🌙','➡️','😍','💥'],   dificultad:3 },
  // 5 palabras
  { id:15, español:'Yo quiero beber leche fría', palabras:['אֲנִי','רוֹצֶה','לִשְׁתּוֹת','חָלָב','קַר'], emojis:['👤','🤲','🥤','🥛','❄️'], dificultad:4 },
  { id:16, español:'El sol brilla en el cielo',  palabras:['הַשֶּׁמֶשׁ','זוֹרַחַת','בַּ','שָּׁמַיִם','הַיּוֹם'], emojis:['☀️','✨','🔗','🌤️','📅'], dificultad:4 },
  // 6 palabras
  { id:17, español:'Yo quiero jugar con mi perro', palabras:['אֲנִי','רוֹצֶה','לְשַׂחֵק','עִם','הַכֶּלֶב','שֶׁלִּי'], emojis:['👤','🤲','🎮','🤝','🐶','💛'], dificultad:5 },
  { id:18, español:'Hoy es un día muy bueno',     palabras:['הַיּוֹם','הוּא','יוֹם','טוֹב','מְאוֹד','וְיָפֶה'],    emojis:['📅','➡️','🗓️','😊','💥','😍'], dificultad:5 },
];

// ── NIVEL 4: Preguntas con 3 opciones de respuesta ───────────────
export const PREGUNTAS = [
  // Ronda 1: Saludos básicos
  {
    id: 1,
    personaje: '🦊',
    pregunta: 'שָׁלוֹם! מַה שִּׁמְךָ?',
    traduccion: '¡Hola! ¿Cómo te llamás?',
    opciones: [
      { hebreo:'שְׁמִי פַּבְלוֹ', español:'Me llamo Pablo', correcta:true  },
      { hebreo:'תּוֹדָה רַבָּה',  español:'Muchas gracias', correcta:false },
      { hebreo:'לַיְלָה טוֹב',   español:'Buenas noches',  correcta:false },
    ],
  },
  {
    id: 2,
    personaje: '🐻',
    pregunta: 'מַה שְׁלוֹמְךָ?',
    traduccion: '¿Cómo estás?',
    opciones: [
      { hebreo:'אֲנִי בְּסֵדֶר',  español:'Estoy bien',     correcta:true  },
      { hebreo:'אֲנִי רָעֵב',     español:'Tengo hambre',   correcta:false },
      { hebreo:'אֲנִי עָיֵף',     español:'Estoy cansado',  correcta:false },
    ],
  },
  {
    id: 3,
    personaje: '🦁',
    pregunta: 'כַּמָּה שָׁנִים יֵשׁ לְךָ?',
    traduccion: '¿Cuántos años tenés?',
    opciones: [
      { hebreo:'יֵשׁ לִי שֶׁבַע שָׁנִים', español:'Tengo siete años',  correcta:true  },
      { hebreo:'אֲנִי גָּדוֹל',            español:'Soy grande',         correcta:false },
      { hebreo:'אֲנִי לֹא יוֹדֵעַ',        español:'No sé',              correcta:false },
    ],
  },
  {
    id: 4,
    personaje: '🐸',
    pregunta: 'אֵיפֹה אַתָּה גָּר?',
    traduccion: '¿Dónde vivís?',
    opciones: [
      { hebreo:'אֲנִי גָּר בְּבַיִת', español:'Vivo en una casa',  correcta:true  },
      { hebreo:'אֲנִי אוֹהֵב',         español:'Yo amo',            correcta:false },
      { hebreo:'בֹּקֶר טוֹב',          español:'Buenos días',       correcta:false },
    ],
  },
  {
    id: 5,
    personaje: '🦋',
    pregunta: 'מָה אַתָּה אוֹהֵב לֶאֱכֹל?',
    traduccion: '¿Qué te gusta comer?',
    opciones: [
      { hebreo:'אֲנִי אוֹהֵב פִּיצָּה', español:'Me gusta la pizza',   correcta:true  },
      { hebreo:'אֲנִי שֹׁתֶה',          español:'Yo tomo',             correcta:false },
      { hebreo:'הַבַּיִת גָּדוֹל',       español:'La casa es grande',   correcta:false },
    ],
  },
  {
    id: 6,
    personaje: '🐼',
    pregunta: 'אֵיזֶה צֶבַע אַתָּה אוֹהֵב?',
    traduccion: '¿Qué color te gusta?',
    opciones: [
      { hebreo:'אֲנִי אוֹהֵב כָּחוֹל', español:'Me gusta el azul',    correcta:true  },
      { hebreo:'הַחָתוּל קָטָן',         español:'El gato es pequeño', correcta:false },
      { hebreo:'תּוֹדָה',                español:'Gracias',            correcta:false },
    ],
  },
  {
    id: 7,
    personaje: '🦊',
    pregunta: 'יֵשׁ לְךָ אַח אוֹ אָחוֹת?',
    traduccion: '¿Tenés hermano o hermana?',
    opciones: [
      { hebreo:'כֵּן, יֵשׁ לִי אָח',    español:'Sí, tengo un hermano', correcta:true  },
      { hebreo:'אֲנִי רוֹצֶה לִישֹׁן',  español:'Quiero dormir',        correcta:false },
      { hebreo:'הַשֶּׁמֶשׁ יָפָה',        español:'El sol es lindo',      correcta:false },
    ],
  },
  {
    id: 8,
    personaje: '🐻',
    pregunta: 'מָה אַתָּה אוֹהֵב לַעֲשׂוֹת?',
    traduccion: '¿Qué te gusta hacer?',
    opciones: [
      { hebreo:'אֲנִי אוֹהֵב לְשַׂחֵק', español:'Me gusta jugar',     correcta:true  },
      { hebreo:'הַלַּיְלָה קַר',          español:'La noche es fría',   correcta:false },
      { hebreo:'אֲנִי רָעֵב מְאוֹד',      español:'Tengo mucha hambre', correcta:false },
    ],
  },
  {
    id: 9,
    personaje: '🦁',
    pregunta: 'מִי הַחָבֵר שֶׁלְּךָ?',
    traduccion: '¿Quién es tu amigo?',
    opciones: [
      { hebreo:'הַחָבֵר שֶׁלִּי הוּא דָּוִד', español:'Mi amigo es David',  correcta:true  },
      { hebreo:'אֲנִי שׁוֹתֶה מַיִם',          español:'Tomo agua',          correcta:false },
      { hebreo:'הַכֶּלֶב רָץ',                   español:'El perro corre',     correcta:false },
    ],
  },
  {
    id: 10,
    personaje: '🐸',
    pregunta: 'מָה הַמָּקוֹם הָאָהוּב עָלֶיךָ?',
    traduccion: '¿Cuál es tu lugar favorito?',
    opciones: [
      { hebreo:'הַמָּקוֹם הָאָהוּב הוּא הַגַּן', español:'Mi lugar favorito es el jardín', correcta:true  },
      { hebreo:'אֲנִי עָיֵף',                      español:'Estoy cansado',                 correcta:false },
      { hebreo:'הַלֶּחֶם טָעִים',                  español:'El pan está rico',              correcta:false },
    ],
  },
];
