// src/screens/Level1Screen.js — Nivel 1: ¡Encontrá la letra en la cuadrícula!
// La letra objetivo aparece arriba. Abajo hay una cuadrícula con las 22 letras
// desordenadas. Al tocar la correcta se marca en verde y aparece la siguiente.

import React, { useState, useCallback, useEffect, useRef } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity,
  Dimensions, SafeAreaView, Alert, Platform, StatusBar, ScrollView,
} from 'react-native';
import Animated, {
  useSharedValue, useAnimatedStyle,
  withSpring, withSequence, withTiming,
} from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';
import { ALEF_BET } from '../data/gameData';
import { actualizarNivel } from '../services/storage';
import { useIdioma, MODOS } from '../hooks/useIdioma';
import BarraIdioma from '../components/BarraIdioma';

const { width: W } = Dimensions.get('window');
const SB_H = Platform.OS === 'android' ? (StatusBar.currentHeight || 24) : 44;

// Mezcla el array y lo devuelve nuevo
const mezclar = arr => [...arr].sort(() => Math.random() - 0.5);

// ── Celda de la cuadrícula ────────────────────────────────────────
const CeldaLetra = ({ item, estado, onPress, modo }) => {
  // estado: 'normal' | 'correcto' | 'incorrecto'
  const escala = useSharedValue(1);
  const estiloAnim = useAnimatedStyle(() => ({ transform: [{ scale: escala.value }] }));

  const manejarPress = () => {
    escala.value = withSequence(
      withSpring(0.85, { damping: 6 }),
      withSpring(1.0,  { damping: 8 })
    );
    onPress(item);
  };

  const bgColor =
    estado === 'correcto'   ? '#4ECDC4' :
    estado === 'incorrecto' ? '#FF6B6B' :
    'rgba(255,255,255,0.1)';

  const borderColor =
    estado === 'correcto'   ? '#4ECDC4' :
    estado === 'incorrecto' ? '#FF6B6B' :
    'rgba(255,255,255,0.2)';

  const textoMostrar =
    modo === MODOS.FONETICA ? item.fonetica :
    modo === MODOS.ESPANOL  ? item.nombre   :
    item.letra;

  const esLatin = modo !== MODOS.HEBREO;

  return (
    <Animated.View style={[styles.celda, { backgroundColor: bgColor, borderColor }, estiloAnim]}>
      <TouchableOpacity
        onPress={manejarPress}
        activeOpacity={0.8}
        style={styles.celdaTouch}
        disabled={estado === 'correcto'}
      >
        <Text style={esLatin ? styles.celdaLetraLatin : styles.celdaLetra}>
          {textoMostrar}
        </Text>
        {estado === 'correcto' && <Text style={styles.celdaCheck}>✓</Text>}
      </TouchableOpacity>
    </Animated.View>
  );
};

// ── Partículas de acierto ─────────────────────────────────────────
const Particula = ({ x, y, color, index }) => {
  const tx = useSharedValue(0), ty = useSharedValue(0);
  const opa = useSharedValue(1), esc = useSharedValue(1);
  useEffect(() => {
    const ang = (index / 10) * Math.PI * 2;
    tx.value = withTiming(Math.cos(ang) * 60, { duration: 600 });
    ty.value = withTiming(Math.sin(ang) * 60 + 80, { duration: 600 });
    opa.value = withTiming(0, { duration: 550 });
    esc.value = withTiming(0, { duration: 550 });
  }, []);
  const estilo = useAnimatedStyle(() => ({
    position: 'absolute', left: x, top: y,
    transform: [{ translateX: tx.value }, { translateY: ty.value }, { scale: esc.value }],
    opacity: opa.value,
  }));
  return <Animated.View style={[{ width: 10, height: 10, borderRadius: 5, backgroundColor: color }, estilo]} />;
};

// ── Pantalla principal ────────────────────────────────────────────
export default function Level1Screen({ navigation }) {
  const { modo, toggleFonetica, toggleTraduccion } = useIdioma();

  // Cuadrícula: las 22 letras mezcladas (orden fijo por ronda)
  const [cuadricula,    setCuadricula]    = useState([]);
  // Estados de cada celda: { [id]: 'normal'|'correcto'|'incorrecto' }
  const [estadosCeldas, setEstadosCeldas] = useState({});
  // Índice de la letra objetivo dentro del Alef-Bet ordenado
  const [idxObjetivo,   setIdxObjetivo]   = useState(0);
  // Cuántas letras encontró en la ronda actual
  const [encontradas,   setEncontradas]   = useState(0);

  const [puntos,      setPuntos]      = useState(0);
  const [errores,     setErrores]     = useState(0);
  const [juegoActivo, setJuegoActivo] = useState(false);
  const [particulas,  setParticulas]  = useState([]);

  // Animación de la letra objetivo
  const escalaObjetivo = useSharedValue(1);
  const estiloObjetivo = useAnimatedStyle(() => ({
    transform: [{ scale: escalaObjetivo.value }],
  }));

  // Letra objetivo actual
  const letraObjetivo = ALEF_BET[idxObjetivo];

  // ── Iniciar juego ─────────────────────────────────────────────
  const iniciarJuego = () => {
    const mezclada = mezclar(ALEF_BET);
    setCuadricula(mezclada);
    setEstadosCeldas(Object.fromEntries(ALEF_BET.map(l => [l.id, 'normal'])));
    setIdxObjetivo(0);
    setEncontradas(0);
    setPuntos(0);
    setErrores(0);
    setJuegoActivo(true);
  };

  // ── Al tocar una celda ────────────────────────────────────────
  const manejarToque = useCallback(async (item) => {
    if (!juegoActivo) return;
    if (estadosCeldas[item.id] === 'correcto') return;

    if (item.letra === letraObjetivo.letra) {
      // ¡ACIERTO!
      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);

      // Marcar celda como correcta
      setEstadosCeldas(prev => ({ ...prev, [item.id]: 'correcto' }));

      // Animación del objetivo
      escalaObjetivo.value = withSequence(
        withSpring(1.3, { damping: 4 }),
        withSpring(1.0, { damping: 8 })
      );

      // Partículas
      setParticulas(Array.from({ length: 10 }, (_, i) => ({
        id: `p${Date.now()}${i}`,
        x: W / 2 - 5,
        y: 160,
        color: ['#FFE566','#4ECDC4','#FF6B6B','#9B5DE5','#F77F00'][i % 5],
        index: i,
      })));
      setTimeout(() => setParticulas([]), 800);

      setPuntos(p => p + 10);
      const nuevasEncontradas = encontradas + 1;
      setEncontradas(nuevasEncontradas);

      // Si encontró todas las letras → juego terminado
      if (nuevasEncontradas >= ALEF_BET.length) {
        setTimeout(() => finalizarJuego(puntos + 10), 600);
        return;
      }

      // Avanzar a la siguiente letra objetivo
      setTimeout(() => {
        setIdxObjetivo(prev => prev + 1);
        escalaObjetivo.value = withSequence(
          withSpring(1.2, { damping: 4 }),
          withSpring(1.0, { damping: 8 })
        );
      }, 400);

    } else {
      // ERROR
      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      setErrores(e => e + 1);

      // Flash rojo momentáneo en la celda tocada
      setEstadosCeldas(prev => ({ ...prev, [item.id]: 'incorrecto' }));
      setTimeout(() => {
        setEstadosCeldas(prev => ({ ...prev, [item.id]: 'normal' }));
      }, 500);
    }
  }, [juegoActivo, estadosCeldas, letraObjetivo, encontradas, puntos]);

  // ── Finalizar juego ───────────────────────────────────────────
  const finalizarJuego = useCallback(async (puntosFinales) => {
    setJuegoActivo(false);
    const pts = puntosFinales ?? puntos;
    const estrellas = errores <= 5 ? 3 : errores <= 15 ? 2 : 1;
    await actualizarNivel('nivel1', { puntos: pts, estrellas, completado: true });
    Alert.alert(
      '¡Completaste el Alef-Bet! 🎉',
      `Encontraste las 22 letras\nPuntos: ${pts}\nErrores: ${errores}`,
      [
        { text: '¡Otra vez!', onPress: iniciarJuego },
        { text: 'Volver',     onPress: () => navigation.goBack() },
      ]
    );
  }, [puntos, errores, navigation]);

  // ── Texto del objetivo según modo ─────────────────────────────
  const textoObjetivo =
    modo === MODOS.FONETICA ? letraObjetivo?.fonetica :
    modo === MODOS.ESPANOL  ? letraObjetivo?.nombre   :
    letraObjetivo?.letra;

  const esLatinObjetivo = modo !== MODOS.HEBREO;

  return (
    <View style={styles.contenedor}>
      <View style={{ height: SB_H }} />

      {/* HUD */}
      <View style={styles.hud}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.btnVolver}>
          <Text style={styles.btnVolverTexto}>← Volver</Text>
        </TouchableOpacity>
        <View style={styles.progresoWrap}>
          <Text style={styles.progresoTexto}>{encontradas}/{ALEF_BET.length} letras</Text>
        </View>
        <View style={styles.puntosWrap}>
          <Text style={styles.puntosLabel}>PTS</Text>
          <Text style={styles.puntosValor}>{puntos}</Text>
        </View>
      </View>

      {/* Barra idioma */}
      <BarraIdioma modo={modo} onFonetica={toggleFonetica} onToggle={toggleTraduccion} />

      {juegoActivo ? (
        <>
          {/* Letra objetivo */}
          <View style={styles.objetivoWrap}>
            <Text style={styles.objetivoLabel}>¡Encontrá esta letra!</Text>
            <Animated.View style={[styles.objetivoCard, estiloObjetivo]}>
              <Text style={esLatinObjetivo ? styles.objetivoLetraLatin : styles.objetivoLetra}>
                {textoObjetivo}
              </Text>
              {modo === MODOS.HEBREO && (
                <Text style={styles.objetivoNombre}>
                  {letraObjetivo?.nombre} — {letraObjetivo?.fonetica}
                </Text>
              )}
            </Animated.View>
            {/* Barra de progreso */}
            <View style={styles.barraProgreso}>
              <View style={[styles.barraProgresoFill, { width: `${(encontradas / ALEF_BET.length) * 100}%` }]} />
            </View>
          </View>

          {/* Cuadrícula */}
          <ScrollView contentContainerStyle={styles.cuadriculaWrap} showsVerticalScrollIndicator={false}>
            <View style={styles.cuadricula}>
              {cuadricula.map(item => (
                <CeldaLetra
                  key={item.id}
                  item={item}
                  estado={estadosCeldas[item.id] || 'normal'}
                  onPress={manejarToque}
                  modo={modo}
                />
              ))}
            </View>
          </ScrollView>

          {/* Partículas */}
          {particulas.map(p => (
            <Particula key={p.id} x={p.x} y={p.y} color={p.color} index={p.index} />
          ))}
        </>
      ) : (
        // Pantalla de inicio
        <View style={styles.pantallaInicio}>
          <Text style={styles.inicioTitulo}>אָלֶף-בֵּית</Text>
          <Text style={styles.inicioSubtitulo}>¡Encontrá todas las letras! 🔍</Text>
          <Text style={styles.inicioDesc}>
            Aparece una letra arriba y tenés que encontrarla en la cuadrícula de abajo.
            ¡Las 22 letras del Alef-Bet te esperan!
          </Text>
          <TouchableOpacity style={styles.botonJugar} onPress={iniciarJuego}>
            <Text style={styles.botonJugarTexto}>¡JUGAR! 🚀</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

// Tamaño de celda: 4 columnas que entran en la pantalla
const CELDA_SIZE = Math.floor((W - 40) / 4) - 6;

const styles = StyleSheet.create({
  contenedor: { flex: 1, backgroundColor: '#1a1060' },
  hud: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 12, backgroundColor: 'rgba(0,0,0,0.35)' },
  btnVolver: { padding: 8 }, btnVolverTexto: { color: 'rgba(255,255,255,0.8)', fontSize: 16, fontWeight: '700' },
  progresoWrap: { backgroundColor: 'rgba(255,255,255,0.15)', borderRadius: 20, paddingHorizontal: 12, paddingVertical: 4 },
  progresoTexto: { color: '#fff', fontSize: 14, fontWeight: '700' },
  puntosWrap: { alignItems: 'flex-end' },
  puntosLabel: { color: 'rgba(255,255,255,0.5)', fontSize: 11, fontWeight: '800', letterSpacing: 1 },
  puntosValor: { color: '#FFE566', fontSize: 28, fontWeight: '900' },

  objetivoWrap: { alignItems: 'center', paddingVertical: 12, backgroundColor: 'rgba(0,0,0,0.2)', gap: 8 },
  objetivoLabel: { color: 'rgba(255,255,255,0.6)', fontSize: 14, fontWeight: '700', letterSpacing: 1, textTransform: 'uppercase' },
  objetivoCard: { backgroundColor: 'rgba(255,229,102,0.15)', borderRadius: 20, paddingHorizontal: 28, paddingVertical: 10, alignItems: 'center', borderWidth: 2, borderColor: 'rgba(255,229,102,0.4)' },
  objetivoLetra: { color: '#FFE566', fontSize: 72, fontWeight: '900', writingDirection: 'rtl' },
  objetivoLetraLatin: { color: '#FFE566', fontSize: 44, fontWeight: '900', textAlign: 'center' },
  objetivoNombre: { color: 'rgba(255,229,102,0.7)', fontSize: 15, fontWeight: '700', textAlign: 'center', marginTop: 2 },
  barraProgreso: { width: W * 0.8, height: 6, backgroundColor: 'rgba(255,255,255,0.15)', borderRadius: 3, overflow: 'hidden' },
  barraProgresoFill: { height: '100%', backgroundColor: '#4ECDC4', borderRadius: 3 },

  cuadriculaWrap: { paddingHorizontal: 12, paddingVertical: 12 },
  cuadricula: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, justifyContent: 'center' },

  celda: {
    width: CELDA_SIZE, height: CELDA_SIZE,
    borderRadius: 14, borderWidth: 2,
    justifyContent: 'center', alignItems: 'center',
  },
  celdaTouch: { width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center', borderRadius: 14 },
  celdaLetra: { color: '#fff', fontSize: 32, fontWeight: '900', writingDirection: 'rtl', textAlign: 'center' },
  celdaLetraLatin: { color: '#fff', fontSize: 14, fontWeight: '900', textAlign: 'center' },
  celdaCheck: { position: 'absolute', top: 2, right: 4, fontSize: 12, color: '#fff' },

  pantallaInicio: { flex: 1, justifyContent: 'center', alignItems: 'center', gap: 16, paddingHorizontal: 32 },
  inicioTitulo: { color: '#FFE566', fontSize: 60, fontWeight: '900', writingDirection: 'rtl' },
  inicioSubtitulo: { color: '#fff', fontSize: 22, fontWeight: '700', textAlign: 'center' },
  inicioDesc: { color: 'rgba(255,255,255,0.6)', fontSize: 15, textAlign: 'center', lineHeight: 22 },
  botonJugar: { backgroundColor: '#FFE566', paddingHorizontal: 52, paddingVertical: 18, borderRadius: 32, marginTop: 8, elevation: 10 },
  botonJugarTexto: { color: '#1a1060', fontSize: 26, fontWeight: '900', letterSpacing: 1 },
});
