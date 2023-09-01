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
      flexWrap:'wrap',
      flex:1,
        display:'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection:'column'
        
    },
    viw:{
     flexGrow:1
    },
    greet:{
      fontSize:30,
      fontFamily:'fantasy',
      textAlignVertical:'top',
      alignContent:"center",
      top:70,
      left:20,
      color:"black",
      textShadowRadius: 1,
    textShadowOffset: {
      width: 0,
      height: 1,
    },

    },
    slo : {
      color:"#FF8B94",
      
  alignContent:'center',
  top:300,
  left:5,
      fontSize:20,
      
      
    },
    

 txt:{
  fontFamily:'Courier, monospace', 
             color:COLORS.primary,
             fontWeight:'bold',
             fontSize:40,
             alignContent:'center',
             left:90,
             top:200,
              textShadowRadius: 4,
    textShadowOffset: {
      width: 0,
      height: 2,
    },
            
             
             
             
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