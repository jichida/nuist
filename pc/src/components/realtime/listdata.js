import React from 'react';
import lodashget from 'lodash.get';
import lodashmap from 'lodash.map';
import {getCoureName} from '../../util';

class App extends React.Component {
    render() {
      const {devicelist,devices} = this.props;

      let datarowCo = [];
      lodashmap(devicelist,(did)=>{
        const curdevice = devices[did];
        if(!!curdevice){
          const name = lodashget(curdevice,'name','');
          const updated_at = lodashget(curdevice,'updated_at','');
          const degree_point = lodashget(curdevice,'realtimedata.winddirection',0);//指针 win2
          const windspeed = lodashget(curdevice,'realtimedata.windspeed',0);
          const temperature = lodashget(curdevice,'realtimedata.temperature',0);
          const rainfall = lodashget(curdevice,'realtimedata.rainfall',0);
          const humidity = lodashget(curdevice,'realtimedata.humidity',0);
          const pressure = lodashget(curdevice,'realtimedata.pressure',0);

          datarowCo.push(
            <dl key={did}>
              <dt>{name}</dt>
              <dd>
                <span className="small">{updated_at}</span>
                <span>{temperature}</span>
                <span>{humidity}</span>
                <span>{pressure}</span>
                <span>{rainfall}</span>
                <span>{getCoureName(degree_point)}</span>
                <span>{windspeed}</span>
              </dd>
            </dl>
          );
        }
      });


      return (
        <div>
          <dl className="dl_bg">
            <dt>节点</dt>
            <dd>
              <span>时间</span>
              <span>温度(℃)</span>
              <span>湿度(%)</span>
              <span>大气压(Pa)</span>
              <span>雨量(mm)</span>
              <span>风向</span>
              <span>风力</span>
            </dd>
        </dl>
          <div className="h_625 scroll_bar">
            {datarowCo}
          </div>
        </div>
      )
    }
  }

  export default App;
