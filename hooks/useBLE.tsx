/* eslint-disable no-bitwise */
import { useState } from "react";
import { PermissionsAndroid, Platform } from "react-native";
import { Device } from "react-native-ble-plx";
import DeviceInfo from "react-native-device-info";
import { PERMISSIONS , requestMultiple } from "react-native-permissions";
type VoidCallback = (result: boolean) => void;

import { bleManager } from "../constants/BleManager";


interface BluetoothLowEnergyApi {
  requestPermission(cb: VoidCallback): Promise<void>;
  scanForPeripherals(): void;
  allDevices : Device[]
}


const ECG_UUID = '54d29f5d-1023-4fca-a692-c9ec3c33a6b9';
const P2P_UUID = "c8f5dcc6-b70c-4eba-bd90-2058cb2718bb"


export default function useBLE() : BluetoothLowEnergyApi{

    const [allDevices, setAllDevices] = useState<Device[]>([]);
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
      bleManager.startDeviceScan([ECG_UUID,P2P_UUID], null, (error, device) => {
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

    

    return {
        requestPermission,
        scanForPeripherals,
        allDevices,
    }
}