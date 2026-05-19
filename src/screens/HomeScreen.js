import React, { useEffect, useRef } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity,
  ScrollView, Dimensions, SafeAreaView,
} from 'react-native';
import Animated, {
  useSharedValue, useAnimatedStyle,
  withSpring, withRepeat, withSequence,
  withTiming, Easing,
} from 'react-native-reanimated';

const { width: W } = Dimensions.get('window');

// ── Datos de los 4 niveles ──────────────────────────────────────
const NIVELES = [
  { id: 1, nombre: 'Alef-Bet',     hebreo: 'אָלֶף-בֵּית', icono: '🔤', color: '#4ECDC4', desbloqueado: true,  estrellas: 2 },
  { id: 2, nombre: 'Palabras',     hebreo: 'מִלִּים',      icono: '🧩', color: '#FFE566', desbloqueado: true,  estrellas: 1 },
  { id: 3, nombre: 'Oraciones',    hebreo: 'מִשְׁפָּטִים', icono: '💬', color: '#9B5DE5', desbloqueado: false, estrellas: 0 },
  { id: 4, nombre: 'Conversación', hebreo: 'שִׂיחָה',      icono: '🎭', color: '#F77F00', desbloqueado: false, estrellas: 0 },
];

// ── Componente Estrella animada ─────────────────────────────────
const Estrella = ({ llena }) => (
  <Text style={{ fontSize: 16, opacity: llena ? 1 : 0.25 }}>⭐</Text>
);

// ── Componente Tarjeta de Nivel ─────────────────────────────────
const TarjetaNivel = ({ nivel, onPress }) => {
  const escala = useSharedValue(1);

  const estiloAnimado = useAnimatedStyle(() => ({
    transform: [{ scale: escala.value }],
  }));

  const manejarPress = () => {
    escala.value = withSequence(
      withSpring(0.93, { damping: 6 }),
      withSpring(1.0,  { damping: 8 })
    );
    setTimeout(() => onPress(nivel), 150);
  };

  return (
    <Animated.View style={[styles.tarjeta, !nivel.desbloqueado && styles.tarjetaBloqueada, estiloAnimado]}>
      <TouchableOpacity onPress={manejarPress} activeOpacity={0.9} style={styles.tarjetaTouch}>
        {!nivel.desbloqueado && <Text style={styles.candado}>🔒</Text>}
        <Text style={styles.tarjetaIcono}>{nivel.icono}</Text>
        <Text style={styles.tarjetaNombre}>{nivel.nombre}</Text>
        <Text style={styles.tarjetaHebreo}>{nivel.hebreo}</Text>
        <View style={styles.estrellasRow}>
          {[1,2,3].map(i => <Estrella key={i} llena={i <= nivel.estrellas} />)}
        </View>
        <View style={styles.barraWrap}>
          <View style={[styles.barraFill, {
            width: `${nivel.estrellas / 3 * 100}%`,
            backgroundColor: nivel.color
          }]} />
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

// ── Pantalla Principal ──────────────────────────────────────────
export default function HomeScreen({ navigation }) {

  // Animación de la mascota: flota arriba y abajo
  const flotacion = useSharedValue(0);
  // Animación del botón jugar: pulso
  const pulsoBoton = useSharedValue(1);
  // Racha de días (hardcodeada por ahora)
  const racha = 7;

  useEffect(() => {
    // Mascota flotando
    flotacion.value = withRepeat(
      withSequence(
        withTiming(-12, { duration: 1800, easing: Easing.inOut(Easing.sine) }),
        withTiming(  0, { duration: 1800, easing: Easing.inOut(Easing.sine) })
      ),
      -1, true
    );
    // Botón pulsando
    pulsoBoton.value = withRepeat(
      withSequence(
        withSpring(1.05, { damping: 4 }),
        withSpring(1.00, { damping: 4 })
      ),
      -1, true
    );
  }, []);

  const estiloMascota = useAnimatedStyle(() => ({
    transform: [{ translateY: flotacion.value }],
  }));

  const estiloBoton = useAnimatedStyle(() => ({
    transform: [{ scale: pulsoBoton.value }],
  }));

  const manejarNivel = (nivel) => {
    if (!nivel.desbloqueado) return;
    // Acá navegaremos a cada nivel cuando los creemos
  };

  return (
    <SafeAreaView style={styles.contenedor}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>

        {/* ── HUD superior ── */}
        <View style={styles.hud}>
          <View style={styles.rachaBadge}>
            <Text style={styles.rachaIcono}>🔥</Text>
            <Text style={styles.rachaNum}>{racha}</Text>
            <Text style={styles.rachaLabel}>días</Text>
          </View>
          <View style={styles.gemasBadge}>
            <Text style={styles.gemasIcono}>💎</Text>
            <Text style={styles.gemasNum}>84</Text>
          </View>
        </View>

        {/* ── Título ── */}
        <Text style={styles.titulo}>HébreKids</Text>
        <Text style={styles.subtitulo}>✨ aprendé jugando ✨</Text>

        {/* ── Mascota animada ── */}
        <Animated.View style={[styles.mascotaWrap, estiloMascota]}>
          <View style={styles.bocadillo}>
            <Text style={styles.bocadilloTexto}>¡Hoy aprendemos{'\n'}la letra א! 🎉</Text>
          </View>
          {/* Mascota SVG simple con emojis */}
          <View style={styles.mascota}>
            <Text style={styles.mascotaCara}>🦊</Text>
          </View>
        </Animated.View>

        {/* ── Grid de niveles ── */}
        <Text style={styles.seccionTitulo}>🗺️ Tu camino</Text>
        <View style={styles.grid}>
          {NIVELES.map(nivel => (
            <TarjetaNivel key={nivel.id} nivel={nivel} onPress={manejarNivel} />
          ))}
        </View>

        {/* ── Botón jugar ── */}
        <Animated.View style={estiloBoton}>
          <TouchableOpacity style={styles.botonJugar} activeOpacity={0.9}>
            <Text style={styles.botonJugarTexto}>▶ ¡JUGAR AHORA!</Text>
            <Text style={styles.botonJugarSub}>¡Tu racha de {racha} días te espera! 🔥</Text>
          </TouchableOpacity>
        </Animated.View>

        {/* ── Nav inferior ── */}
        <View style={styles.navInferior}>
          {[
            { icono: '🏠', label: 'Inicio', activo: true },
            { icono: '🗺️', label: 'Mapa',   activo: false },
            { icono: '🐾', label: 'Mascota',activo: false },
            { icono: '🏆', label: 'Logros', activo: false },
          ].map((item) => (
            <TouchableOpacity key={item.label} style={styles.navItem}>
              <Text style={styles.navIcono}>{item.icono}</Text>
              <Text style={[styles.navLabel, item.activo && styles.navLabelActivo]}>
                {item.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

// ── Estilos ─────────────────────────────────────────────────────
const styles = StyleSheet.create({
  contenedor: { flex: 1, backgroundColor: '#1a1060' },
  scroll: { paddingBottom: 20 },

  hud: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingTop: 16, paddingBottom: 8 },
  rachaBadge: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(255,200,0,0.2)', borderRadius: 20, paddingHorizontal: 12, paddingVertical: 6, gap: 4, borderWidth: 1, borderColor: 'rgba(255,200,0,0.4)' },
  rachaIcono: { fontSize: 18 },
  rachaNum: { color: '#FFE566', fontSize: 16, fontWeight: '900' },
  rachaLabel: { color: 'rgba(255,230,100,0.8)', fontSize: 11, fontWeight: '700' },
  gemasBadge: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(155,93,229,0.3)', borderRadius: 20, paddingHorizontal: 12, paddingVertical: 6, gap: 4, borderWidth: 1, borderColor: 'rgba(155,93,229,0.5)' },
  gemasIcono: { fontSize: 16 },
  gemasNum: { color: '#c084fc', fontSize: 16, fontWeight: '900' },

  titulo: { color: '#FFE566', fontSize: 32, fontWeight: '900', textAlign: 'center', letterSpacing: 1 },
  subtitulo: { color: 'rgba(255,255,255,0.6)', fontSize: 13, textAlign: 'center', marginBottom: 8, letterSpacing: 2 },

  mascotaWrap: { alignItems: 'center', marginVertical: 8 },
  bocadillo: { backgroundColor: 'rgba(255,255,255,0.95)', borderRadius: 16, padding: 10, marginBottom: 8, maxWidth: 180 },
  bocadilloTexto: { color: '#2d1b8c', fontSize: 13, fontWeight: '700', textAlign: 'center', lineHeight: 18 },
  mascota: { alignItems: 'center' },
  mascotaCara: { fontSize: 80 },

  seccionTitulo: { color: 'rgba(255,255,255,0.7)', fontSize: 13, fontWeight: '800', letterSpacing: 2, textTransform: 'uppercase', paddingHorizontal: 20, marginTop: 8, marginBottom: 10 },

  grid: { flexDirection: 'row', flexWrap: 'wrap', paddingHorizontal: 12, gap: 10, justifyContent: 'center' },
  tarjeta: { width: (W - 44) / 2, backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: 18, borderWidth: 1.5, borderColor: 'rgba(255,255,255,0.2)', overflow: 'hidden' },
  tarjetaBloqueada: { opacity: 0.5 },
  tarjetaTouch: { padding: 14, alignItems: 'center', gap: 4 },
  candado: { position: 'absolute', top: 10, right: 10, fontSize: 14 },
  tarjetaIcono: { fontSize: 32 },
  tarjetaNombre: { color: '#fff', fontSize: 14, fontWeight: '700' },
  tarjetaHebreo: { color: 'rgba(255,255,255,0.7)', fontSize: 18, fontWeight: '700', writingDirection: 'rtl' },
  estrellasRow: { flexDirection: 'row', gap: 2 },
  barraWrap: { width: '100%', height: 4, backgroundColor: 'rgba(255,255,255,0.15)', borderRadius: 2, marginTop: 4, overflow: 'hidden' },
  barraFill: { height: '100%', borderRadius: 2 },

  botonJugar: { marginHorizontal: 16, marginTop: 16, backgroundColor: '#FFE566', borderRadius: 20, paddingVertical: 16, alignItems: 'center', shadowColor: '#FFD700', shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.5, shadowRadius: 16, elevation: 10 },
  botonJugarTexto: { color: '#1a1060', fontSize: 22, fontWeight: '900', letterSpacing: 1 },
  botonJugarSub: { color: 'rgba(26,16,96,0.7)', fontSize: 12, fontWeight: '700', marginTop: 2 },

  navInferior: { flexDirection: 'row', justifyContent: 'space-around', paddingVertical: 12, marginTop: 16, borderTopWidth: 1, borderTopColor: 'rgba(255,255,255,0.1)', backgroundColor: 'rgba(0,0,0,0.3)' },
  navItem: { alignItems: 'center', gap: 3 },
  navIcono: { fontSize: 22 },
  navLabel: { fontSize: 9, fontWeight: '800', color: 'rgba(255,255,255,0.4)', letterSpacing: 1, textTransform: 'uppercase' },
  navLabelActivo: { color: '#FFE566' },
});