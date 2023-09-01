import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, NavigationProp, ParamListBase } from '@react-navigation/native';
import { COLORS } from '../constants/Theme';

const Onboarding: React.FC = () => {
  const navigation = useNavigation<NavigationProp<ParamListBase>>();
  const [isLoading, setIsLoading] = useState(false);

  // useEffect(() => {
  //   AsyncStorage.getItem('hideLandingPage').then(value => {
  //     if (value === 'true') {
  //       // If onboarding has been completed, navigate to the main component
  //       navigation.navigate('BottomNavigationBar'); // Replace with the actual bottom navigation route name
  //     } else {
  //       setIsLoading(false); // Onboarding is not completed, stop loading
  //     }
  //   });
  // }, []);

  const handleGetStarted = async () => {
    await AsyncStorage.setItem('hideLandingPage', 'true');
    navigation.navigate('BottomNavigationBar'); 
  };

  if (isLoading) {
    return null;
  }

  return (
    <View style={styles.maskGroup}>
      <View style={styles.androidLarge1}>
        <Image
          style={styles.heart11}
          resizeMode="cover"
          source={require("./assest/heart.png")}
        />
        <Text style={[styles.astromon, styles.astromonText]}> ASTROMON</Text>
        <Text style={[styles.yourPersonalEcg, styles.astromonText]}>
          {" "}
          Your Personal ECG Health Partner
        </Text>
        <Text style={styles.navigatingThePath}>
          {" "}
          Navigating the Path to a Healthier You..
        </Text>
        <TouchableOpacity style={styles.startButton} onPress={handleGetStarted}>
        <Text style={styles.startButtonText}>Let's Get Started</Text>
      </TouchableOpacity>
      </View>
    </View>
    
      
    
  );
};

const styles = StyleSheet.create({
 
  startButton: {
    
   
    position: 'absolute',
    bottom: 40, // Adjust the bottom position as needed
    alignSelf: 'center',
    elevation: 8,
    backgroundColor:COLORS.primary,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 30,
    justifyContent:"space-between",
    margin:5,
    alignContent:"center",
    marginTop:250 
  },
  startButtonText: {
    color: 'white',
    fontSize: 18,
  },

  astromonText: {
    textShadowRadius: 4,
    textShadowOffset: {
      width: 0,
      height: 2,
    },
    textShadowColor: 'rgba(0, 0, 0, 0.25)',
    textAlign: 'center',
    position: 'absolute',
    color: '#2a437e',   
  },
  
  heart11: {
    top: 229,
    left: 65,
    width: 272,
    height: 268,
    zIndex: 0,
    position: "absolute",
    alignItems:'center'
  },
  astromon: {
    alignContent:'center',
    top:90,
    width: 201,
    height: 90,
    fontFamily: "Lilita One",
    fontSize: 36,
    fontWeight: "700",
    fontStyle: "normal",
    lineHeight: 36,
    color: "#2A437E",
    left:100,
    shadowColor: "rgba(0, 0, 0, 0.25)",
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowRadius: 4,
    shadowOpacity: 1
    
  },
  yourPersonalEcg: {
    top: 196,
    left: 40,
    fontSize: 18,
    fontFamily:'inderRegular',
    color: "#9f9898",
    width: 311,
    height: 24,
    zIndex: 2,
  },
  navigatingThePath: {
    top: 552,
    left: 50,
    fontSize: 20,
    fontFamily: 'basicRegular',
    color: "#000",
    width: 345,
    height: 50,
    zIndex: 3,
    textAlign: "left",
    position: "absolute",
  },
  androidLarge1: {
    top: 0,
    left: 0,
    backgroundColor: "#fff",
    borderWidth: 1,
    width: '100%',
    overflow: "hidden",
    padding: 10,
    position: "absolute",
    height: '100%',
    
  },
  maskGroup: {
    display:'flex',
    
    flex:1,
    shadowColor: "rgba(0, 0, 0, 0.25)",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowRadius: 4,
    elevation: 4,
    shadowOpacity: 1,
    width: "100%",
    height: '100%',
    justifyContent: 'center', 
    alignItems: 'center',
  },
})

export default Onboarding;
