import React from 'react'
import { View ,Text ,TouchableOpacity} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import HomeStyles from '../styles/HomeStyles'
import Styless from '../styles/HomeStyles'
import Profile from './Profile'
import AsyncStorage from '@react-native-async-storage/async-storage';



const Home = ( ) => {
  // const getUser = async () => {
  //   try {
  //     const savedUser = await AsyncStorage.getItem("user");
  //     const currentUser = JSON.parse(savedUser);
  //     console.log(currentUser);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  return (
    <SafeAreaView>
        <View >
            <Text style={Styless.txt} > ASTROMON  </Text>
        </View>
    </SafeAreaView>
  )
}

export default Home