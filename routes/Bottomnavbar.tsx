import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import Bluetooth from '../screens/Bluetooth';
import Profile from '../screens/Profile';
import Home from '../screens/Home';
import MonitorEntry from './../components/MonitorEntry';
import { COLORS } from '../constants/Theme';

const Tab = createBottomTabNavigator();

const BottomNavigationBar = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) => {
            let iconName = '';
            if (route.name === 'Home') {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === 'Bluetooth') {
              iconName = 'bluetooth';
            } else if (route.name === 'Profile') {
              iconName = 'person';
            }
            return <Icon name={iconName} size={size} color={color} />;
          },
          tabBarStyle: { backgroundColor: 'white' }, 
          tabBarItemStyle: { borderTopWidth: 1, borderColor: 'lightgray' }, 
          tabBarActiveTintColor:COLORS.primary, 
          tabBarInactiveTintColor: 'gray',
        })}
      >
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Bluetooth" component={MonitorEntry} />
        <Tab.Screen name="Profile" component={Profile} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default BottomNavigationBar;
