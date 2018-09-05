import React from 'react';
import ChartHumidity  from './charts_humidity';
import ChartPressure  from './charts_pressure';
import ChartTemperatureRainfall  from './charts_temperaturerainfall';
import Windcontrol from './charts_winddirection';
// import {getCoureName} from '../../util';
import lodashget from 'lodash.get';
import lodashincludes from 'lodash.includes';
import lodashmap from 'lodash.map';

// import 'antd/lib/progress/style';
// import 'antd/dist/antd.css';


const ProgressCtrl = (props)=>{
  const {curdevice,fieldname,fieldsprops,index} = props;
  return (
    <div className={`chartli chart${index}`}>
      <ChartHumidity type="circle" percent={100} width={70} format={percent => `${lodashget(curdevice,`realtimedata.${fieldname}`,'')}`} />
      <span className="m10">{`${fieldsprops.showname}`}({`${lodashget(fieldsprops,'unit','')}`})</span>
    </div>
  )
}

class App extends React.Component {
  	render() {
      const {curdevice,viewtype} = this.props;
      if(!!curdevice){
        const {fields,fieldslist_detail,fieldslist_brief} = viewtype;
        let isshowwincontrol = lodashincludes(fieldslist_detail,'winddirection') && lodashincludes(fieldslist_detail,'windspeed');
        let isshowtemperaturerainfall = lodashincludes(fieldslist_detail,'temperature') && lodashincludes(fieldslist_detail,'rainfall');
        let isshowhumidity = lodashincludes(fieldslist_detail,'humidity');
        let isshowpressure = lodashincludes(fieldslist_detail,'pressure');
        let index = 0;
        return (
          	<div className="meter">
            	<div className="title">实时数据</div>
              	<div className="meterchart">
                  {isshowwincontrol && <Windcontrol curdevice={curdevice} />}
                  {isshowtemperaturerainfall && <ChartTemperatureRainfall curdevice={curdevice} />}
                  {isshowhumidity && <ChartHumidity curdevice={curdevice} />}
                  {isshowpressure && <ChartPressure curdevice={curdevice} />}
                  {
                    lodashmap(fieldslist_brief,(fieldname)=>{
                      if((fieldname === 'winddirection' || fieldname === 'windspeed') && isshowwincontrol){
                        //empty
                      }
                      else if((fieldname === 'temperature' || fieldname === 'rainfall') && isshowtemperaturerainfall){
                        //empty
                      }
                      else if((fieldname === 'humidity') && isshowhumidity){
                        //empty
                      }
                      else if((fieldname === 'pressure') && isshowpressure){
                        //empty
                      }
                      else{
                        const fieldsprops = fields[fieldname];
                        if(!!fieldsprops){
                          index = index + 1;
                          return <ProgressCtrl key={fieldname} curdevice={curdevice} fieldname={fieldname} fieldsprops={fieldsprops} index={index} />
                        }
                      }
                    })
                  }
              </div>
          	</div>
        );
        //
        // const getstyleimage1 = (degree)=>{
        //   return {
        //       'transform':        `rotate(${degree}deg)`,
        //       'msTransform':      `rotate(${degree}deg)`,
        //       'MozTransform':     `rotate(${degree}deg)`,
        //       'WebkitTransform':  `rotate(${degree}deg)`,
        //       'OTransform':       `rotate(${degree}deg)`,
        //       };
        // }
        // const degree_winddirection = 0;//方向 win3
        // const degree_point = lodashget(curdevice,'realtimedata.winddirection',0);//指针 win2
        // const windspeed = lodashget(curdevice,'realtimedata.windspeed',0);
        // const degree_windspeed = 360-windspeed/12*360+degree_point;//风力 win1
        //
        // const temperature = lodashget(curdevice,'realtimedata.temperature',0);
        // const rainfall = lodashget(curdevice,'realtimedata.rainfall',0);
        // const humidity = lodashget(curdevice,'realtimedata.humidity',0);
        // const pressure = lodashget(curdevice,'realtimedata.pressure',0);
        // console.log(`windspeed:${windspeed},degree_windspeed:${degree_windspeed},degree_point:${degree_point}`)
        // return (
  	    //   	<div className="meter">
  	    //     	<div className="title">实时数据</div>
  	    //     	<div className="meterchart">
				// <div className="windcontrolc">
				// <div className="windcontrol">
  			// 			<img alt="" style={getstyleimage1(degree_windspeed)} src={Wind1} className="wind1" />
  			// 			<img alt="" style={getstyleimage1(degree_winddirection)}  src={Wind3} className="wind3" />
  			// 			<img alt="" style={getstyleimage1(degree_point)}  src={Wind2} className="wind2" />
  			//
  			// 		</div>
        //
				// 	</div>
  			// 		<div className="chartli chart1">
  			// 			<Progress type="circle" percent={100} width={90} format={percent => `${temperature}`} />
  			// 			<span className="m10">温度(℃)</span>
  			// 		</div>
  			// 		<div className="chartli chart2">
  			// 			<Progress type="circle" percent={humidity} width={90} format={percent => `${humidity}`} />
  			// 			<span className="m10">湿度(%)</span>
  			// 		</div>
  			// 		<div className="chartli chart3">
  			// 			<Progress type="circle" percent={100} width={90} format={percent => `${pressure}`} />
  			// 			<span className="m10">大气压(Pa)</span>
  			// 		</div>
  			// 		<div className="chartli chart4">
  			// 			<Progress type="circle" percent={100} width={90} format={percent => `${rainfall}`} />
  			// 			<span className="m10">雨量(mm)</span>
  			// 		</div>
        //
  	    //     	</div>
  	    //   	</div>
  	    // );
      }
      return <div />
  	}
}

export default App;
