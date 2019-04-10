const _ = require('lodash');
const debug = require('debug')('srvtcp:protocol');

const parsevalue = ({name,hexstring,length,ftype})=>{
  const buf = Buffer.from(hexstring,'hex');
  debug(`name:${name},hexstring:${hexstring},length:${length},ftype:${ftype}`);

  if('number' === ftype){
    if(name === 'pressure'){
      const PTB210_Pressure0 =  buf.readInt16LE(0);
      const PTB210_Pressure1 =  buf[3];
      const valuestring = `${PTB210_Pressure0}.${PTB210_Pressure1}`;
      debug(`气压为:${PTB210_Pressure0}.${PTB210_Pressure1}`);
      return parseFloat(valuestring);
    }
    if(name === "winddirection"){
      const buf = Buffer.from(hexstring,'hex');
      const value =  buf.readInt16LE(0);
      // AD=0x09DE
      // 角度 = AD * 3600 / 4096
      // 单位： 0.1°
      // e.g.
      // AD = 0x63D * 3600 / 4096 = 140.3°
      const angel = value*3600/4096;
      const v = parseFloat(angel).toFixed(1);
      return parseFloat(v);
    }
    if(name === "humidity"){
      const buf = Buffer.from(hexstring,'hex');
      const CS215_Humidity0 =  buf.readInt8(0);
      const CS215_Humidity1 =  buf.readInt8(1);
      const valuestring = `${CS215_Humidity0}.${CS215_Humidity1}`;
      debug(`湿度为:${CS215_Humidity0}.${CS215_Humidity1}`);
      return parseFloat(valuestring);
    }
    if(name === "rainfall"){
      const buf = Buffer.from(hexstring,'hex');
      const value =  buf.readInt16LE(0);
      return value;
    }
    if(name === "windspeed"){
      const buf = Buffer.from(hexstring,'hex');
      const value =  buf.readInt16LE(0);
      const v = parseFloat(value/100).toFixed(1);
      return parseFloat(v);
    }
    if(name === "temperature"){
      const buf = Buffer.from(hexstring,'hex');
      const CS215_Temperature0 =  buf.readInt8(0);
      const CS215_Temperature1 =  buf.readInt8(1);
      const valuestring = `${CS215_Temperature0}.${CS215_Temperature1}`;
      debug(`温度为:${CS215_Temperature0}.${CS215_Temperature1}`);
      return parseFloat(valuestring);
    }
  }
  else if('string' === ftype){
    const value = buf.toString('ascii');
    return value;
  }

}

module.exports = parsevalue;
