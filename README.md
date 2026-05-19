# HébreKids 🎮

App móvil gamificada para aprender hebreo moderno. 100% offline.

## Stack
- React Native + Expo SDK 55
- react-native-reanimated (animaciones 60fps)
- lottie-react-native (celebraciones)
- expo-haptics (vibración táctil)
- AsyncStorage (progreso offline)
- expo-sqlite (historial)

## Estructura
```
src/
  screens/
    HomeScreen.js     ← Pantalla principal
    Level1Screen.js   ← Minijuego Alef-Bet (burbujas)
  data/
    alefbet.js        ← Datos del alfabeto hebreo
  services/
    storage.js        ← Persistencia 100% offline
```

## Build APK
Push a `main` → GitHub Actions → EAS buildea → APK en expo.dev

## Audios
Ejecutar `scripts/generar-audios-hebreo.js` con credenciales de Google Cloud TTS
para generar los MP3 de pronunciación y guardarlos en `assets/sounds/`.
