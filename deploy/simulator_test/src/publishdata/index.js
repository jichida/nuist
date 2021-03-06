const _ = require('lodash');
const moment = require('moment');
const getpublishdata_device = (DeviceId)=>{
  return {
    "DeviceId" :DeviceId,
     realtimedata:{
      "datatime":moment().format('YYYY-MM-DD HH:mm:ss'),
      "pressure" : _.random(0, 100),//温度
      "winddirection" : _.random(0, 360),
      "windspeed" : _.random(0, 12),
      "humidity" : _.random(0, 100),
      "rainfall" : _.random(0, 1000),
      "temperature" : _.random(0, 43),
      "deformation":_.random(0, 100),
      "voltage":_.random(0, 100),
      "stress0":_.random(0, 100),
      "stress1":_.random(0, 100),
      "osmoticpressure":_.random(0, 100),//渗压
      "no":_.random(0, 100),
      "co":_.random(0, 100),
      "pm2d5":_.random(0, 100),
      "h2s":_.random(0, 100),
      "no2":_.random(0, 100),
      "o3":_.random(0, 100),
      "level":_.random(0, 100),//液位
      "displacement":_.random(0, 100),//位移
      "steelbarmeter":_.random(0, 100),//钢筋计
    }
  };
}

// const getpublishdata_alarm = (DeviceId)=>{
//   return {
//     "DeviceId" :DeviceId,
//     realtimealarm:{
//       "content" : "天气炎热",
//        "value" : 42,
//        "level" : "高",
//        "type" : "温度",
//        "updatetime" : "2018-01-13 11:49"
//     };
// }

exports.getpublishdata_device = getpublishdata_device;
