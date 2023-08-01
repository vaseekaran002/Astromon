import {Dimensions, StyleSheet } from 'react-native'
import { StyleProp, View,ViewStyle } from "react-native";
import { WebView } from "react-native-webview";
import { useImperativeHandle ,forwardRef } from 'react';
import { ReactElement } from 'react';

let dataarr : number[] = []
let lbl : string[] = []


const styles = StyleSheet.create({
    webview: {
      height: 400,
      width : Dimensions.get("screen").width ,
    },
  });

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
      document.body.appendChild(canvasEl);
      window.canvasLine = new Chart(canvasEl.getContext('2d'), ${JSON.stringify(config)});true;`);
  };


  const setData = (dataSets : number) => {
    
  
    var today = new Date();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        if(dataarr.length <= 109 && lbl.length <= 109){
            dataarr.push(dataSets)
            lbl.push(time)
        }
        else{
            dataarr.splice(0,2,dataSets)
            lbl.splice(0,2,time)
        }
  
    if (dataarr && lbl) {
     
        webref?.injectJavaScript(`window.canvasLine.config.data.datasets[0].data = ${JSON.stringify(dataarr)};
        window.canvasLine.config.data.labels = ${JSON.stringify(lbl)};
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
          style={styles.webview}
        />
      </View>
    
  )

})
export default ChartJs