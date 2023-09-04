import React, {useRef, useState} from 'react';
import {Dimensions, Text, useWindowDimensions} from 'react-native';
import {NavigationScreenProp} from 'react-navigation';
import {useEffect} from 'react';
import {bleManager} from '../constants/BleManager';
import {Device} from 'react-native-ble-plx';
import base64 from 'react-native-base64';
import ChartJs, {SetData} from '../components/Chart/Chart';
import HealthMonitorStyles from '../styles/HealthMonitorStyle';
import {View} from 'react-native';
import {
  ECG_UUID,
  ECG_CHARACTERISTIC,
  PPG_UUID,
  SPO2_CHARACTERISTIC,
  SYS_CHARACTERISTIC,
  DIA_CCHARACTERISTIC,
  HR_CHARACTERISTIC,
} from '@env';
import Orientation from '../components/Orientation';
import {RouteProp} from '@react-navigation/native';

export interface HealthMonitorProps {
  navigation: NavigationScreenProp<any, any>;
  route: RouteProp<any, any>;
}

const HealthMonitor = (props: HealthMonitorProps) => {
  const devices = props.route.params?.devices;

  console.log(devices);
  const [hr, setHr] = useState<number>(0);
  const [sys, setSys] = useState<number>(0);
  const [dia, setDia] = useState<number>(0);
  const [spo2, setSpo2] = useState<number>(0);
  const [flexdir, setFlex] = useState<boolean>(
    Orientation.isPortrait() ? true : false,
  );

  Dimensions.addEventListener('change', () => {
    setFlex(!flexdir);
  });

  const setDataRef = useRef<SetData>();

  useEffect(() => {
    // if (devices[0].serviceUUIDs[0] === ECG_UUID) {
    //   connecttoecg(devices[0]);
    // } else {
    //   connecttop2p(devices[0]);
    // }
    // if (devices[1].serviceUUIDs[0] === PPG_UUID) {
    //   connecttop2p(devices[1]);
    // } else {
    //   connecttoecg(devices[1]);
    // }
    if (devices) {
      connecttop2p(devices[0]);
    }
  }, []);

  const connecttoecg = async (device: Device) => {
    const deviceConnection = await bleManager.connectToDevice(device.id);
    await deviceConnection.discoverAllServicesAndCharacteristics();
    bleManager.stopDeviceScan();
    if (deviceConnection) {
      deviceConnection.monitorCharacteristicForService(
        ECG_UUID,
        ECG_CHARACTERISTIC,
        (error, characteristic) => {
          if (error) {
            console.log(error);
            return -1;
          } else if (!characteristic?.value) {
            return -1;
          }
          const rawData = base64.decode(characteristic.value);
          setDataRef.current?.setData(parseFloat(rawData));
        },
      );
    }
  };

  const connecttop2p = async (device: Device) => {
    const deviceConnection = await bleManager.connectToDevice(device.id);
    await deviceConnection.discoverAllServicesAndCharacteristics();
    bleManager.stopDeviceScan();
    if (deviceConnection) {
      deviceConnection.monitorCharacteristicForService(
        PPG_UUID,
        HR_CHARACTERISTIC,
        (error, characteristic) => {
          if (error) {
            console.log(error);
            return -1;
          } else if (!characteristic?.value) {
            return -1;
          }
          const rawData = base64.decode(characteristic.value);
          setHr(parseInt(rawData));
          //setDataRef.current?.setData(parseFloat(rawData))
        },
      );

      deviceConnection.monitorCharacteristicForService(
        PPG_UUID,
        SYS_CHARACTERISTIC,
        (error, characteristic) => {
          if (error) {
            console.log(error);
            return -1;
          } else if (!characteristic?.value) {
            return -1;
          }
          const rawData = base64.decode(characteristic.value);
          setSys(parseInt(rawData));
          //setDataRef.current?.setData(parseFloat(rawData))
        },
      );
      deviceConnection.monitorCharacteristicForService(
        PPG_UUID,
        DIA_CCHARACTERISTIC,
        (error, characteristic) => {
          if (error) {
            console.log(error);
            return -1;
          } else if (!characteristic?.value) {
            return -1;
          }
          const rawData = base64.decode(characteristic.value);
          setDia(parseInt(rawData));
          //setDataRef.current?.setData(parseFloat(rawData))
        },
      );
      deviceConnection.monitorCharacteristicForService(
        PPG_UUID,
        SPO2_CHARACTERISTIC,
        (error, characteristic) => {
          if (error) {
            console.log(error);
            return -1;
          } else if (!characteristic?.value) {
            return -1;
          }
          const rawData = base64.decode(characteristic.value);
          setSpo2(parseInt(rawData));
          //setDataRef.current?.setData(parseFloat(rawData))
        },
      );
    } else {
      console.log('No Device Connected');
    }
  };

  return (
    <View
      style={[
        HealthMonitorStyles.page,
        {
          flexDirection: flexdir ? 'column' : 'row',
        },
      ]}>
      <View
        style={[
          HealthMonitorStyles.chartView,
          {
            flexDirection: 'column',
          },
        ]}>
        <View style={{flex: 1}}>
          <ChartJs
            chartWidth={
              flexdir
                ? useWindowDimensions().width * 0.95
                : useWindowDimensions().width * 0.7
            }
            ref={setDataRef}
          />
        </View>
      </View>

      <View
        style={[
          HealthMonitorStyles.container,
          {
            flexDirection: 'column',
          },
        ]}>
        <View
          style={[
            HealthMonitorStyles.row,
            {
              flexDirection: 'row',
            },
          ]}>
          <View style={HealthMonitorStyles.box}>
            <Text style={HealthMonitorStyles.ppgTitle}>SPO2</Text>
            <Text style={HealthMonitorStyles.ppgValue}>{spo2}</Text>
          </View>
          <View style={HealthMonitorStyles.box}>
            <Text style={HealthMonitorStyles.ppgTitle}>HR</Text>
            <Text style={HealthMonitorStyles.ppgValue}>{hr}</Text>
          </View>
        </View>
        <View
          style={[
            HealthMonitorStyles.row,
            {
              flexDirection: 'row',
            },
          ]}>
          <View style={HealthMonitorStyles.box}>
            <Text style={HealthMonitorStyles.ppgTitle}>SYS</Text>
            <Text style={HealthMonitorStyles.ppgValue}>{sys}</Text>
          </View>
          <View style={HealthMonitorStyles.box}>
            <Text style={HealthMonitorStyles.ppgTitle}>DIA</Text>
            <Text style={HealthMonitorStyles.ppgValue}>{dia}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default HealthMonitor;
