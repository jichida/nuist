const debug = require('debug')('testtcp:parse');
const simulatordata = {
  "pressure":{//压力<----PTB210
    offset:41,
    length:4,
    max:50,
    min:20,
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
    offset:17,
    length:2,
    max:360,
    min:0,
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
  "windspeed":{//风速
    offset:47,
    length:2,
    max:50,
    min:20,
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
  "humidity" :{//CS215
    offset:35,
    length:2,
    max:50,
    min:20,
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
    offset:45,
    length:2,
    max:50,
    min:20,
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
    offset:33,
    length:2,
    max:50,
    min:20,
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

simulatordata.getdatahexreply = ({cmd},{HeartbeatInterval,ServerTime})=>{
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

simulatordata.getbufcmd1 = ({pressure,winddirection,humidity,rainfall,temperature})=>{
  let payload = '427E000B7D3100000100000033818600';
  payload+='00DE09E10A660B030BFC002E056606AC';
  payload+='071538306004050607FC030015000000';
  payload+='002B18D0050001299D';
  debug(`payload-->${payload.length}`);
  const pressurehex = simulatordata.pressure.gethex(pressure);
  payload = replaceAt(payload,simulatordata.pressure.offset*2,pressurehex);

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
