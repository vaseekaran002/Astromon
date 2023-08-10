import {  createStackNavigator } from "react-navigation-stack"
import Bluetooth from "../screens/Bluetooth"
import { createAppContainer } from "react-navigation"
import HealthMonitor from "../screens/HeallthMonitor"
import { COLORS } from "../constants/Theme"




const screens = {
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



const MonitorStack = createStackNavigator(screens,{
    defaultNavigationOptions : {
        headerStyle : { backgroundColor : COLORS.primary , height : 60,},
        headerTintColor : '#fff',
        headerTitleStyle :{
            fontWeight:"bold"
        }
    }
})

export default createAppContainer(MonitorStack)