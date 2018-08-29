const debug = require('debug')('srvtcp:protocol');


const getbuf =({cmd,recvbuf,bodybuf},callbackfn)=>{
  if(cmd === 0x01){
    // bodybuf 长度为0
    // const Heartbeatinterval = bodybuf.readInt32BE();
    // const Servertime = bodybuf.readInt32BE();
    // debug(`getcmd1:Heartbeatinterval:${Heartbeatinterval},Servertime:${Servertime}`)
  }
  else if(cmd === 0x02){
    const ZigbeeData = bodybuf.toString('hex');//
    debug(`getcmd2====>${ZigbeeData}`);

    const FX = (bodybuf[17] << 8) + bodybuf[18];
    debug(`风向:${FX}`);

    const CS215_Temperature0 = bodybuf[33];
    const CS215_Temperature1 = bodybuf[34];
    const CS215_Humidity0 = bodybuf[35];
    const CS215_Humidity1 = bodybuf[36];
    debug(`温度为:${CS215_Temperature0}.${CS215_Temperature1},湿度为:${CS215_Humidity0}.${CS215_Humidity1}`);

    const PTB210_Pressure0 =  (bodybuf[41] << 8) + bodybuf[42];
    const PTB210_Pressure1 =  (bodybuf[43] << 8) + bodybuf[44];

    debug(`气压为:${PTB210_Pressure0}.${PTB210_Pressure1}`);

    const Rainfall = (bodybuf[45] << 8) + bodybuf[46];
    debug(`雨量为:${Rainfall}`);

    const WindSpeed = (bodybuf[47] << 8) + bodybuf[48];
    debug(`风速为:${Rainfall}`);

    const Temperature_Int = (bodybuf[49] << 8) + bodybuf[50];
    debug(`温度为:${Temperature_Int}`);
    const Humidity_Int = (bodybuf[51] << 8) + bodybuf[52];
    debug(`湿度为:${Humidity_Int}`);

  }
  else if(cmd === 0x03){
    const GPSStatus = bodybuf.toString('ascii',0,1);
    const UTCTime = bodybuf.toString('ascii',1,18);
    const Latitude = bodybuf.toString('ascii',19,13);
    const Longitude = bodybuf.toString('ascii',32,13);

    const Temperature_Int = (bodybuf[45] << 8) + bodybuf[46];
    const Temperature_float = Temperature_Int & 0x01;
    const Temperature_num = (Temperature_Int >> 1);
    const Temperature = `${Temperature_num}.${Temperature_float}`;
    const Humidity_Int = (bodybuf[47] << 8) + bodybuf[48];
    const Humidity_float = Humidity_Int & 0x01;
    const Humidity_num = (Humidity_Int >> 1);
    const Humidity = `${Humidity_num}.${Humidity_float}`;

    const BatteryStatus = bodybuf[49];
    const Battery1Level = bodybuf[50];
    const Battery2Level = bodybuf[51];
    const jsonData = {
      GPSStatus,
      UTCTime,
      Latitude,
      Longitude,
      Temperature,
      Humidity,
      BatteryStatus,
      Battery1Level,
      Battery2Level
    };
    debug(`getcmd3====>${JSON.stringify(jsonData)}`);
  }

}

module.exports = getbuf;
