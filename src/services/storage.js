// src/services/storage.js
import AsyncStorage from '@react-native-async-storage/async-storage';

const CLAVES = { PROGRESO:'hk_progreso', RACHA:'hk_racha' };

const PROGRESO_INICIAL = {
  nivel1: { desbloqueado:true, completado:false, estrellas:0, puntos:0 },
  nivel2: { desbloqueado:true, completado:false, estrellas:0, puntos:0 },
  nivel3: { desbloqueado:true, completado:false, estrellas:0, puntos:0 },
  nivel4: { desbloqueado:true, completado:false, estrellas:0, puntos:0 },
  puntosTotal: 0,
};
const RACHA_INICIAL = { diasConsecutivos:0, ultimoDia:null, rachaMaxima:0 };

const leer   = async (c,d) => { try{const r=await AsyncStorage.getItem(c);return r!==null?JSON.parse(r):d;}catch{return d;} };
const guardar = async (c,v) => { try{await AsyncStorage.setItem(c,JSON.stringify(v));return true;}catch{return false;} };

export const cargarProgreso = () => leer(CLAVES.PROGRESO, PROGRESO_INICIAL);

export const actualizarNivel = async (key, datos) => {
  const p=await cargarProgreso();
  p[key]={...p[key],...datos,puntos:Math.max(p[key].puntos,datos.puntos||0),estrellas:Math.max(p[key].estrellas,datos.estrellas||0)};
  p.puntosTotal=['nivel1','nivel2','nivel3','nivel4'].reduce((a,k)=>a+(p[k].puntos||0),0);
  await guardar(CLAVES.PROGRESO,p);
  return p;
};

export const registrarSesionHoy = async () => {
  const r=await leer(CLAVES.RACHA,RACHA_INICIAL);
  const hoy=new Date().toISOString().split('T')[0];
  if(r.ultimoDia===hoy)return{...r,yaJugoHoy:true};
  const ay=new Date();ay.setDate(ay.getDate()-1);
  const ays=ay.toISOString().split('T')[0];
  const n=r.ultimoDia===ays?{diasConsecutivos:r.diasConsecutivos+1,ultimoDia:hoy,rachaMaxima:Math.max(r.rachaMaxima,r.diasConsecutivos+1)}:{diasConsecutivos:1,ultimoDia:hoy,rachaMaxima:r.rachaMaxima};
  await guardar(CLAVES.RACHA,n);
  return n;
};

export const cargarRacha=()=>leer(CLAVES.RACHA,RACHA_INICIAL);
export const cargarEstadoInicial=async()=>{const[p,r]=await Promise.all([cargarProgreso(),cargarRacha()]);return{progreso:p,racha:r};};
