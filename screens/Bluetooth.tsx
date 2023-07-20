import React, {useEffect, useRef, useState} from 'react';
import {
  Dimensions,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import DeviceModal from '../components/DeviceConnectionModal';
import useBLE from '../hooks/useBLE';
import { Device } from 'react-native-ble-plx';
import { LineChart } from 'react-native-chart-kit';

const Bluetooth = () => {
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
  const [ecg,setEcg] = useState<number[]>([])
  const [idx,setIdx] = useState<number>(0)
  const graphRef = useRef(null)


  
  useEffect(() => {
    setInterval(() => {
      setEcg((prevState: number[]) => {
        return [...prevState, heartRate];
      })
      if(ecg.length > 50){
        ecg.shift()
      }
      
    },1000)
    console.log("ecg" ,ecg)
  },[heartRate])

  function changeData(){
    setEcg((prevState: number[]) => {
      return [...prevState, heartRate];
    })
    if(ecg.length > 50){
      ecg.shift()
    }
  }

  const scanForDevices = () => {
    requestPermission(isGranted => {
      if(isGranted){
        scanForPeripherals();
      }
    });

  };

  const chartData = {
    labels: [],
    datasets: [
      {
        data: ecg,
        color: (opacity = 0) => `rgba(0, 0, 0, ${opacity})`, // Line color
        strokeWidth: 2, // Line width
      },
    ],
  };

  const chartConfig = {

    backgroundGradientFrom: '#F9C0E1', // Set the chart background color to #FF0000
    backgroundGradientTo: '#F9C0E1',
    decimalPlaces: 2,
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    labelColor: (opacity = 1 ) => `rgba(255, 255, 255, ${opacity})`,
    style: {
      borderRadius: 16,
    },
    propsForDots: {
      r: '0', // Set the radius to 0 to hide the dots
      strokeWidth: '0',
      stroke: '#ffa726',
    },
    propsForBackgroundLines: {
      strokeWidth: 1,
      stroke: '#FC0393', 
    },
    propsForVerticalLabels: {
      fontSize: 10,
      stroke : "black"
    },
    propsForHorizontalLabels: {
      fontSize: 10,
      
    },
    fillShadowGradientOpacity:0,
    useShadowColorFromDataset : true,
    bezier : true  // Disable bezier curve to get straight lines
  };


  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setEcg(heartRate.slice(idx,idx+50))
  //     setIdx(idx+1)
  //   },100)
  //   return () => clearInterval(interval)
  // },[idx])

  const hideModal = () => {
    setIsModalVisible(false);
  };

  const openModal = async () => {
    scanForDevices();
    setIsModalVisible(true);
  };

  return (
    <SafeAreaView style={styles.container}>
    <View style={styles.heartRateTitleWrapper}>
      {connectedDevice ? (
        <>
          <Text style={styles.heartRateTitleText}>Your Heart Rate Is:</Text>
          <Text style={styles.heartRateText}>{heartRate} bpm</Text>
         {ecg && <LineChart
          data={chartData}
          width={Dimensions.get('window').width}
          height={220}
          
          xLabelsOffset={2}
          yAxisInterval={1}
          chartConfig={chartConfig}
          style={{
            marginVertical: 8,
            borderRadius: 16,
          }}
        />
}
        </>
      ) : (
        <Text style={styles.heartRateTitleText}>
          Please Connect to a Heart Rate Monitor
        </Text>
      )}
    </View>
    <TouchableOpacity
      onPress={connectedDevice ? disconnectFromDevice : openModal}
      style={styles.ctaButton}>
      <Text style={styles.ctaButtonText}>
        {connectedDevice ? 'Disconnect' : 'Connect'}
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