import React from "react";
import { Text,StatusBar, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Home from "./Home";



 const  Onboarding = () => {
return(
    <View>
        <StatusBar barStyle="dark-content" backgroundColor="#fff"/>


     <Text>lets get started</Text> 
     <TouchableOpacity
                  onPress={Home}  />
    </View>
)

    
}
export default Onboarding;