import React from 'react'
import { View ,Text ,TouchableOpacity} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import HomeStyles from '../styles/HomeStyles'
import { NavigationScreenProp } from 'react-navigation'
import Styless from '../styles/HomeStyles'

export interface HomeScreenProps {
    navigation: NavigationScreenProp<any,any>
  };

const Home = (props : HomeScreenProps ) => {
  return (
    <SafeAreaView>
        <View >
            <Text style={Styless.txt} > ASTROMON  </Text>

            

            <TouchableOpacity style ={Styless.btncontainer}
                onPress={() => { props.navigation.navigate('Profile')}}
            >
                
                <Text  style={Styless.btntxt}> My Profile </Text>
            </TouchableOpacity>
        </View>
    </SafeAreaView>
  )
}

export default Home