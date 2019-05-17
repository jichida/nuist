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
  let showvalue = lodashget(curdevice,`realtimedata.${fieldname}`,'');
  if(typeof showvalue === 'number'){
    showvalue = showvalue.toFixed(2);
  }
  return (
    <div className={`chartli chart${index}`}>

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
                        console.log(fieldsprops)
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
      }
      //debugger;
      return <div />
  	}
}

export default App;
