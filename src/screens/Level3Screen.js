// src/screens/Level3Screen.js — Nivel 3: ¡Armá la oración!
// El niño toca bloques en el orden correcto para armar la oración
import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, SafeAreaView, Alert } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withSpring, withSequence, withTiming } from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';
import { ORACIONES } from '../data/gameData';
import { actualizarNivel } from '../services/storage';

const { width: W } = Dimensions.get('window');
const mezclar = arr => [...arr].sort(() => Math.random() - 0.5);

const BloqueWord = ({ palabra, emoji, seleccionado, usado, posicion, onPress }) => {
  const escala = useSharedValue(1);
  const estiloAnim = useAnimatedStyle(() => ({ transform:[{scale:escala.value}] }));

  const manejarPress = () => {
    if (usado) return;
    escala.value = withSequence(withSpring(0.9,{damping:6}), withSpring(1.0,{damping:8}));
    onPress();
  };

  const bg = usado
    ? 'rgba(255,255,255,0.05)'
    : seleccionado
      ? '#9B5DE5'
      : 'rgba(255,255,255,0.15)';
  const border = usado ? 'rgba(255,255,255,0.05)' : seleccionado ? '#c084fc' : 'rgba(255,255,255,0.3)';

  return (
    <Animated.View style={[styles.bloque, {backgroundColor:bg, borderColor:border, opacity:usado?0.35:1}, estiloAnim]}>
      <TouchableOpacity onPress={manejarPress} activeOpacity={0.8} style={styles.bloqueTouch} disabled={usado}>
        <Text style={styles.bloqueEmoji}>{emoji}</Text>
        <Text style={[styles.bloqueTexto, {opacity:usado?0.4:1}]}>{palabra}</Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

export default function Level3Screen({ navigation }) {
  const [puntos,   setPuntos]   = useState(0);
  const [vidas,    setVidas]    = useState(3);
  const [ronda,    setRonda]    = useState(0);
  const [aciertos, setAciertos] = useState(0);
  const [juegoActivo, setJuegoActivo] = useState(false);

  const [oracionActual,  setOracionActual]  = useState(null);
  const [bloquesDisp,    setBloquesDisp]    = useState([]); // Bloques disponibles (mezclados)
  const [oracionArmada, setOracionArmada]   = useState([]); // Lo que el niño va eligiendo
  const [usados,         setUsados]         = useState(new Set());
  const [feedback,       setFeedback]       = useState(''); // 'correcto' | 'incorrecto' | ''

  const generarRonda = useCallback(() => {
    const idx = Math.floor(Math.random() * ORACIONES.length);
    const oracion = ORACIONES[idx];
    setOracionActual(oracion);
    // Mezclar los bloques
    const bloquesMezclados = mezclar(
      oracion.palabras.map((p, i) => ({ palabra: p, emoji: oracion.emojis[i], indiceReal: i, idBloque: `${Date.now()}_${i}` }))
    );
    setBloquesDisp(bloquesMezclados);
    setOracionArmada([]);
    setUsados(new Set());
    setFeedback('');
    setRonda(r => r + 1);
  }, []);

  const elegirBloque = useCallback(async (bloque) => {
    if (usados.has(bloque.idBloque)) return;
    const nuevaOracion = [...oracionArmada, bloque];
    setOracionArmada(nuevaOracion);
    setUsados(u => new Set([...u, bloque.idBloque]));

    // Si completó todos los bloques, verificar
    if (nuevaOracion.length === oracionActual.palabras.length) {
      const esCorrecta = nuevaOracion.every((b, i) => b.indiceReal === i);
      if (esCorrecta) {
        await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        setFeedback('correcto');
        setPuntos(p => p + 15);
        setAciertos(a => a + 1);
        setTimeout(() => generarRonda(), 1200);
      } else {
        await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
        setFeedback('incorrecto');
        setVidas(v => {
          const nv = v - 1;
          if (nv <= 0) setTimeout(() => finalizarJuego(), 800);
          return nv;
        });
        // Resetear la oración armada para intentar de nuevo
        setTimeout(() => {
          setOracionArmada([]);
          setUsados(new Set());
          setFeedback('');
        }, 900);
      }
    }
  }, [oracionArmada, oracionActual, usados, generarRonda]);

  const deshacerUltimo = () => {
    if (oracionArmada.length === 0) return;
    const ultima = oracionArmada[oracionArmada.length - 1];
    setOracionArmada(oracionArmada.slice(0, -1));
    setUsados(u => { const n=new Set(u); n.delete(ultima.idBloque); return n; });
  };

  const finalizarJuego = useCallback(async () => {
    setJuegoActivo(false);
    const estrellas = puntos >= 60 ? 3 : puntos >= 30 ? 2 : puntos > 0 ? 1 : 0;
    await actualizarNivel('nivel3', { puntos, estrellas, completado: puntos >= 30 });
    Alert.alert('¡Nivel 3 completado! 💬',
      `Puntos: ${puntos}\nOraciones armadas: ${aciertos}`,
      [{ text:'¡Otra vez!', onPress:iniciarJuego }, { text:'Volver', onPress:()=>navigation.goBack() }]
    );
  }, [puntos, aciertos, navigation]);

  const iniciarJuego = () => {
    setPuntos(0); setVidas(3); setAciertos(0); setRonda(0);
    setJuegoActivo(true); generarRonda();
  };

  const colorFeedback = feedback==='correcto' ? '#4ECDC4' : feedback==='incorrecto' ? '#FF6B6B' : 'transparent';
  const textoFeedback = feedback==='correcto' ? '¡Perfecto! 🎉' : feedback==='incorrecto' ? '¡Casi! Intentá de nuevo 😅' : '';

  return (
    <SafeAreaView style={styles.contenedor}>
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

      {juegoActivo && oracionActual ? (
        <View style={styles.areaJuego}>

          {/* Traducción al español */}
          <View style={styles.traduccionWrap}>
            <Text style={styles.traduccionLabel}>¿Cómo se dice...?</Text>
            <Text style={styles.traduccion}>"{oracionActual.español}"</Text>
          </View>

          {/* Zona de armado: lo que el niño va eligiendo */}
          <View style={styles.zonaArmado}>
            <Text style={styles.zonaLabel}>Tu oración:</Text>
            <View style={styles.oracionArmada}>
              {oracionArmada.length === 0 ? (
                <Text style={styles.placeholder}>Tocá las palabras de abajo →</Text>
              ) : (
                oracionArmada.map((b, i) => (
                  <View key={i} style={styles.palabraArmada}>
                    <Text style={styles.palabraArmadaEmoji}>{b.emoji}</Text>
                    <Text style={styles.palabraArmadaTexto}>{b.palabra}</Text>
                  </View>
                ))
              )}
            </View>

            {/* Feedback */}
            {feedback !== '' && (
              <View style={[styles.feedbackBanner, {backgroundColor:colorFeedback}]}>
                <Text style={styles.feedbackBannerTexto}>{textoFeedback}</Text>
              </View>
            )}

            {/* Botón deshacer */}
            {oracionArmada.length > 0 && feedback === '' && (
              <TouchableOpacity onPress={deshacerUltimo} style={styles.btnDeshacer}>
                <Text style={styles.btnDeshacerTexto}>↩ Deshacer</Text>
              </TouchableOpacity>
            )}
          </View>

          {/* Bloques disponibles */}
          <View style={styles.bloquesDisp}>
            <Text style={styles.bloquesLabel}>Tocá en orden:</Text>
            <View style={styles.bloquesGrid}>
              {bloquesDisp.map(bloque => (
                <BloqueWord
                  key={bloque.idBloque}
                  palabra={bloque.palabra}
                  emoji={bloque.emoji}
                  usado={usados.has(bloque.idBloque)}
                  onPress={() => elegirBloque(bloque)}
                />
              ))}
            </View>
          </View>

        </View>
      ) : (
        <View style={styles.pantallaInicio}>
          <Text style={styles.inicioEmoji}>💬</Text>
          <Text style={styles.inicioTitulo}>מִשְׁפָּטִים</Text>
          <Text style={styles.inicioSubtitulo}>¡Armá oraciones!</Text>
          <Text style={styles.inicioDesc}>
            Vas a ver una oración en español. Tocá las palabras hebreas en el orden correcto para armarla.
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
  contenedor:{flex:1,backgroundColor:'#3d0066'},
  hud:{flexDirection:'row',justifyContent:'space-between',alignItems:'center',paddingHorizontal:16,paddingVertical:10,backgroundColor:'rgba(0,0,0,0.3)'},
  btnVolver:{padding:8}, btnVolverTexto:{color:'rgba(255,255,255,0.7)',fontSize:14,fontWeight:'700'},
  vidasRow:{flexDirection:'row',gap:4},
  puntosWrap:{alignItems:'flex-end'},
  puntosLabel:{color:'rgba(255,255,255,0.5)',fontSize:10,fontWeight:'800',letterSpacing:1},
  puntosValor:{color:'#FFE566',fontSize:24,fontWeight:'900'},
  areaJuego:{flex:1,padding:16,gap:12},
  traduccionWrap:{alignItems:'center',backgroundColor:'rgba(255,255,255,0.08)',borderRadius:16,padding:14},
  traduccionLabel:{color:'rgba(255,255,255,0.5)',fontSize:11,fontWeight:'700',letterSpacing:1,textTransform:'uppercase'},
  traduccion:{color:'#FFE566',fontSize:22,fontWeight:'900',textAlign:'center',marginTop:4},
  zonaArmado:{backgroundColor:'rgba(255,255,255,0.06)',borderRadius:16,padding:14,borderWidth:2,borderColor:'rgba(255,255,255,0.15)',borderStyle:'dashed'},
  zonaLabel:{color:'rgba(255,255,255,0.5)',fontSize:11,fontWeight:'700',letterSpacing:1,textTransform:'uppercase',marginBottom:8},
  oracionArmada:{flexDirection:'row',flexWrap:'wrap',gap:8,minHeight:60,alignItems:'center'},
  placeholder:{color:'rgba(255,255,255,0.3)',fontSize:14,fontStyle:'italic'},
  palabraArmada:{backgroundColor:'rgba(155,93,229,0.4)',borderRadius:10,paddingHorizontal:10,paddingVertical:6,alignItems:'center'},
  palabraArmadaEmoji:{fontSize:20},
  palabraArmadaTexto:{color:'#fff',fontSize:16,fontWeight:'900',writingDirection:'rtl'},
  feedbackBanner:{borderRadius:10,paddingVertical:8,paddingHorizontal:14,marginTop:8,alignItems:'center'},
  feedbackBannerTexto:{color:'#fff',fontSize:16,fontWeight:'900'},
  btnDeshacer:{alignSelf:'flex-end',marginTop:6,padding:6},
  btnDeshacerTexto:{color:'rgba(255,255,255,0.5)',fontSize:13,fontWeight:'700'},
  bloquesDisp:{flex:1},
  bloquesLabel:{color:'rgba(255,255,255,0.5)',fontSize:11,fontWeight:'700',letterSpacing:1,textTransform:'uppercase',marginBottom:8},
  bloquesGrid:{flexDirection:'row',flexWrap:'wrap',gap:10},
  bloque:{borderRadius:14,borderWidth:2},
  bloqueTouch:{paddingHorizontal:14,paddingVertical:10,alignItems:'center',gap:2},
  bloqueEmoji:{fontSize:24},
  bloqueTexto:{color:'#fff',fontSize:16,fontWeight:'900',writingDirection:'rtl'},
  pantallaInicio:{flex:1,justifyContent:'center',alignItems:'center',gap:14,paddingHorizontal:32},
  inicioEmoji:{fontSize:64},
  inicioTitulo:{color:'#FFE566',fontSize:48,fontWeight:'900',writingDirection:'rtl'},
  inicioSubtitulo:{color:'#fff',fontSize:22,fontWeight:'700',textAlign:'center'},
  inicioDesc:{color:'rgba(255,255,255,0.6)',fontSize:14,textAlign:'center',lineHeight:22},
  botonJugar:{backgroundColor:'#FFE566',paddingHorizontal:48,paddingVertical:16,borderRadius:32,marginTop:8,elevation:10},
  botonJugarTexto:{color:'#1a1060',fontSize:24,fontWeight:'900'},
});
