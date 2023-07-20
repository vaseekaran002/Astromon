/* eslint-disable no-bitwise */
import { useState } from "react";
import { PermissionsAndroid, Platform } from "react-native";
import { BleError, BleManager, Characteristic, Device } from "react-native-ble-plx";
import DeviceInfo from "react-native-device-info";
import { PERMISSIONS , requestMultiple } from "react-native-permissions";
import base64 from 'react-native-base64';
type VoidCallback = (result: boolean) => void;

const bleManager = new BleManager();


interface BluetoothLowEnergyApi {
  requestPermission(cb: VoidCallback): Promise<void>;
  scanForPeripherals(): void;
  allDevices : Device[]
  connectToDevice: (deviceId: Device) => Promise<void>;
  connectedDevice: Device | null;
  heartRate: number;
  disconnectFromDevice: () => void;
}

const HEART_RATE_UUID = '54d29f5d-1023-4fca-a692-c9ec3c33a6b9';
const HEART_RATE_CHARACTERISTIC = 'd80483ec-a402-45cb-a382-62cec74ddc3f';

export default function useBLE() : BluetoothLowEnergyApi{

    const [allDevices, setAllDevices] = useState<Device[]>([]);
    const [connectedDevice, setConnectedDevice] = useState<Device | null>(null);
    const [heartRate, setHeartRate] = useState<number>(0);

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
      if (device) {
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
      //console.log(characteristic.value)
      const rawData = base64.decode(characteristic.value);
      let innerHeartRate: number = -1;
      
      // const firstBitValue: number = Number(rawData) & 0x01;
  
      // if (firstBitValue === 0) {
      //   innerHeartRate = rawData[1].charCodeAt(0);
      // } else {
      //   innerHeartRate =
      //     Number(rawData[1].charCodeAt(0) << 8) +
      //     Number(rawData[2].charCodeAt(2));
      // }
      //console.log(parseFloat(rawData))
      setHeartRate(parseFloat(rawData));
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

    const connectToDevice = async (device: Device) => {
      try {
        const deviceConnection = await bleManager.connectToDevice(device.id);
        setConnectedDevice(deviceConnection);
        await deviceConnection.discoverAllServicesAndCharacteristics();
        bleManager.stopDeviceScan();
        startStreamingData(deviceConnection);
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
        disconnectFromDevice
    }
}