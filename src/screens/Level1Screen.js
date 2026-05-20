// src/screens/Level1Screen.js — Nivel 1: ¡Atrapa la letra!
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Alert, Platform, StatusBar } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withSpring, withTiming, withSequence, withRepeat, runOnJS } from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';
import { ALEF_BET, COLORES_BURBUJA } from '../data/gameData';
import { actualizarNivel } from '../services/storage';

const { width: W, height: H } = Dimensions.get('window');
const SB_H = Platform.OS==='android' ? (StatusBar.currentHeight||24) : 44;

const Burbuja = ({ letra, color, posX, esCertera, index, onPresionar, activa }) => {
  const posY=useSharedValue(-120), escala=useSharedValue(1), opa=useSharedValue(1), rot=useSharedValue(0);

  useEffect(()=>{
    if(!activa){posY.value=-120;opa.value=1;escala.value=1;return;}
    posY.value=withTiming(H+150,{duration:5500+index*350});
    rot.value=withRepeat(withSequence(withTiming(7,{duration:1500}),withTiming(-7,{duration:1500})),-1,true);
  },[activa]);

  const estiloAnim=useAnimatedStyle(()=>({
    transform:[{translateY:posY.value},{scale:escala.value},{rotate:`${rot.value}deg`}],
    opacity:opa.value,
  }));

  const manejarToque=useCallback(()=>{
    if(esCertera){
      escala.value=withSequence(withSpring(1.6,{damping:3}),withTiming(0,{duration:200}));
      opa.value=withTiming(0,{duration:250});
    } else {
      escala.value=withSequence(withSpring(0.8,{damping:8}),withSpring(1.1,{damping:6}),withSpring(1.0,{damping:8}));
    }
    runOnJS(onPresionar)(esCertera);
  },[esCertera]);

  return (
    <Animated.View style={[styles.burbuja,{left:posX,backgroundColor:color},estiloAnim]}>
      <TouchableOpacity onPress={manejarToque} activeOpacity={0.85} style={styles.burbujaTouch}>
        <Text style={styles.letraHebrea}>{letra}</Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

const Particula=({x,y,color,index})=>{
  const tx=useSharedValue(0),ty=useSharedValue(0),opa=useSharedValue(1),esc=useSharedValue(1);
  useEffect(()=>{
    const ang=(index/12)*Math.PI*2;
    tx.value=withTiming(Math.cos(ang)*90,{duration:650});
    ty.value=withTiming(Math.sin(ang)*90+150,{duration:650});
    opa.value=withTiming(0,{duration:580});
    esc.value=withTiming(0,{duration:580});
  },[]);
  const estilo=useAnimatedStyle(()=>({position:'absolute',left:x,top:y,transform:[{translateX:tx.value},{translateY:ty.value},{scale:esc.value}],opacity:opa.value}));
  return <Animated.View style={[{width:12,height:12,borderRadius:4,backgroundColor:color},estilo]}/>;
};

const FeedbackFloat=({texto,color,visible})=>{
  const opa=useSharedValue(0),posY=useSharedValue(0);
  useEffect(()=>{
    if(visible){opa.value=withSequence(withTiming(1,{duration:120}),withTiming(1,{duration:500}),withTiming(0,{duration:280}));posY.value=withTiming(-70,{duration:900});}
    else{opa.value=0;posY.value=0;}
  },[visible,texto]);
  const estilo=useAnimatedStyle(()=>({opacity:opa.value,transform:[{translateY:posY.value}]}));
  return <Animated.Text style={[styles.feedbackTexto,{color},estilo]}>{texto}</Animated.Text>;
};

export default function Level1Screen({navigation}) {
  const [puntos,setPuntos]=useState(0),[vidas,setVidas]=useState(3);
  const [letraActual,setLetraActual]=useState(null),[burbujas,setBurbujas]=useState([]);
  const [particulas,setParticulas]=useState([]),[feedback,setFeedback]=useState({visible:false,texto:'',color:'#fff'});
  const [juegoActivo,setJuegoActivo]=useState(false),[ronda,setRonda]=useState(0),[aciertos,setAciertos]=useState(0);
  const escalaLetra=useSharedValue(1);
  const estiloLetra=useAnimatedStyle(()=>({transform:[{scale:escalaLetra.value}]}));
  const timer=useRef(null);
  useEffect(()=>()=>{if(timer.current)clearTimeout(timer.current);},[]);

  const generarRonda=useCallback(()=>{
    const idx=Math.floor(Math.random()*ALEF_BET.length);
    const obj=ALEF_BET[idx];
    setLetraActual(obj);
    escalaLetra.value=withSequence(withSpring(1.3,{damping:4}),withSpring(1.0,{damping:8}));
    const dist=ALEF_BET.filter((_,i)=>i!==idx).sort(()=>Math.random()-0.5).slice(0,4);
    setBurbujas([obj,...dist].sort(()=>Math.random()-0.5).map((item,i)=>({
      id:`${Date.now()}_${i}`,letra:item.letra,esCertera:item.letra===obj.letra,
      posX:15+(i%3)*((W-100)/2)+Math.random()*15,
      color:COLORES_BURBUJA[i%COLORES_BURBUJA.length],index:i,
    })));
    setRonda(r=>r+1);
  },[]);

  const manejarToque=useCallback(async(esAcierto,posX=W/2)=>{
    if(!juegoActivo)return;
    if(esAcierto){
      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      setPuntos(p=>p+10);setAciertos(a=>a+1);
      setFeedback({visible:true,texto:'¡Genial! +10 ✨',color:'#4ECDC4'});
      setParticulas(Array.from({length:12},(_,i)=>({id:`p${Date.now()}${i}`,x:posX,y:H*0.38,color:COLORES_BURBUJA[i%8],index:i})));
      timer.current=setTimeout(()=>setParticulas([]),1100);
      timer.current=setTimeout(()=>{setFeedback(f=>({...f,visible:false}));generarRonda();},1000);
    } else {
      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      setFeedback({visible:true,texto:'¡Esa no era! Seguí buscando 😅',color:'#FF6B6B'});
      timer.current=setTimeout(()=>setFeedback(f=>({...f,visible:false})),900);
      timer.current=setTimeout(()=>setVidas(v=>{const nv=v-1;if(nv<=0)setTimeout(()=>finalizarJuego(),400);else generarRonda();return nv;}),2000);
    }
  },[juegoActivo,generarRonda]);

  const finalizarJuego=useCallback(async()=>{
    setJuegoActivo(false);setBurbujas([]);
    const estrellas=puntos>=60?3:puntos>=30?2:puntos>0?1:0;
    await actualizarNivel('nivel1',{puntos,estrellas,completado:puntos>=30});
    Alert.alert('¡Ronda terminada! 🎉',`Puntos: ${puntos}\nAciertos: ${aciertos}\nRondas: ${ronda}`,[
      {text:'¡Otra vez!',onPress:iniciarJuego},{text:'Volver',onPress:()=>navigation.goBack()},
    ]);
  },[puntos,aciertos,ronda,navigation]);

  const iniciarJuego=()=>{setPuntos(0);setVidas(3);setAciertos(0);setRonda(0);setJuegoActivo(true);generarRonda();};

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

      <View style={styles.objetivoWrap}>
        <Text style={styles.objetivoLabel}>¡Buscá esta letra!</Text>
        {letraActual&&(
          <Animated.View style={estiloLetra}>
            <Text style={styles.letraObjetivo}>{letraActual.letra}</Text>
            <Text style={styles.letraNombre}>{letraActual.nombre}</Text>
          </Animated.View>
        )}
      </View>

      <View style={styles.areaJuego} pointerEvents="box-none">
        {burbujas.map(b=><Burbuja key={b.id} letra={b.letra} color={b.color} posX={b.posX} esCertera={b.esCertera} index={b.index} activa={juegoActivo} onPresionar={(ok)=>manejarToque(ok,b.posX+44)}/>)}
        {particulas.map(p=><Particula key={p.id} x={p.x} y={p.y} color={p.color} index={p.index}/>)}
        <View style={styles.feedbackWrap} pointerEvents="none">
          <FeedbackFloat texto={feedback.texto} color={feedback.color} visible={feedback.visible}/>
        </View>
        {!juegoActivo&&(
          <View style={styles.pantallaInicio}>
            <Text style={styles.inicioTitulo}>אָלֶף-בֵּית</Text>
            <Text style={styles.inicioSubtitulo}>¡Atrapá las letras! 🎮</Text>
            <Text style={styles.inicioDesc}>Mirá la letra de arriba y tocá la burbuja correcta antes de que llegue abajo</Text>
            <TouchableOpacity style={styles.botonJugar} onPress={iniciarJuego}>
              <Text style={styles.botonJugarTexto}>¡JUGAR! 🚀</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
}

const styles=StyleSheet.create({
  contenedor:{flex:1,backgroundColor:'#1a1060'},
  hud:{flexDirection:'row',justifyContent:'space-between',alignItems:'center',paddingHorizontal:16,paddingVertical:12,backgroundColor:'rgba(0,0,0,0.35)'},
  btnVolver:{padding:8},btnVolverTexto:{color:'rgba(255,255,255,0.8)',fontSize:16,fontWeight:'700'},
  vidasRow:{flexDirection:'row',gap:4},
  puntosWrap:{alignItems:'flex-end'},
  puntosLabel:{color:'rgba(255,255,255,0.5)',fontSize:11,fontWeight:'800',letterSpacing:1},
  puntosValor:{color:'#FFE566',fontSize:28,fontWeight:'900'},
  objetivoWrap:{alignItems:'center',paddingVertical:16,backgroundColor:'rgba(0,0,0,0.25)'},
  objetivoLabel:{color:'rgba(255,255,255,0.6)',fontSize:14,fontWeight:'700',letterSpacing:1,textTransform:'uppercase',marginBottom:4},
  letraObjetivo:{color:'#FFE566',fontSize:80,fontWeight:'900',textAlign:'center',writingDirection:'rtl'},
  letraNombre:{color:'rgba(255,229,102,0.7)',fontSize:18,fontWeight:'700',textAlign:'center'},
  areaJuego:{flex:1,position:'relative'},
  burbuja:{position:'absolute',width:88,height:88,borderRadius:44,borderWidth:3,borderColor:'rgba(255,255,255,0.3)',justifyContent:'center',alignItems:'center',elevation:6},
  burbujaTouch:{width:'100%',height:'100%',justifyContent:'center',alignItems:'center',borderRadius:44},
  letraHebrea:{color:'#fff',fontSize:44,fontWeight:'900',writingDirection:'rtl'},
  feedbackWrap:{position:'absolute',top:H*0.28,left:0,right:0,alignItems:'center',zIndex:20},
  feedbackTexto:{fontSize:26,fontWeight:'900'},
  pantallaInicio:{position:'absolute',top:0,left:0,right:0,bottom:0,justifyContent:'center',alignItems:'center',backgroundColor:'rgba(26,16,96,0.93)',zIndex:30,gap:16,paddingHorizontal:32},
  inicioTitulo:{color:'#FFE566',fontSize:60,fontWeight:'900',writingDirection:'rtl'},
  inicioSubtitulo:{color:'#fff',fontSize:22,fontWeight:'700',textAlign:'center'},
  inicioDesc:{color:'rgba(255,255,255,0.6)',fontSize:15,textAlign:'center',lineHeight:22},
  botonJugar:{backgroundColor:'#FFE566',paddingHorizontal:52,paddingVertical:18,borderRadius:32,marginTop:8,elevation:10},
  botonJugarTexto:{color:'#1a1060',fontSize:26,fontWeight:'900',letterSpacing:1},
});
