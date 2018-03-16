import React from 'react';
import lodashget from 'lodash.get';
import {getCoureName} from '../../util';

import ImageArrow from '../../img/arrow-right.png';
import ImageLocation from '../../img/location.png';
import './markdevice.css';

class App extends React.Component {
  	render() {
      const {curdevice} = this.props;
      const devicename = lodashget(curdevice,'name','');
      const winddirection = getCoureName(lodashget(curdevice,'realtimedata.winddirection',0));
      const windspeed = lodashget(curdevice,'realtimedata.windspeed','');
      const temperature = lodashget(curdevice,'realtimedata.temperature','');
      const humidity = lodashget(curdevice,'realtimedata.humidity','');
      const pressure = lodashget(curdevice,'realtimedata.pressure','');
      const rainfall =lodashget(curdevice,'realtimedata.rainfall','');
      return (
            <div className = "style_weui_dialog">
              <div className = "style_weui_dialog__bd">
                <p className ="style_weui_dialog__bd_p">
                  {devicename}
                  <img alt="" className="style_weui_dialog__bd_p_img" src={ImageArrow} />
                </p>
                <p className = "style_weui_dialog__bd_p">
                  风向 {winddirection}
                  <span className="style_weui_dialog__bd_p_span">
                    风力 {windspeed}级
                  </span>
                </p>
                <p className = "style_weui_dialog__bd_p">
                  温度 {temperature}℃
                  <span className="style_weui_dialog__bd_p_span">
                    湿度 {humidity}%
                  </span>
                </p>
                <p className = "style_weui_dialog__bd_p">
                  气压 {pressure}Pa
                  <span className="style_weui_dialog__bd_p_span">
                    雨量 {rainfall}mm
                  </span>
                </p>
              </div>
              <div>
                <img alt="" className="style_icon_bottom_img" src={ImageLocation} />
              </div>
            </div>
          );
  	}
}

export default App;
