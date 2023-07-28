import { HeaderTitle, createStackNavigator } from "react-navigation-stack"
import Home from "../screens/Home"
import Bluetooth from "../screens/Bluetooth"
import { createAppContainer } from "react-navigation"
import HealthMonitor from "../screens/HeallthMonitor"
import Profile from "../screens/Profile"
import { COLORS } from "../constants/Theme"
import { useEffect } from "react"
import SplashScreen from "react-native-splash-screen"




const screens = {
    
    
    Home : {
        screen : Home,
        navigationOptions : {
            title : "LOGIN"
        }
    },
    Profile : {
        screen : Profile,
            
        navigationOptions : {
            title : "USER PROFILE",
            
            
        }
    },
    Bluetooth : {
        screen : Bluetooth,
        navigationOptions : {
            title : "CONNECTION"
        }
    },
    HealthMonitor : {
        screen : HealthMonitor,
        navigationOptions : {
            title : "HEALTH MONITOR"
        }
    }
}



const HomeStack = createStackNavigator(screens,{
    defaultNavigationOptions : {
        headerStyle : { backgroundColor : COLORS.primary , height : 60,},
        headerTintColor : '#fff',
        headerTitleStyle :{
            fontWeight:"bold"
        }
        



    }
})

export default createAppContainer(HomeStack)