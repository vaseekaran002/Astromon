import React from 'react'
import { ActivityIndicator, Dimensions, SafeAreaView, Text, View} from 'react-native'
import { NavigationScreenProp } from 'react-navigation'
import useBLE from '../hooks/useBLE'
import { useEffect } from 'react';
import { useState } from 'react';
import { LineChart } from 'react-native-chart-kit'
import HealthMonitorStyles from '../styles/HealthMonitorStyle';
import { COLORS } from '../constants/Theme';


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
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`, // Line color
            strokeWidth: 2, // Line width
          },
        ],
      };

    const chartConfig = {

        backgroundGradientFrom: COLORS.primary, 
        backgroundGradientTo: COLORS.primary,
        decimalPlaces: 2,
        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        labelColor: (opacity = 1 ) => `rgba(255, 255, 255, ${opacity})`,
        style: {
          borderRadius: 16,
        },
        propsForDots: {
          r: '0', // Set the radius to 0 to hide the dots
          strokeWidth: '0',
        },
        propsForBackgroundLines: {
          strokeWidth: 0,
          stroke: '#FFF', 
        },
        propsForVerticalLabels: {
          fontSize: 10,
          stroke : "black"
        },
        propsForHorizontalLabels: {
          fontSize: 10,
          
        },
        
      };
    


    return (
        <SafeAreaView>
            <View style={HealthMonitorStyles.ecgContainer} >
                <Text style={HealthMonitorStyles.ecgTitle}>ECG GRAPH</Text>
                
                  { connectedDevice ? (<LineChart
                    data={chartData}
                    width={Dimensions.get('window').width * 0.95}
                    height={220}
                    withShadow={false}
                    yAxisInterval={1}
                    chartConfig={chartConfig}
                    bezier
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

