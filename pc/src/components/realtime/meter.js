import React from 'react';
import Progress  from 'antd/lib/progress';
import Wind1 from "../../img/wind1.png";
import Wind2 from "../../img/wind2.png";
import Wind3 from "../../img/wind3.png";
import {getCoureName} from '../../util';
import lodashget from 'lodash.get';

import 'antd/lib/progress/style';
// import 'antd/dist/antd.css';

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

        const temperature = lodashget(curdevice,'realtimedata.temperature',0);
        const rainfall = lodashget(curdevice,'realtimedata.rainfall',0);
        const humidity = lodashget(curdevice,'realtimedata.humidity',0);
        const pressure = lodashget(curdevice,'realtimedata.pressure',0);
        console.log(`windspeed:${windspeed},degree_windspeed:${degree_windspeed},degree_point:${degree_point}`)
        return (
  	      	<div className="meter">
  	        	<div className="title">实时数据</div>
  	        	<div className="meterchart">
				<div className="windcontrolc">
				<div className="windcontrol">
  						<img alt="" style={getstyleimage1(degree_windspeed)} src={Wind1} className="wind1" />
  						<img alt="" style={getstyleimage1(degree_winddirection)}  src={Wind3} className="wind3" />
  						<img alt="" style={getstyleimage1(degree_point)}  src={Wind2} className="wind2" />
  						{/*<div className="windcontroltxt">
  							<p>
  								<span>{getCoureName(lodashget(curdevice,'realtimedata.winddirection'))}风</span>
  								<span>风向</span>
  							</p>
  							<p>
  								<span>{lodashget(curdevice,'realtimedata.windspeed')}级</span>
  								<span>风力</span>
  							</p>
  						</div>*/}
  					</div>
					<span className="m10">偏东风4级</span>
					</div>
  					<div className="chartli chart1">
  						<Progress type="circle" percent={100} width={90} format={percent => `${temperature}`} />
  						<span className="m10">温度(℃)</span>
  					</div>
  					<div className="chartli chart2">
  						<Progress type="circle" percent={humidity} width={90} format={percent => `${humidity}`} />
  						<span className="m10">湿度(%)</span>
  					</div>
  					<div className="chartli chart3">
  						<Progress type="circle" percent={100} width={90} format={percent => `${pressure}`} />
  						<span className="m10">大气压(Pa)</span>
  					</div>
  					<div className="chartli chart4">
  						<Progress type="circle" percent={100} width={90} format={percent => `${rainfall}`} />
  						<span className="m10">雨量(mm)</span>
  					</div>
  					
  	        	</div>
  	      	</div>
  	    );
      }
      return <div />
  	}
}

export default App;
