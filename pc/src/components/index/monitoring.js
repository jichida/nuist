import React from 'react';
import { connect } from 'react-redux';
import "./monitoring.css";
import lodashget from 'lodash.get';
import {getCoureName} from '../../util';

class App extends React.Component {
  render() {
    const {curdevice} = this.props;
    if(!curdevice){
      return <div />
    }
    const name = lodashget(curdevice,'name','');
    const updated_at = lodashget(curdevice,'updated_at','');
    const degree_point = lodashget(curdevice,'realtimedata.winddirection',0);//指针 win2
    const windspeed = lodashget(curdevice,'realtimedata.windspeed',0);
    const temperature = lodashget(curdevice,'realtimedata.temperature',0);
    const rainfall = lodashget(curdevice,'realtimedata.rainfall',0);
    const humidity = lodashget(curdevice,'realtimedata.humidity',0);
    const pressure = lodashget(curdevice,'realtimedata.pressure',0);
    return (
      <div className="monitoring_indexPage">
        <div className="tit">
          <span>实时监控</span>
          <span>{name}</span>
        </div>
        <div className="monitoringli">
           <p>温度:{temperature}℃</p>
           <p>湿度:{humidity}%</p>
           <p>大气压:{pressure}Pa</p>
           <p>雨量:{rainfall}mm</p>
           <p>风力:{windspeed}级</p>
           <p>风向:{getCoureName(degree_point)}</p>
           <p>更新时间：{updated_at}</p>
        </div>
      </div>
    );
  }
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
export default connect(mapStateToProps)(App);
