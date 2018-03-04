const debug = require('debug')('srvtcp:protocol');


const getbuf =({cmd,recvbuf,bodybuf},callbackfn)=>{
  if(cmd === 0x01){
    // bodybuf 长度为0
    // const Heartbeatinterval = bodybuf.readInt32BE();
    // const Servertime = bodybuf.readInt32BE();
    // debug(`getcmd1:Heartbeatinterval:${Heartbeatinterval},Servertime:${Servertime}`)
  }
  else if(cmd === ox02){
    const ZigbeeData = bodybuf.toString('hex');//
    debug(`getcmd2:${ZigbeeData}`);
  }
  else if(cmd === 0x03){
    const GPSStatus = bodybuf[0];
    const Servertime = bodybuf.readInt32BE();
    const UTCTime = bodybuf.toString('ascii',1,18);
    const Latitude = bodybuf.toString('ascii',19,13);
    const Longitude = bodybuf.toString('ascii',32,13);
    const Temperature = (bodybuf[45] << 8) + buf[46];
    const Humidity = (bodybuf[47] << 8) + buf[48];
    const BatteryStatus = buf[49];
    const Battery1Level = buf[50];
    const Battery2Level = buf[51];
    const jsonData = {
      GPSStatus,
      Servertime,
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
