import { Dimensions, useWindowDimensions } from 'react-native'
import {StyleSheet} from 'react-native'
import { COLORS } from '../constants/Theme'




const   HealthMonitorStyles = StyleSheet.create({
   ecgTitle : {
     textAlign : "center",
     color : "#000"
   },
   ecgContainer : {
    display : "flex",
    justifyContent : "center",
    alignItems : "center"
   },
   page : {
    flex : 1
   },
   chartView : {
    flex : 4,
    padding : 7,
    justifyContent : "center",
    alignItems : "center"
  },
   container: {
    flex: 2,
    justifyContent:"center",
    alignItems : "center",
  },
  row : {
    flex : 3
  },
  box : {
    flex: 3,
    justifyContent : "center",
    alignItems : "center"
  },
 
  ppgTitle : {
    color : COLORS.primary,fontSize : 20,fontWeight:"900"
  },
  ppgValue : {
    color : "#000", fontWeight : "900",fontSize : 20
  }
})


export default HealthMonitorStyles