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

// ── NIVEL 1: Alef-Bet completo con fonética ───────────────────────
export const ALEF_BET = [
  { id:1,  letra:'א', nombre:'Alef',  fonetica:'(silenciosa)' },
  { id:2,  letra:'בּ', nombre:'Bet',   fonetica:'B'            },
  { id:3,  letra:'גּ', nombre:'Gimel', fonetica:'G'            },
  { id:4,  letra:'ד', nombre:'Dalet', fonetica:'D'            },
  { id:5,  letra:'ה', nombre:'He',    fonetica:'H'            },
  { id:6,  letra:'ו', nombre:'Vav',   fonetica:'V'            },
  { id:7,  letra:'ז', nombre:'Zayin', fonetica:'Z'            },
  { id:8,  letra:'ח', nombre:'Jet',   fonetica:'Ch'           },
  { id:9,  letra:'ט', nombre:'Tet',   fonetica:'T'            },
  { id:10, letra:'י', nombre:'Yod',   fonetica:'Y'            },
  { id:11, letra:'כּ', nombre:'Kaf',   fonetica:'K'            },
  { id:12, letra:'ל', nombre:'Lamed', fonetica:'L'            },
  { id:13, letra:'מ', nombre:'Mem',   fonetica:'M'            },
  { id:14, letra:'נ', nombre:'Nun',   fonetica:'N'            },
  { id:15, letra:'ס', nombre:'Samej', fonetica:'S'            },
  { id:16, letra:'ע', nombre:'Ayin',  fonetica:'(silenciosa)' },
  { id:17, letra:'פּ', nombre:'Pe',    fonetica:'P'            },
  { id:18, letra:'צ', nombre:'Tsadi', fonetica:'Tz'           },
  { id:19, letra:'ק', nombre:'Kuf',   fonetica:'K'            },
  { id:20, letra:'ר', nombre:'Resh',  fonetica:'R'            },
  { id:21, letra:'שׁ', nombre:'Shin',  fonetica:'Sh'           },
  { id:22, letra:'תּ', nombre:'Tav',   fonetica:'T'            },
];

// ── NIVEL 2: 44 palabras con fonética ────────────────────────────
export const PALABRAS = [
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
  { id:11, hebreo:'אָדוֹם',    fonetica:'Adóm',     español:'Rojo',      emoji:'🔴' },
  { id:12, hebreo:'כָּחוֹל',   fonetica:'Cachól',   español:'Azul',      emoji:'🔵' },
  { id:13, hebreo:'יָרֹק',     fonetica:'Yarók',    español:'Verde',     emoji:'🟢' },
  { id:14, hebreo:'צָהֹב',     fonetica:'Tzahóv',   español:'Amarillo',  emoji:'🟡' },
  { id:15, hebreo:'כָּתֹם',    fonetica:'Katóm',    español:'Naranja',   emoji:'🟠' },
  { id:16, hebreo:'סָגוֹל',    fonetica:'Sagól',    español:'Violeta',   emoji:'🟣' },
  { id:17, hebreo:'לָבָן',     fonetica:'Laván',    español:'Blanco',    emoji:'⬜' },
  { id:18, hebreo:'שָׁחוֹר',   fonetica:'Shachór',  español:'Negro',     emoji:'⬛' },
  { id:19, hebreo:'אִמָּא',    fonetica:'Imá',      español:'Mamá',      emoji:'👩' },
  { id:20, hebreo:'אַבָּא',    fonetica:'Abá',      español:'Papá',      emoji:'👨' },
  { id:21, hebreo:'אָח',       fonetica:'Ach',      español:'Hermano',   emoji:'👦' },
  { id:22, hebreo:'אָחוֹת',    fonetica:'Achót',    español:'Hermana',   emoji:'👧' },
  { id:23, hebreo:'סָבָא',     fonetica:'Sabá',     español:'Abuelo',    emoji:'👴' },
  { id:24, hebreo:'סָבְתָא',   fonetica:'Savtá',    español:'Abuela',    emoji:'👵' },
  { id:25, hebreo:'תַּפּוּחַ', fonetica:'Tapúach',  español:'Manzana',   emoji:'🍎' },
  { id:26, hebreo:'לֶחֶם',     fonetica:'Léchem',   español:'Pan',       emoji:'🍞' },
  { id:27, hebreo:'מַיִם',     fonetica:'Máyim',    español:'Agua',      emoji:'💧' },
  { id:28, hebreo:'חָלָב',     fonetica:'Chaláv',   español:'Leche',     emoji:'🥛' },
  { id:29, hebreo:'בֵּיצָה',   fonetica:'Betzá',    español:'Huevo',     emoji:'🥚' },
  { id:30, hebreo:'גֶּזֶר',    fonetica:'Gézer',    español:'Zanahoria', emoji:'🥕' },
  { id:31, hebreo:'בָּנָנָה',  fonetica:'Bananáh',  español:'Banana',    emoji:'🍌' },
  { id:32, hebreo:'עֻגָּה',    fonetica:'Ugá',      español:'Torta',     emoji:'🎂' },
  { id:33, hebreo:'יָד',       fonetica:'Yad',      español:'Mano',      emoji:'✋' },
  { id:34, hebreo:'רֶגֶל',     fonetica:'Régel',    español:'Pie',       emoji:'🦶' },
  { id:35, hebreo:'עַיִן',     fonetica:'Áyin',     español:'Ojo',       emoji:'👁️' },
  { id:36, hebreo:'אֹזֶן',     fonetica:'Ózen',     español:'Oreja',     emoji:'👂' },
  { id:37, hebreo:'אַף',       fonetica:'Af',       español:'Nariz',     emoji:'👃' },
  { id:38, hebreo:'פֶּה',      fonetica:'Pe',       español:'Boca',      emoji:'👄' },
  { id:39, hebreo:'בַּיִת',    fonetica:'Báyit',    español:'Casa',      emoji:'🏠' },
  { id:40, hebreo:'עֵץ',       fonetica:'Etz',      español:'Árbol',     emoji:'🌳' },
  { id:41, hebreo:'שֶׁמֶשׁ',   fonetica:'Shémesh',  español:'Sol',       emoji:'☀️' },
  { id:42, hebreo:'יָרֵחַ',    fonetica:'Yaréach',  español:'Luna',      emoji:'🌙' },
  { id:43, hebreo:'כּוֹכָב',   fonetica:'Cocháv',   español:'Estrella',  emoji:'⭐' },
  { id:44, hebreo:'סֵפֶר',     fonetica:'Séfer',    español:'Libro',     emoji:'📚' },
];

// ── NIVEL 3: Oraciones de 5 a 10 palabras ────────────────────────
// Todas las oraciones tienen entre 5 y 10 palabras
// Se alternan oraciones cortas (5) con largas (hasta 10)
export const ORACIONES = [
  // 5 palabras
  {
    id:1, español:'Yo quiero comer pan fresco',
    fonetica:'Aní rotzé leechól léchem tazí',
    palabras:['אֲנִי','רוֹצֶה','לֶאֱכֹל','לֶחֶם','טָרִי'],
    foneticaPal:['Aní','rotzé','leechól','léchem','tazí'],
    emojis:['👤','🤲','🍽️','🍞','✨'],
  },
  {
    id:2, español:'El perro es muy grande hoy',
    fonetica:'HaKélev hu gadól meód hayóm',
    palabras:['הַכֶּלֶב','הוּא','גָּדוֹל','מְאוֹד','הַיּוֹם'],
    foneticaPal:['HaKélev','hu','gadól','meód','hayóm'],
    emojis:['🐶','➡️','📏','💥','📅'],
  },
  {
    id:3, español:'Yo amo a mi mamá mucho',
    fonetica:'Aní ohév et imá shelí meód',
    palabras:['אֲנִי','אוֹהֵב','אֶת','אִמָּא','שֶׁלִּי'],
    foneticaPal:['Aní','ohév','et','imá','shelí'],
    emojis:['👤','❤️','🔗','👩','💛'],
  },
  {
    id:4, español:'La luna brilla en el cielo',
    fonetica:'HaYaréach zoréach bashamáyim haléyla',
    palabras:['הַיָּרֵחַ','זוֹרֵחַ','בַּשָּׁמַיִם','הַלַּיְלָה','יָפֶה'],
    foneticaPal:['HaYaréach','zoréach','bashamáyim','haléyla','yafé'],
    emojis:['🌙','✨','🌤️','🌃','😍'],
  },
  {
    id:5, español:'El gato pequeño bebe leche fría',
    fonetica:'HaChatul hakatan shotéh chaláv kar',
    palabras:['הַחָתוּל','הַקָּטָן','שׁוֹתֶה','חָלָב','קַר'],
    foneticaPal:['HaChatul','hakatan','shotéh','chaláv','kar'],
    emojis:['🐱','🤏','🥤','🥛','❄️'],
  },
  // 6 palabras
  {
    id:6, español:'Yo quiero jugar con mi perro hoy',
    fonetica:'Aní rotzé lesachék im haKélev shelí',
    palabras:['אֲנִי','רוֹצֶה','לְשַׂחֵק','עִם','הַכֶּלֶב','שֶׁלִּי'],
    foneticaPal:['Aní','rotzé','lesachék','im','haKélev','shelí'],
    emojis:['👤','🤲','🎮','🤝','🐶','💛'],
  },
  {
    id:7, español:'El sol amarillo brilla mucho hoy',
    fonetica:'HaShémesh hatzehubá zoráachat meód hayóm',
    palabras:['הַשֶּׁמֶשׁ','הַצְּהֻבָּה','זוֹרַחַת','מְאוֹד','הַיּוֹם','בַּשָּׁמַיִם'],
    foneticaPal:['HaShémesh','hatzehubá','zoráachat','meód','hayóm','bashamáyim'],
    emojis:['☀️','🟡','✨','💥','📅','🌤️'],
  },
  {
    id:8, español:'Mi abuela hace un pan muy rico',
    fonetica:'HaSavtá shelí osa léchem tov meód',
    palabras:['הַסָּבְתָּא','שֶׁלִּי','עוֹשָׂה','לֶחֶם','טוֹב','מְאוֹד'],
    foneticaPal:['HaSavtá','shelí','osá','léchem','tov','meód'],
    emojis:['👵','💛','👩‍🍳','🍞','😊','💥'],
  },
  // 7 palabras
  {
    id:9, español:'Yo quiero beber agua fría con mi papá',
    fonetica:'Aní rotzé lishtót máyim kar im abá',
    palabras:['אֲנִי','רוֹצֶה','לִשְׁתּוֹת','מַיִם','קַר','עִם','אַבָּא'],
    foneticaPal:['Aní','rotzé','lishtót','máyim','kar','im','abá'],
    emojis:['👤','🤲','🥤','💧','❄️','🤝','👨'],
  },
  {
    id:10, español:'El pájaro azul vuela muy alto en el cielo',
    fonetica:'HaTzipór hakchulá ufá meód gvohá bashamáyim',
    palabras:['הַצִּפּוֹר','הַכְּחֻלָּה','עָפָה','מְאוֹד','גְּבוֹהָה','בַּשָּׁמַיִם','הַיּוֹם'],
    foneticaPal:['HaTzipór','hakchulá','ufá','meód','gvohá','bashamáyim','hayóm'],
    emojis:['🐦','🔵','🪁','💥','⬆️','🌤️','📅'],
  },
  // 8 palabras
  {
    id:11, español:'Mi hermana pequeña ama mucho a su gato blanco',
    fonetica:'HaAchót shelí hakataná ohévet et haChatul halaván',
    palabras:['הָאָחוֹת','שֶׁלִּי','הַקְּטַנָּה','אוֹהֶבֶת','אֶת','הַחָתוּל','הַלָּבָן','מְאוֹד'],
    foneticaPal:['HaAchót','shelí','hakataná','ohévet','et','haChatul','halaván','meód'],
    emojis:['👧','💛','🤏','❤️','🔗','🐱','⬜','💥'],
  },
  {
    id:12, español:'Hoy el árbol grande tiene muchas hojas verdes',
    fonetica:'HaYóm laétz hagadól yesh harbé alím yerukím',
    palabras:['הַיּוֹם','לָעֵץ','הַגָּדוֹל','יֵשׁ','הַרְבֵּה','עָלִים','יְרֻקִּים','וְיָפִים'],
    foneticaPal:['HaYóm','laétz','hagadól','yesh','harbé','alím','yerukím','veyafím'],
    emojis:['📅','🌳','📏','➕','🍃','🍃','🟢','😍'],
  },
  // 9 palabras
  {
    id:13, español:'Yo quiero ir al parque con mi familia hoy',
    fonetica:'Aní rotzé laléchet laganpúbli im hamishpachá shelí hayóm',
    palabras:['אֲנִי','רוֹצֶה','לָלֶכֶת','לַגַּן','עִם','הַמִּשְׁפָּחָה','שֶׁלִּי','הַיּוֹם','בְּשִׂמְחָה'],
    foneticaPal:['Aní','rotzé','laléchet','laGan','im','hamishpachá','shelí','hayóm','besimchá'],
    emojis:['👤','🤲','🚶','🌳','🤝','👨‍👩‍👧‍👦','💛','📅','😊'],
  },
  {
    id:14, español:'El libro rojo de mi abuelo es muy interesante',
    fonetica:'HaSéfer haadóm shel sabá shelí hu meód meanyén',
    palabras:['הַסֵּפֶר','הָאָדוֹם','שֶׁל','הַסָּבָא','שֶׁלִּי','הוּא','מְאוֹד','מְעַנְיֵן','וְיָפֶה'],
    foneticaPal:['HaSéfer','haadóm','shel','haSabá','shelí','hu','meód','meanyén','veyafé'],
    emojis:['📚','🔴','🔗','👴','💛','➡️','💥','🤓','😍'],
  },
  // 10 palabras
  {
    id:15, español:'Mi mamá cocina pan dulce y rico para toda la familia',
    fonetica:'HaImá shelí mevashélet léchem matok vetalím lekól hamishpachá',
    palabras:['הָאִמָּא','שֶׁלִּי','מְבַשֶּׁלֶת','לֶחֶם','מָתוֹק','וְטָעִים','לְכָל','הַמִּשְׁפָּחָה','בְּאַהֲבָה','וְשִׂמְחָה'],
    foneticaPal:['HaImá','shelí','mevashélet','léchem','matók','vetalím','lechól','hamishpachá','beahavá','vesimchá'],
    emojis:['👩','💛','👩‍🍳','🍞','🍬','😋','👥','👨‍👩‍👧‍👦','❤️','😊'],
  },
  {
    id:16, español:'El elefante grande camina lento por el bosque verde y hermoso',
    fonetica:'HaPil hagadól mehalék leát dérech hayáar hayarók veyafé',
    palabras:['הַפִּיל','הַגָּדוֹל','מְהַלֵּךְ','לְאַט','דֶּרֶךְ','הַיַּעַר','הַיָּרֹק','וְהַיָּפֶה','בְּשַׁלְוָה','וְשִׂמְחָה'],
    foneticaPal:['HaPil','hagadól','mehaléch','leát','dérech','hayáar','hayarók','vehayafé','beshalvá','vesimchá'],
    emojis:['🐘','📏','🚶','🐢','🛤️','🌲','🟢','😍','🕊️','😊'],
  },
];

// ── NIVEL 4: Preguntas conversacionales ──────────────────────────
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
      { hebreo:'אֲנִי אוֹהֵב כָּחוֹל', fonetica:'Aní ohév cachól', español:'Me gusta el azul',    correcta:true  },
      { hebreo:'הַחָתוּל קָטָן',         fonetica:'HaChatul katán',  español:'El gato es pequeño', correcta:false },
      { hebreo:'תּוֹדָה',                fonetica:'Todá',             español:'Gracias',            correcta:false },
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
