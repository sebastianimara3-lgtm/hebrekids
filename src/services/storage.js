// src/services/storage.js
import AsyncStorage from '@react-native-async-storage/async-storage';

const CLAVES = {
  PROGRESO: 'hebrekids_progreso',
  RACHA:    'hebrekids_racha',
  MASCOTA:  'hebrekids_mascota',
  CONFIG:   'hebrekids_config',
};

const PROGRESO_INICIAL = {
  nivel1: { desbloqueado: true,  completado: false, estrellas: 0, puntos: 0 },
  nivel2: { desbloqueado: false, completado: false, estrellas: 0, puntos: 0 },
  nivel3: { desbloqueado: false, completado: false, estrellas: 0, puntos: 0 },
  nivel4: { desbloqueado: false, completado: false, estrellas: 0, puntos: 0 },
  puntosTotal: 0,
};

const RACHA_INICIAL    = { diasConsecutivos: 0, ultimoDia: null, rachaMaxima: 0 };
const MASCOTA_INICIAL  = { nivel: 1, nombre: 'Kochav', xp: 0 };
const CONFIG_INICIAL   = { volumenMusica: 0.35, volumenSFX: 0.9, haptics: true };

const leer = async (clave, def) => {
  try {
    const raw = await AsyncStorage.getItem(clave);
    return raw !== null ? JSON.parse(raw) : def;
  } catch { return def; }
};

const guardar = async (clave, valor) => {
  try { await AsyncStorage.setItem(clave, JSON.stringify(valor)); return true; }
  catch { return false; }
};

export const cargarProgreso = () => leer(CLAVES.PROGRESO, PROGRESO_INICIAL);

export const actualizarNivel = async (nivelKey, datos) => {
  const p = await cargarProgreso();
  p[nivelKey] = {
    ...p[nivelKey], ...datos,
    puntos:    Math.max(p[nivelKey].puntos,    datos.puntos    || 0),
    estrellas: Math.max(p[nivelKey].estrellas, datos.estrellas || 0),
  };
  p.puntosTotal = ['nivel1','nivel2','nivel3','nivel4'].reduce((a,k) => a + (p[k].puntos||0), 0);
  const sig = { nivel1:'nivel2', nivel2:'nivel3', nivel3:'nivel4' };
  if (datos.completado && sig[nivelKey]) p[sig[nivelKey]].desbloqueado = true;
  await guardar(CLAVES.PROGRESO, p);
  return p;
};

export const registrarSesionHoy = async () => {
  const r   = await leer(CLAVES.RACHA, RACHA_INICIAL);
  const hoy = new Date().toISOString().split('T')[0];
  if (r.ultimoDia === hoy) return { ...r, yaJugoHoy: true };
  const ayer = new Date(); ayer.setDate(ayer.getDate()-1);
  const ayerStr = ayer.toISOString().split('T')[0];
  const nueva = r.ultimoDia === ayerStr
    ? { diasConsecutivos: r.diasConsecutivos+1, ultimoDia: hoy, rachaMaxima: Math.max(r.rachaMaxima, r.diasConsecutivos+1) }
    : { diasConsecutivos: 1, ultimoDia: hoy, rachaMaxima: r.rachaMaxima };
  await guardar(CLAVES.RACHA, nueva);
  return nueva;
};

export const cargarRacha   = () => leer(CLAVES.RACHA,   RACHA_INICIAL);
export const cargarMascota = () => leer(CLAVES.MASCOTA, MASCOTA_INICIAL);
export const cargarConfig  = () => leer(CLAVES.CONFIG,  CONFIG_INICIAL);

export const cargarEstadoInicial = async () => {
  const [progreso, racha, mascota, config] = await Promise.all([
    cargarProgreso(), cargarRacha(), cargarMascota(), cargarConfig(),
  ]);
  return { progreso, racha, mascota, config };
};
