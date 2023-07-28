
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
errortxt:{
color:"red"

},
    tittle:{
        fontSize:30,
        color:COLORS.primary,
        fontWeight:"bold",
        alignItems: 'center',
        justifyContent:'center'
    },
   
    container:{
        flex: 1,
        padding: 20,
        
        alignItems: 'stretch',
        borderStyle: "solid",
       backgroundColor:"white",
       justifyContent: 'space-between',
      
    },
    textt:{
        
        fontSize: 20,
        font : FONT.bold,
        color :'black',
    
    },
    btnscontainter:{
justifyContent:"space-between",
display:"flex"
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
        margin:5
      

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
