import {StyleSheet} from 'react-native'
import { COLORS, FONT } from '../constants/Theme';



const   Styless = StyleSheet.create({
    container : {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
 txt:{
             color:COLORS.primary,
             fontWeight:`900`,
             fontSize:40,
             alignContent:'center',
             marginLeft:90,
             marginTop:250
             
    },
    btncontainer:{
        elevation: 8,
          backgroundColor:COLORS.primary,
          borderRadius: 10,
          paddingVertical: 10,
          paddingHorizontal: 12,
          justifyContent:"space-between",
          margin:5,
          alignContent:"center",
          marginTop:250
          
      },
      btntxt:{
        fontSize: 18,
        color: "#fff",
        fontWeight: "bold",
        alignSelf: "center",
        textTransform: "uppercase"
      },
    title : {
        color : "#000"
    }

})


export default Styless