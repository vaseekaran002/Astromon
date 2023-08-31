import React, { useState, useEffect } from 'react'
import { View, Text, ImageBackground } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Styless from '../styles/HomeStyles';
import Styles from '../styles/ProfileStyle';
const bgimg = require("./assest/bg.png")

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
  console.log('Image Path:', bgimg);
  const getCurrentHour = new Date().getHours();
  var greet;
  if (getCurrentHour>=5 && getCurrentHour < 12){
    greet="Good morning !";

  }
  else if (getCurrentHour >= 12 && getCurrentHour < 18){
    greet="Good afternoon !";
  }
  else{
    greet="Good evening !"
  }

  return (
    <View style={Styless.container}>
      
    <ImageBackground
    source={bgimg}
    resizeMode="cover"
    style={{
      width: '100%',
      height: '100%', // or a specific height value
    }}
  >
    {/* <Text style={Styless.greet}>{greet}{userData.name}</Text> */}
    <SafeAreaView>
      
      <View>
     
  <Text style={Styless.txt}>ASTROMON</Text>
  {/* <Text style={Styless.slo}>"Your Heart's Guardian, Every Beat Counts."</Text> */}
  
 
    </View>
    
    </SafeAreaView>
    </ImageBackground>
    </View>
  );
}

export default Home;
