const _ = require('lodash');

const getpublishdata_device = (DeviceId)=>{
  return {
    "DeviceId" :DeviceId,
     realtimedata:{
      "pressure" : _.random(0, 100),
      "winddirection" : _.random(0, 360),
      "windspeed" : 11,//_.random(0, 12),
      "humidity" : _.random(0, 100),
      "rainfall" : _.random(0, 1000),
      "temperature" : 50,//_.random(0, 43),
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
