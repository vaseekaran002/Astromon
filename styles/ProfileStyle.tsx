
import { StyleSheet } from 'react-native';
import { COLORS, FONT } from '../constants/Theme';


const Styles=StyleSheet.create({

    
textinpt:{
 borderColor:COLORS.primary,
 borderWidth:0,
 color:"#D3D3D3",
 marginBottom: 15,
 backgroundColor: "transparent",
 
},
formm:{
flex:1
},
errortxt:{
color:"red"

},
txt:{
  color:COLORS.primary,
  fontWeight:`900`,
  fontSize:40,
  marginLeft:90,
  marginTop:250
},

    tittle:{
        fontSize:30,
        color:COLORS.primary,
        fontWeight:"bold",
        alignItems: 'center',
        justifyContent:'center'
    },
    shadowProp: {
      shadowColor: '#171717',
      shadowOffset: {width: 0, height: 3},
      shadowOpacity: 0.4,
      shadowRadius: 2,
    },
   
    container:{
      flex:1,
        flexDirection:'column',
        padding: 20,
        marginBottom:50,
        alignItems: 'stretch',
        borderStyle: "solid",
       backgroundColor:"white",
      
      
    },
    textt:{
      "fontSize": 20,
      "fontFamily": "DMBold",
      "color": "black"
    }
    ,
    btnscontainter:{
justifyContent:"space-between",


    },
    bluetoothbtncontainer:{
      elevation: 8,
        backgroundColor:COLORS.primary,
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 12,
        justifyContent:"space-between",
        margin:5,
    },
    bluetoothbtntxt:{
      fontSize: 18,
      color: "#fff",
      fontWeight: "bold",
      alignSelf: "center",
      textTransform: "uppercase"
    },
  
    appbtncontainer:{
        elevation: 8,
        backgroundColor:COLORS.primary,
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 10,
        marginTop:5,
        margin:5,
    

    },
    approundbtn:{
     
        elevation: 8,
        backgroundColor: COLORS.primary,
        borderRadius: 50, // Half of the width or height for a circular button
        paddingVertical: 10,
        paddingHorizontal: 10,
        position: 'absolute', // Use absolute positioning
         // Adjust this value for spacing from the bottom
        right: 10, // Adjust this value for spacing from the right
        top:40
    },
    appbtntext:{
        fontSize: 18,
        color: "#fff",
        fontWeight: "bold",
        alignSelf: "center",
        textTransform: "uppercase"
    },

      rdiobtncontainer: {
        marginTop: 10,
      },
      genderContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      },
      gender: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
        color:"black"
      },
      genderOption: {
        flexDirection: 'row',
        alignItems: 'center',
      },
      genderText: {
        marginRight: 10,
        color:"black"
      },

})
export default Styles
