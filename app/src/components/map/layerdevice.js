import lodashget from 'lodash.get';
import {getCoureName} from '../../util';

import ImageArrow from '../../img/arrow-right.png';
import ImageLocation from '../../img/location.png';

const style_weui_dialog = `
    min-width:220px;text-align:center;
`;

const style_weui_dialog__bd = `
    padding:12px;background-color:rgba(0,0,0,0.42);border-radius:8px;margin-bottom:10px;
`;

const style_weui_dialog__bd_p = `
    font-size:13px;line-height:20px;color:#fff;text-align:left;margin:0px;
`;

const style_weui_dialog__bd_p_img = `
	width:20px;height:20px;vertical-align:middle;display:inline-flex;float:right;
`;

const style_weui_dialog__bd_p_span = `
	float:right;
`;

const style_icon_bottom_img = `
	width:30px;height:30px;vertical-align:middle;display:inline-flex;
	`;

const getDeviceLayerHtml = (curdevice)=>{
  const devicename = lodashget(curdevice,'name','');
  const winddirection = getCoureName(lodashget(curdevice,'realtimedata.winddirection',0));
  const windspeed = lodashget(curdevice,'realtimedata.windspeed','');
  const temperature = lodashget(curdevice,'realtimedata.temperature','');
  const humidity = lodashget(curdevice,'realtimedata.humidity','');
  const pressure = lodashget(curdevice,'realtimedata.pressure','');
  const rainfall =lodashget(curdevice,'realtimedata.rainfall','');
  return (
        `<div style =${style_weui_dialog}>
          <div style = ${style_weui_dialog__bd}>
            <p style = ${style_weui_dialog__bd_p}>
              ${devicename}
              <img alt="" style=${style_weui_dialog__bd_p_img} src=${ImageArrow} />
            </p>
            <p style = ${style_weui_dialog__bd_p}>
              风向 ${winddirection}
              <span style=${style_weui_dialog__bd_p_span}>
                风力 ${windspeed}级
              </span>
            </p>
            <p style = ${style_weui_dialog__bd_p}>
              温度 ${temperature}℃
              <span style=${style_weui_dialog__bd_p_span}>
                湿度 ${humidity}%
              </span>
            </p>
            <p style = ${style_weui_dialog__bd_p}>
              气压 ${pressure}Pa
              <span style=${style_weui_dialog__bd_p_span}>
                雨量 ${rainfall}mm
              </span>
            </p>
          </div>
          <div>
            <img alt="" style=${style_icon_bottom_img} src=${ImageLocation} />
          </div>
        </div>`
      );
}

export default getDeviceLayerHtml;
