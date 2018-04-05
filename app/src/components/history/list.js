import React from 'react';
import { connect } from 'react-redux';
// import Exit from "../../img/22.png";
import lodashmap from 'lodash.map';
import lodashget from 'lodash.get';
import {getCoureName} from '../../util';

class App extends React.Component {

  	render() {
      const {retlist} = this.props;
      const ticktimestringlist = lodashget(retlist,'ticktimestring',[]);
	    return (
	      	<div className="monitordata">
	      		<div className="tit">
	      			<span>风向</span>
	      			<span>风力</span>
	      			<span>温度</span>
	      			<span>湿度</span>
	      			<span>气压</span>
	      			<span>雨量</span>
	      			<span>时间</span>
	      		</div>
	        	<ul>
              {
                lodashmap(ticktimestringlist,(vs,index)=>{
                  const timetickstring = vs;
                  const temperature = retlist.temperature[index];
                  const rainfall = retlist.rainfall[index];
                  const humidity = retlist.humidity[index];
                  const windspeed = retlist.windspeed[index];
                  const winddirection = retlist.winddirection[index];
                  const pressure = retlist.pressure[index];
                  return (
                      <li key={index}>
      	        			<span>{getCoureName(winddirection)}风</span>
      	        			<span>{windspeed}级</span>
      	        			<span>{temperature}℃</span>
      	        			<span>{humidity}%</span>
      	        			<span>{pressure}Pa</span>
      	        			<span>{rainfall}mm</span>
      	        			<span>{timetickstring}</span>
                    </li>);
                  })
              }
	        	</ul>
	      	</div>
	    );
  	}
}

const mapStateToProps = ({historydevice:{historydevices}},props) => {
    const did = lodashget(props,'curdevice._id');
    const retlist = lodashget(historydevices,`${did}`,[]);
    return {retlist};
}
export default connect(mapStateToProps)(App);
