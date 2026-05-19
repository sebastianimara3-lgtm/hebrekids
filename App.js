import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen   from './src/screens/HomeScreen';
import Level1Screen from './src/screens/Level1Screen';
import Level2Screen from './src/screens/Level2Screen';
import Level3Screen from './src/screens/Level3Screen';
import Level4Screen from './src/screens/Level4Screen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false, animationEnabled: true }}>
        <Stack.Screen name="Home"   component={HomeScreen} />
        <Stack.Screen name="Level1" component={Level1Screen} />
        <Stack.Screen name="Level2" component={Level2Screen} />
        <Stack.Screen name="Level3" component={Level3Screen} />
        <Stack.Screen name="Level4" component={Level4Screen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
