// src/components/BannerModal.js
// Modal que aparece al abrir la app con el contenido controlado remotamente
// Soporta: texto+emoji, imagen desde URL, botón con link, temporizador

import React, { useEffect, useState } from 'react';
import {
  Modal, View, Text, StyleSheet, TouchableOpacity,
  Image, Linking, Dimensions, Platform, StatusBar,
} from 'react-native';
import Animated, {
  useSharedValue, useAnimatedStyle,
  withSpring, withTiming,
} from 'react-native-reanimated';

const { width: W, height: H } = Dimensions.get('window');

export default function BannerModal({ banner, onCerrar }) {
  const [segundosRestantes, setSegundosRestantes] = useState(null);
  const escala = useSharedValue(0.8);
  const opa    = useSharedValue(0);

  useEffect(() => {
    if (!banner) return;

    // Animación de entrada
    escala.value = withSpring(1, { damping: 14, stiffness: 200 });
    opa.value    = withTiming(1, { duration: 300 });

    // Temporizador automático (solo si duracionSegundos > 0)
    if (banner.duracionSegundos > 0) {
      setSegundosRestantes(banner.duracionSegundos);
      const interval = setInterval(() => {
        setSegundosRestantes(s => {
          if (s <= 1) {
            clearInterval(interval);
            onCerrar();
            return 0;
          }
          return s - 1;
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [banner]);

  const estiloCard = useAnimatedStyle(() => ({
    transform: [{ scale: escala.value }],
    opacity:   opa.value,
  }));

  const abrirLink = () => {
    if (banner?.botonUrl) {
      Linking.openURL(banner.botonUrl).catch(() => {});
    }
  };

  if (!banner) return null;

  const colorFondo  = banner.colorFondo  || '#1a1060';
  const colorTexto  = banner.colorTexto  || '#FFE566';
  const colorBoton  = banner.colorBoton  || '#FFE566';

  return (
    <Modal
      visible={!!banner}
      transparent
      animationType="fade"
      statusBarTranslucent
    >
      <View style={styles.overlay}>
        <Animated.View style={[styles.card, { backgroundColor: colorFondo }, estiloCard]}>

          {/* Botón cerrar */}
          <TouchableOpacity onPress={onCerrar} style={styles.btnCerrar}>
            <Text style={styles.btnCerrarTexto}>✕</Text>
          </TouchableOpacity>

          {/* Emoji grande (si hay) */}
          {banner.emoji ? (
            <Text style={styles.emoji}>{banner.emoji}</Text>
          ) : null}

          {/* Imagen desde URL (si hay) */}
          {banner.imagenUrl ? (
            <Image
              source={{ uri: banner.imagenUrl }}
              style={styles.imagen}
              resizeMode="contain"
            />
          ) : null}

          {/* Título */}
          {banner.titulo ? (
            <Text style={[styles.titulo, { color: colorTexto }]}>
              {banner.titulo}
            </Text>
          ) : null}

          {/* Mensaje */}
          {banner.mensaje ? (
            <Text style={[styles.mensaje, { color: colorTexto + 'CC' }]}>
              {banner.mensaje}
            </Text>
          ) : null}

          {/* Botón con link (opcional) */}
          {banner.botonTexto ? (
            <TouchableOpacity
              style={[styles.boton, { backgroundColor: colorBoton }]}
              onPress={abrirLink}
              activeOpacity={0.85}
            >
              <Text style={[styles.botonTexto, { color: colorFondo }]}>
                {banner.botonTexto}
              </Text>
            </TouchableOpacity>
          ) : null}

          {/* Botón cerrar principal */}
          <TouchableOpacity
            style={[styles.botonCerrar, { borderColor: colorTexto + '44' }]}
            onPress={onCerrar}
            activeOpacity={0.85}
          >
            <Text style={[styles.botonCerrarTexto, { color: colorTexto + '99' }]}>
              {segundosRestantes
                ? `Cerrar en ${segundosRestantes}s`
                : 'Cerrar'
              }
            </Text>
          </TouchableOpacity>

        </Animated.View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex:            1,
    backgroundColor: 'rgba(0,0,0,0.75)',
    justifyContent:  'center',
    alignItems:      'center',
    padding:         24,
  },
  card: {
    width:        W * 0.88,
    borderRadius: 28,
    padding:      28,
    alignItems:   'center',
    gap:          14,
    borderWidth:  1,
    borderColor:  'rgba(255,255,255,0.15)',
    // Sombra
    shadowColor:   '#000',
    shadowOffset:  { width: 0, height: 12 },
    shadowOpacity: 0.4,
    shadowRadius:  24,
    elevation:     16,
  },
  btnCerrar: {
    position:        'absolute',
    top:             14,
    right:           14,
    width:           32,
    height:          32,
    borderRadius:    16,
    backgroundColor: 'rgba(255,255,255,0.15)',
    justifyContent:  'center',
    alignItems:      'center',
    zIndex:          10,
  },
  btnCerrarTexto: {
    color:      'rgba(255,255,255,0.7)',
    fontSize:   16,
    fontWeight: '700',
  },
  emoji: {
    fontSize:   72,
    marginTop:  8,
  },
  imagen: {
    width:        W * 0.7,
    height:       200,
    borderRadius: 14,
    marginTop:    8,
  },
  titulo: {
    fontSize:   24,
    fontWeight: '900',
    textAlign:  'center',
    letterSpacing: 0.5,
  },
  mensaje: {
    fontSize:   15,
    fontWeight: '500',
    textAlign:  'center',
    lineHeight: 22,
  },
  boton: {
    borderRadius:      16,
    paddingHorizontal: 28,
    paddingVertical:   14,
    marginTop:         4,
    elevation:         6,
    width:             '100%',
    alignItems:        'center',
  },
  botonTexto: {
    fontSize:   17,
    fontWeight: '900',
  },
  botonCerrar: {
    borderRadius:      12,
    paddingHorizontal: 20,
    paddingVertical:   8,
    borderWidth:       1,
  },
  botonCerrarTexto: {
    fontSize:   13,
    fontWeight: '600',
  },
});
