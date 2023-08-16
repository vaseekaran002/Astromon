import React, { useState, useEffect } from 'react'
import { View, Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Styless from '../styles/HomeStyles';

interface FormValues {
  name: string;
  age: string;
  deviceid: string;
  bloodgroup: string;
  gender: string;
  height: string;
  weight: string;
  
}
const Home = () => {
  const initialValues: FormValues = {
    name: '',
    age: '',
    deviceid: '',
    bloodgroup: '',
    gender: '',
    height: '',
    weight: '',
   

  };
 
  const [userData, setUserData] = useState(initialValues);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getUserData();
  }, []);

  const getUserData = async () => {
    try {
      const savedUser = await AsyncStorage.getItem("userProfile") || '{}';
      const currentUser = JSON.parse(savedUser);
      setUserData(currentUser);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SafeAreaView>
      <View>
        <Text style={Styless.txt}> ASTROMON </Text>
        {isLoading ? (
          <Text>Loading...</Text>
        ) : (
         
          <Text style={Styless.txt}>Welcome ,{userData.name}</Text>
           

        )}
      </View>
    </SafeAreaView>
  );
}

export default Home;
