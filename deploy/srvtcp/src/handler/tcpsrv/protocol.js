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
    debug(`getcmd2:${ZigbeeData}`);
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
    debug(`getcmd2:${JSON.stringify(jsonData)}`);
  }

}

module.exports = getbuf;
