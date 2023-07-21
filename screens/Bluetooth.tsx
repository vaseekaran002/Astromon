import React, {useEffect, useRef, useState} from 'react';
import {
  Dimensions,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import DeviceModal from '../components/DeviceConnectionModal';
import useBLE from '../hooks/useBLE';
import { LineChart } from 'react-native-chart-kit';
import { NavigationScreenProp } from 'react-navigation';

export interface HomeScreenProps {
  navigation: NavigationScreenProp<any,any>
};

const Bluetooth = (props : HomeScreenProps) => {
  const {
    requestPermission,
    scanForPeripherals,
    allDevices,
    connectToDevice,
    connectedDevice,
    heartRate,
    disconnectFromDevice
   
  } = useBLE();
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  


 

  const scanForDevices = () => {
    requestPermission(isGranted => {
      if(isGranted){
        scanForPeripherals();
      }
    });

  };

  

  

  const hideModal = () => {
    setIsModalVisible(false);
    props.navigation.navigate('HealthMonitor',{devices : allDevices})
  };

  const openModal = async () => {
    scanForDevices();
    setIsModalVisible(true);
  };

  return (
    <SafeAreaView style={styles.container}>
    <View style={styles.heartRateTitleWrapper}>
        <Text style={styles.heartRateTitleText}>
          Please Connect to a Heart Rate Monitor
        </Text>
    </View>
    <TouchableOpacity
      onPress={openModal}
      style={styles.ctaButton}>
      <Text style={styles.ctaButtonText}>
        Connect
      </Text>
    </TouchableOpacity>
    <DeviceModal
      closeModal={hideModal}
      visible={isModalVisible}
      connectToPeripheral={connectToDevice}
      devices={allDevices}
    />
  </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
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
    backgroundColor: 'purple',
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    marginHorizontal: 20,
    marginBottom: 5,
    borderRadius: 8,
  },
  ctaButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default Bluetooth;