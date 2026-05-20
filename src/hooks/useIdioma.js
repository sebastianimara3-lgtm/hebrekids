// src/hooks/useIdioma.js
// Hook global que maneja los 3 modos de visualización:
// 'hebreo' → texto hebreo original
// 'fonetica' → transliteración académica
// 'espanol' → traducción al español

import { useState, useCallback } from 'react';

export const MODOS = {
  HEBREO:   'hebreo',
  FONETICA: 'fonetica',
  ESPANOL:  'espanol',
};

export function useIdioma() {
  const [modo, setModo] = useState(MODOS.HEBREO);

  const toggleTraduccion = useCallback(() => {
    setModo(m => m === MODOS.ESPANOL ? MODOS.HEBREO : MODOS.ESPANOL);
  }, []);

  const toggleFonetica = useCallback(() => {
    setModo(m => m === MODOS.FONETICA ? MODOS.HEBREO : MODOS.FONETICA);
  }, []);

  const setHebreo   = useCallback(() => setModo(MODOS.HEBREO),   []);
  const setFonetica = useCallback(() => setModo(MODOS.FONETICA), []);
  const setEspanol  = useCallback(() => setModo(MODOS.ESPANOL),  []);

  // Devuelve el texto correcto según el modo
  const getText = useCallback((hebreo, fonetica, espanol) => {
    if (modo === MODOS.FONETICA && fonetica) return fonetica;
    if (modo === MODOS.ESPANOL  && espanol)  return espanol;
    return hebreo;
  }, [modo]);

  // Etiqueta del botón de alternancia hebreo/español
  const labelToggle = modo === MODOS.ESPANOL ? 'עברית' : 'Español';

  return {
    modo,
    setModo,
    toggleTraduccion,
    toggleFonetica,
    setHebreo,
    setFonetica,
    setEspanol,
    getText,
    labelToggle,
    esFonetica: modo === MODOS.FONETICA,
    esEspanol:  modo === MODOS.ESPANOL,
    esHebreo:   modo === MODOS.HEBREO,
  };
}
