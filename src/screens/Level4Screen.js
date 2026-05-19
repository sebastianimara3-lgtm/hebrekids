// src/screens/Level4Screen.js — Nivel 4: ¡Escenarios interactivos!
// El niño toca objetos en escenarios (casa, jardín, mercado)
// Cada objeto muestra su nombre en hebreo y español
import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, SafeAreaView, Modal } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withSpring, withSequence, withTiming, withRepeat, Easing } from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';
import { ESCENARIOS } from '../data/gameData';
import { actualizarNivel } from '../services/storage';

const { width: W, height: H } = Dimensions.get('window');

// ── Objeto tocable en el escenario ───────────────────────────────
const ObjetoInteractivo = ({ objeto, descubierto, onPress }) => {
  const escala = useSharedValue(1);
  const opa    = useSharedValue(1);

  const estiloAnim = useAnimatedStyle(() => ({
    transform: [{ scale: escala.value }],
    opacity: opa.value,
  }));

  const manejarPress = async () => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    escala.value = withSequence(
      withSpring(1.4, { damping: 4, stiffness: 300 }),
      withSpring(1.0, { damping: 8 })
    );
    onPress(objeto);
  };

  return (
    <Animated.View
      style={[
        styles.objeto,
        {
          left:  objeto.x * W - 30,
          top:   objeto.y * (H * 0.52) - 30,
          backgroundColor: descubierto ? 'rgba(78,205,196,0.3)' : 'rgba(255,255,255,0.15)',
          borderColor: descubierto ? '#4ECDC4' : 'rgba(255,255,255,0.3)',
        },
        estiloAnim,
      ]}
    >
      <TouchableOpacity onPress={manejarPress} activeOpacity={0.8} style={styles.objetoTouch}>
        <Text style={styles.objetoEmoji}>{objeto.emoji}</Text>
        {descubierto && <Text style={styles.objetoCheck}>✓</Text>}
      </TouchableOpacity>
    </Animated.View>
  );
};

// ── Modal de palabra descubierta ─────────────────────────────────
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

  const escenario = ESCENARIOS[escenarioIdx];

  // ── Tocar un objeto ───────────────────────────────────────────
  const tocarObjeto = useCallback(async (objeto) => {
    setObjetoActual(objeto);
    setModalVisible(true);
    if (!descubiertos.has(objeto.id)) {
      setDescubiertos(d => new Set([...d, objeto.id]));
      setPuntos(p => p + 10);
    }
  }, [descubiertos]);

  // ── Siguiente escenario ───────────────────────────────────────
  const siguienteEscenario = async () => {
    setDescubiertos(new Set());
    if (escenarioIdx < ESCENARIOS.length - 1) {
      setEscenarioIdx(i => i + 1);
    } else {
      // Completó todos los escenarios
      const estrellas = puntos >= 120 ? 3 : puntos >= 60 ? 2 : 1;
      await actualizarNivel('nivel4', { puntos, estrellas, completado: true });
      alert(`¡Felicitaciones! 🎉\nCompletaste todos los escenarios!\nPuntos: ${puntos}`);
      navigation.goBack();
    }
  };

  const totalObjetos = escenario.objetos.length;
  const objetosDesc  = escenario.objetos.filter(o => descubiertos.has(o.id)).length;
  const completado   = objetosDesc === totalObjetos;

  return (
    <SafeAreaView style={styles.contenedor}>
      {/* HUD */}
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
        <View style={styles.areaJuego}>

          {/* Título del escenario */}
          <View style={[styles.tituloEscenario, {backgroundColor: escenario.color+'33'}]}>
            <Text style={styles.escenarioEmoji}>{escenario.emoji}</Text>
            <View>
              <Text style={styles.escenarioNombre}>{escenario.nombre}</Text>
              <Text style={styles.escenarioDesc}>{escenario.descripcion}</Text>
            </View>
          </View>

          {/* Barra de progreso del escenario */}
          <View style={styles.barraWrap}>
            <View style={[styles.barraFill, {
              width: `${(objetosDesc/totalObjetos)*100}%`,
              backgroundColor: escenario.color,
            }]}/>
          </View>

          {/* Escenario con objetos */}
          <View style={[styles.escenarioArea, {backgroundColor: escenario.color+'22'}]}>
            {escenario.objetos.map(obj => (
              <ObjetoInteractivo
                key={obj.id}
                objeto={obj}
                descubierto={descubiertos.has(obj.id)}
                onPress={tocarObjeto}
              />
            ))}
            <Text style={styles.instruccion}>👆 Tocá todos los objetos</Text>
          </View>

          {/* Botón siguiente escenario cuando completa */}
          {completado && (
            <TouchableOpacity style={[styles.botonSiguiente, {backgroundColor:escenario.color}]}
              onPress={siguienteEscenario}>
              <Text style={styles.botonSiguienteTexto}>
                {escenarioIdx < ESCENARIOS.length-1 ? '¡Siguiente escenario! →' : '¡Completado! 🏆'}
              </Text>
            </TouchableOpacity>
          )}

          {/* Lista de palabras descubiertas */}
          {descubiertos.size > 0 && (
            <View style={styles.listaDesc}>
              <Text style={styles.listaLabel}>Palabras aprendidas:</Text>
              <View style={styles.listaGrid}>
                {escenario.objetos
                  .filter(o => descubiertos.has(o.id))
                  .map(o => (
                    <View key={o.id} style={styles.palabraDesc}>
                      <Text style={styles.palabraDescEmoji}>{o.emoji}</Text>
                      <Text style={styles.palabraDescHebreo}>{o.hebreo}</Text>
                    </View>
                  ))
                }
              </View>
            </View>
          )}

        </View>
      ) : (
        <View style={styles.pantallaInicio}>
          <Text style={styles.inicioEmoji}>🎭</Text>
          <Text style={styles.inicioTitulo}>שִׂיחָה</Text>
          <Text style={styles.inicioSubtitulo}>¡Explorá y aprendé!</Text>
          <Text style={styles.inicioDesc}>
            Tocá los objetos de cada escenario para aprender cómo se llaman en hebreo. ¡Descubrí todo!
          </Text>
          <View style={styles.escenariosPrev}>
            {ESCENARIOS.map(e => (
              <View key={e.id} style={[styles.escenarioPrev, {backgroundColor:e.color+'33', borderColor:e.color}]}>
                <Text style={{fontSize:28}}>{e.emoji}</Text>
                <Text style={styles.escenarioPrevNombre}>{e.nombre}</Text>
              </View>
            ))}
          </View>
          <TouchableOpacity style={styles.botonJugar} onPress={() => setJuegoActivo(true)}>
            <Text style={styles.botonJugarTexto}>¡EXPLORAR! 🔍</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Modal de palabra */}
      <ModalPalabra
        visible={modalVisible}
        objeto={objetoActual}
        onCerrar={() => setModalVisible(false)}
      />

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  contenedor:{flex:1,backgroundColor:'#1a3a00'},
  hud:{flexDirection:'row',justifyContent:'space-between',alignItems:'center',paddingHorizontal:16,paddingVertical:10,backgroundColor:'rgba(0,0,0,0.3)'},
  btnVolver:{padding:8}, btnVolverTexto:{color:'rgba(255,255,255,0.7)',fontSize:14,fontWeight:'700'},
  progresoHud:{backgroundColor:'rgba(255,255,255,0.15)',borderRadius:20,paddingHorizontal:12,paddingVertical:4},
  progresoTexto:{color:'#fff',fontSize:14,fontWeight:'700'},
  puntosWrap:{alignItems:'flex-end'},
  puntosLabel:{color:'rgba(255,255,255,0.5)',fontSize:10,fontWeight:'800',letterSpacing:1},
  puntosValor:{color:'#FFE566',fontSize:24,fontWeight:'900'},
  areaJuego:{flex:1,padding:12,gap:10},
  tituloEscenario:{flexDirection:'row',alignItems:'center',gap:12,backgroundColor:'rgba(255,255,255,0.08)',borderRadius:14,padding:12},
  escenarioEmoji:{fontSize:36},
  escenarioNombre:{color:'#fff',fontSize:18,fontWeight:'900'},
  escenarioDesc:{color:'rgba(255,255,255,0.6)',fontSize:12},
  barraWrap:{height:6,backgroundColor:'rgba(255,255,255,0.15)',borderRadius:3,overflow:'hidden'},
  barraFill:{height:'100%',borderRadius:3},
  escenarioArea:{flex:1,borderRadius:18,position:'relative',overflow:'hidden',minHeight:220,backgroundColor:'rgba(255,255,255,0.05)',borderWidth:1,borderColor:'rgba(255,255,255,0.1)'},
  instruccion:{position:'absolute',bottom:10,left:0,right:0,textAlign:'center',color:'rgba(255,255,255,0.4)',fontSize:12,fontWeight:'700'},
  objeto:{position:'absolute',width:60,height:60,borderRadius:30,borderWidth:2,justifyContent:'center',alignItems:'center'},
  objetoTouch:{width:'100%',height:'100%',justifyContent:'center',alignItems:'center',borderRadius:30},
  objetoEmoji:{fontSize:28},
  objetoCheck:{position:'absolute',top:-4,right:-4,fontSize:14},
  botonSiguiente:{borderRadius:16,paddingVertical:14,alignItems:'center',elevation:8},
  botonSiguienteTexto:{color:'#fff',fontSize:18,fontWeight:'900'},
  listaDesc:{backgroundColor:'rgba(255,255,255,0.06)',borderRadius:14,padding:12},
  listaLabel:{color:'rgba(255,255,255,0.5)',fontSize:11,fontWeight:'700',letterSpacing:1,textTransform:'uppercase',marginBottom:8},
  listaGrid:{flexDirection:'row',flexWrap:'wrap',gap:8},
  palabraDesc:{backgroundColor:'rgba(255,255,255,0.1)',borderRadius:10,paddingHorizontal:10,paddingVertical:6,alignItems:'center',gap:2},
  palabraDescEmoji:{fontSize:18},
  palabraDescHebreo:{color:'#fff',fontSize:13,fontWeight:'900',writingDirection:'rtl'},
  // Modal
  modalOverlay:{flex:1,backgroundColor:'rgba(0,0,0,0.7)',justifyContent:'center',alignItems:'center'},
  modalCard:{backgroundColor:'#1a1060',borderRadius:24,padding:28,alignItems:'center',gap:10,width:W*0.75,borderWidth:2,borderColor:'rgba(255,255,255,0.2)'},
  modalEmoji:{fontSize:64},
  modalHebreo:{color:'#FFE566',fontSize:40,fontWeight:'900',writingDirection:'rtl'},
  modalEspanol:{color:'rgba(255,255,255,0.8)',fontSize:20,fontWeight:'700'},
  modalBtn:{backgroundColor:'#4ECDC4',borderRadius:16,paddingHorizontal:28,paddingVertical:12,marginTop:8},
  modalBtnTexto:{color:'#1a1060',fontSize:18,fontWeight:'900'},
  // Pantalla inicio
  pantallaInicio:{flex:1,justifyContent:'center',alignItems:'center',gap:14,paddingHorizontal:24},
  inicioEmoji:{fontSize:64},
  inicioTitulo:{color:'#FFE566',fontSize:48,fontWeight:'900',writingDirection:'rtl'},
  inicioSubtitulo:{color:'#fff',fontSize:22,fontWeight:'700',textAlign:'center'},
  inicioDesc:{color:'rgba(255,255,255,0.6)',fontSize:14,textAlign:'center',lineHeight:22},
  escenariosPrev:{flexDirection:'row',gap:10,marginTop:4},
  escenarioPrev:{flex:1,borderRadius:14,borderWidth:1.5,padding:10,alignItems:'center',gap:4},
  escenarioPrevNombre:{color:'#fff',fontSize:11,fontWeight:'700',textAlign:'center'},
  botonJugar:{backgroundColor:'#FFE566',paddingHorizontal:40,paddingVertical:16,borderRadius:32,marginTop:8,elevation:10},
  botonJugarTexto:{color:'#1a1060',fontSize:22,fontWeight:'900'},
});
