// src/screens/Level2Screen.js — Nivel 2: ¡Une la palabra con la imagen!
import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, SafeAreaView, Alert, Platform, StatusBar, ScrollView } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withSpring, withSequence } from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';
import { PALABRAS } from '../data/gameData';
import { actualizarNivel } from '../services/storage';

const { width: W } = Dimensions.get('window');
const STATUS_H = Platform.OS === 'android' ? StatusBar.currentHeight || 24 : 0;
const mezclar  = arr => [...arr].sort(() => Math.random() - 0.5);

const Opcion = ({ item, tipo, seleccionada, correcta, incorrecta, onPress, usado }) => {
  const escala = useSharedValue(1);
  useCallback(() => {
    if (correcta)   escala.value = withSequence(withSpring(1.2,{damping:4}), withSpring(1.0,{damping:8}));
    if (incorrecta) escala.value = withSequence(withSpring(0.85,{damping:8}), withSpring(1.0,{damping:6}));
  }, [correcta, incorrecta]);

  const estiloAnim = useAnimatedStyle(() => ({transform:[{scale:escala.value}]}));

  const bg     = correcta ? '#4ECDC4' : incorrecta ? '#FF6B6B' : seleccionada ? '#9B5DE5' : 'rgba(255,255,255,0.1)';
  const border = correcta ? '#4ECDC4' : incorrecta ? '#FF6B6B' : seleccionada ? '#c084fc' : 'rgba(255,255,255,0.2)';

  return (
    <Animated.View style={[styles.opcion, {backgroundColor:bg, borderColor:border, opacity:usado?0.4:1}, estiloAnim]}>
      <TouchableOpacity onPress={onPress} activeOpacity={0.8} style={styles.opcionTouch} disabled={usado||correcta}>
        {tipo==='imagen'
          ? <><Text style={styles.opcionEmoji}>{item.emoji}</Text><Text style={styles.opcionEspanol}>{item.español}</Text></>
          : <Text style={styles.opcionHebreo}>{item.hebreo}</Text>
        }
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
  const [colIzq,   setColIzq]  = useState([]);
  const [colDer,   setColDer]  = useState([]);
  const [selIzq,   setSelIzq]  = useState(null);
  const [selDer,   setSelDer]  = useState(null);
  const [correctos,   setCorrectos]   = useState(new Set());
  const [incorrectos, setIncorrectos] = useState(new Set());

  const generarRonda = useCallback(() => {
    const sel = mezclar(PALABRAS).slice(0, 4);
    setColIzq(mezclar(sel));
    setColDer(mezclar(sel));
    setSelIzq(null); setSelDer(null);
    setCorrectos(new Set()); setIncorrectos(new Set());
    setRonda(r => r+1);
  }, []);

  const verificarPar = useCallback(async (izq, der) => {
    if (izq.id === der.id) {
      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      const nuevos = new Set([...correctos, izq.id]);
      setCorrectos(nuevos);
      setPuntos(p => p+5);
      if (nuevos.size >= 4) {
        setAciertos(a => a+1);
        setPuntos(p => p+10);
        setTimeout(() => generarRonda(), 800);
      }
    } else {
      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      setIncorrectos(new Set([izq.id, der.id]));
      setVidas(v => {
        const nv = v-1;
        if (nv <= 0) setTimeout(()=>finalizarJuego(), 600);
        return nv;
      });
      setTimeout(() => setIncorrectos(new Set()), 700);
    }
    setSelIzq(null); setSelDer(null);
  }, [correctos, generarRonda]);

  const tocarIzq = (item) => {
    if (correctos.has(item.id)) return;
    const nueva = selIzq?.id === item.id ? null : item;
    setSelIzq(nueva);
    if (nueva && selDer) verificarPar(nueva, selDer);
  };

  const tocarDer = (item) => {
    if (correctos.has(item.id)) return;
    const nueva = selDer?.id === item.id ? null : item;
    setSelDer(nueva);
    if (nueva && selIzq) verificarPar(selIzq, nueva);
  };

  const finalizarJuego = useCallback(async () => {
    setJuegoActivo(false);
    const estrellas = puntos>=60?3:puntos>=30?2:puntos>0?1:0;
    await actualizarNivel('nivel2',{puntos,estrellas,completado:puntos>=30});
    Alert.alert('¡Nivel 2! 🧩',`Puntos: ${puntos}\nRondas completadas: ${aciertos}`,[
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

      {juegoActivo ? (
        <>
          <View style={styles.instruccionWrap}>
            <Text style={styles.instruccion}>🧩 Uní cada palabra hebrea con su imagen</Text>
            <Text style={styles.progreso}>{correctos.size}/4 pares encontrados</Text>
          </View>
          <View style={styles.areaJuego}>
            <View style={styles.columna}>
              <Text style={styles.colTitulo}>Hebreo 🔤</Text>
              {colIzq.map(item=>(
                <Opcion key={`izq_${item.id}`} item={item} tipo="hebreo"
                  seleccionada={selIzq?.id===item.id}
                  correcta={correctos.has(item.id)}
                  incorrecta={incorrectos.has(item.id)}
                  usado={correctos.has(item.id)}
                  onPress={()=>tocarIzq(item)}/>
              ))}
            </View>
            <View style={styles.divisor}/>
            <View style={styles.columna}>
              <Text style={styles.colTitulo}>Imagen 🖼️</Text>
              {colDer.map(item=>(
                <Opcion key={`der_${item.id}`} item={item} tipo="imagen"
                  seleccionada={selDer?.id===item.id}
                  correcta={correctos.has(item.id)}
                  incorrecta={incorrectos.has(item.id)}
                  usado={correctos.has(item.id)}
                  onPress={()=>tocarDer(item)}/>
              ))}
            </View>
          </View>
        </>
      ) : (
        <View style={styles.pantallaInicio}>
          <Text style={styles.inicioEmoji}>🧩</Text>
          <Text style={styles.inicioTitulo}>מִלִּים</Text>
          <Text style={styles.inicioSubtitulo}>¡Primeras palabras!</Text>
          <Text style={styles.inicioDesc}>Tocá la palabra en hebreo y la imagen que le corresponde. ¡Encontrá todos los pares!</Text>
          <TouchableOpacity style={styles.botonJugar} onPress={iniciarJuego}>
            <Text style={styles.botonJugarTexto}>¡JUGAR! 🚀</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor:{flex:1,backgroundColor:'#2d1b8c'},
  hud:{flexDirection:'row',justifyContent:'space-between',alignItems:'center',paddingHorizontal:16,paddingVertical:10,backgroundColor:'rgba(0,0,0,0.35)'},
  btnVolver:{padding:8},btnVolverTexto:{color:'rgba(255,255,255,0.8)',fontSize:14,fontWeight:'700'},
  vidasRow:{flexDirection:'row',gap:4},
  puntosWrap:{alignItems:'flex-end'},
  puntosLabel:{color:'rgba(255,255,255,0.5)',fontSize:10,fontWeight:'800',letterSpacing:1},
  puntosValor:{color:'#FFE566',fontSize:24,fontWeight:'900'},
  instruccionWrap:{padding:14,alignItems:'center',backgroundColor:'rgba(0,0,0,0.2)'},
  instruccion:{color:'#FFE566',fontSize:15,fontWeight:'700',textAlign:'center'},
  progreso:{color:'rgba(255,255,255,0.6)',fontSize:12,marginTop:4},
  areaJuego:{flex:1,flexDirection:'row',padding:12,gap:8},
  columna:{flex:1,gap:8},
  colTitulo:{color:'rgba(255,255,255,0.5)',fontSize:11,fontWeight:'800',letterSpacing:1,textTransform:'uppercase',textAlign:'center',marginBottom:4},
  divisor:{width:1,backgroundColor:'rgba(255,255,255,0.15)',marginVertical:30},
  opcion:{borderRadius:12,borderWidth:2},
  opcionTouch:{padding:10,alignItems:'center',gap:4,minHeight:65,justifyContent:'center'},
  opcionEmoji:{fontSize:28},
  opcionEspanol:{color:'rgba(255,255,255,0.8)',fontSize:11,fontWeight:'700',textAlign:'center'},
  opcionHebreo:{color:'#fff',fontSize:20,fontWeight:'900',textAlign:'center',writingDirection:'rtl'},
  pantallaInicio:{flex:1,justifyContent:'center',alignItems:'center',gap:14,paddingHorizontal:32},
  inicioEmoji:{fontSize:64},
  inicioTitulo:{color:'#FFE566',fontSize:48,fontWeight:'900',writingDirection:'rtl'},
  inicioSubtitulo:{color:'#fff',fontSize:22,fontWeight:'700',textAlign:'center'},
  inicioDesc:{color:'rgba(255,255,255,0.6)',fontSize:14,textAlign:'center',lineHeight:22},
  botonJugar:{backgroundColor:'#FFE566',paddingHorizontal:48,paddingVertical:16,borderRadius:32,marginTop:8,elevation:10},
  botonJugarTexto:{color:'#1a1060',fontSize:24,fontWeight:'900'},
});
