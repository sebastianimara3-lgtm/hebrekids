// src/screens/Level4Screen.js — Nivel 4: ¡Escenarios interactivos!
import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Modal, Platform, StatusBar, ScrollView } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withSpring, withSequence } from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';
import { ESCENARIOS } from '../data/gameData';
import { actualizarNivel } from '../services/storage';

const { width: W, height: H } = Dimensions.get('window');
const STATUS_H = Platform.OS === 'android' ? StatusBar.currentHeight || 24 : 0;

const ObjetoTocable = ({ objeto, descubierto, onPress }) => {
  const escala = useSharedValue(1);
  const estiloAnim = useAnimatedStyle(() => ({transform:[{scale:escala.value}]}));

  const manejarPress = async () => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    escala.value = withSequence(withSpring(1.4,{damping:4}), withSpring(1.0,{damping:8}));
    onPress(objeto);
  };

  return (
    <Animated.View style={[
      styles.objeto,
      {
        left:  objeto.x * (W - 60),
        top:   objeto.y * 200,
        backgroundColor: descubierto ? 'rgba(78,205,196,0.4)' : 'rgba(255,255,255,0.2)',
        borderColor:     descubierto ? '#4ECDC4' : 'rgba(255,255,255,0.4)',
      },
      estiloAnim,
    ]}>
      <TouchableOpacity onPress={manejarPress} activeOpacity={0.8} style={styles.objetoTouch}>
        <Text style={styles.objetoEmoji}>{objeto.emoji}</Text>
        {descubierto && <Text style={styles.check}>✓</Text>}
      </TouchableOpacity>
    </Animated.View>
  );
};

const ModalPalabra = ({ visible, objeto, onCerrar }) => {
  if (!objeto) return null;
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.modalOverlay}>
        <View style={styles.modalCard}>
          <Text style={styles.modalEmoji}>{objeto.emoji}</Text>
          <Text style={styles.modalHebreo}>{objeto.hebreo}</Text>
          <Text style={styles.modalEspanol}>{objeto.español}</Text>
          <TouchableOpacity style={styles.modalBtn} onPress={onCerrar}>
            <Text style={styles.modalBtnTexto}>¡Genial! 👍</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default function Level4Screen({ navigation }) {
  const [escenarioIdx,  setEscenarioIdx]  = useState(0);
  const [descubiertos,  setDescubiertos]  = useState(new Set());
  const [puntos,        setPuntos]        = useState(0);
  const [juegoActivo,   setJuegoActivo]   = useState(false);
  const [modalVisible,  setModalVisible]  = useState(false);
  const [objetoActual,  setObjetoActual]  = useState(null);

  const escenario    = ESCENARIOS[escenarioIdx];
  const totalObjetos = escenario.objetos.length;
  const objetosDesc  = escenario.objetos.filter(o=>descubiertos.has(o.id)).length;
  const completado   = objetosDesc === totalObjetos;

  const tocarObjeto = useCallback((objeto) => {
    setObjetoActual(objeto);
    setModalVisible(true);
    if (!descubiertos.has(objeto.id)) {
      setDescubiertos(d => new Set([...d, objeto.id]));
      setPuntos(p => p+10);
    }
  }, [descubiertos]);

  const siguienteEscenario = async () => {
    setDescubiertos(new Set());
    if (escenarioIdx < ESCENARIOS.length-1) {
      setEscenarioIdx(i => i+1);
    } else {
      const estrellas = puntos>=120?3:puntos>=60?2:1;
      await actualizarNivel('nivel4',{puntos,estrellas,completado:true});
      Alert.alert('¡Felicitaciones! 🏆',`Completaste todos los escenarios!\nPuntos: ${puntos}`,[
        {text:'¡Otra vez!',onPress:()=>{setEscenarioIdx(0);setDescubiertos(new Set());setPuntos(0);}},
        {text:'Volver',onPress:()=>navigation.goBack()},
      ]);
    }
  };

  return (
    <View style={styles.contenedor}>
      <View style={{height:STATUS_H}}/>
      <View style={styles.hud}>
        <TouchableOpacity onPress={()=>navigation.goBack()} style={styles.btnVolver}>
          <Text style={styles.btnVolverTexto}>← Volver</Text>
        </TouchableOpacity>
        <View style={styles.progresoHud}>
          <Text style={styles.progresoTexto}>{objetosDesc}/{totalObjetos} 🔍</Text>
        </View>
        <View style={styles.puntosWrap}>
          <Text style={styles.puntosLabel}>PTS</Text>
          <Text style={styles.puntosValor}>{puntos}</Text>
        </View>
      </View>

      {juegoActivo ? (
        <ScrollView style={{flex:1}} contentContainerStyle={styles.areaJuego}>

          {/* Título escenario */}
          <View style={[styles.tituloEsc,{backgroundColor:escenario.color+'33'}]}>
            <Text style={styles.escEmoji}>{escenario.emoji}</Text>
            <View>
              <Text style={styles.escNombre}>{escenario.nombre}</Text>
              <Text style={styles.escDesc}>{escenario.descripcion}</Text>
            </View>
          </View>

          {/* Barra progreso */}
          <View style={styles.barraWrap}>
            <View style={[styles.barraFill,{width:`${(objetosDesc/totalObjetos)*100}%`,backgroundColor:escenario.color}]}/>
          </View>

          {/* Área de objetos */}
          <View style={[styles.escenarioArea,{borderColor:escenario.color+'66'}]}>
            <Text style={styles.instruccion}>👆 Tocá todos los objetos para aprender su nombre</Text>
            {escenario.objetos.map(obj=>(
              <ObjetoTocable key={obj.id} objeto={obj}
                descubierto={descubiertos.has(obj.id)} onPress={tocarObjeto}/>
            ))}
          </View>

          {/* Botón siguiente */}
          {completado && (
            <TouchableOpacity style={[styles.botonSiguiente,{backgroundColor:escenario.color}]}
              onPress={siguienteEscenario}>
              <Text style={styles.botonSiguienteTexto}>
                {escenarioIdx<ESCENARIOS.length-1 ? '¡Siguiente escenario! →' : '¡Completado! 🏆'}
              </Text>
            </TouchableOpacity>
          )}

          {/* Palabras aprendidas */}
          {descubiertos.size > 0 && (
            <View style={styles.aprendidas}>
              <Text style={styles.aprendidasLabel}>Palabras aprendidas:</Text>
              <View style={styles.aprendidasGrid}>
                {escenario.objetos.filter(o=>descubiertos.has(o.id)).map(o=>(
                  <View key={o.id} style={styles.palabraAprendida}>
                    <Text style={{fontSize:18}}>{o.emoji}</Text>
                    <Text style={styles.palabraHebreo}>{o.hebreo}</Text>
                    <Text style={styles.palabraEspanol}>{o.español}</Text>
                  </View>
                ))}
              </View>
            </View>
          )}

        </ScrollView>
      ) : (
        <View style={styles.pantallaInicio}>
          <Text style={styles.inicioEmoji}>🎭</Text>
          <Text style={styles.inicioTitulo}>שִׂיחָה</Text>
          <Text style={styles.inicioSubtitulo}>¡Explorá y aprendé!</Text>
          <Text style={styles.inicioDesc}>Tocá los objetos de cada escenario para aprender cómo se llaman en hebreo.</Text>
          <View style={styles.escPrev}>
            {ESCENARIOS.map(e=>(
              <View key={e.id} style={[styles.escPrevItem,{borderColor:e.color,backgroundColor:e.color+'22'}]}>
                <Text style={{fontSize:24}}>{e.emoji}</Text>
                <Text style={styles.escPrevNombre}>{e.nombre}</Text>
              </View>
            ))}
          </View>
          <TouchableOpacity style={styles.botonJugar} onPress={()=>setJuegoActivo(true)}>
            <Text style={styles.botonJugarTexto}>¡EXPLORAR! 🔍</Text>
          </TouchableOpacity>
        </View>
      )}

      <ModalPalabra visible={modalVisible} objeto={objetoActual} onCerrar={()=>setModalVisible(false)}/>
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor:{flex:1,backgroundColor:'#1a3a00'},
  hud:{flexDirection:'row',justifyContent:'space-between',alignItems:'center',paddingHorizontal:16,paddingVertical:10,backgroundColor:'rgba(0,0,0,0.35)'},
  btnVolver:{padding:8},btnVolverTexto:{color:'rgba(255,255,255,0.8)',fontSize:14,fontWeight:'700'},
  progresoHud:{backgroundColor:'rgba(255,255,255,0.15)',borderRadius:20,paddingHorizontal:12,paddingVertical:4},
  progresoTexto:{color:'#fff',fontSize:14,fontWeight:'700'},
  puntosWrap:{alignItems:'flex-end'},
  puntosLabel:{color:'rgba(255,255,255,0.5)',fontSize:10,fontWeight:'800',letterSpacing:1},
  puntosValor:{color:'#FFE566',fontSize:24,fontWeight:'900'},
  areaJuego:{padding:12,gap:12,paddingBottom:30},
  tituloEsc:{flexDirection:'row',alignItems:'center',gap:12,borderRadius:14,padding:12},
  escEmoji:{fontSize:36},escNombre:{color:'#fff',fontSize:18,fontWeight:'900'},
  escDesc:{color:'rgba(255,255,255,0.6)',fontSize:12},
  barraWrap:{height:6,backgroundColor:'rgba(255,255,255,0.15)',borderRadius:3,overflow:'hidden'},
  barraFill:{height:'100%',borderRadius:3},
  escenarioArea:{height:280,borderRadius:18,position:'relative',borderWidth:2,backgroundColor:'rgba(255,255,255,0.04)'},
  instruccion:{position:'absolute',bottom:8,left:0,right:0,textAlign:'center',color:'rgba(255,255,255,0.4)',fontSize:11,fontWeight:'700'},
  objeto:{position:'absolute',width:58,height:58,borderRadius:29,borderWidth:2,justifyContent:'center',alignItems:'center'},
  objetoTouch:{width:'100%',height:'100%',justifyContent:'center',alignItems:'center',borderRadius:29},
  objetoEmoji:{fontSize:26},
  check:{position:'absolute',top:-4,right:-4,fontSize:13},
  botonSiguiente:{borderRadius:14,paddingVertical:14,alignItems:'center',elevation:8},
  botonSiguienteTexto:{color:'#fff',fontSize:17,fontWeight:'900'},
  aprendidas:{backgroundColor:'rgba(255,255,255,0.06)',borderRadius:14,padding:12},
  aprendidasLabel:{color:'rgba(255,255,255,0.5)',fontSize:11,fontWeight:'700',letterSpacing:1,textTransform:'uppercase',marginBottom:8},
  aprendidasGrid:{flexDirection:'row',flexWrap:'wrap',gap:8},
  palabraAprendida:{backgroundColor:'rgba(255,255,255,0.1)',borderRadius:10,padding:8,alignItems:'center',gap:2,minWidth:70},
  palabraHebreo:{color:'#FFE566',fontSize:13,fontWeight:'900',writingDirection:'rtl'},
  palabraEspanol:{color:'rgba(255,255,255,0.6)',fontSize:10},
  modalOverlay:{flex:1,backgroundColor:'rgba(0,0,0,0.75)',justifyContent:'center',alignItems:'center'},
  modalCard:{backgroundColor:'#1a1060',borderRadius:24,padding:28,alignItems:'center',gap:10,width:W*0.78,borderWidth:2,borderColor:'rgba(255,255,255,0.2)'},
  modalEmoji:{fontSize:64},
  modalHebreo:{color:'#FFE566',fontSize:42,fontWeight:'900',writingDirection:'rtl'},
  modalEspanol:{color:'rgba(255,255,255,0.85)',fontSize:20,fontWeight:'700'},
  modalBtn:{backgroundColor:'#4ECDC4',borderRadius:16,paddingHorizontal:28,paddingVertical:12,marginTop:8},
  modalBtnTexto:{color:'#1a1060',fontSize:18,fontWeight:'900'},
  pantallaInicio:{flex:1,justifyContent:'center',alignItems:'center',gap:14,paddingHorizontal:24},
  inicioEmoji:{fontSize:64},
  inicioTitulo:{color:'#FFE566',fontSize:48,fontWeight:'900',writingDirection:'rtl'},
  inicioSubtitulo:{color:'#fff',fontSize:22,fontWeight:'700',textAlign:'center'},
  inicioDesc:{color:'rgba(255,255,255,0.6)',fontSize:14,textAlign:'center',lineHeight:22},
  escPrev:{flexDirection:'row',gap:8,marginTop:4},
  escPrevItem:{flex:1,borderRadius:12,borderWidth:1.5,padding:10,alignItems:'center',gap:4},
  escPrevNombre:{color:'#fff',fontSize:10,fontWeight:'700',textAlign:'center'},
  botonJugar:{backgroundColor:'#FFE566',paddingHorizontal:40,paddingVertical:16,borderRadius:32,marginTop:8,elevation:10},
  botonJugarTexto:{color:'#1a1060',fontSize:22,fontWeight:'900'},
});
