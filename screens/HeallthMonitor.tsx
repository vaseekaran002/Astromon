import React from 'react'
import { ActivityIndicator, Dimensions, SafeAreaView, Text, View} from 'react-native'
import { NavigationScreenProp } from 'react-navigation'
import useBLE from '../hooks/useBLE'
import { useEffect } from 'react';
import { useState } from 'react';
import { LineChart } from 'react-native-chart-kit'



export interface HealthMonitorProps {
    navigation: NavigationScreenProp<any,any>
  };

const HealthMonitor = (props : HealthMonitorProps) => {
    
    const {connectToDevice,heartRate,connectedDevice} = useBLE()
    const devices = props.navigation.getParam('devices')
    useEffect(() => {
        connectToDevice(devices[0])
    },[])

    const [buffer ,setBuffer] = useState<number[]>([])

    useEffect(() => {
        if(buffer.length <= 20){
         setBuffer([...buffer,heartRate])
        }
        else{
         let deleted = buffer.splice(0,3,heartRate)
         console.log(buffer)
        }
        
     },[heartRate])
   
    
     const chartData = {
        labels: [],
        datasets: [
          {
            data: buffer,
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
        useShadowColorFromDataset : false,
        bezier : false  // Disable bezier curve to get straight lines
      };
    


    return (
        <SafeAreaView>
            <View>
                <Text style={{textAlign:"center",color:"#000"}}>ECG GRAPH</Text>
                  { connectedDevice ? (<LineChart
                    data={chartData}
                    width={Dimensions.get('window').width}
                    height={220}
                    yAxisInterval={1}
                    chartConfig={chartConfig}
                    style={{
                        marginVertical: 8,
                        borderRadius: 16,
                    }}
                />) : (
                    <ActivityIndicator size={"small"} color={"#000"} />
                )}
                
            </View>
        </SafeAreaView>
    )

}


export default HealthMonitor

