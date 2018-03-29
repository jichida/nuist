import get from 'lodash.get';
import moment from 'moment';
import lodashmap from 'lodash.map';

import {createInfoWindow_popinfo,createInfoWindow_poplistinfo} from './mapmain_infowindow';


// const getpop_device =(deviceitem)=>{
//   return createInfoWindow_popinfo(deviceitem);
// }


export const getpopinfowindowstyle = (deviceitem)=>{
  // let result = bridge_deviceinfo_pop(deviceitem);
  return createInfoWindow_popinfo(deviceitem);
}



export const getlistpopinfowindowstyle = (deviceitemlist,SettingOfflineMinutes)=>{
    // let info = '<div class="getmapstylepage">';
    const result = (deviceitemlist);
    const {kvlist} = result;

    let data = [];
    lodashmap(result.deviceitemlist,(deviceitem)=>{

        const DeviceId = get(deviceitem,'DeviceId','');
        let fields = [];
        // let contentxt = '';
        lodashmap(kvlist,(v)=>{
          const fieldvalue = get(deviceitem,v.name,'');
          const unit = get(deviceitem,v.unit,'');
          // contentxt += `${v.showname}${fieldvalue}${unit}|`;
          fields.push({
            fieldname:v.name,
            showname:v.showname,
            fieldvalue,
            unit
          });
        });
        // console.log(`deviceitem:${deviceitem.DeviceId},GPSTime:${}`)
        const  {iconname,isonline} = getimageicon_isonline(deviceitem,SettingOfflineMinutes);

        data.push({
          iconname,
          isonline,
          DeviceId,
          fields
        });
        // info +=  `<p onclick="clickfn_device(${deviceitem.DeviceId})">
        // <i class="t">车辆ID:${DeviceId}</i>
        // <i>${contentxt}</i></p>`;
    });
    // info += '</div>'
    return createInfoWindow_poplistinfo(data);

    // {
    //     content: createInfoWindow('aaa',`${info}`)
    // };
}

const getdevicestatus_isonline = (deviceitem,SettingOfflineMinutes=20)=>{
  let isonline = false;
  let datatime = get(deviceitem,'realtimedata.datatime');
  if(!!datatime){
    // a.diff(b, 'days')
    const diffmin = moment().diff(moment(datatime),'minutes');
    isonline = diffmin < SettingOfflineMinutes;
  }
  return isonline;
}

const getdevicestatus_alaramlevel = (deviceitem)=>{
  let warninglevel = get(deviceitem,'warninglevel','');
  return warninglevel;
}

export const getimageicon_isonline = (item,SettingOfflineMinutes)=>{
  //这里根据不同item显示不同图标
  const isonline = getdevicestatus_isonline(item,SettingOfflineMinutes);
  const icon_car0 = `${process.env.PUBLIC_URL}/images/icon_car0.png`;
  const icon_car1 = `${process.env.PUBLIC_URL}/images/icon_car1.png`;
  const icon_car2 = `${process.env.PUBLIC_URL}/images/icon_car2.png`;
  const icon_car3 = `${process.env.PUBLIC_URL}/images/icon_car3.png`;
  const warninglevel = getdevicestatus_alaramlevel(item);
  let curpng = icon_car0;
  if(warninglevel === '高'){
    curpng = icon_car1;
  }
  else if(warninglevel === '中'){
    curpng = icon_car2;
  }
  else if(warninglevel === '低'){
    curpng = icon_car3;
  }
  return {iconname:curpng,isonline};
}


export const getimageicon = (item,SettingOfflineMinutes)=>{
  //这里根据不同item显示不同图标
  if(!getdevicestatus_isonline(item,SettingOfflineMinutes)){
    return `${process.env.PUBLIC_URL}/images/icon_caroffline.png`;
  }
  const icon_car0 = `${process.env.PUBLIC_URL}/images/icon_car0.png`;
  const icon_car1 = `${process.env.PUBLIC_URL}/images/icon_car1.png`;
  const icon_car2 = `${process.env.PUBLIC_URL}/images/icon_car2.png`;
  const icon_car3 = `${process.env.PUBLIC_URL}/images/icon_car3.png`;
  const warninglevel = getdevicestatus_alaramlevel(item);
  let curpng = icon_car0;
  if(warninglevel === '高'){
    curpng = icon_car1;
  }
  else if(warninglevel === '中'){
    curpng = icon_car2;
  }
  else if(warninglevel === '低'){
    curpng = icon_car3;
  }
  return curpng;
}
