import React from "react";
import ChartHumidity  from '../realtime/charts_humidity';
import ChartPressure  from '../realtime/charts_pressure';
import ChartTemperatureRainfall  from '../realtime/charts_temperaturerainfall';

const ChartsRealtime = (props)=>{
  return (<div className="bor_con">
      <h2 className="title"><img src="images/sjjc.png" alt=""/>
        <span>数据检测</span>
      </h2>
      <div className="data_box">
       <ul><li> <ChartHumidity /></li>
           <li><ChartPressure /></li>
           <li> <ChartTemperatureRainfall /></li>
      </ul>
      </div>
  </div>);

}

export default ChartsRealtime;
