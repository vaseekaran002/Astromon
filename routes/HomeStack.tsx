import { createStackNavigator } from "react-navigation-stack"
import Home from "../screens/Home"
import Bluetooth from "../screens/Bluetooth"
import { createAppContainer } from "react-navigation"
import HealthMonitor from "../screens/HeallthMonitor"
import Profile from "../screens/Profile"





const screens = {
    Home : {
        screen : Home,
        navigationOptions : {
            title : "Login"
        }
    },
    Profile : {
        screen : Profile,
        navigationOptions : {
            title : "Profile"
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