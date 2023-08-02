import {Dimensions, StyleSheet, useWindowDimensions } from 'react-native'
import { StyleProp, View,ViewStyle } from "react-native";
import { WebView } from "react-native-webview";
import { useImperativeHandle ,forwardRef } from 'react';
import { ReactElement } from 'react';

var databuff : number[] = [1]
var lables : String[] = ["a"] 



  export type SetData = {
    setData: (data:number) => void;
  };

type Props = {
    config: any; // eslint-disable-line @typescript-eslint/no-explicit-any
    dataSets?: number[];
    style?: StyleProp<ViewStyle>;
};

export const ChartJs = forwardRef(
    (props: Props, ref): ReactElement => {


  let webref: WebView<{ originWhitelist: string[]; ref: unknown; source: { uri: string } }> | null;
  
  const addChart = (config: any): void => {
    webref?.injectJavaScript(`const canvasEl = document.createElement("canvas");
      canvasEl.height = 200;
      canvasEl.style="display: flex;justify-content: center;align-items: center;"
      document.body.appendChild(canvasEl);
      window.canvasLine = new Chart(canvasEl.getContext('2d'), ${JSON.stringify(config)});true;`);
  };


  const styles = StyleSheet.create({
    webview: {
      height: useWindowDimensions().height ,
      width : useWindowDimensions().width  ,

    },
   
  });



  const setData = (dataSets : number) => {
    
  
    var today = new Date();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
      
   
     

      if(databuff.length <= 400){
        databuff.push(dataSets)
        lables.push(time)
      }else{
        databuff.shift()
        databuff.push(dataSets)
        lables.shift()
        lables.push(time)
      }

    if (databuff) {
     
        webref?.injectJavaScript(`window.canvasLine.config.data.datasets[0].data = ${JSON.stringify(databuff)};
        window.canvasLine.config.data.labels = ${JSON.stringify(lables)};
        window.canvasLine.update();`);
     
    }
  };

  useImperativeHandle(ref, () => ({
    setData,
  }));

  return (
    
         <View style={styles.webview }>
        <WebView
          originWhitelist={["*"]}
          ref={(r): WebView<{ originWhitelist: string[]; ref: unknown; source: { uri : string } }> | null =>
            (webref = r)
          }
          domStorageEnabled={true}
          javaScriptEnabled={true}
          source={{uri: 'file:///android_asset/index.html'}}
          onLoadEnd={(): void => {
            addChart(props.config);
          }}
        
        />
      </View>
    
  )

})
export default ChartJs