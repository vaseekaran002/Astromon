import React from 'react'
import { View ,Text ,TouchableOpacity} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { NavigationScreenProp } from 'react-navigation'
import ProfileStyles from './../styles/HomeStyles';


export interface ProfileScreenProps {
    navigation: NavigationScreenProp<any,any>
  };

const Profile = (props : ProfileScreenProps ) => {
  return (
    <SafeAreaView>
        <View >
            <Text style={ProfileStyles.title} > ASTROMON  </Text>

            <TouchableOpacity
                onPress={() => { props.navigation.navigate('Profile')}}
            >
                
                <Text  style={ProfileStyles.title}>Bluetooth </Text>
            </TouchableOpacity>
        </View>
    </SafeAreaView>
  )
}

export default Profile