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
    let errmsg = `协议不符`;
    const ZigbeeData = bodybuf.toString('hex');//
    debug(`getcmd2====>${ZigbeeData}`);

    const amtypehex = ZigbeeData.substr(ddh.amtype.offset*2,ddh.amtype.length*2);
    debug(`AMTypeID为:${amtypehex}`);
    const amtype = amtypehex.toUpperCase();
    console.log(`amtype-->${amtype}`);
    let jsonData;
    if(amtype === '0B'){
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

      jsonData = {
        pressure,
        winddirection,
        windspeed,
        temperature,
        humidity,
        rainfall
      };

      callbackfn(null,{
        cmd,
        deviceid,
        amtype,
        hexraw:ZigbeeData,
        resultdata:jsonData,
        replybuf:buf_cmd2
      });
      return;
    }
    else if(amtype === '03'){
      const TOS_Msg_Header_MSGLengthhex = ZigbeeData.substr(ddh.TOS_Msg_Header_MSGLength.offset*2,ddh.rainfall.length*2);
      const TOS_Msg_Header_MSGLength = ddh.rainfall.parsevalue(TOS_Msg_Header_MSGLengthhex);
      console.log(`TOS_Msg_Header_MSGLength:${TOS_Msg_Header_MSGLength}`);
      if(ZigbeeData.length > 20){
        const deviceidhex = ZigbeeData.substr(16,2);
        const deviceid = deviceidhex.toUpperCase();
        console.log(`deviceid:${deviceid}`);


        const nextdeviceidhex = ZigbeeData.substr(ZigbeeData.length-8,2);
        const nextdeviceid = nextdeviceidhex.toUpperCase();
        console.log(`nextdeviceid:${nextdeviceid}`);


        callbackfn(null,{
          cmd,
          amtype,
          nextdeviceid,
          deviceid,
          hexraw:ZigbeeData,
          replybuf:buf_cmd2
        });
        return;
      }
    }
    else{
      callbackfn(null,{
        cmd,
        amtype,
        replybuf:buf_cmd2
      });
    }

    // callbackfn(new Error(errmsg),null);

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
    callbackfn(null,{
        cmd
    });
  }

}

module.exports = getbuf;
