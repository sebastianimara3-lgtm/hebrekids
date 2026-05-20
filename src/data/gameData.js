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

// ── NIVEL 1: Alef-Bet con fonética académica ──────────────────────
export const ALEF_BET = [
  { id:1,  letra:'א', nombre:'Alef',  fonetica:'(silenciosa)', sonido:'alef'  },
  { id:2,  letra:'בּ', nombre:'Bet',   fonetica:'B',            sonido:'bet'   },
  { id:3,  letra:'גּ', nombre:'Gimel', fonetica:'G',            sonido:'gimel' },
  { id:4,  letra:'ד', nombre:'Dalet', fonetica:'D',            sonido:'dalet' },
  { id:5,  letra:'ה', nombre:'He',    fonetica:'H',            sonido:'he'    },
  { id:6,  letra:'ו', nombre:'Vav',   fonetica:'V',            sonido:'vav'   },
  { id:7,  letra:'ז', nombre:'Zayin', fonetica:'Z',            sonido:'zayin' },
  { id:8,  letra:'ח', nombre:'Jet',   fonetica:'Ch',           sonido:'jet'   },
  { id:9,  letra:'ט', nombre:'Tet',   fonetica:'T',            sonido:'tet'   },
  { id:10, letra:'י', nombre:'Yod',   fonetica:'Y',            sonido:'yod'   },
  { id:11, letra:'כּ', nombre:'Kaf',   fonetica:'K',            sonido:'kaf'   },
  { id:12, letra:'ל', nombre:'Lamed', fonetica:'L',            sonido:'lamed' },
  { id:13, letra:'מ', nombre:'Mem',   fonetica:'M',            sonido:'mem'   },
  { id:14, letra:'נ', nombre:'Nun',   fonetica:'N',            sonido:'nun'   },
  { id:15, letra:'ס', nombre:'Samej', fonetica:'S',            sonido:'samej' },
  { id:16, letra:'ע', nombre:'Ayin',  fonetica:'(silenciosa)', sonido:'ayin'  },
  { id:17, letra:'פּ', nombre:'Pe',    fonetica:'P',            sonido:'pe'    },
  { id:18, letra:'צ', nombre:'Tsadi', fonetica:'Tz',           sonido:'tsadi' },
  { id:19, letra:'ק', nombre:'Kuf',   fonetica:'K',            sonido:'kuf'   },
  { id:20, letra:'ר', nombre:'Resh',  fonetica:'R',            sonido:'resh'  },
  { id:21, letra:'שׁ', nombre:'Shin',  fonetica:'Sh',           sonido:'shin'  },
  { id:22, letra:'תּ', nombre:'Tav',   fonetica:'T',            sonido:'tav'   },
];

// ── NIVEL 2: 44 palabras con fonética ────────────────────────────
export const PALABRAS = [
  // Animales
  { id:1,  hebreo:'כֶּלֶב',    fonetica:'Kélev',    español:'Perro',     emoji:'🐶' },
  { id:2,  hebreo:'חָתוּל',    fonetica:'Chatúl',   español:'Gato',      emoji:'🐱' },
  { id:3,  hebreo:'דָּג',       fonetica:'Dag',      español:'Pez',       emoji:'🐟' },
  { id:4,  hebreo:'צִפּוֹר',   fonetica:'Tzipór',   español:'Pájaro',    emoji:'🐦' },
  { id:5,  hebreo:'אַרְיֵה',   fonetica:'Arié',     español:'León',      emoji:'🦁' },
  { id:6,  hebreo:'פִּיל',     fonetica:'Pil',      español:'Elefante',  emoji:'🐘' },
  { id:7,  hebreo:'סוּס',      fonetica:'Sus',      español:'Caballo',   emoji:'🐴' },
  { id:8,  hebreo:'פָּרָה',    fonetica:'Pará',     español:'Vaca',      emoji:'🐄' },
  { id:9,  hebreo:'כֶּבֶשׂ',   fonetica:'Kéves',    español:'Oveja',     emoji:'🐑' },
  { id:10, hebreo:'קוֹף',      fonetica:'Kof',      español:'Mono',      emoji:'🐒' },
  // Colores
  { id:11, hebreo:'אָדוֹם',    fonetica:'Adóm',     español:'Rojo',      emoji:'🔴' },
  { id:12, hebreo:'כָּחוֹל',   fonetica:'Cachól',   español:'Azul',      emoji:'🔵' },
  { id:13, hebreo:'יָרֹק',     fonetica:'Yarók',    español:'Verde',     emoji:'🟢' },
  { id:14, hebreo:'צָהֹב',     fonetica:'Tzahóv',   español:'Amarillo',  emoji:'🟡' },
  { id:15, hebreo:'כָּתֹם',    fonetica:'Katóm',    español:'Naranja',   emoji:'🟠' },
  { id:16, hebreo:'סָגוֹל',    fonetica:'Sagól',    español:'Violeta',   emoji:'🟣' },
  { id:17, hebreo:'לָבָן',     fonetica:'Laván',    español:'Blanco',    emoji:'⬜' },
  { id:18, hebreo:'שָׁחוֹר',   fonetica:'Shachór',  español:'Negro',     emoji:'⬛' },
  // Familia
  { id:19, hebreo:'אִמָּא',    fonetica:'Imá',      español:'Mamá',      emoji:'👩' },
  { id:20, hebreo:'אַבָּא',    fonetica:'Abá',      español:'Papá',      emoji:'👨' },
  { id:21, hebreo:'אָח',       fonetica:'Ach',      español:'Hermano',   emoji:'👦' },
  { id:22, hebreo:'אָחוֹת',    fonetica:'Achót',    español:'Hermana',   emoji:'👧' },
  { id:23, hebreo:'סָבָא',     fonetica:'Sabá',     español:'Abuelo',    emoji:'👴' },
  { id:24, hebreo:'סָבְתָא',   fonetica:'Savtá',    español:'Abuela',    emoji:'👵' },
  // Comida
  { id:25, hebreo:'תַּפּוּחַ', fonetica:'Tapúach',  español:'Manzana',   emoji:'🍎' },
  { id:26, hebreo:'לֶחֶם',     fonetica:'Léchem',   español:'Pan',       emoji:'🍞' },
  { id:27, hebreo:'מַיִם',     fonetica:'Máyim',    español:'Agua',      emoji:'💧' },
  { id:28, hebreo:'חָלָב',     fonetica:'Chaláv',   español:'Leche',     emoji:'🥛' },
  { id:29, hebreo:'בֵּיצָה',   fonetica:'Betzá',    español:'Huevo',     emoji:'🥚' },
  { id:30, hebreo:'גֶּזֶר',    fonetica:'Gézer',    español:'Zanahoria', emoji:'🥕' },
  { id:31, hebreo:'בָּנָנָה',  fonetica:'Bananáh',  español:'Banana',    emoji:'🍌' },
  { id:32, hebreo:'עֻגָּה',    fonetica:'Ugá',      español:'Torta',     emoji:'🎂' },
  // Cuerpo
  { id:33, hebreo:'יָד',       fonetica:'Yad',      español:'Mano',      emoji:'✋' },
  { id:34, hebreo:'רֶגֶל',     fonetica:'Régel',    español:'Pie',       emoji:'🦶' },
  { id:35, hebreo:'עַיִן',     fonetica:'Áyin',     español:'Ojo',       emoji:'👁️' },
  { id:36, hebreo:'אֹזֶן',     fonetica:'Ózen',     español:'Oreja',     emoji:'👂' },
  { id:37, hebreo:'אַף',       fonetica:'Af',       español:'Nariz',     emoji:'👃' },
  { id:38, hebreo:'פֶּה',      fonetica:'Pe',       español:'Boca',      emoji:'👄' },
  // Cosas
  { id:39, hebreo:'בַּיִת',    fonetica:'Báyit',    español:'Casa',      emoji:'🏠' },
  { id:40, hebreo:'עֵץ',       fonetica:'Etz',      español:'Árbol',     emoji:'🌳' },
  { id:41, hebreo:'שֶׁמֶשׁ',   fonetica:'Shémesh',  español:'Sol',       emoji:'☀️' },
  { id:42, hebreo:'יָרֵחַ',    fonetica:'Yaréach',  español:'Luna',      emoji:'🌙' },
  { id:43, hebreo:'כּוֹכָב',   fonetica:'Cocháv',   español:'Estrella',  emoji:'⭐' },
  { id:44, hebreo:'סֵפֶר',     fonetica:'Séfer',    español:'Libro',     emoji:'📚' },
];

// ── NIVEL 3: Oraciones con fonética ──────────────────────────────
export const ORACIONES = [
  { id:1,  español:'Buenos días',              fonetica:'Bóker tov',                        palabras:['בֹּקֶר','טוֹב'],                   foneticaPal:['Bóker','tov'],                   emojis:['🌅','😊'],           dificultad:1 },
  { id:2,  español:'Buenas noches',            fonetica:'Láyla tov',                        palabras:['לַיְלָה','טוֹב'],                  foneticaPal:['Láyla','tov'],                   emojis:['🌙','😴'],           dificultad:1 },
  { id:3,  español:'Muchas gracias',           fonetica:'Todá rabá',                        palabras:['תּוֹדָה','רַבָּה'],                 foneticaPal:['Todá','rabá'],                   emojis:['🙏','💛'],           dificultad:1 },
  { id:4,  español:'Por favor',                fonetica:'Bevakashá',                        palabras:['בְּבַקָּשָׁה','תּוֹדָה'],           foneticaPal:['Bevakashá','todá'],              emojis:['🙏','😊'],           dificultad:1 },
  { id:5,  español:'Yo quiero agua',           fonetica:'Aní rotzé máyim',                  palabras:['אֲנִי','רוֹצֶה','מַיִם'],          foneticaPal:['Aní','rotzé','máyim'],           emojis:['👤','🤲','💧'],      dificultad:2 },
  { id:6,  español:'Yo amo a mamá',            fonetica:'Aní ohév imá',                     palabras:['אֲנִי','אוֹהֵב','אִמָּא'],         foneticaPal:['Aní','ohév','imá'],              emojis:['👤','❤️','👩'],      dificultad:2 },
  { id:7,  español:'Yo tengo hambre',          fonetica:'Aní raév meód',                    palabras:['אֲנִי','רָעֵב','מְאוֹד'],          foneticaPal:['Aní','raév','meód'],             emojis:['👤','🍽️','💥'],      dificultad:2 },
  { id:8,  español:'El gato es grande',        fonetica:'HaChatul hu gadól',                palabras:['הַחָתוּל','הוּא','גָּדוֹל'],       foneticaPal:['HaChatul','hu','gadól'],         emojis:['🐱','➡️','📏'],      dificultad:2 },
  { id:9,  español:'La manzana es roja',       fonetica:'HaTapúach hu adóm',                palabras:['הַתַּפּוּחַ','הוּא','אָדוֹם'],      foneticaPal:['HaTapúach','hu','adóm'],         emojis:['🍎','➡️','🔴'],      dificultad:2 },
  { id:10, español:'Yo quiero dormir',         fonetica:'Aní rotzé lishón',                 palabras:['אֲנִי','רוֹצֶה','לִישֹׁן'],        foneticaPal:['Aní','rotzé','lishón'],          emojis:['👤','🤲','😴'],      dificultad:2 },
  { id:11, español:'Yo quiero comer pan',      fonetica:'Aní rotzé leechól léchem',         palabras:['אֲנִי','רוֹצֶה','לֶאֱכֹל','לֶחֶם'],foneticaPal:['Aní','rotzé','leechól','léchem'],emojis:['👤','🤲','🍽️','🍞'], dificultad:3 },
  { id:12, español:'El perro es muy grande',   fonetica:'HaKélev hu gadól meód',            palabras:['הַכֶּלֶב','הוּא','גָּדוֹל','מְאוֹד'],foneticaPal:['HaKélev','hu','gadól','meód'], emojis:['🐶','➡️','📏','💥'], dificultad:3 },
  { id:13, español:'Yo amo a mi papá',         fonetica:'Aní ohév et abá',                  palabras:['אֲנִי','אוֹהֵב','אֶת','אַבָּא'],   foneticaPal:['Aní','ohév','et','abá'],         emojis:['👤','❤️','🔗','👨'], dificultad:3 },
  { id:14, español:'La luna es muy linda',     fonetica:'HaYaréach hu yafé meód',           palabras:['הַיָּרֵחַ','הוּא','יָפֶה','מְאוֹד'],foneticaPal:['HaYaréach','hu','yafé','meód'], emojis:['🌙','➡️','😍','💥'], dificultad:3 },
  { id:15, español:'Yo quiero beber leche fría',fonetica:'Aní rotzé lishtót chaláv kar',    palabras:['אֲנִי','רוֹצֶה','לִשְׁתּוֹת','חָלָב','קַר'],foneticaPal:['Aní','rotzé','lishtót','chaláv','kar'],emojis:['👤','🤲','🥤','🥛','❄️'],dificultad:4 },
  { id:16, español:'El sol brilla en el cielo',fonetica:'HaShémesh zoráachat bashamáyim',   palabras:['הַשֶּׁמֶשׁ','זוֹרַחַת','בַּ','שָּׁמַיִם','הַיּוֹם'],foneticaPal:['HaShémesh','zoráachat','ba','shamáyim','hayóm'],emojis:['☀️','✨','🔗','🌤️','📅'],dificultad:4 },
  { id:17, español:'Yo quiero jugar con mi perro',fonetica:'Aní rotzé lesachék im haKélev shelí',palabras:['אֲנִי','רוֹצֶה','לְשַׂחֵק','עִם','הַכֶּלֶב','שֶׁלִּי'],foneticaPal:['Aní','rotzé','lesachék','im','haKélev','shelí'],emojis:['👤','🤲','🎮','🤝','🐶','💛'],dificultad:5 },
  { id:18, español:'Hoy es un día muy bueno',  fonetica:'HaYóm hu yom tov meód veyafé',     palabras:['הַיּוֹם','הוּא','יוֹם','טוֹב','מְאוֹד','וְיָפֶה'],foneticaPal:['HaYóm','hu','yom','tov','meód','veyafé'],emojis:['📅','➡️','🗓️','😊','💥','😍'],dificultad:5 },
];

// ── NIVEL 4: Preguntas conversacionales con fonética ─────────────
export const PREGUNTAS = [
  {
    id:1, personaje:'🦊',
    pregunta:'שָׁלוֹם! מַה שִּׁמְךָ?', foneticaP:'Shalóm! Ma shimchá?', traduccionP:'¡Hola! ¿Cómo te llamás?',
    opciones:[
      { hebreo:'שְׁמִי פַּבְלוֹ', fonetica:'Shmí Pablo',   español:'Me llamo Pablo', correcta:true  },
      { hebreo:'תּוֹדָה רַבָּה',  fonetica:'Todá rabá',    español:'Muchas gracias', correcta:false },
      { hebreo:'לַיְלָה טוֹב',   fonetica:'Láyla tov',    español:'Buenas noches',  correcta:false },
    ],
  },
  {
    id:2, personaje:'🐻',
    pregunta:'מַה שְׁלוֹמְךָ?', foneticaP:'Ma shlomchá?', traduccionP:'¿Cómo estás?',
    opciones:[
      { hebreo:'אֲנִי בְּסֵדֶר', fonetica:'Aní beséder',  español:'Estoy bien',     correcta:true  },
      { hebreo:'אֲנִי רָעֵב',    fonetica:'Aní raév',     español:'Tengo hambre',   correcta:false },
      { hebreo:'אֲנִי עָיֵף',    fonetica:'Aní ayéf',     español:'Estoy cansado',  correcta:false },
    ],
  },
  {
    id:3, personaje:'🦁',
    pregunta:'כַּמָּה שָׁנִים יֵשׁ לְךָ?', foneticaP:'Kamá shaním yesh lechá?', traduccionP:'¿Cuántos años tenés?',
    opciones:[
      { hebreo:'יֵשׁ לִי שֶׁבַע שָׁנִים', fonetica:'Yesh li shéva shaním', español:'Tengo siete años', correcta:true  },
      { hebreo:'אֲנִי גָּדוֹל',            fonetica:'Aní gadól',             español:'Soy grande',       correcta:false },
      { hebreo:'אֲנִי לֹא יוֹדֵעַ',        fonetica:'Aní lo yodéa',          español:'No sé',            correcta:false },
    ],
  },
  {
    id:4, personaje:'🐸',
    pregunta:'אֵיפֹה אַתָּה גָּר?', foneticaP:'Eifó atá gar?', traduccionP:'¿Dónde vivís?',
    opciones:[
      { hebreo:'אֲנִי גָּר בְּבַיִת', fonetica:'Aní gar bebáyit', español:'Vivo en una casa', correcta:true  },
      { hebreo:'אֲנִי אוֹהֵב',        fonetica:'Aní ohév',         español:'Yo amo',           correcta:false },
      { hebreo:'בֹּקֶר טוֹב',         fonetica:'Bóker tov',        español:'Buenos días',      correcta:false },
    ],
  },
  {
    id:5, personaje:'🦋',
    pregunta:'מָה אַתָּה אוֹהֵב לֶאֱכֹל?', foneticaP:'Ma atá ohév leechól?', traduccionP:'¿Qué te gusta comer?',
    opciones:[
      { hebreo:'אֲנִי אוֹהֵב פִּיצָּה', fonetica:'Aní ohév pitza', español:'Me gusta la pizza', correcta:true  },
      { hebreo:'אֲנִי שֹׁתֶה',          fonetica:'Aní shotéh',      español:'Yo tomo',           correcta:false },
      { hebreo:'הַבַּיִת גָּדוֹל',       fonetica:'HaBáyit gadól',   español:'La casa es grande', correcta:false },
    ],
  },
  {
    id:6, personaje:'🐼',
    pregunta:'אֵיזֶה צֶבַע אַתָּה אוֹהֵב?', foneticaP:'Eizé tzéva atá ohév?', traduccionP:'¿Qué color te gusta?',
    opciones:[
      { hebreo:'אֲנִי אוֹהֵב כָּחוֹל', fonetica:'Aní ohév cachól', español:'Me gusta el azul',      correcta:true  },
      { hebreo:'הַחָתוּל קָטָן',         fonetica:'HaChatul katán', español:'El gato es pequeño',    correcta:false },
      { hebreo:'תּוֹדָה',                fonetica:'Todá',            español:'Gracias',              correcta:false },
    ],
  },
  {
    id:7, personaje:'🦊',
    pregunta:'יֵשׁ לְךָ אַח אוֹ אָחוֹת?', foneticaP:'Yesh lechá ach o achót?', traduccionP:'¿Tenés hermano o hermana?',
    opciones:[
      { hebreo:'כֵּן, יֵשׁ לִי אָח',    fonetica:'Ken, yesh li ach', español:'Sí, tengo un hermano', correcta:true  },
      { hebreo:'אֲנִי רוֹצֶה לִישֹׁן',  fonetica:'Aní rotzé lishón', español:'Quiero dormir',        correcta:false },
      { hebreo:'הַשֶּׁמֶשׁ יָפָה',        fonetica:'HaShémesh yafá',   español:'El sol es lindo',      correcta:false },
    ],
  },
  {
    id:8, personaje:'🐻',
    pregunta:'מָה אַתָּה אוֹהֵב לַעֲשׂוֹת?', foneticaP:'Ma atá ohév laasót?', traduccionP:'¿Qué te gusta hacer?',
    opciones:[
      { hebreo:'אֲנִי אוֹהֵב לְשַׂחֵק', fonetica:'Aní ohév lesachék', español:'Me gusta jugar',      correcta:true  },
      { hebreo:'הַלַּיְלָה קַר',          fonetica:'HaLáyla kar',        español:'La noche es fría',   correcta:false },
      { hebreo:'אֲנִי רָעֵב מְאוֹד',      fonetica:'Aní raév meód',      español:'Tengo mucha hambre', correcta:false },
    ],
  },
  {
    id:9, personaje:'🦁',
    pregunta:'מִי הַחָבֵר שֶׁלְּךָ?', foneticaP:'Mi haChavér shelechá?', traduccionP:'¿Quién es tu amigo?',
    opciones:[
      { hebreo:'הַחָבֵר שֶׁלִּי הוּא דָּוִד', fonetica:'HaChavér shelí hu David', español:'Mi amigo es David', correcta:true  },
      { hebreo:'אֲנִי שׁוֹתֶה מַיִם',          fonetica:'Aní shotéh máyim',         español:'Tomo agua',        correcta:false },
      { hebreo:'הַכֶּלֶב רָץ',                   fonetica:'HaKélev rats',              español:'El perro corre',   correcta:false },
    ],
  },
  {
    id:10, personaje:'🐸',
    pregunta:'מָה הַמָּקוֹם הָאָהוּב עָלֶיךָ?', foneticaP:'Ma haMakóm haahúv alécha?', traduccionP:'¿Cuál es tu lugar favorito?',
    opciones:[
      { hebreo:'הַמָּקוֹם הָאָהוּב הוּא הַגַּן', fonetica:'HaMakóm haahúv hu haGan', español:'Mi lugar favorito es el jardín', correcta:true  },
      { hebreo:'אֲנִי עָיֵף',                      fonetica:'Aní ayéf',                 español:'Estoy cansado',                 correcta:false },
      { hebreo:'הַלֶּחֶם טָעִים',                  fonetica:'HaLéchem taím',             español:'El pan está rico',              correcta:false },
    ],
  },
];
