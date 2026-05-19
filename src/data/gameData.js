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

export const PALABRAS = [
  { id:1,  hebreo:'כֶּלֶב',    español:'Perro',    emoji:'🐶', categoria:'animales' },
  { id:2,  hebreo:'חָתוּל',    español:'Gato',     emoji:'🐱', categoria:'animales' },
  { id:3,  hebreo:'דָּג',       español:'Pez',      emoji:'🐟', categoria:'animales' },
  { id:4,  hebreo:'צִפּוֹר',   español:'Pájaro',   emoji:'🐦', categoria:'animales' },
  { id:5,  hebreo:'אַרְיֵה',   español:'León',     emoji:'🦁', categoria:'animales' },
  { id:6,  hebreo:'פִּיל',     español:'Elefante', emoji:'🐘', categoria:'animales' },
  { id:7,  hebreo:'אָדוֹם',    español:'Rojo',     emoji:'🔴', categoria:'colores'  },
  { id:8,  hebreo:'כָּחוֹל',   español:'Azul',     emoji:'🔵', categoria:'colores'  },
  { id:9,  hebreo:'יָרֹק',     español:'Verde',    emoji:'🟢', categoria:'colores'  },
  { id:10, hebreo:'צָהֹב',     español:'Amarillo', emoji:'🟡', categoria:'colores'  },
  { id:11, hebreo:'אִמָּא',    español:'Mamá',     emoji:'👩', categoria:'familia'  },
  { id:12, hebreo:'אַבָּא',    español:'Papá',     emoji:'👨', categoria:'familia'  },
  { id:13, hebreo:'תַּפּוּחַ', español:'Manzana',  emoji:'🍎', categoria:'comida'   },
  { id:14, hebreo:'לֶחֶם',     español:'Pan',      emoji:'🍞', categoria:'comida'   },
  { id:15, hebreo:'מַיִם',     español:'Agua',     emoji:'💧', categoria:'comida'   },
  { id:16, hebreo:'חָלָב',     español:'Leche',    emoji:'🥛', categoria:'comida'   },
];

export const ORACIONES = [
  { id:1, español:'Yo quiero agua',    palabras:['אֲנִי','רוֹצֶה','מַיִם'], emojis:['👤','🤲','💧'] },
  { id:2, español:'Buenos días',       palabras:['בֹּקֶר','טוֹב'],          emojis:['🌅','😊']       },
  { id:3, español:'Yo amo a mamá',     palabras:['אֲנִי','אוֹהֵב','אִמָּא'], emojis:['👤','❤️','👩'] },
  { id:4, español:'Yo tengo hambre',   palabras:['אֲנִי','רָעֵב'],          emojis:['👤','🍽️']       },
  { id:5, español:'Muchas gracias',    palabras:['תּוֹדָה','רַבָּה'],        emojis:['🙏','💛']       },
  { id:6, español:'Buenas noches',     palabras:['לַיְלָה','טוֹב'],         emojis:['🌙','😴']       },
  { id:7, español:'Por favor',         palabras:['בְּבַקָּשָׁה'],           emojis:['🙏']            },
  { id:8, español:'Yo quiero comer',   palabras:['אֲנִי','רוֹצֶה','לֶאֱכֹל'], emojis:['👤','🤲','🍽️'] },
];

export const ESCENARIOS = [
  {
    id:1, nombre:'La Casa', emoji:'🏠', color:'#FF6B6B',
    descripcion:'Tocá los objetos de la casa',
    objetos:[
      { id:'puerta',  emoji:'🚪', hebreo:'דֶּלֶת',  español:'Puerta',  x:0.45, y:0.60 },
      { id:'ventana', emoji:'🪟', hebreo:'חַלּוֹן',  español:'Ventana', x:0.15, y:0.30 },
      { id:'cama',    emoji:'🛏️', hebreo:'מִיטָּה',  español:'Cama',    x:0.65, y:0.55 },
      { id:'silla',   emoji:'🪑', hebreo:'כִּסֵּא',  español:'Silla',   x:0.25, y:0.65 },
      { id:'libro',   emoji:'📚', hebreo:'סֵפֶר',    español:'Libro',   x:0.70, y:0.25 },
      { id:'lampara', emoji:'💡', hebreo:'מְנוֹרָה', español:'Lámpara', x:0.80, y:0.15 },
    ],
  },
  {
    id:2, nombre:'El Jardín', emoji:'🌳', color:'#06D6A0',
    descripcion:'Tocá las cosas del jardín',
    objetos:[
      { id:'arbol',    emoji:'🌳', hebreo:'עֵץ',      español:'Árbol',    x:0.20, y:0.25 },
      { id:'flor',     emoji:'🌸', hebreo:'פֶּרַח',   español:'Flor',     x:0.55, y:0.60 },
      { id:'sol',      emoji:'☀️', hebreo:'שֶׁמֶשׁ',  español:'Sol',      x:0.75, y:0.10 },
      { id:'nube',     emoji:'☁️', hebreo:'עָנָן',    español:'Nube',     x:0.30, y:0.10 },
      { id:'mariposa', emoji:'🦋', hebreo:'פַּרְפַּר',español:'Mariposa', x:0.65, y:0.35 },
      { id:'pajaro',   emoji:'🐦', hebreo:'צִפּוֹר',  español:'Pájaro',   x:0.15, y:0.50 },
    ],
  },
  {
    id:3, nombre:'El Mercado', emoji:'🛒', color:'#F77F00',
    descripcion:'Tocá la comida del mercado',
    objetos:[
      { id:'manzana', emoji:'🍎', hebreo:'תַּפּוּחַ', español:'Manzana', x:0.20, y:0.40 },
      { id:'pan',     emoji:'🍞', hebreo:'לֶחֶם',    español:'Pan',     x:0.50, y:0.55 },
      { id:'uva',     emoji:'🍇', hebreo:'עֵנָב',    español:'Uva',     x:0.75, y:0.35 },
      { id:'naranja', emoji:'🍊', hebreo:'תַּפּוּז',  español:'Naranja', x:0.35, y:0.65 },
      { id:'leche',   emoji:'🥛', hebreo:'חָלָב',    español:'Leche',   x:0.65, y:0.65 },
      { id:'huevo',   emoji:'🥚', hebreo:'בֵּיצָה',  español:'Huevo',   x:0.15, y:0.65 },
    ],
  },
];
