import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import HomeScreen   from './src/screens/HomeScreen';
import Level1Screen from './src/screens/Level1Screen';
import Level2Screen from './src/screens/Level2Screen';
import Level3Screen from './src/screens/Level3Screen';
import Level4Screen from './src/screens/Level4Screen';

const Stack = createStackNavigator();

class ErrorBoundary extends React.Component {
  constructor(props){super(props);this.state={error:null};}
  componentDidCatch(e){this.setState({error:e.message});}
  render(){
    if(this.state.error){
      const {View,Text}=require('react-native');
      return(<View style={{flex:1,backgroundColor:'#1a1060',justifyContent:'center',alignItems:'center',padding:20}}><Text style={{color:'#FF6B6B',fontSize:18,fontWeight:'900',marginBottom:16}}>❌ Error:</Text><Text style={{color:'#fff',fontSize:13,textAlign:'center'}}>{this.state.error}</Text></View>);
    }
    return this.props.children;
  }
}

export default function App() {
  return (
    <ErrorBoundary>
      <StatusBar style="light"/>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown:false}}>
          <Stack.Screen name="Home"   component={HomeScreen}/>
          <Stack.Screen name="Level1" component={Level1Screen}/>
          <Stack.Screen name="Level2" component={Level2Screen}/>
          <Stack.Screen name="Level3" component={Level3Screen}/>
          <Stack.Screen name="Level4" component={Level4Screen}/>
        </Stack.Navigator>
      </NavigationContainer>
    </ErrorBoundary>
  );
}
