// src/screens/Level3Screen.js — Nivel 3: Armá oraciones de 5 a 10 palabras
// La oración armada correctamente queda visible con botón "Siguiente →"
// El botón español traduce las palabras correctamente

import React, { useState, useCallback } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity,
  Alert, Platform, StatusBar, ScrollView, Dimensions,
} from 'react-native';
import Animated, {
  useSharedValue, useAnimatedStyle, withSpring, withSequence,
} from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';
import { ORACIONES } from '../data/gameData';
import { actualizarNivel } from '../services/storage';
import { useIdioma, MODOS } from '../hooks/useIdioma';
import BarraIdioma from '../components/BarraIdioma';

const { width: W } = Dimensions.get('window');
const SB_H = Platform.OS === 'android' ? (StatusBar.currentHeight || 24) : 44;
const mezclar = arr => [...arr].sort(() => Math.random() - 0.5);

// ── Bloque de palabra tocable ─────────────────────────────────────
const BloqueWord = ({ palabra, fonetica, espanol, emoji, usado, onPress, modo }) => {
  const escala = useSharedValue(1);
  const estiloAnim = useAnimatedStyle(() => ({ transform: [{ scale: escala.value }] }));

  const press = () => {
    if (usado) return;
    escala.value = withSequence(withSpring(0.88, { damping: 6 }), withSpring(1.0, { damping: 8 }));
    onPress();
  };

  // Texto del bloque según modo
  const textoBloque =
    modo === MODOS.FONETICA ? fonetica :
    modo === MODOS.ESPANOL  ? espanol  :
    palabra;

  const esLatin = modo !== MODOS.HEBREO;

  return (
    <Animated.View style={[
      styles.bloque,
      {
        opacity: usado ? 0.25 : 1,
        backgroundColor: usado ? 'rgba(255,255,255,0.03)' : 'rgba(155,93,229,0.35)',
        borderColor: usado ? 'rgba(255,255,255,0.08)' : 'rgba(192,132,252,0.7)',
      },
      estiloAnim,
    ]}>
      <TouchableOpacity onPress={press} activeOpacity={0.8} style={styles.bloqueTouch} disabled={usado}>
        <Text style={styles.bloqueEmoji}>{emoji}</Text>
        <Text style={[
          esLatin ? styles.bloqueLatin : styles.bloqueTexto,
          { color: usado ? 'rgba(255,255,255,0.25)' : '#fff' },
        ]}>
          {textoBloque}
        </Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

export default function Level3Screen({ navigation }) {
  const { modo, toggleFonetica, toggleTraduccion } = useIdioma();

  const [puntos,   setPuntos]   = useState(0);
  const [vidas,    setVidas]    = useState(3);
  const [aciertos, setAciertos] = useState(0);
  const [juegoActivo, setJuegoActivo] = useState(false);

  const [oracionActual,  setOracionActual]  = useState(null);
  const [bloquesDisp,    setBloquesDisp]    = useState([]);
  const [oracionArmada,  setOracionArmada]  = useState([]);
  const [usados,         setUsados]         = useState(new Set());
  // 'armando' | 'correcto' | 'incorrecto'
  const [estado,         setEstado]         = useState('armando');

  // Alternar entre oraciones cortas (5) y largas (hasta 10)
  const [turno, setTurno] = useState(0); // par=5pal, impar=larga

  const generarRonda = useCallback((turnoActual = turno) => {
    // Separar oraciones cortas (5 palabras) y largas (6-10)
    const cortas = ORACIONES.filter(o => o.palabras.length === 5);
    const largas  = ORACIONES.filter(o => o.palabras.length >= 6);
    const pool    = turnoActual % 2 === 0 ? cortas : largas;
    const o       = pool[Math.floor(Math.random() * pool.length)];

    setOracionActual(o);
    setBloquesDisp(mezclar(
      o.palabras.map((p, i) => ({
        palabra:     p,
        fonetica:    o.foneticaPal[i],
        espanol:     o.palabras[i], // fallback; usamos traducción por índice
        emoji:       o.emojis[i],
        indiceReal:  i,
        idBloque:    `${Date.now()}_${i}`,
      }))
    ));
    setOracionArmada([]);
    setUsados(new Set());
    setEstado('armando');
    setTurno(t => t + 1);
  }, [turno]);

  const elegirBloque = useCallback(async (bloque) => {
    if (usados.has(bloque.idBloque) || estado !== 'armando') return;

    const nueva = [...oracionArmada, bloque];
    setOracionArmada(nueva);
    setUsados(u => new Set([...u, bloque.idBloque]));

    if (nueva.length === oracionActual.palabras.length) {
      const ok = nueva.every((b, i) => b.indiceReal === i);
      if (ok) {
        await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        setEstado('correcto');
        setPuntos(p => p + 10 + oracionActual.palabras.length);
        setAciertos(a => a + 1);
        // NO pasa automáticamente. El niño toca el botón "Siguiente →"
      } else {
        await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
        setEstado('incorrecto');
        setVidas(v => {
          const nv = v - 1;
          if (nv <= 0) setTimeout(() => finalizarJuego(), 800);
          return nv;
        });
        // Resetear después de un momento para intentar de nuevo
        setTimeout(() => {
          setOracionArmada([]);
          setUsados(new Set());
          setEstado('armando');
        }, 1200);
      }
    }
  }, [oracionArmada, oracionActual, usados, estado]);

  const deshacer = () => {
    if (oracionArmada.length === 0 || estado !== 'armando') return;
    const u = oracionArmada[oracionArmada.length - 1];
    setOracionArmada(oracionArmada.slice(0, -1));
    setUsados(s => { const n = new Set(s); n.delete(u.idBloque); return n; });
  };

  const siguienteOracion = () => {
    generarRonda(turno);
  };

  const finalizarJuego = useCallback(async () => {
    setJuegoActivo(false);
    const estrellas = puntos >= 60 ? 3 : puntos >= 30 ? 2 : puntos > 0 ? 1 : 0;
    await actualizarNivel('nivel3', { puntos, estrellas, completado: puntos >= 30 });
    Alert.alert('¡Nivel 3! 💬', `Puntos: ${puntos}\nOraciones: ${aciertos}`, [
      { text: '¡Otra vez!', onPress: iniciarJuego },
      { text: 'Volver',     onPress: () => navigation.goBack() },
    ]);
  }, [puntos, aciertos, navigation]);

  const iniciarJuego = () => {
    setPuntos(0); setVidas(3); setAciertos(0); setTurno(0);
    setJuegoActivo(true);
    generarRonda(0);
  };

  // Texto de referencia de la oración según modo
  const textoTraduccion =
    modo === MODOS.FONETICA && oracionActual ? oracionActual.fonetica :
    oracionActual?.español;

  // Texto de una palabra armada según modo
  const textoBloquePalabra = (b) =>
    modo === MODOS.FONETICA ? b.fonetica :
    modo === MODOS.ESPANOL  ? b.espanol  :
    b.palabra;

  const esLatinBloques = modo !== MODOS.HEBREO;

  return (
    <View style={styles.contenedor}>
      <View style={{ height: SB_H }} />
      <View style={styles.hud}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.btnVolver}>
          <Text style={styles.btnVolverTexto}>← Volver</Text>
        </TouchableOpacity>
        <View style={styles.vidasRow}>
          {[1,2,3].map(i => <Text key={i} style={{ fontSize: 24, opacity: i<=vidas?1:0.25 }}>❤️</Text>)}
        </View>
        <View style={styles.puntosWrap}>
          <Text style={styles.puntosLabel}>PTS</Text>
          <Text style={styles.puntosValor}>{puntos}</Text>
        </View>
      </View>

      <BarraIdioma modo={modo} onFonetica={toggleFonetica} onToggle={toggleTraduccion} />

      {juegoActivo && oracionActual ? (
        <ScrollView style={{ flex: 1 }} contentContainerStyle={styles.areaJuego} keyboardShouldPersistTaps="always">

          {/* Indicador de tipo de oración */}
          <View style={styles.tipoBadge}>
            <Text style={styles.tipoTexto}>
              {oracionActual.palabras.length === 5 ? '⭐ Corta (5 palabras)' : `⭐⭐ Larga (${oracionActual.palabras.length} palabras)`}
            </Text>
          </View>

          {/* Oración a traducir */}
          <View style={styles.traduccionWrap}>
            <Text style={styles.traduccionLabel}>¿Cómo se dice en hebreo?</Text>
            <Text style={styles.traduccion}>"{textoTraduccion}"</Text>
          </View>

          {/* Zona de armado */}
          <View style={[
            styles.zonaArmado,
            estado === 'correcto'   && { borderColor: '#4ECDC4', backgroundColor: 'rgba(78,205,196,0.08)' },
            estado === 'incorrecto' && { borderColor: '#FF6B6B', backgroundColor: 'rgba(255,107,107,0.08)' },
          ]}>
            <Text style={styles.zonaLabel}>Tu oración (derecha → izquierda):</Text>

            {/* RTL: row-reverse para hebreo */}
            <View style={esLatinBloques ? styles.oracionLTR : styles.oracionRTL}>
              {oracionArmada.length === 0
                ? <Text style={styles.placeholder}>Tocá las palabras de abajo ↓</Text>
                : oracionArmada.map((b, i) => (
                    <View key={i} style={styles.palabraArmada}>
                      <Text style={styles.palabraArmadaEmoji}>{b.emoji}</Text>
                      <Text style={esLatinBloques ? styles.palabraArmadaLatin : styles.palabraArmadaTexto}>
                        {textoBloquePalabra(b)}
                      </Text>
                    </View>
                  ))
              }
            </View>

            {/* Feedback */}
            {estado === 'correcto' && (
              <Text style={styles.feedbackOk}>
                ¡Perfecto! 🎉 +{10 + oracionActual.palabras.length} pts
              </Text>
            )}
            {estado === 'incorrecto' && (
              <Text style={styles.feedbackError}>¡El orden no era ese! 😅</Text>
            )}

            {/* Botón deshacer (solo mientras arma) */}
            {oracionArmada.length > 0 && estado === 'armando' && (
              <TouchableOpacity onPress={deshacer} style={styles.btnDeshacer}>
                <Text style={styles.btnDeshacerTexto}>↩ Deshacer</Text>
              </TouchableOpacity>
            )}

            {/* Botón siguiente (solo cuando acertó) */}
            {estado === 'correcto' && (
              <TouchableOpacity onPress={siguienteOracion} style={styles.btnSiguiente}>
                <Text style={styles.btnSiguienteTexto}>Siguiente oración →</Text>
              </TouchableOpacity>
            )}
          </View>

          {/* Referencia de la oración correcta (cuando acertó) */}
          {estado === 'correcto' && (
            <View style={styles.referenciaWrap}>
              <Text style={styles.referenciaLabel}>La oración en hebreo:</Text>
              <Text style={styles.referenciaTexto}>{oracionActual.palabras.join(' ')}</Text>
              <Text style={styles.referenciaFonetica}>{oracionActual.fonetica}</Text>
              <Text style={styles.referenciaEspanol}>{oracionActual.español}</Text>
            </View>
          )}

          {/* Bloques disponibles (se ocultan cuando acertó) */}
          {estado !== 'correcto' && (
            <View style={styles.bloquesWrap}>
              <Text style={styles.bloquesLabel}>Tocá en el orden correcto:</Text>
              <View style={styles.bloquesGrid}>
                {bloquesDisp.map(b => (
                  <BloqueWord
                    key={b.idBloque}
                    palabra={b.palabra}
                    fonetica={b.fonetica}
                    espanol={b.espanol}
                    emoji={b.emoji}
                    usado={usados.has(b.idBloque)}
                    modo={modo}
                    onPress={() => elegirBloque(b)}
                  />
                ))}
              </View>
            </View>
          )}

        </ScrollView>
      ) : (
        <View style={styles.pantallaInicio}>
          <Text style={styles.inicioEmoji}>💬</Text>
          <Text style={styles.inicioTitulo}>מִשְׁפָּטִים</Text>
          <Text style={styles.inicioSubtitulo}>¡Armá oraciones!</Text>
          <Text style={styles.inicioDesc}>
            Oraciones de 5 palabras alternadas con oraciones de hasta 10 palabras.
            Cuando acertás, la oración queda visible y vos elegís cuándo pasar a la siguiente.
          </Text>
          <TouchableOpacity style={styles.botonJugar} onPress={iniciarJuego}>
            <Text style={styles.botonJugarTexto}>¡JUGAR! 🚀</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: { flex: 1, backgroundColor: '#3d0066' },
  hud: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 12, backgroundColor: 'rgba(0,0,0,0.35)' },
  btnVolver: { padding: 8 }, btnVolverTexto: { color: 'rgba(255,255,255,0.8)', fontSize: 16, fontWeight: '700' },
  vidasRow: { flexDirection: 'row', gap: 4 },
  puntosWrap: { alignItems: 'flex-end' },
  puntosLabel: { color: 'rgba(255,255,255,0.5)', fontSize: 11, fontWeight: '800', letterSpacing: 1 },
  puntosValor: { color: '#FFE566', fontSize: 28, fontWeight: '900' },
  areaJuego: { padding: 14, gap: 12, paddingBottom: 30 },
  tipoBadge: { alignItems: 'center' },
  tipoTexto: { color: '#c084fc', fontSize: 14, fontWeight: '700' },
  traduccionWrap: { backgroundColor: 'rgba(255,255,255,0.08)', borderRadius: 14, padding: 14, alignItems: 'center' },
  traduccionLabel: { color: 'rgba(255,255,255,0.5)', fontSize: 12, fontWeight: '700', letterSpacing: 1, textTransform: 'uppercase' },
  traduccion: { color: '#FFE566', fontSize: 20, fontWeight: '900', textAlign: 'center', marginTop: 4 },
  zonaArmado: { backgroundColor: 'rgba(255,255,255,0.06)', borderRadius: 14, padding: 14, borderWidth: 2, borderColor: 'rgba(255,255,255,0.15)', gap: 10 },
  zonaLabel: { color: 'rgba(255,255,255,0.5)', fontSize: 12, fontWeight: '700', letterSpacing: 1, textTransform: 'uppercase' },
  // RTL para hebreo, LTR para fonética/español
  oracionRTL: { flexDirection: 'row-reverse', flexWrap: 'wrap', gap: 8, minHeight: 55, alignItems: 'center', justifyContent: 'flex-start' },
  oracionLTR: { flexDirection: 'row',         flexWrap: 'wrap', gap: 8, minHeight: 55, alignItems: 'center', justifyContent: 'flex-start' },
  placeholder: { color: 'rgba(255,255,255,0.3)', fontSize: 14, fontStyle: 'italic' },
  palabraArmada: { backgroundColor: 'rgba(155,93,229,0.55)', borderRadius: 10, paddingHorizontal: 10, paddingVertical: 6, alignItems: 'center' },
  palabraArmadaEmoji: { fontSize: 18 },
  palabraArmadaTexto: { color: '#fff', fontSize: 17, fontWeight: '900', writingDirection: 'rtl' },
  palabraArmadaLatin: { color: '#fff', fontSize: 14, fontWeight: '900', textAlign: 'center' },
  feedbackOk: { color: '#4ECDC4', fontSize: 17, fontWeight: '900', textAlign: 'center' },
  feedbackError: { color: '#FF6B6B', fontSize: 17, fontWeight: '900', textAlign: 'center' },
  btnDeshacer: { alignSelf: 'flex-end', padding: 6 },
  btnDeshacerTexto: { color: 'rgba(255,255,255,0.5)', fontSize: 13, fontWeight: '700' },
  btnSiguiente: { backgroundColor: '#4ECDC4', borderRadius: 14, paddingVertical: 12, paddingHorizontal: 24, alignItems: 'center', elevation: 6 },
  btnSiguienteTexto: { color: '#1a1060', fontSize: 18, fontWeight: '900' },
  referenciaWrap: { backgroundColor: 'rgba(78,205,196,0.12)', borderRadius: 14, padding: 14, alignItems: 'center', gap: 4, borderWidth: 1, borderColor: 'rgba(78,205,196,0.4)' },
  referenciaLabel: { color: 'rgba(255,255,255,0.5)', fontSize: 11, fontWeight: '700', letterSpacing: 1, textTransform: 'uppercase' },
  referenciaTexto: { color: '#4ECDC4', fontSize: 20, fontWeight: '900', writingDirection: 'rtl', textAlign: 'right' },
  referenciaFonetica: { color: 'rgba(78,205,196,0.7)', fontSize: 14, fontWeight: '700' },
  referenciaEspanol: { color: 'rgba(255,255,255,0.5)', fontSize: 13, fontStyle: 'italic' },
  bloquesWrap: {},
  bloquesLabel: { color: 'rgba(255,255,255,0.5)', fontSize: 12, fontWeight: '700', letterSpacing: 1, textTransform: 'uppercase', marginBottom: 10 },
  bloquesGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  bloque: { borderRadius: 12, borderWidth: 2 },
  bloqueTouch: { paddingHorizontal: 14, paddingVertical: 10, alignItems: 'center', gap: 3 },
  bloqueEmoji: { fontSize: 22 },
  bloqueTexto: { fontSize: 17, fontWeight: '900', writingDirection: 'rtl', color: '#fff' },
  bloqueLatin: { fontSize: 14, fontWeight: '900', color: '#fff', textAlign: 'center' },
  pantallaInicio: { flex: 1, justifyContent: 'center', alignItems: 'center', gap: 14, paddingHorizontal: 32 },
  inicioEmoji: { fontSize: 70 },
  inicioTitulo: { color: '#FFE566', fontSize: 52, fontWeight: '900', writingDirection: 'rtl' },
  inicioSubtitulo: { color: '#fff', fontSize: 24, fontWeight: '700', textAlign: 'center' },
  inicioDesc: { color: 'rgba(255,255,255,0.6)', fontSize: 15, textAlign: 'center', lineHeight: 22 },
  botonJugar: { backgroundColor: '#FFE566', paddingHorizontal: 52, paddingVertical: 18, borderRadius: 32, marginTop: 8, elevation: 10 },
  botonJugarTexto: { color: '#1a1060', fontSize: 26, fontWeight: '900' },
});
