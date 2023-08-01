/* eslint-disable no-bitwise */
import { useState } from "react";
import { PermissionsAndroid, Platform } from "react-native";
import { BleError, BleManager, Device, ScanMode } from "react-native-ble-plx";
import DeviceInfo from "react-native-device-info";
import { PERMISSIONS , requestMultiple } from "react-native-permissions";
import base64 from 'react-native-base64';
import { Characteristic } from 'react-native-ble-plx';
type VoidCallback = (result: boolean) => void;

import { bleManager } from "../constants/BleManager";


interface BluetoothLowEnergyApi {
  requestPermission(cb: VoidCallback): Promise<void>;
  scanForPeripherals(): void;
  allDevices : Device[]
  connectToDevice: (deviceId: Device) => Promise<void>;
  startStreamingData(devics : Device) : Promise<void>
  connectedDevice: Device | null;
  heartRate: number;
  spo2 : number;
  disconnectFromDevice: () => void;
  startStreamingSPO2Data(devics : Device) : Promise<void>
  connectToSPO2 :(deviceId: Device) => Promise<void>;
}

const HEART_RATE_UUID = '54d29f5d-1023-4fca-a692-c9ec3c33a6b9';
const HEART_RATE_CHARACTERISTIC = 'd80483ec-a402-45cb-a382-62cec74ddc3f';

const SPO2_UUID = '843cf399-832f-4fd4-9f80-33890d1a4507';
const SPO2_CHARACTERISTIC = '3962b05a-1989-409d-8fda-6882ba6f46cf';

export default function useBLE() : BluetoothLowEnergyApi{

    const [allDevices, setAllDevices] = useState<Device[]>([]);
    const [connectedDevice, setConnectedDevice] = useState<Device | null>(null);
    const [heartRate, setHeartRate] = useState<number>(0);
    const [spo2 ,setSpo2] = useState<number>(0) 

    const requestPermission = async (cb: VoidCallback) => {
      if (Platform.OS === 'android') {
        const apiLevel = await DeviceInfo.getApiLevel();
  
        if (apiLevel < 31) {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
              title: 'Location Permission',
              message: 'Bluetooth Low Energy requires Location',
              buttonNeutral: 'Ask Later',
              buttonNegative: 'Cancel',
              buttonPositive: 'OK',
            },
          );
          cb(granted === PermissionsAndroid.RESULTS.GRANTED);
        } else {
          const result = await requestMultiple([
            PERMISSIONS.ANDROID.BLUETOOTH_SCAN,
            PERMISSIONS.ANDROID.BLUETOOTH_CONNECT,
            PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
          ]);
  
          const isGranted =
            result['android.permission.BLUETOOTH_CONNECT'] ===
              PermissionsAndroid.RESULTS.GRANTED &&
            result['android.permission.BLUETOOTH_SCAN'] ===
              PermissionsAndroid.RESULTS.GRANTED &&
            result['android.permission.ACCESS_FINE_LOCATION'] ===
              PermissionsAndroid.RESULTS.GRANTED;
  
          cb(isGranted);
        }
      } else {
        cb(true);
      }
    };

    const isDuplicteDevice = (devices: Device[], nextDevice: Device) =>
                  devices.findIndex(device => nextDevice.id === device.id) > -1;

    const scanForPeripherals = () =>
      bleManager.startDeviceScan([HEART_RATE_UUID], null, (error, device) => {
      if (error) {
        console.log(error);
      }
      if (device?.id) {
        setAllDevices((prevState: Device[]) => {
          if (!isDuplicteDevice(prevState, device)) {
            return [...prevState, device];
          }
          return prevState;
        });
      }
    });

    const onHeartRateUpdate = (
      error: BleError | null,
      characteristic: Characteristic | null,
    ) => {
      if (error) {
        console.log(error);
        return -1;
      } else if (!characteristic?.value) {
        console.log('No Data was recieved');
        return -1;
      }
      
      const rawData = base64.decode(characteristic.value);

      setHeartRate(parseFloat(rawData));
    };


    const onSpo2Update = (
      error: BleError | null,
      characteristic: Characteristic | null,
    ) => {
      if (error) {
        console.log(error);
        return -1;
      } else if (!characteristic?.value) {
        console.log('No Data was recieved');
        return -1;
      }
      
      const rawData = base64.decode(characteristic.value);
      console.log(rawData)
      setSpo2(parseFloat(rawData));
    };

    const startStreamingData = async (device: Device) => {
      if (device) {
        device.monitorCharacteristicForService(
         HEART_RATE_UUID,
          HEART_RATE_CHARACTERISTIC,
          (error, characteristic) => onHeartRateUpdate(error, characteristic),
        );
      } else {
        console.log('No Device Connected');
      }
    };

    const startStreamingSPO2Data = async (device: Device) => {
      if (device) {
        device.monitorCharacteristicForService(
        HEART_RATE_UUID,
          HEART_RATE_CHARACTERISTIC,
          (error, characteristic) => onSpo2Update(error, characteristic),
        );
      } else {
        console.log('No Device Connected');
      }
    };

    const connectToDevice = async (device: Device) => {
      try {
        
        const deviceConnection = await bleManager.connectToDevice(device.id);
        setConnectedDevice(deviceConnection);
        await deviceConnection.discoverAllServicesAndCharacteristics();
        bleManager.stopDeviceScan();
        if(device.id === "30:C6:F7:99:61:96"){
             startStreamingData(deviceConnection);

        }else{
          startStreamingSPO2Data(deviceConnection)
        }
       
        
      } catch (e) {
        console.log('FAILED TO CONNECT', e);
      }
    };



   
    
    const connectToSPO2 = async (device: Device) => {
      try {
        const deviceConnection = await bleManager.connectToDevice(device.id);
        
        setConnectedDevice(deviceConnection);
        await deviceConnection.discoverAllServicesAndCharacteristics();
        bleManager.stopDeviceScan();
        startStreamingSPO2Data(deviceConnection);
      } catch (e) {
        console.log('FAILED TO CONNECT', e);
      }
    };


    const disconnectFromDevice = () => {
      if (connectedDevice) {
        bleManager.cancelDeviceConnection(connectedDevice.id);
        setConnectedDevice(null);
        setHeartRate(0);
      }
    };

    return {
        requestPermission,
        scanForPeripherals,
        allDevices,
        connectToDevice,
        connectedDevice,
        heartRate,
        disconnectFromDevice,
        startStreamingData,
        spo2,
        connectToSPO2,
        startStreamingSPO2Data
    }
}