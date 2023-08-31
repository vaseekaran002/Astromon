import React, {useEffect, useRef, useState} from 'react';
import BluetoothStateManager from 'react-native-bluetooth-state-manager' ;
import {
  Dimensions,
  SafeAreaView,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import DeviceModal from '../components/DeviceConnectionModal';
import useBLE from '../hooks/useBLE';
import { NavigationScreenProp } from 'react-navigation';
import { COLORS } from '../constants/Theme';
import { ImageBackground } from 'react-native';
import { Device } from 'react-native-ble-plx';
const bgimg = require('./assest/bg.png')

export interface HomeScreenProps {
  navigation: NavigationScreenProp<any,any>
};

const Bluetooth = (props : HomeScreenProps) => {
  const {
    requestPermission,
    scanForPeripherals,
    allDevices,
   
  } = useBLE();
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [selectedDevices , setSelectedDevices] = useState<Device[]>([])


  const getSelectedDevices = (device : Device) => {
    setSelectedDevices([...selectedDevices,device])
  }


  const scanForDevices = () => {
    requestPermission(isGranted => {
      if(isGranted){
        scanForPeripherals();
      }
    });

  };

  
  const closeModal = () => {
    setIsModalVisible(false);
  };
  

  const hideModal = () => {
    setIsModalVisible(false);
    props.navigation.navigate('HealthMonitor',{devices : selectedDevices})
  };

  const openModal = async () => {
    BluetoothStateManager.getState().then((bluetoothState) => {
      switch (bluetoothState) {
        case 'PoweredOff':
          ToastAndroid.show('Please turn on Bluetooth',1000)
          break;
        case 'PoweredOn':
          scanForDevices();
          setIsModalVisible(true);
          break;
        default:
          break;
      }
    });
    
  };

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
  source={bgimg}
  resizeMode="cover"
  style={{
    width: '100%',
    height: '100%', // or a specific height value
  }}
>
<View style={styles.heartRateTitleWrapper}>
       
    
       <Text style={styles.heartRateTitleText}>
         Please Connect to a Heart Rate Monitor
       </Text>
   </View>
   <TouchableOpacity
     onPress={openModal}
     style={styles.ctaButton}>
     <Text style={styles.ctaButtonText}>
       Scan for Device
     </Text>
   </TouchableOpacity>
   <DeviceModal
     closeModal={hideModal}
     visible={isModalVisible}
     devices={allDevices}
     goBack = {closeModal}
     sendSelectedDevices={getSelectedDevices}
   />
  
</ImageBackground>
    
  </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.tertiary,
  },
  heartRateTitleWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    
  },
  heartRateTitleText: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginHorizontal: 20,
    color: 'black',
  },
  heartRateText: {
    fontSize: 25,
    marginTop: 15,
    color:"#000"
  },
  ctaButton: {
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    marginHorizontal: 20,
    marginBottom: 5,
    borderRadius: 8,
    bottom:90
  },
  ctaButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default Bluetooth;