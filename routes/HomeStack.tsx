import { createStackNavigator } from "react-navigation-stack"
import Home from "../screens/Home"
import Bluetooth from "../screens/Bluetooth"
import { createAppContainer } from "react-navigation"




const screens = {
    Home : {
        screen : Home
    },
    Bluetooth : {
        screen : Bluetooth
    }
}



const HomeStack = createStackNavigator(screens)

export default createAppContainer(HomeStack)