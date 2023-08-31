import * as React from 'react';
import SplashScreen from 'react-native-splash-screen';
import { useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { LogBox } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import HealthMonitor from './screens/HeallthMonitor';
import BottomNavigationBar from './routes/Bottomnavbar';

LogBox.ignoreLogs(['new NativeEventEmitter']); // Ignore log notification by message
LogBox.ignoreAllLogs(); //Ignore all log notifications

const App = () => {
  

  const Stack = createStackNavigator()

  useEffect(() =>{
    SplashScreen.hide();
  },[]);
  
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Entry"
          component={BottomNavigationBar}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="HealthMonitor" component={HealthMonitor} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;