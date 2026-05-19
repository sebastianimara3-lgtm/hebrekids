// src/data/alefbet.js
// Datos completos del Alef-Bet hebreo
// Los sonidos son placeholders - reemplazar con MP3s reales

export const ALEF_BET = [
  { id: 1,  letra: 'א', nombre: 'Alef',  pronunciacion: 'A' },
  { id: 2,  letra: 'בּ', nombre: 'Bet',   pronunciacion: 'B' },
  { id: 3,  letra: 'גּ', nombre: 'Gimel', pronunciacion: 'G' },
  { id: 4,  letra: 'ד', nombre: 'Dalet', pronunciacion: 'D' },
  { id: 5,  letra: 'הּ', nombre: 'He',    pronunciacion: 'H' },
  { id: 6,  letra: 'ו', nombre: 'Vav',   pronunciacion: 'V' },
  { id: 7,  letra: 'ז', nombre: 'Zayin', pronunciacion: 'Z' },
  { id: 8,  letra: 'ח', nombre: 'Jet',   pronunciacion: 'J' },
  { id: 9,  letra: 'ט', nombre: 'Tet',   pronunciacion: 'T' },
  { id: 10, letra: 'י', nombre: 'Yod',   pronunciacion: 'Y' },
  { id: 11, letra: 'כּ', nombre: 'Kaf',   pronunciacion: 'K' },
  { id: 12, letra: 'ל', nombre: 'Lamed', pronunciacion: 'L' },
  { id: 13, letra: 'מ', nombre: 'Mem',   pronunciacion: 'M' },
  { id: 14, letra: 'נ', nombre: 'Nun',   pronunciacion: 'N' },
  { id: 15, letra: 'ס', nombre: 'Samej', pronunciacion: 'S' },
  { id: 16, letra: 'ע', nombre: 'Ayin',  pronunciacion: 'A' },
  { id: 17, letra: 'פּ', nombre: 'Pe',    pronunciacion: 'P' },
  { id: 18, letra: 'צ', nombre: 'Tsadi', pronunciacion: 'TS' },
  { id: 19, letra: 'ק', nombre: 'Kuf',   pronunciacion: 'K' },
  { id: 20, letra: 'ר', nombre: 'Resh',  pronunciacion: 'R' },
  { id: 21, letra: 'שׁ', nombre: 'Shin',  pronunciacion: 'SH' },
  { id: 22, letra: 'תּ', nombre: 'Tav',   pronunciacion: 'T' },
];

export const NIVELES_DATA = [
  { id: 1, nombre: 'Alef-Bet',     hebreo: 'אָלֶף-בֵּית', icono: '🔤', color: '#4ECDC4', screen: 'Level1' },
  { id: 2, nombre: 'Palabras',     hebreo: 'מִלִּים',      icono: '🧩', color: '#FFE566', screen: 'Level2' },
  { id: 3, nombre: 'Oraciones',    hebreo: 'מִשְׁפָּטִים', icono: '💬', color: '#9B5DE5', screen: 'Level3' },
  { id: 4, nombre: 'Conversación', hebreo: 'שִׂיחָה',      icono: '🎭', color: '#F77F00', screen: 'Level4' },
];

export const COLORES_BURBUJA = [
  '#FF6B6B', '#4ECDC4', '#FFE566',
  '#9B5DE5', '#F77F00', '#F15BB5',
  '#06D6A0', '#118AB2',
];
