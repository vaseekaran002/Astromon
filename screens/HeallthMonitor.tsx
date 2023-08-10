import React, { useRef, useState } from 'react'
import { SafeAreaView, ScrollView, Text } from 'react-native'
import { NavigationScreenProp } from 'react-navigation'
import { useEffect } from 'react';
import { bleManager } from '../constants/BleManager';
import { Device } from 'react-native-ble-plx';
import base64 from 'react-native-base64';
import ChartJs, { SetData } from '../components/Chart/Chart';




const ECG_UUID = '54d29f5d-1023-4fca-a692-c9ec3c33a6b9';
const ECG_CHARACTERISTIC = 'd80483ec-a402-45cb-a382-62cec74ddc3f';

const P2P_UUID = "c8f5dcc6-b70c-4eba-bd90-2058cb2718bb"
const SPO2_CHARACTERISTIC = 'e3a352b2-d542-4152-ac7f-f90840de0bbc';
const SYS_CHAR = 'd34a388e-f671-4f79-b72e-ee80dba7c507';
const DIA_CHAR = 'f0ee54d7-d1e3-4312-968f-40c8345c87a7';
const HR_CHAR = "54a7fe1d-ea44-4be1-8c1a-2d30ad136349"
export interface HealthMonitorProps {
    navigation: NavigationScreenProp<any,any>
  };

const HealthMonitor = (props : HealthMonitorProps) => {

   
  const devices = props.navigation.getParam('devices')

  const [hr ,setHr]  = useState<number>(0)
  const [sys , setSys] = useState<number>(0)
  const [dia  , setDia] = useState<number>(0)
  const [spo2 , setSpo2] = useState<number>(0)

  
  const setDataRef = useRef<SetData>();


    useEffect(() => {
      // if(devices[0].serviceUUIDs[0] === ECG_UUID){
      //   connecttoecg(devices[0])
      // }else{
      //   connecttop2p(devices[0])
      // }
      // if(devices[1].serviceUUIDs[0] === P2P_UUID){
      //   connecttop2p(devices[1])
      // }else{
      //   connecttoecg(devices[1])
      // }
      connecttoecg(devices[0])
      
    },[])



    const connecttoecg = async (device: Device) => {
      
      const deviceConnection = await bleManager.connectToDevice(device.id);
      await deviceConnection.discoverAllServicesAndCharacteristics();
      bleManager.stopDeviceScan();
      if (deviceConnection) {
        console.log("chaaaarrrr",await deviceConnection.services())
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
            setDataRef.current?.setData(parseFloat(rawData))
          }
          
        );
      }}


    const connecttop2p = async (device: Device) => {
      
        const deviceConnection = await bleManager.connectToDevice(device.id);
        await deviceConnection.discoverAllServicesAndCharacteristics();
        bleManager.stopDeviceScan();
        if (deviceConnection) {
          console.log("chaaaarrrr",await deviceConnection.services())
          deviceConnection.monitorCharacteristicForService(
           P2P_UUID,
           HR_CHAR,
            (error, characteristic) => {
             
              if (error) {
                console.log(error);
                return -1;
              } else if (!characteristic?.value) {
                return -1;
              }
              const rawData = base64.decode(characteristic.value);
              setHr(parseInt(rawData))
              //setDataRef.current?.setData(parseFloat(rawData))
            }
            
          );
         
          deviceConnection.monitorCharacteristicForService(
            P2P_UUID,
            SYS_CHAR,
             (error, characteristic) => {
              
               if (error) {
                 console.log(error);
                 return -1;
               } else if (!characteristic?.value) {
                 return -1;
               }
               const rawData = base64.decode(characteristic.value);
               setSys(parseInt(rawData))
               //setDataRef.current?.setData(parseFloat(rawData))
             }
             
           );
           deviceConnection.monitorCharacteristicForService(
            P2P_UUID,
            DIA_CHAR,
             (error, characteristic) => {
              
               if (error) {
                 console.log(error);
                 return -1;
               } else if (!characteristic?.value) {
                 return -1;
               }
               const rawData = base64.decode(characteristic.value);
               setDia(parseInt(rawData))
               //setDataRef.current?.setData(parseFloat(rawData))
             }
             
           );
           deviceConnection.monitorCharacteristicForService(
            P2P_UUID,
            SPO2_CHARACTERISTIC,
             (error, characteristic) => {
              
               if (error) {
                 console.log(error);
                 return -1;
               } else if (!characteristic?.value) {
                 return -1;
               }
               const rawData = base64.decode(characteristic.value);
               setSpo2(parseInt(rawData))
               //setDataRef.current?.setData(parseFloat(rawData))
             }
             
           );
        } else {
          console.log('No Device Connected');
        }



      }
    


    return (
        <SafeAreaView>
          <ScrollView    >
          <ChartJs  ref={setDataRef} />
          </ScrollView>
            <Text style={{color:"black"}}>spo2 : {spo2}  hr : {hr}  sys : {sys} Dia : {dia}</Text>
        </SafeAreaView>
    )

}


export default HealthMonitor

