// src/screens/Level3Screen.js — Nivel 3: ¡Armá la oración!
import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, SafeAreaView, Alert, Platform, StatusBar } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withSpring, withSequence } from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';
import { ORACIONES } from '../data/gameData';
import { actualizarNivel } from '../services/storage';

const STATUS_H = Platform.OS === 'android' ? StatusBar.currentHeight || 24 : 0;
const mezclar  = arr => [...arr].sort(() => Math.random() - 0.5);

const BloqueWord = ({ palabra, emoji, usado, onPress }) => {
  const escala = useSharedValue(1);
  const estiloAnim = useAnimatedStyle(() => ({transform:[{scale:escala.value}]}));

  const manejarPress = () => {
    if (usado) return;
    escala.value = withSequence(withSpring(0.88,{damping:6}), withSpring(1.0,{damping:8}));
    onPress();
  };

  return (
    <Animated.View style={[styles.bloque, {opacity:usado?0.3:1, backgroundColor:usado?'rgba(255,255,255,0.04)':'rgba(155,93,229,0.3)', borderColor:usado?'rgba(255,255,255,0.1)':'rgba(192,132,252,0.6)'}, estiloAnim]}>
      <TouchableOpacity onPress={manejarPress} activeOpacity={0.8} style={styles.bloqueTouch} disabled={usado}>
        <Text style={styles.bloqueEmoji}>{emoji}</Text>
        <Text style={[styles.bloqueTexto,{color:usado?'rgba(255,255,255,0.3)':'#fff'}]}>{palabra}</Text>
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
  const [bloquesDisp,    setBloquesDisp]    = useState([]);
  const [oracionArmada,  setOracionArmada]  = useState([]);
  const [usados,         setUsados]         = useState(new Set());
  const [feedback,       setFeedback]       = useState('');

  const generarRonda = useCallback(() => {
    const idx    = Math.floor(Math.random() * ORACIONES.length);
    const oracion = ORACIONES[idx];
    setOracionActual(oracion);
    setBloquesDisp(mezclar(
      oracion.palabras.map((p,i) => ({ palabra:p, emoji:oracion.emojis[i], indiceReal:i, idBloque:`${Date.now()}_${i}` }))
    ));
    setOracionArmada([]);
    setUsados(new Set());
    setFeedback('');
    setRonda(r => r+1);
  }, []);

  const elegirBloque = useCallback(async (bloque) => {
    if (usados.has(bloque.idBloque)) return;
    const nuevaOracion = [...oracionArmada, bloque];
    setOracionArmada(nuevaOracion);
    setUsados(u => new Set([...u, bloque.idBloque]));

    if (nuevaOracion.length === oracionActual.palabras.length) {
      const ok = nuevaOracion.every((b,i) => b.indiceReal === i);
      if (ok) {
        await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        setFeedback('correcto');
        setPuntos(p => p+15);
        setAciertos(a => a+1);
        setTimeout(() => generarRonda(), 1200);
      } else {
        await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
        setFeedback('incorrecto');
        setVidas(v => { const nv=v-1; if(nv<=0) setTimeout(()=>finalizarJuego(),800); return nv; });
        setTimeout(() => { setOracionArmada([]); setUsados(new Set()); setFeedback(''); }, 1000);
      }
    }
  }, [oracionArmada, oracionActual, usados, generarRonda]);

  const deshacer = () => {
    if (oracionArmada.length===0) return;
    const ultima = oracionArmada[oracionArmada.length-1];
    setOracionArmada(oracionArmada.slice(0,-1));
    setUsados(u => { const n=new Set(u); n.delete(ultima.idBloque); return n; });
  };

  const finalizarJuego = useCallback(async () => {
    setJuegoActivo(false);
    const estrellas = puntos>=60?3:puntos>=30?2:puntos>0?1:0;
    await actualizarNivel('nivel3',{puntos,estrellas,completado:puntos>=30});
    Alert.alert('¡Nivel 3! 💬',`Puntos: ${puntos}\nOraciones armadas: ${aciertos}`,[
      {text:'¡Otra vez!',onPress:iniciarJuego},
      {text:'Volver',onPress:()=>navigation.goBack()},
    ]);
  },[puntos,aciertos,navigation]);

  const iniciarJuego = () => {
    setPuntos(0); setVidas(3); setAciertos(0); setRonda(0);
    setJuegoActivo(true); generarRonda();
  };

  return (
    <View style={styles.contenedor}>
      <View style={{height:STATUS_H}}/>
      <View style={styles.hud}>
        <TouchableOpacity onPress={()=>navigation.goBack()} style={styles.btnVolver}>
          <Text style={styles.btnVolverTexto}>← Volver</Text>
        </TouchableOpacity>
        <View style={styles.vidasRow}>
          {[1,2,3].map(i=><Text key={i} style={{fontSize:22,opacity:i<=vidas?1:0.25}}>❤️</Text>)}
        </View>
        <View style={styles.puntosWrap}>
          <Text style={styles.puntosLabel}>PTS</Text>
          <Text style={styles.puntosValor}>{puntos}</Text>
        </View>
      </View>

      {juegoActivo && oracionActual ? (
        <View style={styles.areaJuego}>

          {/* Oración en español */}
          <View style={styles.traduccionWrap}>
            <Text style={styles.traduccionLabel}>¿Cómo se dice en hebreo...?</Text>
            <Text style={styles.traduccion}>"{oracionActual.español}"</Text>
          </View>

          {/* Zona de armado */}
          <View style={[styles.zonaArmado, feedback==='correcto'&&{borderColor:'#4ECDC4'}, feedback==='incorrecto'&&{borderColor:'#FF6B6B'}]}>
            <Text style={styles.zonaLabel}>Tu oración:</Text>
            <View style={styles.oracionRow}>
              {oracionArmada.length===0
                ? <Text style={styles.placeholder}>Tocá las palabras de abajo ↓</Text>
                : oracionArmada.map((b,i)=>(
                    <View key={i} style={styles.palabraArmada}>
                      <Text style={styles.palabraArmadaEmoji}>{b.emoji}</Text>
                      <Text style={styles.palabraArmadaTexto}>{b.palabra}</Text>
                    </View>
                  ))
              }
            </View>
            {feedback==='correcto' && <Text style={styles.feedbackCorrecto}>¡Perfecto! 🎉</Text>}
            {feedback==='incorrecto' && <Text style={styles.feedbackIncorrecto}>¡Casi! Intentá de nuevo 😅</Text>}
            {oracionArmada.length>0 && feedback==='' && (
              <TouchableOpacity onPress={deshacer} style={styles.btnDeshacer}>
                <Text style={styles.btnDeshacerTexto}>↩ Deshacer último</Text>
              </TouchableOpacity>
            )}
          </View>

          {/* Bloques disponibles */}
          <View style={styles.bloquesWrap}>
            <Text style={styles.bloquesLabel}>Tocá en el orden correcto:</Text>
            <View style={styles.bloquesGrid}>
              {bloquesDisp.map(b=>(
                <BloqueWord key={b.idBloque} palabra={b.palabra} emoji={b.emoji}
                  usado={usados.has(b.idBloque)} onPress={()=>elegirBloque(b)}/>
              ))}
            </View>
          </View>

        </View>
      ) : (
        <View style={styles.pantallaInicio}>
          <Text style={styles.inicioEmoji}>💬</Text>
          <Text style={styles.inicioTitulo}>מִשְׁפָּטִים</Text>
          <Text style={styles.inicioSubtitulo}>¡Armá oraciones!</Text>
          <Text style={styles.inicioDesc}>Ves la oración en español y tocás las palabras hebreas en el orden correcto para armarla.</Text>
          <TouchableOpacity style={styles.botonJugar} onPress={iniciarJuego}>
            <Text style={styles.botonJugarTexto}>¡JUGAR! 🚀</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor:{flex:1,backgroundColor:'#3d0066'},
  hud:{flexDirection:'row',justifyContent:'space-between',alignItems:'center',paddingHorizontal:16,paddingVertical:10,backgroundColor:'rgba(0,0,0,0.35)'},
  btnVolver:{padding:8},btnVolverTexto:{color:'rgba(255,255,255,0.8)',fontSize:14,fontWeight:'700'},
  vidasRow:{flexDirection:'row',gap:4},
  puntosWrap:{alignItems:'flex-end'},
  puntosLabel:{color:'rgba(255,255,255,0.5)',fontSize:10,fontWeight:'800',letterSpacing:1},
  puntosValor:{color:'#FFE566',fontSize:24,fontWeight:'900'},
  areaJuego:{flex:1,padding:14,gap:12},
  traduccionWrap:{backgroundColor:'rgba(255,255,255,0.08)',borderRadius:14,padding:14,alignItems:'center'},
  traduccionLabel:{color:'rgba(255,255,255,0.5)',fontSize:11,fontWeight:'700',letterSpacing:1,textTransform:'uppercase'},
  traduccion:{color:'#FFE566',fontSize:20,fontWeight:'900',textAlign:'center',marginTop:4},
  zonaArmado:{backgroundColor:'rgba(255,255,255,0.06)',borderRadius:14,padding:14,borderWidth:2,borderColor:'rgba(255,255,255,0.15)'},
  zonaLabel:{color:'rgba(255,255,255,0.5)',fontSize:11,fontWeight:'700',letterSpacing:1,textTransform:'uppercase',marginBottom:8},
  oracionRow:{flexDirection:'row',flexWrap:'wrap',gap:8,minHeight:52,alignItems:'center'},
  placeholder:{color:'rgba(255,255,255,0.3)',fontSize:13,fontStyle:'italic'},
  palabraArmada:{backgroundColor:'rgba(155,93,229,0.5)',borderRadius:10,paddingHorizontal:10,paddingVertical:6,alignItems:'center'},
  palabraArmadaEmoji:{fontSize:18},
  palabraArmadaTexto:{color:'#fff',fontSize:15,fontWeight:'900',writingDirection:'rtl'},
  feedbackCorrecto:{color:'#4ECDC4',fontSize:16,fontWeight:'900',marginTop:8},
  feedbackIncorrecto:{color:'#FF6B6B',fontSize:16,fontWeight:'900',marginTop:8},
  btnDeshacer:{alignSelf:'flex-end',marginTop:6,padding:6},
  btnDeshacerTexto:{color:'rgba(255,255,255,0.5)',fontSize:12,fontWeight:'700'},
  bloquesWrap:{flex:1},
  bloquesLabel:{color:'rgba(255,255,255,0.5)',fontSize:11,fontWeight:'700',letterSpacing:1,textTransform:'uppercase',marginBottom:10},
  bloquesGrid:{flexDirection:'row',flexWrap:'wrap',gap:10},
  bloque:{borderRadius:12,borderWidth:2},
  bloqueTouch:{paddingHorizontal:14,paddingVertical:10,alignItems:'center',gap:2},
  bloqueEmoji:{fontSize:22},
  bloqueTexto:{fontSize:16,fontWeight:'900',writingDirection:'rtl'},
  pantallaInicio:{flex:1,justifyContent:'center',alignItems:'center',gap:14,paddingHorizontal:32},
  inicioEmoji:{fontSize:64},
  inicioTitulo:{color:'#FFE566',fontSize:48,fontWeight:'900',writingDirection:'rtl'},
  inicioSubtitulo:{color:'#fff',fontSize:22,fontWeight:'700',textAlign:'center'},
  inicioDesc:{color:'rgba(255,255,255,0.6)',fontSize:14,textAlign:'center',lineHeight:22},
  botonJugar:{backgroundColor:'#FFE566',paddingHorizontal:48,paddingVertical:16,borderRadius:32,marginTop:8,elevation:10},
  botonJugarTexto:{color:'#1a1060',fontSize:24,fontWeight:'900'},
});
