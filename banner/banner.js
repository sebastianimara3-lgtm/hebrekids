// src/services/banner.js
// Sistema de banner remoto controlado desde Firebase
// Vos editás Firestore desde el navegador → aparece en todos los celulares

import { initializeApp, getApps } from 'firebase/app';
import { getFirestore, doc, getDoc } from 'firebase/firestore';

// ─────────────────────────────────────────────────────────────────
//  CONFIGURACIÓN DE FIREBASE
//  Obtené estos valores en:
//  https://console.firebase.google.com → tu proyecto → ⚙️ → General
//  → "Tu app" → SDK de Firebase
// ─────────────────────────────────────────────────────────────────
const FIREBASE_CONFIG = {
  apiKey:            "TU_API_KEY",
  authDomain:        "TU_PROYECTO.firebaseapp.com",
  projectId:         "TU_PROYECTO_ID",
  storageBucket:     "TU_PROYECTO.appspot.com",
  messagingSenderId: "TU_SENDER_ID",
  appId:             "TU_APP_ID",
};

// Inicializar Firebase (evitar doble inicialización)
const app = getApps().length === 0
  ? initializeApp(FIREBASE_CONFIG)
  : getApps()[0];

const db = getFirestore(app);

// ─────────────────────────────────────────────────────────────────
//  ESTRUCTURA DEL DOCUMENTO EN FIRESTORE
//
//  Colección: "config"
//  Documento: "banner"
//
//  Campos:
//  {
//    activo:         true/false        ← Encender/apagar el banner
//    tipo:           "texto" | "imagen" ← Qué mostrar
//    titulo:         "¡Novedad!"       ← Título grande
//    mensaje:        "Texto del banner" ← Mensaje principal
//    emoji:          "🎉"              ← Emoji grande (opcional)
//    imagenUrl:      "https://..."     ← URL de imagen (opcional)
//    colorFondo:     "#1a1060"         ← Color de fondo del banner
//    colorTexto:     "#FFE566"         ← Color del texto
//    botonTexto:     "Ver más"         ← Texto del botón (opcional)
//    botonUrl:       "https://..."     ← Link del botón (opcional)
//    duracionSegundos: 0               ← 0 = queda hasta que el usuario lo cierra
//  }
// ─────────────────────────────────────────────────────────────────

/**
 * Obtiene la configuración del banner desde Firestore.
 * Si hay un error de red o no existe el documento, devuelve null
 * y la app arranca normalmente sin banner.
 *
 * @returns {object|null} Configuración del banner, o null si no hay
 */
export const obtenerBanner = async () => {
  try {
    const ref  = doc(db, 'config', 'banner');
    const snap = await getDoc(ref);

    if (!snap.exists()) return null;

    const datos = snap.data();

    // Si el banner está desactivado, no mostrarlo
    if (!datos.activo) return null;

    return datos;
  } catch (error) {
    // Si no hay internet o hay error → la app funciona normal
    console.log('Banner no disponible (sin conexión o error):', error.message);
    return null;
  }
};
