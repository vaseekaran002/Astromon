import * as React from 'react';
import SplashScreen from 'react-native-splash-screen';
import { useEffect } from 'react';
import BottomNavigationBar from './routes/Bottomnavbar'


const App = () => {
  
  useEffect(() =>{
    SplashScreen.hide();
  },[]);
  
  return (
    <BottomNavigationBar/>
  );
};

export default App;