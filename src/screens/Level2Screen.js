// src/screens/Level2Screen.js — Nivel 2: ¡Une la palabra con la imagen!
import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, SafeAreaView, Alert } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withSpring, withTiming, withSequence } from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';
import { PALABRAS } from '../data/gameData';
import { actualizarNivel } from '../services/storage';

const { width: W } = Dimensions.get('window');

// Mezcla un array
const mezclar = arr => [...arr].sort(() => Math.random() - 0.5);

// ── Tarjeta de opción animada ─────────────────────────────────────
const Opcion = ({ item, tipo, seleccionada, correcta, incorrecta, onPress }) => {
  const escala = useSharedValue(1);
  const estiloAnim = useAnimatedStyle(() => ({ transform:[{scale:escala.value}] }));

  useEffect(() => {
    if (correcta) {
      escala.value = withSequence(withSpring(1.2,{damping:4}), withSpring(1.0,{damping:8}));
    } else if (incorrecta) {
      escala.value = withSequence(withSpring(0.85,{damping:8}), withSpring(1.0,{damping:6}));
    }
  }, [correcta, incorrecta]);

  const bgColor = correcta ? '#4ECDC4' : incorrecta ? '#FF6B6B' : seleccionada ? '#9B5DE5' : 'rgba(255,255,255,0.12)';
  const borderColor = correcta ? '#4ECDC4' : incorrecta ? '#FF6B6B' : seleccionada ? '#c084fc' : 'rgba(255,255,255,0.25)';

  return (
    <Animated.View style={[styles.opcion, {backgroundColor:bgColor, borderColor}, estiloAnim]}>
      <TouchableOpacity onPress={onPress} activeOpacity={0.85} style={styles.opcionTouch}>
        {tipo === 'imagen' ? (
          <Text style={styles.opcionEmoji}>{item.emoji}</Text>
        ) : (
          <Text style={styles.opcionHebreo}>{item.hebreo}</Text>
        )}
        {tipo === 'imagen' && <Text style={styles.opcionEspanol}>{item.español}</Text>}
      </TouchableOpacity>
    </Animated.View>
  );
};

export default function Level2Screen({ navigation }) {
  const [puntos,   setPuntos]   = useState(0);
  const [vidas,    setVidas]    = useState(3);
  const [ronda,    setRonda]    = useState(0);
  const [aciertos, setAciertos] = useState(0);
  const [juegoActivo, setJuegoActivo] = useState(false);

  // Palabras de la ronda actual (4 pares)
  const [palabrasRonda, setPalabrasRonda] = useState([]);
  // Columna izquierda (hebreo) y derecha (imágenes)
  const [colIzq,  setColIzq]  = useState([]);
  const [colDer,  setColDer]  = useState([]);
  // Selección actual
  const [selIzq,  setSelIzq]  = useState(null);
  const [selDer,  setSelDer]  = useState(null);
  // Pares ya resueltos
  const [resueltos, setResueltos] = useState(new Set());
  // Feedback visual por id
  const [correctos,   setCorrectos]   = useState(new Set());
  const [incorrectos, setIncorrectos] = useState(new Set());

  // ── Generar nueva ronda ─────────────────────────────────────────
  const generarRonda = useCallback(() => {
    const seleccion = mezclar(PALABRAS).slice(0, 4);
    setPalabrasRonda(seleccion);
    setColIzq(mezclar(seleccion));
    setColDer(mezclar(seleccion));
    setSelIzq(null); setSelDer(null);
    setResueltos(new Set());
    setCorrectos(new Set()); setIncorrectos(new Set());
    setRonda(r => r + 1);
  }, []);

  // ── Manejar selección izquierda (hebreo) ───────────────────────
  const seleccionarIzq = (item) => {
    if (resueltos.has(item.id)) return;
    setSelIzq(item);
    if (selDer) verificarPar(item, selDer);
  };

  // ── Manejar selección derecha (imagen) ─────────────────────────
  const seleccionarDer = (item) => {
    if (resueltos.has(item.id)) return;
    setSelDer(item);
    if (selIzq) verificarPar(selIzq, item);
  };

  // ── Verificar si el par es correcto ────────────────────────────
  const verificarPar = useCallback(async (izq, der) => {
    if (izq.id === der.id) {
      // ¡Correcto!
      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      setCorrectos(c => new Set([...c, izq.id]));
      setResueltos(r => {
        const nuevo = new Set([...r, izq.id]);
        // Si completó todos los pares, siguiente ronda
        if (nuevo.size >= 4) {
          setPuntos(p => p + 20);
          setAciertos(a => a + 1);
          setTimeout(() => {
            setCorrectos(new Set());
            generarRonda();
          }, 800);
        } else {
          setPuntos(p => p + 5);
        }
        return nuevo;
      });
    } else {
      // ¡Incorrecto!
      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      setIncorrectos(new Set([izq.id, der.id]));
      setVidas(v => {
        const nv = v - 1;
        if (nv <= 0) setTimeout(() => finalizarJuego(), 600);
        return nv;
      });
      setTimeout(() => setIncorrectos(new Set()), 700);
    }
    setSelIzq(null); setSelDer(null);
  }, [generarRonda]);

  // ── Finalizar ───────────────────────────────────────────────────
  const finalizarJuego = useCallback(async () => {
    setJuegoActivo(false);
    const estrellas = puntos >= 80 ? 3 : puntos >= 40 ? 2 : puntos > 0 ? 1 : 0;
    await actualizarNivel('nivel2', { puntos, estrellas, completado: puntos >= 40 });
    Alert.alert('¡Nivel 2 completado! 🧩',
      `Puntos: ${puntos}\nPares encontrados: ${aciertos * 4}`,
      [{ text:'¡Otra vez!', onPress:iniciarJuego }, { text:'Volver', onPress:()=>navigation.goBack() }]
    );
  }, [puntos, aciertos, navigation]);

  const iniciarJuego = () => {
    setPuntos(0); setVidas(3); setAciertos(0); setRonda(0);
    setJuegoActivo(true); generarRonda();
  };

  return (
    <SafeAreaView style={styles.contenedor}>
      {/* HUD */}
      <View style={styles.hud}>
        <TouchableOpacity onPress={()=>navigation.goBack()} style={styles.btnVolver}>
          <Text style={styles.btnVolverTexto}>← Volver</Text>
        </TouchableOpacity>
        <View style={styles.vidasRow}>
          {[1,2,3].map(i=><Text key={i} style={{fontSize:20,opacity:i<=vidas?1:0.3}}>❤️</Text>)}
        </View>
        <View style={styles.puntosWrap}>
          <Text style={styles.puntosLabel}>PTS</Text>
          <Text style={styles.puntosValor}>{puntos}</Text>
        </View>
      </View>

      {/* Título */}
      <View style={styles.tituloWrap}>
        <Text style={styles.tituloNivel}>🧩 Une la palabra</Text>
        <Text style={styles.subtituloNivel}>Tocá el hebreo y luego la imagen que corresponde</Text>
      </View>

      {/* Área de juego */}
      {juegoActivo ? (
        <View style={styles.areaJuego}>
          {/* Columna izquierda: palabras hebreas */}
          <View style={styles.columna}>
            {colIzq.map(item => (
              <Opcion
                key={`izq_${item.id}`}
                item={item}
                tipo="hebreo"
                seleccionada={selIzq?.id === item.id}
                correcta={correctos.has(item.id)}
                incorrecta={incorrectos.has(item.id)}
                onPress={() => !resueltos.has(item.id) && seleccionarIzq(item)}
              />
            ))}
          </View>

          {/* Línea divisoria */}
          <View style={styles.divisor}/>

          {/* Columna derecha: imágenes */}
          <View style={styles.columna}>
            {colDer.map(item => (
              <Opcion
                key={`der_${item.id}`}
                item={item}
                tipo="imagen"
                seleccionada={selDer?.id === item.id}
                correcta={correctos.has(item.id)}
                incorrecta={incorrectos.has(item.id)}
                onPress={() => !resueltos.has(item.id) && seleccionarDer(item)}
              />
            ))}
          </View>
        </View>
      ) : (
        <View style={styles.pantallaInicio}>
          <Text style={styles.inicioEmoji}>🧩</Text>
          <Text style={styles.inicioTitulo}>מִלִּים</Text>
          <Text style={styles.inicioSubtitulo}>¡Primeras palabras!</Text>
          <Text style={styles.inicioDesc}>
            Tocá la palabra en hebreo y luego la imagen que corresponde. ¡Unilas todas!
          </Text>
          <TouchableOpacity style={styles.botonJugar} onPress={iniciarJuego}>
            <Text style={styles.botonJugarTexto}>¡JUGAR! 🚀</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  contenedor:{flex:1,backgroundColor:'#2d1b8c'},
  hud:{flexDirection:'row',justifyContent:'space-between',alignItems:'center',paddingHorizontal:16,paddingVertical:10,backgroundColor:'rgba(0,0,0,0.3)'},
  btnVolver:{padding:8}, btnVolverTexto:{color:'rgba(255,255,255,0.7)',fontSize:14,fontWeight:'700'},
  vidasRow:{flexDirection:'row',gap:4},
  puntosWrap:{alignItems:'flex-end'},
  puntosLabel:{color:'rgba(255,255,255,0.5)',fontSize:10,fontWeight:'800',letterSpacing:1},
  puntosValor:{color:'#FFE566',fontSize:24,fontWeight:'900'},
  tituloWrap:{alignItems:'center',paddingVertical:14,backgroundColor:'rgba(0,0,0,0.2)'},
  tituloNivel:{color:'#FFE566',fontSize:20,fontWeight:'900'},
  subtituloNivel:{color:'rgba(255,255,255,0.6)',fontSize:12,textAlign:'center',marginTop:4,paddingHorizontal:20},
  areaJuego:{flex:1,flexDirection:'row',paddingHorizontal:12,paddingVertical:16,gap:8},
  columna:{flex:1,gap:10},
  divisor:{width:1,backgroundColor:'rgba(255,255,255,0.15)',marginVertical:8},
  opcion:{borderRadius:14,borderWidth:2,overflow:'hidden'},
  opcionTouch:{padding:12,alignItems:'center',gap:4,minHeight:70,justifyContent:'center'},
  opcionEmoji:{fontSize:32},
  opcionEspanol:{color:'rgba(255,255,255,0.8)',fontSize:11,fontWeight:'700',textAlign:'center'},
  opcionHebreo:{color:'#fff',fontSize:22,fontWeight:'900',textAlign:'center',writingDirection:'rtl'},
  pantallaInicio:{flex:1,justifyContent:'center',alignItems:'center',gap:14,paddingHorizontal:32},
  inicioEmoji:{fontSize:64},
  inicioTitulo:{color:'#FFE566',fontSize:48,fontWeight:'900',writingDirection:'rtl'},
  inicioSubtitulo:{color:'#fff',fontSize:22,fontWeight:'700',textAlign:'center'},
  inicioDesc:{color:'rgba(255,255,255,0.6)',fontSize:14,textAlign:'center',lineHeight:22},
  botonJugar:{backgroundColor:'#FFE566',paddingHorizontal:48,paddingVertical:16,borderRadius:32,marginTop:8,elevation:10},
  botonJugarTexto:{color:'#1a1060',fontSize:24,fontWeight:'900'},
});
