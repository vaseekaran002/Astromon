import React from 'react'
import { View ,Text ,TouchableOpacity} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import HomeStyles from '../styles/HomeStyles'
import { NavigationScreenProp } from 'react-navigation'

export interface HomeScreenProps {
    navigation: NavigationScreenProp<any,any>
  };

const Home = (props : HomeScreenProps ) => {
  return (
    <SafeAreaView>
        <View >
            <Text style={HomeStyles.title} > ASTROMON  </Text>

            <TouchableOpacity
                onPress={() => { props.navigation.navigate('Bluetooth')}}
            >
                
                <Text  style={HomeStyles.title}>Bluetooth </Text>
            </TouchableOpacity>
        </View>
    </SafeAreaView>
  )
}

export default Home