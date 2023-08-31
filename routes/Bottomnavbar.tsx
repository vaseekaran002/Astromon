import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import Bluetooth from '../screens/Bluetooth';
import Profile from '../screens/Profile';
import Home from '../screens/Home';
import { COLORS } from '../constants/Theme';
import { StyleSheet } from 'react-native';

const Tab = createBottomTabNavigator();

const BottomNavigationBar = () => {
  return (

      <Tab.Navigator 
      
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) => {
            let iconName = '';
            if (route.name === 'Home') {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === 'Bluetooth') {
              iconName = focused?'bluetooth':'bluetooth-outline';
            } else if (route.name === 'Profile') {
              iconName = focused?'person-circle' : 'person-circle-outline';
            }
            return <Icon name={iconName} size={size} color={"#36454F"} />;
          },
          tabBarActiveTintColor:COLORS.primary, 
          tabBarInactiveTintColor: 'gray',
          tabBarShowLabel:false
        })}
      >
        
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Bluetooth" component={Bluetooth}  />
        <Tab.Screen name="Profile" component={Profile} />
      </Tab.Navigator>
    
  );
};
const styles = StyleSheet.create({
  shadow:{
    shadowColor :'#696969',
    shadowOffset:{
      width:10,
      height:10,
    },
    shadowOpacity:0.25,
    shadowRadius:3.5,
    elevation:5,
  }
})

export default BottomNavigationBar;
