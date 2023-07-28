import { NavigationContainer } from '@react-navigation/native';
import * as React from 'react';
import Navigator from './routes/HomeStack'
import SplashScreen from 'react-native-splash-screen';
import { View } from 'react-native';
import { useEffect } from 'react';

const App = () => {
  
  useEffect(() =>{
    SplashScreen.hide();
  },[]);
  return (
    
    <Navigator/>
    
   
  );
};

export default App;