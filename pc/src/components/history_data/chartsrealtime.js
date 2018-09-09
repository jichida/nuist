import React from "react";
import { connect } from 'react-redux';
import lodashget from 'lodash.get';
import ChartHumidity  from '../realtime/charts_humidity';
import ChartPressure  from '../realtime/charts_pressure';
import ChartTemperatureRainfall  from '../realtime/charts_temperaturerainfall';
import ChartWinddirection from '../realtime/charts_winddirection';

const ChartsRealtime = (props)=>{
  const {curdevice} = props;
  const showvalue_winddirection = lodashget(curdevice,`realtimedata.winddirection`);
  const showvalue_windspeed = lodashget(curdevice,`realtimedata.windspeed`);
  const showvalue_humidity = lodashget(curdevice,`realtimedata.humidity`);
  const showvalue_pressure = lodashget(curdevice,`realtimedata.pressure`);
  const showvalue_rainfall = lodashget(curdevice,`realtimedata.rainfall`);
  const showvalue_temperature = lodashget(curdevice,`realtimedata.temperature`);
  return (<div className="bor_con">
      <h2 className="title"><img src="images/sjjc.png" alt=""/>
        <span>数据检测</span>
      </h2>
      <div className="data_box vertical">
       <ul>
           {!!showvalue_winddirection && !!showvalue_windspeed && <ChartWinddirection curdevice={curdevice} />}
           {!!showvalue_humidity && <li> <ChartHumidity humidity={showvalue_humidity}/></li>}
           {!!showvalue_pressure && <li> <ChartPressure pressure={showvalue_pressure}/></li>}
           {!!showvalue_rainfall && !!showvalue_temperature &&
             <li> <ChartTemperatureRainfall rainfall={showvalue_rainfall} temperature={showvalue_temperature}/></li>
           }
      </ul>
      </div>
  </div>);

}

const mapStateToProps = ({device:{devicelist,devices},userlogin:{usersettings}}) => {
		let curdevice;
		let curdeviceid = lodashget(usersettings,'indexdeviceid');
		if(!!curdeviceid){
			curdevice = devices[curdeviceid];
		}
		if(!curdevice){
			if(devicelist.length > 0){
				curdevice = devices[devicelist[0]];
			}
		}
    return {curdevice};
}
export default connect(mapStateToProps)(ChartsRealtime);
