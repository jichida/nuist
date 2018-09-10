import React from "react";
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import lodashget from 'lodash.get';
// import {Dropdown,Button,Icon} from 'antd';
import SeldropdownDevice from '../abstract/seldroplistdevice';
import ChartHumidity  from '../realtime/charts_humidity';
import ChartPressure  from '../realtime/charts_pressure';
import ChartTemperatureRainfall  from '../realtime/charts_temperaturerainfall';
import ChartWinddirection from '../realtime/charts_winddirection';

const ChartsRealtime = (props)=>{
    const {curdevice,shownum} = props;

    let showvalue_winddirection = lodashget(curdevice,`realtimedata.winddirection`);
    let showvalue_windspeed = lodashget(curdevice,`realtimedata.windspeed`);
    let showvalue_humidity = lodashget(curdevice,`realtimedata.humidity`);
    let showvalue_pressure = lodashget(curdevice,`realtimedata.pressure`);
    let showvalue_rainfall = lodashget(curdevice,`realtimedata.rainfall`);
    let showvalue_temperature = lodashget(curdevice,`realtimedata.temperature`);
    let realTimePage = props.pageType || false;
    if(shownum === 2){
        //showvalue_humidity=false;
        showvalue_pressure=false;
        showvalue_rainfall=false;
        showvalue_temperature=false;
    }
  return (<div className="bor_con">
      <h2 className="title"><img src="images/sjjc.png" alt=""/>
        <span>数据检测</span>
        <SeldropdownDevice />
      </h2>
      <div className="data_box vertical">
        { //realTimePage
          !!realTimePage && <div style={{'flexFlow': 'row wrap','display': 'flex'}}>
            {!!showvalue_winddirection && !!showvalue_windspeed && <div className='windcontrol1' ><ChartWinddirection curdevice={curdevice} /></div>}
            {!!showvalue_rainfall && !!showvalue_temperature &&
            <div className='windcontrol1' > <ChartTemperatureRainfall rainfall={showvalue_rainfall} temperature={showvalue_temperature}/></div>
            }
            {!!showvalue_humidity && <div className='windcontrol1' > <ChartHumidity humidity={showvalue_humidity}/></div>}
            {!!showvalue_pressure && <div className='windcontrol1' > <ChartPressure pressure={showvalue_pressure}/></div>}

          </div>
        }
        {
            !!!realTimePage && <ul>
            {!!showvalue_winddirection && !!showvalue_windspeed && <ChartWinddirection curdevice={curdevice} />}
            {!!showvalue_humidity && <li> <ChartHumidity humidity={showvalue_humidity}/></li>}
            {!!showvalue_pressure && <li> <ChartPressure pressure={showvalue_pressure}/></li>}
            {!!showvalue_rainfall && !!showvalue_temperature &&
            <li> <ChartTemperatureRainfall rainfall={showvalue_rainfall} temperature={showvalue_temperature}/></li>
            }
          </ul>
        }

      </div>
  </div>);

}

const APP =  withRouter(ChartsRealtime);
const mapStateToProps = ({device:{gateways,viewtype,devicelist,devices},userlogin:{usersettings}}) => {
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
    return {gateways,devices,viewtype,curdevice,usersettings};
}
export default connect(mapStateToProps)(APP);
