import { StyleSheet, useWindowDimensions } from 'react-native'
import { StyleProp, View,ViewStyle } from "react-native";
import { WebView } from "react-native-webview";
import { useImperativeHandle ,forwardRef } from 'react';
import { ReactElement } from 'react';


  export type SetData = {
    setData: (data:number) => void;
  };

type Props = {
    config?: any; // eslint-disable-line @typescript-eslint/no-explicit-any
    dataSets?: number[];
    style?: StyleProp<ViewStyle>;
};

export const ChartJs = forwardRef(
    (props: Props, ref): ReactElement => {


  let webref: WebView<{ originWhitelist: string[]; ref: unknown; source: { uri: string } }> | null;
  
  const addChart = (): void => {
    webref?.injectJavaScript(`let delayBetweenPoints  = 0
            
    const config = {
      type: 'line',
      data: {
      
      labels: [],
      datasets: [{
        backgroundColor: "rgb(42, 67, 126)",
                  borderColor: "rgb(42, 67, 126)",
                  data: [],
                  fill: false,
                  pointRadius: 0,
                  lineTension: 0.05,
                  borderWidth : 1
      }]
    },
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
                
              },
              y: {
                  min : 0,
                  max : 5000,
              }
          }
      }

    };

  const canvasEl = document.createElement("canvas");
  canvasEl.height = 100;
  canvasEl.width = 300;
  document.body.appendChild(canvasEl);
  const ctx  = canvasEl.getContext('2d')
  window.canvasLine = new Chart(ctx,  config);true;


  function addData(chart, label, newData) {
      chart.data.labels.push(label);
      chart.data.datasets.forEach((dataset) => {
          dataset.data.push(newData);
      });
      chart.update();
  }

  function removeData(chart) {
    if(chart.data.datasets[0].data.length > 300){
      chart.data.labels.splice(0,2);
      chart.data.datasets.forEach((dataset) => {
          dataset.data.splice(0,2);
      });
      chart.update();
    }
  }
`);
  };


  const styles = StyleSheet.create({
    webview: {
      height: 400 ,
      width : useWindowDimensions().width  ,

    },
   
  });



  const setData = (dataSets : number) => {
    if (dataSets) {
        webref?.injectJavaScript(` var today = new Date();
        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        removeData(window.canvasLine)
        addData(window.canvasLine,time,${JSON.stringify(dataSets)})`);
    
    }
  };

  useImperativeHandle(ref, () => ({
    setData,
  }));

  return (
    
         <View   style={styles.webview } >
        <WebView
          originWhitelist={["*"]}
          ref={(r): WebView<{ originWhitelist: string[]; ref: unknown; source: { uri : string } }> | null =>
            (webref = r)
          }
          domStorageEnabled={true}
          javaScriptEnabled={true}
          source={{uri: 'file:///android_asset/index.html'}}
          onLoadEnd={(): void => {
            addChart();
          }}
          style={styles.webview }
        />
      </View>
    
  )

})
export default ChartJs