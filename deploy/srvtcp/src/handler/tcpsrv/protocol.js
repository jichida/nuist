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

    const FX = (bodybuf[18] << 8) + bodybuf[17];
    debug(`风向:${FX}`);

    const CS215_Temperature0 = bodybuf[33];
    const CS215_Temperature1 = bodybuf[34];
    const CS215_Humidity0 = bodybuf[35];
    const CS215_Humidity1 = bodybuf[36];
    debug(`温度为:${CS215_Temperature0}.${CS215_Temperature1},湿度为:${CS215_Humidity0}.${CS215_Humidity1}`);

    const PTB210_Pressure0 =  (bodybuf[42] << 8) + bodybuf[41];
    const PTB210_Pressure1 =  bodybuf[44];

    debug(`气压为:${PTB210_Pressure0}.${PTB210_Pressure1}`);

    const Rainfall = (bodybuf[46] << 8) + bodybuf[45];
    debug(`雨量为:${Rainfall}`);

    const WindSpeed = (bodybuf[48] << 8) + bodybuf[47];
    debug(`风速为:${WindSpeed}`);

    const SHT10_Temperature0 = bodybuf[33];
    const SHT10_Temperature1 = bodybuf[34];
    const SHT10_Humidity0 = bodybuf[35];
    const SHT10_Humidity1 = bodybuf[36];
    debug(`温度为:${SHT10_Temperature0}.${SHT10_Temperature1},湿度为:${SHT10_Humidity0}.${SHT10_Humidity1}`);


  }
  else if(cmd === 0x03){
    const datahex = bodybuf.toString('hex');//
    debug(`datahex:${datahex.length}`)
    const GPSStatus = datahex.substr(0,1*2);//->'V'
    const UTCTime = datahex.substr(1*2,18*2);
    const Latitude = datahex.substr(19*2,13*2);
    const Longitude = datahex.substr(32*2,13*2);

    const Temperature0 = bodybuf[45];
    const Temperature1 = bodybuf[46];

    const Temperature = `${Temperature0}.${Temperature1}`;

    const Humidity0 = bodybuf[47];
    const Humidity1 = bodybuf[48];

    const Humidity = `${Humidity0}.${Humidity1}`;

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
