const _ = require('lodash');
const moment = require('moment');
const handler = require('./ddh');
const debug = require('debug')('testtcp:test');

// const getpublishdata_device = (DeviceId)=>{
//   return {
//     "DeviceId" :DeviceId,
//      realtimedata:{
//       "datatime":moment().format('YYYY-MM-DD HH:mm:ss'),
//       "pressure" : _.random(0, 100),//温度
//       "winddirection" : _.random(0, 360),
//       "windspeed" : _.random(0, 12),
//       "humidity" : _.random(0, 100),
//       "rainfall" : _.random(0, 1000),
//       "temperature" : _.random(0, 43),
//       "deformation":_.random(0, 100),
//       "voltage":_.random(0, 100),
//       "stress0":_.random(0, 100),
//       "stress1":_.random(0, 100),
//       "osmoticpressure":_.random(0, 100),//渗压
//       "no":_.random(0, 100),
//       "co":_.random(0, 100),
//       "pm2d5":_.random(0, 100),
//       "h2s":_.random(0, 100),
//       "no2":_.random(0, 100),
//       "o3":_.random(0, 100),
//       "level":_.random(0, 100),//液位
//       "displacement":_.random(0, 100),//位移
//       "steelbarmeter":_.random(0, 100),//钢筋计
//     }
//   };
// }
const getdatahex1 = (DeviceId)=>{
  const headerhex = handler.getheader({gwid:DeviceId,length:0,cmd:1});
  debug(`headerhex->\n${headerhex}`);
  return `${headerhex}`;
}

const getdatahex2 = (gwid)=>{
  const deviceid = _.random(handler.deviceid.min, handler.deviceid.max);//气压

  const pressure = _.random(handler.pressure.min, handler.pressure.max);//气压
  const winddirection = _.random(handler.winddirection.min, handler.winddirection.max);//风向
  const humidity = _.random(handler.humidity.min, handler.humidity.max);//温度
  const rainfall = _.random(handler.rainfall.min, handler.rainfall.max);//雨量
  const temperature = _.random(handler.temperature.min, handler.temperature.max);//温度
  const windspeed = _.random(handler.windspeed.min, handler.windspeed.max);//分速

  const hexpayload = handler.getbufcmd1({deviceid,pressure,winddirection,humidity,rainfall,temperature,windspeed});
  debug(`hex->\n${hexpayload}`)
  const headerhex = handler.getheader({gwid,length:hexpayload.length/2,cmd:2});
  debug(`headerhex->\n${headerhex}`);
  return `${headerhex}${hexpayload}`;
}

const getdatahex2_raw = (gwid,hexpayload)=>{
  debug(`hex->\n${hexpayload}`)
  const headerhex = handler.getheader({gwid,length:hexpayload.length/2,cmd:2});
  debug(`headerhex->\n${headerhex}`);
  return `${headerhex}${hexpayload}`;
}

exports.getdatahex1 = getdatahex1;
exports.getdatahex2 = getdatahex2;
exports.getdatahex2_raw = getdatahex2_raw;
