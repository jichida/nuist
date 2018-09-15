const debug = require('debug')('srvtcp:protocol');
const ddh = require('../../sd/ddh');

const getbuf =({cmd,recvbuf,bodybuf},callbackfn)=>{
  if(cmd === 0x01){
    // bodybuf 长度为0
    const ServerTime = 0;
    const hexreply = ddh.getbufcmd1reply({cmd},{HeartbeatInterval:0,ServerTime});
    const buf_cmd1 = Buffer.from(hexreply,'hex');
    callbackfn(null,{
      cmd,
      replybuf:buf_cmd1
    });
  }
  else if(cmd === 0x02){
    const hexreply = ddh.getbufcmd23reply({cmd},{OperationResult:0});
    const buf_cmd2 = Buffer.from(hexreply,'hex');
    //节点的ID是数据（以0x42开头）的第9个字节. 悉知

    const ZigbeeData = bodybuf.toString('hex');//
    debug(`getcmd2====>${ZigbeeData}`);

    const deviceidhex = ZigbeeData.substr(ddh.deviceid.offset*2,ddh.deviceid.length*2);
    debug(`节点ID为:${deviceidhex}`);
    const deviceid = deviceidhex.toUpperCase();

    const pressurehex = ZigbeeData.substr(ddh.pressure.offset*2,ddh.pressure.length*2);
    const pressure = ddh.pressure.parsevalue(pressurehex);
    debug(`气压为:${pressure}`);

    const winddirectionhex = ZigbeeData.substr(ddh.winddirection.offset*2,ddh.winddirection.length*2);
    const winddirection = ddh.winddirection.parsevalue(winddirectionhex);

    debug(`风向为:${winddirection}`);

    const windspeedhex = ZigbeeData.substr(ddh.windspeed.offset*2,ddh.windspeed.length*2);
    const windspeed = ddh.windspeed.parsevalue(windspeedhex);
    debug(`风速为:${windspeed}`);

    const temperaturehex = ZigbeeData.substr(ddh.temperature.offset*2,ddh.temperature.length*2);
    const temperature = ddh.temperature.parsevalue(temperaturehex);
    debug(`温度为:${temperature}`);

    const humidityhex = ZigbeeData.substr(ddh.humidity.offset*2,ddh.humidity.length*2);
    const humidity = ddh.humidity.parsevalue(humidityhex);
    debug(`温度为:${humidity}`);

    const rainfallhex = ZigbeeData.substr(ddh.rainfall.offset*2,ddh.rainfall.length*2);
    const rainfall = ddh.rainfall.parsevalue(rainfallhex);
    debug(`雨量为:${rainfall}`);

    const jsonData = {
      pressure,
      winddirection,
      windspeed,
      temperature,
      humidity,
      rainfall
    };

    // const FX = (bodybuf[18] << 8) + bodybuf[17];
    // debug(`风向:${FX}`);

    // const CS215_Temperature0 = bodybuf[33];
    // const CS215_Temperature1 = bodybuf[34];
    // const CS215_Humidity0 = bodybuf[35];
    // const CS215_Humidity1 = bodybuf[36];
    // debug(`温度为:${CS215_Temperature0}.${CS215_Temperature1},湿度为:${CS215_Humidity0}.${CS215_Humidity1}`);
    //
    // const PTB210_Pressure0 =  (bodybuf[42] << 8) + bodybuf[41];
    // const PTB210_Pressure1 =  bodybuf[44];
    //
    // debug(`气压为:${PTB210_Pressure0}.${PTB210_Pressure1}`);
    //
    // const Rainfall = (bodybuf[46] << 8) + bodybuf[45];
    // debug(`雨量为:${Rainfall}`);
    //
    // const WindSpeed = (bodybuf[48] << 8) + bodybuf[47];
    // debug(`风速为:${WindSpeed}`);
    //
    // const SHT10_Temperature0 = bodybuf[33];
    // const SHT10_Temperature1 = bodybuf[34];
    // const SHT10_Humidity0 = bodybuf[35];
    // const SHT10_Humidity1 = bodybuf[36];
    // debug(`温度为:${SHT10_Temperature0}.${SHT10_Temperature1},湿度为:${SHT10_Humidity0}.${SHT10_Humidity1}`);
    // const jsonData = {
    //   Pressure:parseFloat(`${PTB210_Pressure0}.${PTB210_Pressure1}`),
    //   Temperature:parseFloat(`${CS215_Temperature0}.${CS215_Temperature1}`),
    //   Humidity:parseFloat(`${CS215_Humidity0}.${CS215_Humidity1}`),
    //
    // }
    callbackfn(null,{
      cmd,
      deviceid,
      resultdata:jsonData,
      replybuf:buf_cmd2
    });
  }
  else if(cmd === 0x03){
    const hexreply = ddh.getbufcmd23reply({cmd},{OperationResult:0});
    const buf_cmd2 = Buffer.from(hexreply,'hex');

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
    callbackfn(null,{
      cmd,
      resultdata:jsonData,
      replybuf:buf_cmd2
    });
  }
  else{
    const err = new Error('不符合协议');
    callbackfn(err,null);
  }

}

module.exports = getbuf;
