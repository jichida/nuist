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
  						<img src={Wind1} className="wind1" />
  						<img src={Wind3} className="wind3" />
  						<img src={Wind2} className="wind2" />
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
