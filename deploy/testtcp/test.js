// const handler = require('./src/sd/ddh.js');
const _ = require('lodash');
const debug = require('debug')('testtcp:test');
const handler = require('./src/sd/ddh');

const deviceid = _.random(handler.deviceid.min, handler.deviceid.max);//气压

let pressure = _.random(handler.pressure.min, handler.pressure.max);//气压
const winddirection = _.random(handler.winddirection.min, handler.winddirection.max);//风向
const humidity = _.random(handler.humidity.min, handler.humidity.max);//温度
const rainfall = _.random(handler.rainfall.min, handler.rainfall.max);//雨量
const temperature = _.random(handler.temperature.min, handler.temperature.max);//温度
const windspeed = _.random(handler.windspeed.min, handler.windspeed.max);//分速

console.log(`pressure->${pressure}`);
const hexpayload = handler.getbufcmd1({deviceid,pressure,winddirection,humidity,rainfall,temperature,windspeed});

const ZigbeeData = hexpayload;
const pressurehex = ZigbeeData.substr(handler.pressure.offset*2,handler.pressure.length*2);
pressure = handler.pressure.parsevalue(pressurehex);
console.log(`气压为:${pressure}`);

// const UTCTime = '2000 b4a2 e64c 3042 5780 9db1 c936 15c1 42b8';
// const Latitude = '20000676c8a727bd927456a512';
// const Longitude = '200002ab1176453a486765de31';
// const buf_UTCTime = Buffer.from(UTCTime,'hex');
// const buf_Latitude = Buffer.from(Latitude,'hex');
// const buf_Longitude = Buffer.from(Longitude,'hex');
// for(let i=0;i<18;i++){
//   const time_ascii = buf_UTCTime.toString('ascii',i,i+1);
//   debug(`${i}->${time_ascii}`)
// }
// const time_dd = buf_UTCTime.toString('ascii',0,0+2)//buf_UTCTime.readInt16BE(0);
// const time_mm = buf_UTCTime.toString('ascii',2,2+2)//buf_UTCTime.readInt16BE(2);
// const time_yy = buf_UTCTime.toString('ascii',4,4+2)//buf_UTCTime.readInt16BE(4);
// const time_blank = buf_UTCTime.toString('ascii',6,6+2)//buf_UTCTime.readInt16BE(6);
// const time_hh = buf_UTCTime.toString('ascii',8,8+2)//buf_UTCTime.readInt16BE(8);
// const time_mm2 = buf_UTCTime.toString('ascii',10,10+2)//buf_UTCTime.readInt16BE(10);
// const time_ss = buf_UTCTime.toString('ascii',12,12+2)//buf_UTCTime.readInt16BE(12);
// const time_dot = buf_UTCTime.toString('ascii',14,14+2)//buf_UTCTime.readInt16BE(14);
// const time_sss = buf_UTCTime.toString('ascii',16,16+2)//buf_UTCTime.readInt16BE(16);
// debug(`time_dd->${time_dd}`)
// debug(`time_mm->${time_mm}`)
// debug(`time_yy->${time_yy}`)
// debug(`time_blank->${time_blank}`)
// debug(`time_hh->${time_hh}`)
// debug(`time_mm2->${time_mm2}`)
// debug(`time_ss->${time_ss}`)
// debug(`time_dot->${time_dot}`)
// debug(`time_sss->${time_sss}`)
debug(`=======`)
// const time_dd = buf_UTCTime.readInt16LE(0);//2000
// const time_mm = buf_UTCTime.readInt16LE(2);//b4a2
// const time_yy = buf_UTCTime.readInt16LE(4);//e64c
// const time_blank = buf_UTCTime.readInt16LE(6);//3042
// const time_hh = buf_UTCTime.readInt16LE(8);//5780->'W?'
// const time_mm2 = buf_UTCTime.readInt16LE(10);//9db1
// const time_ss = buf_UTCTime.readInt16LE(12);//c936
// const time_dot = buf_UTCTime.readInt16LE(14);//15c1
// const time_sss = buf_UTCTime.readInt16LE(16);//42b8
// debug(`time_dd->${time_dd}`)
// debug(`time_mm->${time_mm}`)
// debug(`time_yy->${time_yy}`)
// debug(`time_blank->${time_blank}`)
// debug(`time_hh->${time_hh}`)
// debug(`time_mm2->${time_mm2}`)
// debug(`time_ss->${time_ss}`)
// debug(`time_dot->${time_dot}`)
// debug(`time_sss->${time_sss}`)

// for(let i=0;i<13;i++){
//   const Latitude_ascii = buf_Latitude.toString('ascii',i,i+1);
//   debug(`${i}->${Latitude_ascii}`)
// }
//
// debug(`=======`)
// for(let i=0;i<13;i++){
//   const Longitude_ascii = buf_Longitude.toString('ascii',i,i+1);
//   debug(`${i}->${Longitude_ascii}`)
// }
//
// 纬度，格式:“ddmm.mmmm N/S”
// 经度，格式:“ddmm.mmmm E/W”
// 谷歌地球：32.0604615200,118.7912916600
// 北纬N32°03′37.66″ 东经E118°47′28.65″

//
// const buf_Latitude = Buffer.from(Latitude,'hex');
// const buf_Longitude = Buffer.from(Longitude,'hex');
// debug(`buf_UTCTime->${buf_UTCTime.toString()}`)
// debug(`buf_Latitude->${buf_Latitude.toString()}`)
// debug(`buf_Longitude->${buf_Longitude.toString()}`)
// const pressure = 1020.21;
// debug(`pressure->${pressure}`);
// const pressure_hex = handler.pressure.gethex(pressure);
// debug(`pressure_hex->${pressure_hex}`);
// const pressure_value = handler.pressure.parsevalue(pressure_hex);
// debug(`pressure_value->${pressure_value}`);
// debug(`${pressure===pressure_value}\n`);
//
// const winddirection = 300;
// const winddirection_hex = handler.winddirection.gethex(winddirection);
// debug(`winddirection_hex->${winddirection_hex}`);
// const winddirection_value = handler.winddirection.parsevalue(winddirection_hex);
// debug(`winddirection_value->${winddirection_value}`);
// debug(`${winddirection===winddirection_value}\n`);
//
// const humidity = 32.9;
// const humidity_hex = handler.humidity.gethex(humidity);
// debug(`humidity_hex->${humidity_hex}`);
// const humidity_value = handler.humidity.parsevalue(humidity_hex);
// debug(`humidity_value->${humidity_value}`);
// debug(`${humidity===humidity_value}\n`);
//
// const rainfall = 23;
// const rainfall_hex = handler.rainfall.gethex(rainfall);
// debug(`rainfall_hex->${rainfall_hex}`);
// const rainfall_value = handler.rainfall.parsevalue(rainfall_hex);
// debug(`rainfall_value->${rainfall_value}`);
// debug(`${rainfall===rainfall_value}\n`);
//
// const temperature = 36.89;
// const temperature_hex = handler.temperature.gethex(temperature);
// debug(`temperature_hex->${temperature_hex}`);
// const temperature_value = handler.temperature.parsevalue(temperature_hex);
// debug(`temperature_value->${temperature_value}`);
// debug(`${temperature===temperature_value}\n`);
//
// const hex = handler.getbufcmd1({pressure,winddirection,humidity,rainfall,temperature});
// debug(`hex->\n${hex}`)
// const headerhex = handler.getheader({gwid:1,length:hex.length/2,cmd:2});
// debug(`headerhex->\n${headerhex}`);
