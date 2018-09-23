const debug = require('debug')('testtcp:parse');
const config = require('../config.js');
const simulatordata = {
  "deviceid":{
    offset:8,
    length:1,
    max:parseInt(config.deviceid_data_max),
    min:parseInt(config.deviceid_data_min),
    gethex:(value)=>{
      const valuestring = `${value}`;
      const buf0 = Buffer.allocUnsafe(1);
      buf0.writeUInt8(value, 0);
      const hex0 = buf0.toString('hex').toUpperCase();
      return `${hex0}`;
    },
    parsevalue:(hexstring)=>{
      const buf = Buffer.from(hexstring,'hex');
      const deviceid =  buf.readUInt8(0);
      const valuestring = `${deviceid}`;
      debug(`节点ID为:${valuestring}`);
      return parseInt(valuestring);
    }
  },
  "amtype":{
    offset:3,
    length:1,
    gethex:(value)=>{
      const valuestring = `${value}`;
      const buf0 = Buffer.allocUnsafe(1);
      buf0.writeUInt8(value, 0);
      const hex0 = buf0.toString('hex').toUpperCase();
      return `${hex0}`;
    },
    parsevalue:(hexstring)=>{
      const buf = Buffer.from(hexstring,'hex');
      const deviceid =  buf.readUInt8(0);
      const valuestring = `${deviceid}`;
      debug(`AM_Type为:${valuestring}`);
      return parseInt(valuestring);
    }
  },
  "pressure":{//压力<----PTB210
    offset:parseInt(config.pressure_data_offset),
    length:parseInt(config.pressure_data_length),
    max:parseInt(config.pressure_data_max),
    min:parseInt(config.pressure_data_min),
    gethex:(value)=>{
      const valuestring = `${value}`;
      const sz = valuestring.split(".");
      const PTB210_Pressure0 = sz[0];
      const PTB210_Pressure1 = sz.length > 1?sz[1]:0;
      const buf0 = Buffer.allocUnsafe(2);
      buf0.writeInt16LE(PTB210_Pressure0, 0);
      const hex0 = buf0.toString('hex');

      const buf1 = Buffer.allocUnsafe(1);
      buf1.writeInt8(PTB210_Pressure1, 0);
      const hex1 = buf1.toString('hex');
      return `${hex0}00${hex1}`;
    },
    parsevalue:(hexstring)=>{
      const buf = Buffer.from(hexstring,'hex');
      const PTB210_Pressure0 =  buf.readInt16LE(0);
      const PTB210_Pressure1 =  buf[3];
      const valuestring = `${PTB210_Pressure0}.${PTB210_Pressure1}`;
      debug(`气压为:${PTB210_Pressure0}.${PTB210_Pressure1}`);
      return parseFloat(valuestring);
    }
  },
  "winddirection":{//风向
    offset:parseInt(config.winddirection_data_offset),
    length:parseInt(config.winddirection_data_length),
    max:parseInt(config.winddirection_data_max),
    min:parseInt(config.winddirection_data_min),
    gethex:(value)=>{
      let valueangel = value*4096/3600;
      const buf0 = Buffer.allocUnsafe(2);
      buf0.writeInt16LE(value, 0);
      const hex0 = buf0.toString('hex');
      return hex0;
    },
    parsevalue:(hexstring)=>{
      const buf = Buffer.from(hexstring,'hex');
      const value =  buf.readInt16LE(0);
      //     AD=0x09DE
      // 角度 = AD * 3600 / 4096
      // 单位： 0.1°
      // e.g.
      // AD = 0x63D * 3600 / 4096 = 140.3°
      const angel = value*3600/4096;
      const v = parseFloat(angel).toFixed(1);
      return parseFloat(v);
    }
  },
  "windspeed":{//风速
    offset:parseInt(config.windspeed_data_offset),
    length:parseInt(config.windspeed_data_length),
    max:parseInt(config.windspeed_data_max),
    min:parseInt(config.windspeed_data_min),
    gethex:(value)=>{
      const v = value*100;
      const buf0 = Buffer.allocUnsafe(2);
      buf0.writeInt16LE(v, 0);
      const hex0 = buf0.toString('hex');
      return hex0;
    },
    parsevalue:(hexstring)=>{
      const buf = Buffer.from(hexstring,'hex');
      const value =  buf.readInt16LE(0);
      const v = parseFloat(value/100).toFixed(1);
      return parseFloat(v);
    }
  },
  "humidity" :{//CS215
    offset:parseInt(config.humidity_data_offset),
    length:parseInt(config.humidity_data_length),
    max:parseInt(config.humidity_data_max),
    min:parseInt(config.humidity_data_min),
    gethex:(value)=>{
      const valuestring = `${value}`;
      const sz = valuestring.split(".");
      const CS215_Humidity0 = sz[0];
      const CS215_Humidity1 = sz.length > 1?sz[1]:0;
      const CS215_Humidity0_Int = parseInt(CS215_Humidity0,10);
      const CS215_Humidity1_Int = parseInt(CS215_Humidity1,10);
      const buf0 = Buffer.allocUnsafe(2);
      buf0.writeInt8(CS215_Humidity0_Int, 0);
      buf0.writeInt8(CS215_Humidity1_Int, 1);
      const hex0 = buf0.toString('hex');
      return hex0;
    },
    parsevalue:(hexstring)=>{
      const buf = Buffer.from(hexstring,'hex');
      const CS215_Humidity0 =  buf.readInt8(0);
      const CS215_Humidity1 =  buf.readInt8(1);
      const valuestring = `${CS215_Humidity0}.${CS215_Humidity1}`;
      debug(`湿度为:${CS215_Humidity0}.${CS215_Humidity1}`);
      return parseFloat(valuestring);
    }
  },
  "rainfall" : {
    offset:parseInt(config.rainfall_data_offset),
    length:parseInt(config.rainfall_data_length),
    max:parseInt(config.rainfall_data_max),
    min:parseInt(config.rainfall_data_min),
    gethex:(value)=>{
      const buf0 = Buffer.allocUnsafe(2);
      buf0.writeInt16LE(value, 0);
      const hex0 = buf0.toString('hex');
      return hex0;
    },
    parsevalue:(hexstring)=>{
      const buf = Buffer.from(hexstring,'hex');
      const value =  buf.readInt16LE(0);
      return value;
    }
  },
  "temperature" :{//CS215
    offset:parseInt(config.temperature_data_offset),
    length:parseInt(config.temperature_data_length),
    max:parseInt(config.temperature_data_max),
    min:parseInt(config.temperature_data_min),
    gethex:(value)=>{
      const valuestring = `${value}`;
      const sz = valuestring.split(".");
      const CS215_Temperature0 = sz[0];
      const CS215_Temperature1 = sz.length > 1?sz[1]:0;
      debug(`CS215_Temperature0:${CS215_Temperature0},CS215_Temperature1:${CS215_Temperature1}`)
      const CS215_Temperature0_Int = parseInt(CS215_Temperature0,10);
      const CS215_Temperature1_Int = parseInt(CS215_Temperature1,10);
      debug(`CS215_Temperature0:${CS215_Temperature0_Int},CS215_Temperature1:${CS215_Temperature1_Int}`)
      const buf0 = Buffer.allocUnsafe(2);
      buf0.writeInt8(CS215_Temperature0_Int, 0);
      buf0.writeInt8(CS215_Temperature1_Int, 1);
      const hex0 = buf0.toString('hex');
      return hex0;
    },
    parsevalue:(hexstring)=>{
      const buf = Buffer.from(hexstring,'hex');
      const CS215_Temperature0 =  buf.readInt8(0);
      const CS215_Temperature1 =  buf.readInt8(1);
      const valuestring = `${CS215_Temperature0}.${CS215_Temperature1}`;
      debug(`温度为:${CS215_Temperature0}.${CS215_Temperature1}`);
      return parseFloat(valuestring);
    }
  },
  "deformation":{
    offset:0,
    length:2,
    max:50,
    min:20,
    gethex:(value)=>{

    },
    parsevalue:(hexstring)=>{

    }
  },
  "voltage":{
    offset:0,
    length:2,
    max:50,
    min:20,
    gethex:(value)=>{

    },
    parsevalue:(hexstring)=>{

    }
  },
  "stress0":{
    offset:0,
    length:2,
    max:50,
    min:20,
    gethex:(value)=>{

    },
    parsevalue:(hexstring)=>{

    }
  },
  "stress1":{
    offset:0,
    length:2,
    max:50,
    min:20,
    gethex:(value)=>{

    },
    parsevalue:(hexstring)=>{

    }
  },
  "osmoticpressure":{
    offset:0,
    length:2,
    max:50,
    min:20,
    gethex:(value)=>{

    },
    parsevalue:(hexstring)=>{

    }
  },
  "no":{
    offset:0,
    length:2,
    max:50,
    min:20,
    gethex:(value)=>{

    },
    parsevalue:(hexstring)=>{

    }
  },
  "co":{
    offset:0,
    length:2,
    max:50,
    min:20,
    gethex:(value)=>{

    },
    parsevalue:(hexstring)=>{

    }
  },
  "pm2d5":{
    offset:0,
    length:2,
    max:50,
    min:20,
    gethex:(value)=>{

    },
    parsevalue:(hexstring)=>{

    }
  },
  "h2s":{
    offset:0,
    length:2,
    max:50,
    min:20,
    gethex:(value)=>{

    },
    parsevalue:(hexstring)=>{

    }
  },
  "no2":{
    offset:0,
    length:2,
    max:50,
    min:20,
    gethex:(value)=>{

    },
    parsevalue:(hexstring)=>{

    }
  },
  "o3":{
    offset:0,
    length:2,
    max:50,
    min:20,
    gethex:(value)=>{

    },
    parsevalue:(hexstring)=>{

    }
  },
  "level":{
    offset:0,
    length:2,
    max:50,
    min:20,
    gethex:(value)=>{

    },
    parsevalue:(hexstring)=>{

    }
  },
  "displacement":{
    offset:0,
    length:2,
    max:50,
    min:20,
    gethex:(value)=>{

    },
    parsevalue:(hexstring)=>{

    }
  },
  "steelbarmeter":{
    offset:0,
    length:2,
    max:50,
    min:20,
    gethex:(value)=>{

    },
    parsevalue:(hexstring)=>{

    }
  },
};

const replaceAt = (payload,index, replacement)=> {
    return payload.substr(0, index) + replacement+ payload.substr(index + replacement.length);
}

simulatordata.gethex1 = (value)=>{
  const buf0 = Buffer.allocUnsafe(1);
  debug(`value->${value}`)
  buf0.writeUInt8(value, 0);
  const hex0 = buf0.toString('hex');
  return hex0;
},

simulatordata.parsevalue1 = (hexstring)=>{
  const buf = Buffer.from(hexstring,'hex');
  const value =  buf.readInt8(0);
  return value;
}

simulatordata.gethex2 = (value)=>{
  const buf0 = Buffer.allocUnsafe(2);
  buf0.writeInt16BE(value, 0);
  const hex0 = buf0.toString('hex');
  return hex0;
},

simulatordata.parsevalue2 = (hexstring)=>{
  const buf = Buffer.from(hexstring,'hex');
  const value =  buf.readInt16BE(0);
  return value;
}

simulatordata.getbufcmd1reply = ({cmd},{HeartbeatInterval,ServerTime})=>{
  let header = '594700010000000453B832C50037010207';
  let lengthhex = simulatordata.gethex2(8);//固定8个字节
  debug(`cmd->${cmd}`)
  cmd = 0x80+cmd;
  let cmdhex = simulatordata.gethex1(cmd);
  header = replaceAt(header,12*2,lengthhex);
  header = replaceAt(header,15*2,cmdhex);
  let payload = '0000000053B01D39';//for HeartbeatInterval & ServerTime
  return `${header}${payload}`;
}

simulatordata.getbufcmd23reply = ({cmd},{OperationResult})=>{
  let header = '594700010000000F53B01D3D000401826B0000';
  let lengthhex = simulatordata.gethex2(4);//固定4个字节
  debug(`cmd->${cmd}`)
  cmd = 0x80+cmd;
  let cmdhex = simulatordata.gethex1(cmd);
  header = replaceAt(header,12*2,lengthhex);
  header = replaceAt(header,15*2,cmdhex);
  let payload = '0000';//OperationResult
  return `${header}${payload}`;
}

simulatordata.getheader = ({gwid,length,cmd})=>{
  let header = '594700010000000453B832C50037010207';
  let gwidhex = simulatordata.gethex2(gwid);
  let lengthhex = simulatordata.gethex2(length);
  let cmdhex = simulatordata.gethex1(cmd);
  header = replaceAt(header,2*2,gwidhex);
  header = replaceAt(header,12*2,lengthhex);
  header = replaceAt(header,15*2,cmdhex);
  debug(`cmdhex->${cmdhex},header->${header},header->${header.length}`);
  return header;
}

simulatordata.getbufcmd1 = ({deviceid,pressure,winddirection,humidity,rainfall,temperature,windspeed})=>{
  let payload = '427E000B7D3100000100000033818600';
  payload+='00DE09E10A660B030BFC002E056606AC';
  payload+='071538306004050607FC030015000000';
  payload+='002B18D0050001299D';
  debug(`payload-->${payload.length}`);
  const deviceidhex = simulatordata.deviceid.gethex(deviceid);
  payload = replaceAt(payload,simulatordata.deviceid.offset*2,deviceidhex);

  const pressurehex = simulatordata.pressure.gethex(pressure);
  payload = replaceAt(payload,simulatordata.pressure.offset*2,pressurehex);

  const windspeedhex = simulatordata.windspeed.gethex(windspeed);
  payload = replaceAt(payload,simulatordata.windspeed.offset*2,windspeedhex);

  const winddirectionhex = simulatordata.winddirection.gethex(winddirection);
  payload = replaceAt(payload,simulatordata.winddirection.offset*2,winddirectionhex);

  const humidityhex = simulatordata.humidity.gethex(humidity);
  payload = replaceAt(payload,simulatordata.humidity.offset*2,humidityhex);

  const rainfallhex = simulatordata.rainfall.gethex(rainfall);
  payload = replaceAt(payload,simulatordata.rainfall.offset*2,rainfallhex);

  const temperaturehex = simulatordata.temperature.gethex(temperature);
  payload = replaceAt(payload,simulatordata.temperature.offset*2,temperaturehex);

  debug(`payload-->${payload}`);
  return payload;
}


module.exports = simulatordata;
