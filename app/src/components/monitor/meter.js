import React from 'react';
import { Progress } from 'antd';
import 'antd/dist/antd.css';
import Wind1 from "../../img/wind1.png";
import Wind2 from "../../img/wind2.png";
import Wind3 from "../../img/wind3.png";
import {getCoureName} from '../../util';
import lodashget from 'lodash.get';

class App extends React.Component {
  	render() {
      const {curdevice} = this.props;
      if(!!curdevice){
        const getstyleimage1 = (degree)=>{
          return {
              'transform':        `rotate(${degree}deg)`,
              'msTransform':      `rotate(${degree}deg)`,
              'MozTransform':     `rotate(${degree}deg)`,
              'WebkitTransform':  `rotate(${degree}deg)`,
              'OTransform':       `rotate(${degree}deg)`,
              };
        }
        const degree_winddirection = 0;//方向 win3
        const degree_point = lodashget(curdevice,'realtimedata.winddirection',0);//指针 win2
        const windspeed = lodashget(curdevice,'realtimedata.windspeed',0);
        const degree_windspeed = 360-windspeed/12*360+degree_point;//风力 win1

        console.log(`windspeed:${windspeed},degree_windspeed:${degree_windspeed},degree_point:${degree_point}`)
        return (
  	      	<div className="meter">
  	        	<div className="title">实时数据</div>
  	        	<div className="meterchart">
  					<div className="chartli chart1">
  						<Progress type="circle" percent={75} width={70} />
  						<span>温度(℃)</span>
  					</div>
  					<div className="chartli chart2">
  						<Progress type="circle" percent={75} width={70} />
  						<span>湿度(%)</span>
  					</div>
  					<div className="chartli chart3">
  						<Progress type="circle" percent={75} width={70} />
  						<span>大气压(Pa)</span>
  					</div>
  					<div className="chartli chart4">
  						<Progress type="circle" percent={75} width={70} />
  						<span>雨量(mm)</span>
  					</div>
  					<div className="windcontrol">
  						<img style={getstyleimage1(degree_windspeed)} src={Wind1} className="wind1" />
  						<img style={getstyleimage1(degree_winddirection)}  src={Wind3} className="wind3" />
  						<img style={getstyleimage1(degree_point)}  src={Wind2} className="wind2" />
  						<div className="windcontroltxt">
  							<p>
  								<span>{getCoureName(lodashget(curdevice,'realtimedata.winddirection'))}风</span>
  								<span>风向</span>
  							</p>
  							<p>
  								<span>{lodashget(curdevice,'realtimedata.windspeed')}级</span>
  								<span>风力</span>
  							</p>
  						</div>
  					</div>
  	        	</div>
  	      	</div>
  	    );
      }
      return <div />
  	}
}

export default App;
