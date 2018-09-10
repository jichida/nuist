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
import lodashincludes from 'lodash.includes';
import lodashmap from 'lodash.map';

const ProgressCtrl = (props)=>{
  const {curdevice,fieldname,fieldsprops,index} = props;
  return (
    <div className={`chartli chart${index}`}>
      <ChartHumidity type="circle" percent={100} width={70} format={percent => `${lodashget(curdevice,`realtimedata.${fieldname}`,'')}`} />
      <span className="m10">{`${fieldsprops.showname}`}({`${lodashget(fieldsprops,'unit','')}`})</span>
    </div>
  )
}

const ChartsRealtime = (props)=>{
    const {curdevice,shownum,viewtype} = props;
    let index = 0;
    let showvalue_winddirection = lodashget(curdevice,`realtimedata.winddirection`,undefined);
    let showvalue_windspeed = lodashget(curdevice,`realtimedata.windspeed`,undefined);
    let showvalue_humidity = lodashget(curdevice,`realtimedata.humidity`,undefined);
    let showvalue_pressure = lodashget(curdevice,`realtimedata.pressure`,undefined);
    let showvalue_rainfall = lodashget(curdevice,`realtimedata.rainfall`,undefined);
    let showvalue_temperature = lodashget(curdevice,`realtimedata.temperature`,undefined);
    let realTimePage = props.pageType || false;

    const {fields,fieldslist_detail,fieldslist_brief} = viewtype;

    let isshow_winddirectionspeedmix = (showvalue_winddirection !== undefined) && (showvalue_windspeed !== undefined);

    let isshow_humidity = showvalue_humidity !== undefined;
    let isshow_pressure = showvalue_pressure !== undefined;

    let isshow_temperaturerainfallmix  = (showvalue_temperature !== undefined) && (showvalue_rainfall !== undefined);

    if(isshow_winddirectionspeedmix){
      isshow_winddirectionspeedmix = lodashincludes(fieldslist_detail,'winddirection') && lodashincludes(fieldslist_detail,'windspeed');
    }

    if(isshow_temperaturerainfallmix){
      isshow_temperaturerainfallmix = lodashincludes(fieldslist_detail,'temperature') && lodashincludes(fieldslist_detail,'rainfall');
      }

    if(isshow_humidity){
      isshow_humidity = lodashincludes(fieldslist_detail,'humidity');
    }

    if(isshow_pressure){
      isshow_pressure = lodashincludes(fieldslist_detail,'pressure');
    }

    let CoCharts = [];
    if(!!realTimePage){
      if(isshow_winddirectionspeedmix){
        CoCharts.push(<div key="winddirectionspeedmix" className='windcontrol1' >
          <ChartWinddirection curdevice={curdevice} />
        </div>);
      }
      if(isshow_temperaturerainfallmix){
        CoCharts.push(<div key="temperaturerainfallmix" className='windcontrol1' > <ChartTemperatureRainfall rainfall={showvalue_rainfall} temperature={showvalue_temperature}/></div>);
      }
      if(isshow_humidity){
        CoCharts.push(<div key="humidity" className='windcontrol1' > <ChartHumidity humidity={showvalue_humidity}/></div>);
      }
      if(isshow_pressure){
        CoCharts.push(<div key="pressure" className='windcontrol1' > <ChartPressure pressure={showvalue_pressure}/></div>);
      }
      lodashmap(fieldslist_brief,(fieldname)=>{
        if((fieldname === 'winddirection' || fieldname === 'windspeed') && isshow_winddirectionspeedmix){
          //empty
        }
        else if((fieldname === 'temperature' || fieldname === 'rainfall') && isshow_temperaturerainfallmix){
          //empty
        }
        else if((fieldname === 'humidity') && showvalue_humidity){
          //empty
        }
        else if((fieldname === 'pressure') && showvalue_pressure){
          //empty
        }
        else{
          const fieldsprops = fields[fieldname];
          if(!!fieldsprops){
            index = index + 1;
            CoCharts.push(<div key={fieldname} className='windcontrol1' >
              <ProgressCtrl curdevice={curdevice} fieldname={fieldname} fieldsprops={fieldsprops} index={index} />
            </div>);
          }
        }
      })
    }

    if(!!!realTimePage){
      if(isshow_winddirectionspeedmix){
        CoCharts.push(<div key="winddirectionspeedmix" className='windcontrol1' ><ChartWinddirection curdevice={curdevice} /></div>);
      }
      if(isshow_temperaturerainfallmix){
        CoCharts.push(<li key="temperaturerainfallmix"   className='windcontrol1' > <ChartTemperatureRainfall rainfall={showvalue_rainfall} temperature={showvalue_temperature}/></li>);
      }
      if(isshow_humidity){
        CoCharts.push(<li key="humidity"  className='windcontrol1' > <ChartHumidity humidity={showvalue_humidity}/></li>);
      }
      if(isshow_pressure){
        CoCharts.push(<li key="pressure" className='windcontrol1' > <ChartPressure pressure={showvalue_pressure}/></li>);
      }
      lodashmap(fieldslist_brief,(fieldname)=>{
        if((fieldname === 'winddirection' || fieldname === 'windspeed') && isshow_winddirectionspeedmix){
          //empty
        }
        else if((fieldname === 'temperature' || fieldname === 'rainfall') && isshow_temperaturerainfallmix){
          //empty
        }
        else if((fieldname === 'humidity') && showvalue_humidity){
          //empty
        }
        else if((fieldname === 'pressure') && showvalue_pressure){
          //empty
        }
        else{
          const fieldsprops = fields[fieldname];
          if(!!fieldsprops){
            index = index + 1;
            CoCharts.push(<li className='windcontrol1' key={fieldname}>
              <ProgressCtrl  curdevice={curdevice} fieldname={fieldname} fieldsprops={fieldsprops} index={index} />
            </li>);
          }
        }
      })
    }

    let ShowCharts = [];
    const maxcount = shownum < CoCharts.length ? shownum:CoCharts.length;

    for(let i=0;i< maxcount ;i++){
      ShowCharts.push(CoCharts[i]);
    }

   return (<div className="bor_con">
      <h2 className="title"><img src="images/sjjc.png" alt=""/>
        <span>数据检测</span>
        <SeldropdownDevice />
      </h2>
      <div className="data_box vertical">
        { //realTimePage
          !!realTimePage && <div style={{'flexFlow': 'row wrap','display': 'flex'}}>
            {ShowCharts}
          </div>
        }
        {
            !!!realTimePage && <ul>
              {ShowCharts}
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
