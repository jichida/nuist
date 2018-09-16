import {getCoureName} from '../../util';
import lodashget from 'lodash.get';
import lodashmap from 'lodash.map';
import store from '../../env/store';
import { push } from 'react-router-redux';

import ImageArrow from '../../img/arrow-right.png';
// import ImageLocation from '../../img/location.png';

const style_weui_dialog = `
    min-width:180px;text-align:center;
`;

const style_weui_dialog__bd = `
    padding:12px;background-color:rgba(0,0,0,0.42);border-radius:8px;margin-bottom:10px;
`;

const style_weui_dialog__bd_p = `
    font-size:13px;line-height:20px;color:#fff;text-align:left;margin:0px
`;
const style_weui_dialog__bd_pa = `
font-size:13px;line-height:20px;color:#fff;text-align:left;margin:0px;width:50%;display:inline-block;
`;
const style_weui_dialog__bd_p_img = `
	width:20px;height:20px;vertical-align:middle;display:inline-flex;float:right;
`;

const style_weui_dialog__bd_p_span = `
	float:right;
`;

// const style_icon_bottom_img = `
// 	width:30px;height:30px;vertical-align:middle;display:inline-flex;
// 	`;
window.clickfn_device =(did)=>{
  store.dispatch(push(`/deviceinfo/${did}/0`));
}

const getDeviceLayerHtml = (curdevice,viewtype)=>{
  const devicename = lodashget(curdevice,'name','');
  const {fields,fieldslist_brief} = viewtype;
  // const winddirection = getCoureName(lodashget(curdevice,'realtimedata.winddirection',0));
  // const windspeed = lodashget(curdevice,'realtimedata.windspeed','');
  // const temperature = lodashget(curdevice,'realtimedata.temperature','');
  // const humidity = lodashget(curdevice,'realtimedata.humidity','');
  // const pressure = lodashget(curdevice,'realtimedata.pressure','');
  // const rainfall =lodashget(curdevice,'realtimedata.rainfall','');
  let content_all = '';
  lodashmap(fieldslist_brief,(fieldname)=>{
    const fieldsprops = fields[fieldname];
    if(!!fieldsprops){
      const show_showname = `${fieldsprops.showname}`;
      let show_showvalue = lodashget(curdevice,`realtimedata.${fieldname}`,'');
      if(fieldname === 'winddirection'){
        show_showvalue = getCoureName(show_showvalue);
      }
      const show_showunit = `${fieldsprops.unit}`;
      content_all += `<span style = ${style_weui_dialog__bd_pa}>
        ${show_showname} ${show_showvalue}${show_showunit}
        <span style=${style_weui_dialog__bd_p_span}>
        </span>
      </span>`
    }
  })
  return (
        `<div style =${style_weui_dialog}>
          <div style = ${style_weui_dialog__bd}>
            <p style = ${style_weui_dialog__bd_p} onClick="clickfn_device('${curdevice._id}')">
              ${devicename}
              <img alt="" style=${style_weui_dialog__bd_p_img} src=${ImageArrow} />
            </p>
            ${content_all}
          </div>
          <div>
          </div>
        </div>`
      );
}

/* <p style = ${style_weui_dialog__bd_p}>
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
</p> */

export default getDeviceLayerHtml;
