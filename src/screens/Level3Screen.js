// src/screens/Level3Screen.js — Nivel 3 con fonética, RTL y dificultad progresiva
import React,{useState,useCallback} from 'react';
import {View,Text,StyleSheet,TouchableOpacity,Alert,Platform,StatusBar,ScrollView} from 'react-native';
import Animated,{useSharedValue,useAnimatedStyle,withSpring,withSequence} from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';
import {ORACIONES} from '../data/gameData';
import {actualizarNivel} from '../services/storage';
import {useIdioma,MODOS} from '../hooks/useIdioma';
import BarraIdioma from '../components/BarraIdioma';

const SB_H=Platform.OS==='android'?(StatusBar.currentHeight||24):44;
const mezclar=arr=>[...arr].sort(()=>Math.random()-0.5);
const getDisponibles=dif=>ORACIONES.filter(o=>o.dificultad<=dif);

const BloqueWord=({palabra,fonetica,emoji,usado,onPress,modo})=>{
  const escala=useSharedValue(1);
  const estiloAnim=useAnimatedStyle(()=>({transform:[{scale:escala.value}]}));
  const press=()=>{if(usado)return;escala.value=withSequence(withSpring(0.88,{damping:6}),withSpring(1.0,{damping:8}));onPress();};
  const textoBloque = modo===MODOS.FONETICA ? fonetica : palabra;
  const esLatin     = modo===MODOS.FONETICA;
  return(
    <Animated.View style={[styles.bloque,{opacity:usado?0.25:1,backgroundColor:usado?'rgba(255,255,255,0.03)':'rgba(155,93,229,0.35)',borderColor:usado?'rgba(255,255,255,0.08)':'rgba(192,132,252,0.7)'},estiloAnim]}>
      <TouchableOpacity onPress={press} activeOpacity={0.8} style={styles.bloqueTouch} disabled={usado}>
        <Text style={styles.bloqueEmoji}>{emoji}</Text>
        <Text style={[esLatin?styles.bloqueFonetica:styles.bloqueTexto,{color:usado?'rgba(255,255,255,0.25)':'#fff'}]}>{textoBloque}</Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

export default function Level3Screen({navigation}){
  const {modo,toggleFonetica,toggleTraduccion,labelToggle}=useIdioma();
  const [puntos,setPuntos]=useState(0),[vidas,setVidas]=useState(3);
  const [ronda,setRonda]=useState(0),[aciertos,setAciertos]=useState(0);
  const [juegoActivo,setJuegoActivo]=useState(false);
  const [nivelDif,setNivelDif]=useState(1);
  const [oracionActual,setOracionActual]=useState(null);
  const [bloquesDisp,setBloquesDisp]=useState([]);
  const [oracionArmada,setOracionArmada]=useState([]);
  const [usados,setUsados]=useState(new Set());
  const [feedback,setFeedback]=useState('');

  const generarRonda=useCallback((dif=nivelDif)=>{
    const pool=getDisponibles(dif);
    const o=pool[Math.floor(Math.random()*pool.length)];
    setOracionActual(o);
    setBloquesDisp(mezclar(o.palabras.map((p,i)=>({palabra:p,fonetica:o.foneticaPal[i],emoji:o.emojis[i],indiceReal:i,idBloque:`${Date.now()}_${i}`}))));
    setOracionArmada([]);setUsados(new Set());setFeedback('');setRonda(r=>r+1);
  },[nivelDif]);

  const elegirBloque=useCallback(async(b)=>{
    if(usados.has(b.idBloque))return;
    const nueva=[...oracionArmada,b];
    setOracionArmada(nueva);setUsados(u=>new Set([...u,b.idBloque]));
    if(nueva.length===oracionActual.palabras.length){
      const ok=nueva.every((x,i)=>x.indiceReal===i);
      if(ok){
        await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        setFeedback('correcto');
        const pts=10+oracionActual.dificultad*5;
        setPuntos(p=>p+pts);
        const na=aciertos+1;setAciertos(na);
        const nd=Math.min(5,1+Math.floor(na/3));setNivelDif(nd);
        setTimeout(()=>generarRonda(nd),1400);
      } else {
        await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
        setFeedback('incorrecto');
        setVidas(v=>{const nv=v-1;if(nv<=0)setTimeout(()=>finalizarJuego(),800);return nv;});
        setTimeout(()=>{setOracionArmada([]);setUsados(new Set());setFeedback('');},1100);
      }
    }
  },[oracionArmada,oracionActual,usados,aciertos,generarRonda]);

  const deshacer=()=>{
    if(!oracionArmada.length)return;
    const u=oracionArmada[oracionArmada.length-1];
    setOracionArmada(oracionArmada.slice(0,-1));
    setUsados(s=>{const n=new Set(s);n.delete(u.idBloque);return n;});
  };

  const finalizarJuego=useCallback(async()=>{
    setJuegoActivo(false);
    const estrellas=puntos>=60?3:puntos>=30?2:puntos>0?1:0;
    await actualizarNivel('nivel3',{puntos,estrellas,completado:puntos>=30});
    Alert.alert('¡Nivel 3! 💬',`Puntos: ${puntos}\nOraciones: ${aciertos}`,[{text:'¡Otra vez!',onPress:iniciarJuego},{text:'Volver',onPress:()=>navigation.goBack()}]);
  },[puntos,aciertos,navigation]);

  const iniciarJuego=()=>{setPuntos(0);setVidas(3);setAciertos(0);setRonda(0);setNivelDif(1);setJuegoActivo(true);generarRonda(1);};
  const difLabel=['','⭐ Fácil','⭐⭐ Normal','⭐⭐⭐ Difícil','⭐⭐⭐⭐ Experto','⭐⭐⭐⭐⭐ Maestro'];

  // Traducción a mostrar según modo
  const textoTraduccion = modo===MODOS.FONETICA && oracionActual ? oracionActual.fonetica
    : oracionActual?.español;

  return(
    <View style={styles.contenedor}>
      <View style={{height:SB_H}}/>
      <View style={styles.hud}>
        <TouchableOpacity onPress={()=>navigation.goBack()} style={styles.btnVolver}><Text style={styles.btnVolverTexto}>← Volver</Text></TouchableOpacity>
        <View style={styles.vidasRow}>{[1,2,3].map(i=><Text key={i} style={{fontSize:24,opacity:i<=vidas?1:0.25}}>❤️</Text>)}</View>
        <View style={styles.puntosWrap}><Text style={styles.puntosLabel}>PTS</Text><Text style={styles.puntosValor}>{puntos}</Text></View>
      </View>
      <BarraIdioma modo={modo} onFonetica={toggleFonetica} onToggle={toggleTraduccion} labelToggle={labelToggle}/>

      {juegoActivo&&oracionActual?(
        <ScrollView style={{flex:1}} contentContainerStyle={styles.areaJuego} keyboardShouldPersistTaps="always">
          <View style={styles.difWrap}><Text style={styles.difTexto}>{difLabel[nivelDif]}</Text></View>

          <View style={styles.traduccionWrap}>
            <Text style={styles.traduccionLabel}>¿Cómo se dice en hebreo?</Text>
            <Text style={styles.traduccion}>"{textoTraduccion}"</Text>
          </View>

          <View style={[styles.zonaArmado,feedback==='correcto'&&{borderColor:'#4ECDC4'},feedback==='incorrecto'&&{borderColor:'#FF6B6B'}]}>
            <Text style={styles.zonaLabel}>Tu oración (de derecha a izquierda ←):</Text>
            {/* RTL con row-reverse */}
            <View style={styles.oracionRTL}>
              {oracionArmada.length===0
                ?<Text style={styles.placeholder}>Tocá las palabras de abajo ↓</Text>
                :oracionArmada.map((b,i)=>(
                    <View key={i} style={styles.palabraArmada}>
                      <Text style={styles.palabraArmadaEmoji}>{b.emoji}</Text>
                      <Text style={modo===MODOS.FONETICA?styles.palabraFonetica:styles.palabraArmadaTexto}>
                        {modo===MODOS.FONETICA?b.fonetica:b.palabra}
                      </Text>
                    </View>
                  ))
              }
            </View>
            {feedback==='correcto'&&<Text style={styles.feedbackOk}>¡Perfecto! 🎉 +{10+oracionActual.dificultad*5} pts</Text>}
            {feedback==='incorrecto'&&<Text style={styles.feedbackError}>¡El orden no era ese! 😅</Text>}
            {oracionArmada.length>0&&feedback===''&&(
              <TouchableOpacity onPress={deshacer} style={styles.btnDeshacer}>
                <Text style={styles.btnDeshacerTexto}>↩ Deshacer</Text>
              </TouchableOpacity>
            )}
          </View>

          <View style={styles.bloquesWrap}>
            <Text style={styles.bloquesLabel}>Tocá en el orden correcto:</Text>
            <View style={styles.bloquesGrid}>
              {bloquesDisp.map(b=>(
                <BloqueWord key={b.idBloque} palabra={b.palabra} fonetica={b.fonetica} emoji={b.emoji}
                  usado={usados.has(b.idBloque)} modo={modo} onPress={()=>elegirBloque(b)}/>
              ))}
            </View>
          </View>

          {feedback==='correcto'&&(
            <View style={styles.referenciaWrap}>
              <Text style={styles.referenciaLabel}>La oración en hebreo:</Text>
              <Text style={styles.referenciaTexto}>{oracionActual.palabras.join(' ')}</Text>
              <Text style={styles.referenciaFonetica}>{oracionActual.fonetica}</Text>
            </View>
          )}
        </ScrollView>
      ):(
        <View style={styles.pantallaInicio}>
          <Text style={styles.inicioEmoji}>💬</Text>
          <Text style={styles.inicioTitulo}>מִשְׁפָּטִים</Text>
          <Text style={styles.inicioSubtitulo}>¡Armá oraciones!</Text>
          <Text style={styles.inicioDesc}>Empezás fácil y vas subiendo de dificultad. ¡Hasta 6 palabras! El hebreo va de derecha a izquierda.</Text>
          <TouchableOpacity style={styles.botonJugar} onPress={iniciarJuego}><Text style={styles.botonJugarTexto}>¡JUGAR! 🚀</Text></TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles=StyleSheet.create({
  contenedor:{flex:1,backgroundColor:'#3d0066'},
  hud:{flexDirection:'row',justifyContent:'space-between',alignItems:'center',paddingHorizontal:16,paddingVertical:12,backgroundColor:'rgba(0,0,0,0.35)'},
  btnVolver:{padding:8},btnVolverTexto:{color:'rgba(255,255,255,0.8)',fontSize:16,fontWeight:'700'},
  vidasRow:{flexDirection:'row',gap:4},puntosWrap:{alignItems:'flex-end'},
  puntosLabel:{color:'rgba(255,255,255,0.5)',fontSize:11,fontWeight:'800',letterSpacing:1},puntosValor:{color:'#FFE566',fontSize:28,fontWeight:'900'},
  areaJuego:{padding:14,gap:12,paddingBottom:30},
  difWrap:{alignItems:'center'},difTexto:{color:'#c084fc',fontSize:14,fontWeight:'700'},
  traduccionWrap:{backgroundColor:'rgba(255,255,255,0.08)',borderRadius:14,padding:14,alignItems:'center'},
  traduccionLabel:{color:'rgba(255,255,255,0.5)',fontSize:12,fontWeight:'700',letterSpacing:1,textTransform:'uppercase'},
  traduccion:{color:'#FFE566',fontSize:20,fontWeight:'900',textAlign:'center',marginTop:4},
  zonaArmado:{backgroundColor:'rgba(255,255,255,0.06)',borderRadius:14,padding:14,borderWidth:2,borderColor:'rgba(255,255,255,0.15)'},
  zonaLabel:{color:'rgba(255,255,255,0.5)',fontSize:12,fontWeight:'700',letterSpacing:1,textTransform:'uppercase',marginBottom:10},
  oracionRTL:{flexDirection:'row-reverse',flexWrap:'wrap',gap:8,minHeight:55,alignItems:'center',justifyContent:'flex-start'},
  placeholder:{color:'rgba(255,255,255,0.3)',fontSize:14,fontStyle:'italic'},
  palabraArmada:{backgroundColor:'rgba(155,93,229,0.55)',borderRadius:10,paddingHorizontal:10,paddingVertical:6,alignItems:'center'},
  palabraArmadaEmoji:{fontSize:18},
  palabraArmadaTexto:{color:'#fff',fontSize:17,fontWeight:'900',writingDirection:'rtl'},
  palabraFonetica:{color:'#fff',fontSize:15,fontWeight:'900'},
  feedbackOk:{color:'#4ECDC4',fontSize:17,fontWeight:'900',marginTop:8,textAlign:'center'},
  feedbackError:{color:'#FF6B6B',fontSize:17,fontWeight:'900',marginTop:8,textAlign:'center'},
  btnDeshacer:{alignSelf:'flex-end',marginTop:6,padding:6},btnDeshacerTexto:{color:'rgba(255,255,255,0.5)',fontSize:13,fontWeight:'700'},
  bloquesWrap:{},bloquesLabel:{color:'rgba(255,255,255,0.5)',fontSize:12,fontWeight:'700',letterSpacing:1,textTransform:'uppercase',marginBottom:10},
  bloquesGrid:{flexDirection:'row',flexWrap:'wrap',gap:10},
  bloque:{borderRadius:12,borderWidth:2},bloqueTouch:{paddingHorizontal:14,paddingVertical:10,alignItems:'center',gap:3},
  bloqueEmoji:{fontSize:22},bloqueTexto:{fontSize:17,fontWeight:'900',writingDirection:'rtl'},bloqueFonetica:{fontSize:15,fontWeight:'900'},
  referenciaWrap:{backgroundColor:'rgba(78,205,196,0.15)',borderRadius:12,padding:12,alignItems:'center',borderWidth:1,borderColor:'rgba(78,205,196,0.4)'},
  referenciaLabel:{color:'rgba(255,255,255,0.5)',fontSize:11,fontWeight:'700',letterSpacing:1,textTransform:'uppercase'},
  referenciaTexto:{color:'#4ECDC4',fontSize:22,fontWeight:'900',writingDirection:'rtl',textAlign:'right',marginTop:4},
  referenciaFonetica:{color:'rgba(78,205,196,0.7)',fontSize:14,fontWeight:'700',marginTop:2},
  pantallaInicio:{flex:1,justifyContent:'center',alignItems:'center',gap:14,paddingHorizontal:32},
  inicioEmoji:{fontSize:70},inicioTitulo:{color:'#FFE566',fontSize:52,fontWeight:'900',writingDirection:'rtl'},
  inicioSubtitulo:{color:'#fff',fontSize:24,fontWeight:'700',textAlign:'center'},
  inicioDesc:{color:'rgba(255,255,255,0.6)',fontSize:15,textAlign:'center',lineHeight:22},
  botonJugar:{backgroundColor:'#FFE566',paddingHorizontal:52,paddingVertical:18,borderRadius:32,marginTop:8,elevation:10},
  botonJugarTexto:{color:'#1a1060',fontSize:26,fontWeight:'900'},
});
