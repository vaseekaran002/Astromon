import { createStackNavigator } from "react-navigation-stack"
import Home from "../screens/Home"
import Bluetooth from "../screens/Bluetooth"
import { createAppContainer } from "react-navigation"
import HealthMonitor from "../screens/HeallthMonitor"





const screens = {
    Home : {
        screen : Home,
        navigationOptions : {
            title : "Login"
        }
    },
    Bluetooth : {
        screen : Bluetooth,
        navigationOptions : {
            title : "Connection"
        }
    },
    HealthMonitor : {
        screen : HealthMonitor,
        navigationOptions : {
            title : "Health Monitor"
        }
    }
}



const HomeStack = createStackNavigator(screens,{
    defaultNavigationOptions : {
        headerStyle : { backgroundColor : "#eee" , height : 60}
    }
})

export default createAppContainer(HomeStack)