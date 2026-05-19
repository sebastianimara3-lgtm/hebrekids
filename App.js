import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>אָלֶף-בֵּית</Text>
      <Text style={styles.subtitulo}>¡HébreKids está vivo! 🎉</Text>
      <Text style={styles.mensaje}>La app funciona perfectamente</Text>
      <StatusBar style="light" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1060',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
  },
  titulo: {
    color: '#FFE566',
    fontSize: 64,
    fontWeight: '900',
    textAlign: 'center',
  },
  subtitulo: {
    color: '#ffffff',
    fontSize: 24,
    fontWeight: '700',
    textAlign: 'center',
  },
  mensaje: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 16,
    textAlign: 'center',
  },
});