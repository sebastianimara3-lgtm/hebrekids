// src/screens/Level4Screen.js — Nivel 4: ¡Conversación con personajes!
// Un personaje te hace una pregunta en hebreo y elegís la respuesta correcta entre 3 opciones.
import React, { useState, useCallback, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Alert, Platform, StatusBar, ScrollView } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withSpring, withSequence, withTiming, withRepeat } from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';
import { PREGUNTAS } from '../data/gameData';
import { actualizarNivel } from '../services/storage';

const { width: W } = Dimensions.get('window');
const SB_H = Platform.OS==='android'?(StatusBar.currentHeight||24):44;
const mezclar = arr => [...arr].sort(()=>Math.random()-0.5);

// ── Opción de respuesta ───────────────────────────────────────────
const OpcionRespuesta = ({ opcion, estado, onPress }) => {
  // estado: 'neutral' | 'correcta' | 'incorrecta' | 'deshabilitada'
  const escala = useSharedValue(1);
  const estiloAnim = useAnimatedStyle(()=>({transform:[{scale:escala.value}]}));

  const bg = estado==='correcta' ? '#4ECDC4'
           : estado==='incorrecta' ? '#FF6B6B'
           : estado==='deshabilitada' ? 'rgba(255,255,255,0.05)'
           : 'rgba(255,255,255,0.12)';
  const border = estado==='correcta' ? '#4ECDC4'
               : estado==='incorrecta' ? '#FF6B6B'
               : 'rgba(255,255,255,0.25)';

  const manejarPress = () => {
    escala.value = withSequence(withSpring(0.95,{damping:6}), withSpring(1.0,{damping:8}));
    onPress(opcion);
  };

  return (
    <Animated.View style={[styles.opcion, {backgroundColor:bg, borderColor:border}, estiloAnim]}>
      <TouchableOpacity onPress={manejarPress} activeOpacity={0.85} style={styles.opcionTouch}
        disabled={estado!=='neutral'}>
        <Text style={styles.opcionHebreo}>{opcion.hebreo}</Text>
        <Text style={styles.opcionEspanol}>{opcion.español}</Text>
        {estado==='correcta' && <Text style={styles.opcionCheck}>✓</Text>}
        {estado==='incorrecta' && <Text style={styles.opcionX}>✗</Text>}
      </TouchableOpacity>
    </Animated.View>
  );
};

// ── Personaje animado ─────────────────────────────────────────────
const Personaje = ({ emoji, hablando }) => {
  const escala = useSharedValue(1);
  useEffect(()=>{
    if(hablando){
      escala.value = withRepeat(withSequence(withSpring(1.1,{damping:4}),withSpring(1.0,{damping:6})),3,true);
    }
  },[hablando]);
  const estiloAnim = useAnimatedStyle(()=>({transform:[{scale:escala.value}]}));
  return <Animated.Text style={[styles.personajeEmoji, estiloAnim]}>{emoji}</Animated.Text>;
};

export default function Level4Screen({navigation}) {
  const [puntos,    setPuntos]    = useState(0);
  const [vidas,     setVidas]     = useState(3);
  const [aciertos,  setAciertos]  = useState(0);
  const [juegoActivo, setJuegoActivo] = useState(false);

  const [preguntaActual, setPreguntaActual] = useState(null);
  const [opcionesOrden,  setOpcionesOrden]  = useState([]);
  const [estadoOpciones, setEstadoOpciones] = useState({}); // {idx: 'neutral'|'correcta'|'incorrecta'|'deshabilitada'}
  const [respondido,     setRespondido]     = useState(false);
  const [hablando,       setHablando]       = useState(false);
  const [preguntasUsadas, setPreguntasUsadas] = useState(new Set());

  const generarPregunta = useCallback((usadas=preguntasUsadas) => {
    const disponibles = PREGUNTAS.filter(p=>!usadas.has(p.id));
    // Si ya usamos todas, reseteamos
    const pool = disponibles.length > 0 ? disponibles : PREGUNTAS;
    const idx  = Math.floor(Math.random()*pool.length);
    const preg = pool[idx];

    setPreguntaActual(preg);
    setOpcionesOrden(mezclar([...preg.opciones]));
    setEstadoOpciones(Object.fromEntries(preg.opciones.map((_,i)=>[[i],'neutral'])));
    setRespondido(false);
    setHablando(true);
    setTimeout(()=>setHablando(false), 1500);

    const nuevasUsadas = new Set([...usadas, preg.id]);
    if(nuevasUsadas.size === PREGUNTAS.length) setPreguntasUsadas(new Set());
    else setPreguntasUsadas(nuevasUsadas);
  },[preguntasUsadas]);

  const responder = useCallback(async (opcion) => {
    if(respondido) return;
    setRespondido(true);

    // Marcar cada opción
    const nuevosEstados = {};
    opcionesOrden.forEach((op, i) => {
      if(op===opcion) nuevosEstados[i] = opcion.correcta ? 'correcta' : 'incorrecta';
      else if(op.correcta) nuevosEstados[i] = 'correcta';
      else nuevosEstados[i] = 'deshabilitada';
    });
    setEstadoOpciones(nuevosEstados);

    if(opcion.correcta) {
      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      setPuntos(p=>p+15);
      setAciertos(a=>a+1);
      setTimeout(()=>generarPregunta(), 1500);
    } else {
      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      setVidas(v=>{
        const nv=v-1;
        if(nv<=0) setTimeout(()=>finalizarJuego(),1200);
        else setTimeout(()=>generarPregunta(), 1800);
        return nv;
      });
    }
  },[respondido, opcionesOrden, generarPregunta]);

  const finalizarJuego = useCallback(async () => {
    setJuegoActivo(false);
    const estrellas = puntos>=90?3:puntos>=45?2:puntos>0?1:0;
    await actualizarNivel('nivel4',{puntos,estrellas,completado:puntos>=45});
    Alert.alert('¡Nivel 4! 🎭',`Puntos: ${puntos}\nRespuestas correctas: ${aciertos}`,[
      {text:'¡Otra vez!',onPress:iniciarJuego},{text:'Volver',onPress:()=>navigation.goBack()},
    ]);
  },[puntos,aciertos,navigation]);

  const iniciarJuego = () => {
    setPuntos(0);setVidas(3);setAciertos(0);
    setPreguntasUsadas(new Set());
    setJuegoActivo(true);
    generarPregunta(new Set());
  };

  return (
    <View style={styles.contenedor}>
      <View style={{height:SB_H}}/>
      <View style={styles.hud}>
        <TouchableOpacity onPress={()=>navigation.goBack()} style={styles.btnVolver}>
          <Text style={styles.btnVolverTexto}>← Volver</Text>
        </TouchableOpacity>
        <View style={styles.vidasRow}>{[1,2,3].map(i=><Text key={i} style={{fontSize:24,opacity:i<=vidas?1:0.25}}>❤️</Text>)}</View>
        <View style={styles.puntosWrap}>
          <Text style={styles.puntosLabel}>PTS</Text>
          <Text style={styles.puntosValor}>{puntos}</Text>
        </View>
      </View>

      {juegoActivo && preguntaActual ? (
        <ScrollView style={{flex:1}} contentContainerStyle={styles.areaJuego}>

          {/* Personaje y pregunta */}
          <View style={styles.preguntaCard}>
            <Personaje emoji={preguntaActual.personaje} hablando={hablando}/>
            <View style={styles.bocadillo}>
              {/* Pregunta en hebreo — RTL grande */}
              <Text style={styles.preguntaHebreo}>{preguntaActual.pregunta}</Text>
              {/* Traducción al español */}
              <Text style={styles.preguntaTraduccion}>{preguntaActual.traduccion}</Text>
            </View>
          </View>

          {/* Instrucción */}
          <Text style={styles.instruccion}>👇 ¿Cuál es la respuesta correcta?</Text>

          {/* Opciones de respuesta */}
          <View style={styles.opcionesWrap}>
            {opcionesOrden.map((op,i)=>(
              <OpcionRespuesta
                key={i}
                opcion={op}
                estado={estadoOpciones[i]||'neutral'}
                onPress={responder}
              />
            ))}
          </View>

          {/* Progreso */}
          <View style={styles.progresoWrap}>
            <Text style={styles.progresoTexto}>✅ {aciertos} respuestas correctas</Text>
          </View>

        </ScrollView>
      ) : (
        <View style={styles.pantallaInicio}>
          <Text style={styles.inicioEmoji}>🎭</Text>
          <Text style={styles.inicioTitulo}>שִׂיחָה</Text>
          <Text style={styles.inicioSubtitulo}>¡Conversación!</Text>
          <Text style={styles.inicioDesc}>
            Un personaje te hace una pregunta en hebreo. Elegí la respuesta correcta entre 3 opciones. ¡10 preguntas diferentes!
          </Text>
          <View style={styles.personajesPreview}>
            {['🦊','🐻','🦁','🐸','🦋'].map(e=><Text key={e} style={{fontSize:36}}>{e}</Text>)}
          </View>
          <TouchableOpacity style={styles.botonJugar} onPress={iniciarJuego}>
            <Text style={styles.botonJugarTexto}>¡CONVERSAR! 💬</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles=StyleSheet.create({
  contenedor:{flex:1,backgroundColor:'#1a3a1a'},
  hud:{flexDirection:'row',justifyContent:'space-between',alignItems:'center',paddingHorizontal:16,paddingVertical:12,backgroundColor:'rgba(0,0,0,0.35)'},
  btnVolver:{padding:8},btnVolverTexto:{color:'rgba(255,255,255,0.8)',fontSize:16,fontWeight:'700'},
  vidasRow:{flexDirection:'row',gap:4},
  puntosWrap:{alignItems:'flex-end'},
  puntosLabel:{color:'rgba(255,255,255,0.5)',fontSize:11,fontWeight:'800',letterSpacing:1},
  puntosValor:{color:'#FFE566',fontSize:28,fontWeight:'900'},
  areaJuego:{padding:16,gap:16,paddingBottom:30},
  preguntaCard:{alignItems:'center',gap:12},
  personajeEmoji:{fontSize:80},
  bocadillo:{backgroundColor:'rgba(255,255,255,0.95)',borderRadius:20,padding:18,maxWidth:W*0.85,alignItems:'center',gap:6},
  preguntaHebreo:{color:'#1a1060',fontSize:26,fontWeight:'900',textAlign:'right',writingDirection:'rtl',lineHeight:36},
  preguntaTraduccion:{color:'rgba(26,16,96,0.65)',fontSize:16,fontWeight:'600',textAlign:'center',fontStyle:'italic'},
  instruccion:{color:'rgba(255,255,255,0.6)',fontSize:15,fontWeight:'700',textAlign:'center'},
  opcionesWrap:{gap:12},
  opcion:{borderRadius:16,borderWidth:2},
  opcionTouch:{padding:16,flexDirection:'row',alignItems:'center',justifyContent:'space-between',gap:10},
  opcionHebreo:{color:'#fff',fontSize:20,fontWeight:'900',writingDirection:'rtl',flex:1,textAlign:'right'},
  opcionEspanol:{color:'rgba(255,255,255,0.7)',fontSize:14,fontWeight:'600',flex:1,textAlign:'left'},
  opcionCheck:{fontSize:22,color:'#fff'},
  opcionX:{fontSize:22,color:'#fff'},
  progresoWrap:{alignItems:'center',marginTop:8},
  progresoTexto:{color:'rgba(255,255,255,0.5)',fontSize:14,fontWeight:'700'},
  pantallaInicio:{flex:1,justifyContent:'center',alignItems:'center',gap:14,paddingHorizontal:32},
  inicioEmoji:{fontSize:70},
  inicioTitulo:{color:'#FFE566',fontSize:52,fontWeight:'900',writingDirection:'rtl'},
  inicioSubtitulo:{color:'#fff',fontSize:24,fontWeight:'700',textAlign:'center'},
  inicioDesc:{color:'rgba(255,255,255,0.6)',fontSize:15,textAlign:'center',lineHeight:22},
  personajesPreview:{flexDirection:'row',gap:8,marginTop:4},
  botonJugar:{backgroundColor:'#FFE566',paddingHorizontal:40,paddingVertical:18,borderRadius:32,marginTop:8,elevation:10},
  botonJugarTexto:{color:'#1a1060',fontSize:24,fontWeight:'900'},
});
