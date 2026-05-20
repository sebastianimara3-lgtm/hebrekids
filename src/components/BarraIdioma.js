// src/components/BarraIdioma.js
// Barra con botones de Fonética y Hebreo/Español
// Se muestra en todos los niveles

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MODOS } from '../hooks/useIdioma';

export default function BarraIdioma({ modo, onFonetica, onToggle, labelToggle }) {
  return (
    <View style={styles.barra}>
      {/* Botón fonética */}
      <TouchableOpacity
        style={[styles.btn, modo === MODOS.FONETICA && styles.btnActivo]}
        onPress={onFonetica}
        activeOpacity={0.8}
      >
        <Text style={[styles.btnTexto, modo === MODOS.FONETICA && styles.btnTextoActivo]}>
          🔤 Fonética
        </Text>
      </TouchableOpacity>

      {/* Botón hebreo ↔ español */}
      <TouchableOpacity
        style={[styles.btn, modo === MODOS.ESPANOL && styles.btnActivoVerde]}
        onPress={onToggle}
        activeOpacity={0.8}
      >
        <Text style={[styles.btnTexto, modo === MODOS.ESPANOL && styles.btnTextoActivo]}>
          {modo === MODOS.ESPANOL ? '🇮🇱 Hebreo' : '🇦🇷 Español'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  barra: {
    flexDirection: 'row',
    gap: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: 'rgba(0,0,0,0.2)',
    justifyContent: 'center',
  },
  btn: {
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 7,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderWidth: 1.5,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  btnActivo: {
    backgroundColor: 'rgba(155,93,229,0.5)',
    borderColor: '#c084fc',
  },
  btnActivoVerde: {
    backgroundColor: 'rgba(6,214,160,0.4)',
    borderColor: '#06D6A0',
  },
  btnTexto: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 13,
    fontWeight: '700',
  },
  btnTextoActivo: {
    color: '#fff',
  },
});
