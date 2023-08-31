import {StyleSheet} from 'react-native';
import {WebView} from 'react-native-webview';
import {useImperativeHandle, forwardRef} from 'react';
import {ReactElement} from 'react';

export type SetData = {
  setData: (data: number) => void;
};

type Props = {
  config?: any; // eslint-disable-line @typescript-eslint/no-explicit-any
  dataSets?: number[];
  chartWidth: number;
};

let DataBuff1: number[] = [];
let DataBuff2: number[] = [];
let LabelBuff1: string[] = [];
let LabelBuff2: string[] = [];

export const ChartJs = forwardRef((props: Props, ref): ReactElement => {
  const styles = StyleSheet.create({
    webview: {
      width: props.chartWidth,
    },
    chart: {
      height: 200,
    },
  });

  let webref: WebView<{
    originWhitelist: string[];
    ref: unknown;
    source: {uri: string};
  }> | null;

  const addChart = (): void => {
    webref?.injectJavaScript(`let delayBetweenPoints  = 0
            
    const config = {
      type: 'line',
      data: {
      
      labels: [],
      datasets: [{
        backgroundColor: "rgb(42, 67, 126)",
        label: 'ECG',
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
  canvasEl.height = ${JSON.stringify(styles.chart.height)}
 
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

  const setData = (data: number) => {
    var today = new Date();
    var time =
      today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
    if (DataBuff1.length <= 500 && DataBuff2.length === 0) {
      DataBuff1.push(data);
      LabelBuff1.push(time);
      if (DataBuff1.length === 500) {
        webref?.injectJavaScript(` 
        window.canvasLine.data.labels = ${JSON.stringify(LabelBuff1)}
        window.canvasLine.data.datasets[0].data = ${JSON.stringify(DataBuff1)}
        window.canvasLine.update()`);
        DataBuff1 = [];
        LabelBuff1 = [];
      }
    }
    // if (dataSets) {
    //     webref?.injectJavaScript(` var today = new Date();
    //     var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    //     removeData(window.canvasLine)
    //     addData(window.canvasLine,time,${JSON.stringify(dataSets)})`);

    // }
  };

  useImperativeHandle(ref, () => ({
    setData,
  }));

  return (
    <WebView
      originWhitelist={['*']}
      ref={(
        r,
      ): WebView<{
        originWhitelist: string[];
        ref: unknown;
        source: {uri: string};
      }> | null => (webref = r)}
      domStorageEnabled={true}
      javaScriptEnabled={true}
      source={{uri: 'file:///android_asset/index.html'}}
      onLoadEnd={(): void => {
        addChart();
      }}
      style={styles.webview}
    />
  );
});
export default ChartJs;
