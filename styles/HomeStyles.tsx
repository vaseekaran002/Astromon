import {StyleSheet} from 'react-native'
import { COLORS, FONT } from '../constants/Theme';
import { Colors } from 'react-native/Libraries/NewAppScreen';



const   Styless = StyleSheet.create({

  shadowProp: {
    shadowColor: '#171717',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.4,
    shadowRadius: 2,
  },
    container : {
        display:'flex',
        justifyContent: 'center',
        alignItems: 'center',
        
    },
    greet:{
      fontSize:30,
      fontFamily:'fantasy',
      textAlignVertical:'top',
      alignContent:"center",
      top:70,
      left:20,
      color:"black"

    },
    slo : {
      color:"#FF8B94",
      display:'flex',
  alignContent:'center',
  top:10,
      fontSize:20,
      
    },
    

 txt:{
  fontFamily:'Courier, monospace', 
             color:COLORS.primary,
             fontWeight:'bold',
             fontSize:40,
             alignContent:'center',
             marginLeft:90,
             marginTop:250
             
             
    },
    ImageBackground: {
      flex: 1,
      resizeMode: "cover",
      width: "100%",
      alignItems: "center",
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