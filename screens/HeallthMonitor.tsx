import React, { useRef } from 'react'
import { SafeAreaView } from 'react-native'
import { NavigationScreenProp } from 'react-navigation'
import { useEffect } from 'react';
import { useState } from 'react';
import ecgdata from './ecgdata.json'
import { bleManager } from '../constants/BleManager';
import { Device } from 'react-native-ble-plx';
import base64 from 'react-native-base64';
import { Chart } from "@dpwiese/react-native-canvas-charts/ChartJs";
import ChartJs, { SetData } from '../components/Chart/Chart';
// Circular buffer class to manage the data points



const HEART_RATE_UUID = '54d29f5d-1023-4fca-a692-c9ec3c33a6b9';
const HEART_RATE_CHARACTERISTIC = 'd80483ec-a402-45cb-a382-62cec74ddc3f';




export interface HealthMonitorProps {
    navigation: NavigationScreenProp<any,any>
  };

const HealthMonitor = (props : HealthMonitorProps) => {

   
  const devices = props.navigation.getParam('devices')

  


  
  const setDataRef = useRef<SetData>();


    useEffect(() => {
      connecttodevice(devices[0])
      
    

    },[])


    const connecttodevice = async (device: Device) => {
        const deviceConnection = await bleManager.connectToDevice(device.id);
        await deviceConnection.discoverAllServicesAndCharacteristics();
        bleManager.stopDeviceScan();
      
        if (deviceConnection) {
         
          deviceConnection.monitorCharacteristicForService(
           HEART_RATE_UUID,
            HEART_RATE_CHARACTERISTIC,
            (error, characteristic) => {
          
              if (error) {
                console.log(error);
                return -1;
              } else if (!characteristic?.value) {
                return -1;
              }
              const rawData = base64.decode(characteristic.value);
            
              setDataRef.current?.setData(parseInt(rawData))
            },
          );
        } else {
          console.log('No Device Connected');
        }



      }
    
    
const data = {
  
  labels: ["dd"],
  datasets: [{
    backgroundColor: "rgb(224, 110, 60)",
              borderColor: "rgb(224, 110, 60)",
              data: [],
              fill: false,
              pointRadius: 0,
              lineTension: 0.05,
              borderWidth : 1
  }]
};

let delayBetweenPoints : number = 0
    
const config = {
  type: 'line',
  data: data,
  options: {
      animation: {
          x: {
              type: 'number',
              easing: 'linear',
              duration: delayBetweenPoints,
              from: NaN, // the point is initially skipped
             
          },
          y: {
              type: 'number',
              easing: 'linear',
              duration: delayBetweenPoints,
              
            
          }
      },
      interaction: {
          intersect: false
      },
      plugins: {
          legend: false
      },
      scales: {
          x: {
              type: 'category',

              ticks: {
                  stepSize: 10
              },
              grid: {
                  // display: false
              }
          },
          y: {
              min : 0,
              max : 4000,
              grid: {
                  // display: false
              }
          }
      }
  }

};

  
      // const chartConfig = {
      //   type: "line",
      //   data: {
      //     datasets: [
      //       {
      //         label: [],
      //         backgroundColor: "rgb(224, 110, 60)",
      //         borderColor: "rgb(224, 110, 60)",
      //         data: [],
      //         fill: false,
      //         pointRadius: 0,
      //         lineTension: 0.1,
      //         borderJoinStyle: "round",
      //       },
      //     ],
      //   },
        
      //   responsive: true,
      //   plugins: {
      //       title: {
      //           display: true,
      //           text: 'Chart.js'
      //       }
      //   },
      //   scales: {
      //       x: {
      //           display: true
      //       },
      //       y: {
      //           display: true
      //       }
      //   }
    
      // };
      


      
    


    return (
        <SafeAreaView>
            <ChartJs config={config} ref={setDataRef} />
        </SafeAreaView>
    )

}


export default HealthMonitor
