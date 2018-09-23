import React from 'react';
import { connect } from 'react-redux';
import Wind1 from "../../img/wind1.png";
import Wind2 from "../../img/wind2.png";
import Wind3 from "../../img/wind3.png";
import {getspeedgrade} from '../../util';
import lodashget from 'lodash.get';

const Windcontrol = (props)=>{
  const {curdevice,windgradesettings} = props;
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
  const windgrade = getspeedgrade(windspeed,windgradesettings);
  const degree_windspeed = 360-windgrade/12*360+degree_point;//风力 win1
  return (
      <div className="windcontrolc">
        <div className="windcontrol">
    			<img alt="" style={getstyleimage1(degree_windspeed)} src={Wind1} className="wind1" />
    			<img alt="" style={getstyleimage1(degree_winddirection)}  src={Wind3} className="wind3" />
    			<img alt="" style={getstyleimage1(degree_point)}  src={Wind2} className="wind2" />
  			</div>
  		</div>
    );
}

const mapStateToProps = ({app:{windgradesettings}}) => {
  return {windgradesettings}
}
export default connect(mapStateToProps)(Windcontrol);
