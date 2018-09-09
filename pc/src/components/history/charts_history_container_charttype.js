import React from 'react';
import ChartHistory from "./charts_area_history";
import ChartHistoryWinddirection from "./charts_history_winddirection";
import ChartHistoryWindspeed from "./charts_history_windspeed";
import ChartHistoryHumidity from "./charts_history_humidity";
import ChartHistoryPressure from "./charts_history_pressure";
import ChartHistoryRainfall from "./charts_history_rainfall";
import ChartHistoryTemperature from "./charts_history_temperature";


const ChartsHistoryContainerCharttype = (props)=>{
  const {curfield} = props;
  if(curfield === 'winddirection'){
    return <ChartHistoryWinddirection {...props}/>
  }
  if(curfield === 'windspeed'){
    return <ChartHistoryWindspeed {...props}/>
  }
  if(curfield === 'humidity'){
    return <ChartHistoryHumidity {...props}/>
  }
  if(curfield === 'pressure'){
    return <ChartHistoryPressure {...props}/>
  }
  if(curfield === 'rainfall'){
    return <ChartHistoryRainfall {...props}/>
  }
  if(curfield === 'temperature'){
    return <ChartHistoryTemperature {...props}/>
  }

  return <ChartHistory {...props}/>

}

export default ChartsHistoryContainerCharttype;
