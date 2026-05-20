// src/screens/HomeScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions, Platform, StatusBar } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withSpring, withRepeat, withSequence, withTiming } from 'react-native-reanimated';
import { cargarEstadoInicial, registrarSesionHoy } from '../services/storage';
import { NIVELES_DATA } from '../data/gameData';

const { width: W } = Dimensions.get('window');
const SB_H = Platform.OS==='android' ? (StatusBar.currentHeight||24) : 44;

const TarjetaNivel = ({ nivel, estrellas, onPress }) => {
  const escala = useSharedValue(1);
  const estiloAnim = useAnimatedStyle(() => ({ transform:[{scale:escala.value}] }));
  const manejarPress = () => {
    escala.value = withSequence(withSpring(0.93,{damping:6}), withSpring(1.0,{damping:8}));
    setTimeout(()=>onPress(nivel),150);
  };
  return (
    <Animated.View style={[styles.tarjeta, estiloAnim]}>
      <TouchableOpacity onPress={manejarPress} activeOpacity={0.9} style={styles.tarjetaTouch}>
        <Text style={styles.tarjetaIcono}>{nivel.icono}</Text>
        <Text style={styles.tarjetaNombre}>{nivel.nombre}</Text>
        <Text style={styles.tarjetaHebreo}>{nivel.hebreo}</Text>
        <View style={styles.estrellasRow}>
          {[1,2,3].map(i=><Text key={i} style={{fontSize:16,opacity:i<=estrellas?1:0.2}}>⭐</Text>)}
        </View>
        <View style={styles.barraWrap}>
          <View style={[styles.barraFill,{width:`${(estrellas/3)*100}%`,backgroundColor:nivel.color}]}/>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

export default function HomeScreen({ navigation }) {
  const [estado, setEstado] = useState(null);
  const [racha,  setRacha]  = useState(0);
  const flotacion = useSharedValue(0);
  const pulso     = useSharedValue(1);

  useEffect(() => {
    cargarEstadoInicial().then(e=>{setEstado(e);setRacha(e.racha.diasConsecutivos);});
    registrarSesionHoy().then(r=>setRacha(r.diasConsecutivos));
    flotacion.value = withRepeat(withSequence(withTiming(-10,{duration:1800}),withTiming(0,{duration:1800})),-1,true);
    pulso.value     = withRepeat(withSequence(withSpring(1.04,{damping:4}),withSpring(1.0,{damping:4})),-1,true);
  },[]);

  useEffect(()=>{
    const u=navigation.addListener('focus',()=>cargarEstadoInicial().then(e=>{setEstado(e);setRacha(e.racha.diasConsecutivos);}));
    return u;
  },[navigation]);

  const estiloMascota = useAnimatedStyle(()=>({transform:[{translateY:flotacion.value}]}));
  const estiloBoton   = useAnimatedStyle(()=>({transform:[{scale:pulso.value}]}));
  const getProg = id => estado?.progreso?.[`nivel${id}`] || {estrellas:0};

  return (
    <View style={styles.contenedor}>
      <View style={{height:SB_H}}/>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>

        <View style={styles.hud}>
          <View style={styles.rachaBadge}>
            <Text style={styles.rachaIcono}>🔥</Text>
            <Text style={styles.rachaNum}>{racha}</Text>
            <Text style={styles.rachaLabel}>días</Text>
          </View>
          <View style={styles.puntosBadge}>
            <Text style={{fontSize:18}}>⭐</Text>
            <Text style={styles.puntosNum}>{estado?.progreso?.puntosTotal||0}</Text>
          </View>
          <View style={styles.gemasBadge}>
            <Text style={{fontSize:18}}>💎</Text>
            <Text style={styles.gemasNum}>{Math.floor((estado?.progreso?.puntosTotal||0)/10)}</Text>
          </View>
        </View>

        <Text style={styles.titulo}>HébreKids</Text>
        <Text style={styles.subtitulo}>✨ aprendé jugando ✨</Text>

        <Animated.View style={[styles.mascotaWrap, estiloMascota]}>
          <View style={styles.bocadillo}>
            <Text style={styles.bocadilloTexto}>¡Hola! ¿Listo para{'\n'}aprender hebreo? 🎉</Text>
          </View>
          <Text style={styles.mascotaCara}>🦊</Text>
        </Animated.View>

        <Text style={styles.seccionTitulo}>🗺️ Tu camino</Text>
        <View style={styles.grid}>
          {NIVELES_DATA.map(nivel=>(
            <TarjetaNivel key={nivel.id} nivel={nivel}
              estrellas={getProg(nivel.id).estrellas}
              onPress={n=>navigation.navigate(n.screen)}/>
          ))}
        </View>

        <Animated.View style={estiloBoton}>
          <TouchableOpacity style={styles.botonJugar} activeOpacity={0.9}
            onPress={()=>navigation.navigate('Level1')}>
            <Text style={styles.botonJugarTexto}>▶ ¡JUGAR AHORA!</Text>
            <Text style={styles.botonJugarSub}>
              {racha>0?`¡Tu racha de ${racha} días te espera! 🔥`:'¡Empezá tu aventura! 🚀'}
            </Text>
          </TouchableOpacity>
        </Animated.View>

        <View style={styles.navInferior}>
          {[{i:'🏠',l:'Inicio',a:true},{i:'🗺️',l:'Mapa'},{i:'🐾',l:'Mascota'},{i:'🏆',l:'Logros'}].map(item=>(
            <View key={item.l} style={styles.navItem}>
              <Text style={styles.navIcono}>{item.i}</Text>
              <Text style={[styles.navLabel,item.a&&styles.navLabelActivo]}>{item.l}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor:{flex:1,backgroundColor:'#1a1060'},
  scroll:{paddingBottom:20},
  hud:{flexDirection:'row',justifyContent:'space-between',alignItems:'center',paddingHorizontal:20,paddingBottom:10},
  rachaBadge:{flexDirection:'row',alignItems:'center',backgroundColor:'rgba(255,200,0,0.2)',borderRadius:20,paddingHorizontal:12,paddingVertical:6,gap:4,borderWidth:1,borderColor:'rgba(255,200,0,0.4)'},
  rachaIcono:{fontSize:20},rachaNum:{color:'#FFE566',fontSize:18,fontWeight:'900'},rachaLabel:{color:'rgba(255,230,100,0.8)',fontSize:12,fontWeight:'700'},
  puntosBadge:{flexDirection:'row',alignItems:'center',gap:6},
  puntosNum:{color:'#FFE566',fontSize:18,fontWeight:'900'},
  gemasBadge:{flexDirection:'row',alignItems:'center',backgroundColor:'rgba(155,93,229,0.3)',borderRadius:20,paddingHorizontal:12,paddingVertical:6,gap:4,borderWidth:1,borderColor:'rgba(155,93,229,0.5)'},
  gemasNum:{color:'#c084fc',fontSize:18,fontWeight:'900'},
  titulo:{color:'#FFE566',fontSize:36,fontWeight:'900',textAlign:'center',letterSpacing:1},
  subtitulo:{color:'rgba(255,255,255,0.6)',fontSize:15,textAlign:'center',marginBottom:10,letterSpacing:2},
  mascotaWrap:{alignItems:'center',marginVertical:10},
  bocadillo:{backgroundColor:'rgba(255,255,255,0.95)',borderRadius:16,padding:12,marginBottom:8,maxWidth:210},
  bocadilloTexto:{color:'#2d1b8c',fontSize:15,fontWeight:'700',textAlign:'center',lineHeight:20},
  mascotaCara:{fontSize:90},
  seccionTitulo:{color:'rgba(255,255,255,0.7)',fontSize:14,fontWeight:'800',letterSpacing:2,textTransform:'uppercase',paddingHorizontal:20,marginTop:8,marginBottom:10},
  grid:{flexDirection:'row',flexWrap:'wrap',paddingHorizontal:12,gap:10,justifyContent:'center'},
  tarjeta:{width:(W-44)/2,backgroundColor:'rgba(255,255,255,0.1)',borderRadius:18,borderWidth:1.5,borderColor:'rgba(255,255,255,0.2)',overflow:'hidden'},
  tarjetaTouch:{padding:14,alignItems:'center',gap:5},
  tarjetaIcono:{fontSize:36},tarjetaNombre:{color:'#fff',fontSize:16,fontWeight:'700'},
  tarjetaHebreo:{color:'rgba(255,255,255,0.7)',fontSize:20,fontWeight:'700',writingDirection:'rtl'},
  estrellasRow:{flexDirection:'row',gap:2},
  barraWrap:{width:'100%',height:5,backgroundColor:'rgba(255,255,255,0.15)',borderRadius:3,marginTop:4,overflow:'hidden'},
  barraFill:{height:'100%',borderRadius:3},
  botonJugar:{marginHorizontal:16,marginTop:16,backgroundColor:'#FFE566',borderRadius:20,paddingVertical:18,alignItems:'center',elevation:10},
  botonJugarTexto:{color:'#1a1060',fontSize:24,fontWeight:'900',letterSpacing:1},
  botonJugarSub:{color:'rgba(26,16,96,0.7)',fontSize:13,fontWeight:'700',marginTop:2},
  navInferior:{flexDirection:'row',justifyContent:'space-around',paddingVertical:14,marginTop:16,borderTopWidth:1,borderTopColor:'rgba(255,255,255,0.1)',backgroundColor:'rgba(0,0,0,0.3)'},
  navItem:{alignItems:'center',gap:3},navIcono:{fontSize:24},
  navLabel:{fontSize:10,fontWeight:'800',color:'rgba(255,255,255,0.4)',letterSpacing:1,textTransform:'uppercase'},
  navLabelActivo:{color:'#FFE566'},
});
