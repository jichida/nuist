const debug = require('debug')('srvtcp:protocol');
const ddh = require('../../sd/ddh');
const winston = require('../../log/log.js');
const _ = require('lodash');
//427e000b7d3100006c00000033818600002b302e3030303030453530303030303006010203040506070001020300010203e61093080001
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
    debug(`getcmd2====>${ZigbeeData},节点数据长度为:${ZigbeeData.length/2}`);
    //取第一个字节
    const newheader4hex = ZigbeeData.substr(0,2);
    const newheader4 = newheader4hex.toUpperCase();
    if(newheader4 === '6B' || newheader4 === '6C'){
      winston.getlog().info(`====>接收到新协议:${ZigbeeData},节点数据长度为:${ZigbeeData.length/2}`);
      let jsonData = {};
      //扣掉4字节
      const channelnum = (ZigbeeData.length - 8)/34;
      for(let i = 0; i < channelnum; i++){
        //4字节+N
        const channelhex = ZigbeeData.substr(8+i*2,17*2);
        //偏移4字节后,取8字节
        const frequencyhex = channelhex.substr(0,16);
        const frequencyvalue = Buffer.from(frequencyhex,'hex').toString('ascii');
        //再取8字节
        const temperaturehex = channelhex.substr(16,32);
        const temperaturevalue = Buffer.from(temperaturehex,'hex').toString('ascii');
        //再取最后一个字节
        const numberindexhex = channelhex.substr(32,2);
        const numberindex = Buffer.from(numberindexhex,'hex');
        if(frequencyvalue[0] !== 'E'){
          _.set(jsonData,`c${numberindex[0]}_frequency`,parseFloat(frequencyvalue));
          _.set(jsonData,`frequency`,parseFloat(frequencyvalue));
        }
        if(temperaturevalue[0] !== 'E'){
          _.set(jsonData,`c${numberindex[0]}_temperature`,parseFloat(temperaturevalue));
          _.set(jsonData,`temperature`,parseFloat(temperaturevalue));
        }
        _.set(jsonData,`channel${numberindex[0]}_frequency`,frequencyvalue);
        _.set(jsonData,`channel${numberindex[0]}_temperature`,temperaturevalue);
        _.set(jsonData,`channel`,numberindex[0]);
      }
      callbackfn(null,{
        cmd,
        deviceid:newheader4,
        amtype:`BC`,
        hexraw:ZigbeeData,
        resultdata:jsonData,
        replybuf:buf_cmd2
      });
      return;
    }

    const amtypehex = ZigbeeData.substr(ddh.amtype.offset*2,ddh.amtype.length*2);
    debug(`AMTypeID为:${amtypehex}`);
    const amtype = amtypehex.toUpperCase();
    console.log(`amtype-->${amtype}`);
    let jsonData;
    if(amtype === '0B'){
      const deviceidhex = ZigbeeData.substr(ddh.deviceid.offset*2,ddh.deviceid.length*2);
      debug(`节点ID为:${deviceidhex},偏移量:${ddh.deviceid.offset},长度:${ddh.deviceid.length}`);
      const deviceid = deviceidhex.toUpperCase();
      // if(deviceid === '6B' || deviceid === '6C'){
      //   //新增的数据
      //   debug(`接收到节点ID为:${deviceid}的数据,数据是:${ZigbeeData}`);
      //   const leftdata = ZigbeeData.substr(ddh.deviceid.offset*2+ddh.deviceid.length*2);
      //   debug(`leftdata:${leftdata.length},数据是:${leftdata}`);
      //   // winston.getlog().info(`接收到节点ID为:${deviceid}的数据,数据是:${ZigbeeData}`);
      // }
      // else{
        //原来的逻辑
        const pressurehex = ZigbeeData.substr(ddh.pressure.offset*2,ddh.pressure.length*2);
        const pressure = ddh.pressure.parsevalue(pressurehex);
        debug(`气压为:${pressure},offset:${ddh.pressure.offset},length:${ddh.pressure.length}`);

        const winddirectionhex = ZigbeeData.substr(ddh.winddirection.offset*2,ddh.winddirection.length*2);
        const winddirection = ddh.winddirection.parsevalue(winddirectionhex);
        debug(`风向为:${winddirection},offset:${ddh.winddirection.offset},length:${ddh.winddirection.length}`);

        const windspeedhex = ZigbeeData.substr(ddh.windspeed.offset*2,ddh.windspeed.length*2);
        const windspeed = ddh.windspeed.parsevalue(windspeedhex);
        debug(`风速为:${windspeed},offset:${ddh.windspeed.offset},length:${ddh.windspeed.length}`);

        const temperaturehex = ZigbeeData.substr(ddh.temperature.offset*2,ddh.temperature.length*2);
        const temperature = ddh.temperature.parsevalue(temperaturehex);
        debug(`温度为:${temperature},offset:${ddh.temperature.offset},length:${ddh.temperature.length}`);

        const humidityhex = ZigbeeData.substr(ddh.humidity.offset*2,ddh.humidity.length*2);
        const humidity = ddh.humidity.parsevalue(humidityhex);
        debug(`湿度为:${humidity},offset:${ddh.humidity.offset},length:${ddh.humidity.length}`);

        const rainfallhex = ZigbeeData.substr(ddh.rainfall.offset*2,ddh.rainfall.length*2);
        const rainfall = ddh.rainfall.parsevalue(rainfallhex);
        debug(`雨量为:${rainfall},offset:${ddh.rainfall.offset},length:${ddh.rainfall.length}`);

        debug(`节点ID为:${deviceidhex},偏移量:${ddh.deviceid.offset},长度:${ddh.deviceid.length},
          气压为:${pressure},偏移量:${ddh.pressure.offset},长度:${ddh.pressure.length},
          风向为:${winddirection},偏移量:${ddh.winddirection.offset},长度:${ddh.winddirection.length},
          风速为:${windspeed},偏移量:${ddh.windspeed.offset},长度:${ddh.windspeed.length},
          温度为:${temperature},偏移量:${ddh.temperature.offset},长度:${ddh.temperature.length},
          湿度为:${humidity},偏移量:${ddh.humidity.offset},长度:${ddh.humidity.length},
          雨量为:${rainfall},偏移量:${ddh.rainfall.offset},长度:${ddh.rainfall.length}
          `);

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
      // }

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

// 427e000b7d3100006c 00 00 00 33 81 86 00 00
// 2b 30 2e 30
// 30 30 30 30 45 35 30 30 30 30 30 30 04 01 02 03 04 //8+8+1
// 05 06 07 00 01 02 03 00 01 02 03 aa 10 ba 08 00 01 //8+8+1
// 427e000b7d310000010000003381860000b40230067607fb087d0369061508ae080326543604050607fa03000b00000000bd10440c0001
// 427e000b7d3100006c00000033818600002b313734322e31382b383639362e323302010203040506070001020300010203eb108f080001

// const bodybuf = Buffer.from('427e000b7d3100006c00000033818600002b313734322e31382b383639362e323302010203040506070001020300010203eb108f080001','hex');
// getbuf({cmd:0x02,bodybuf},()=>{
//
// })
module.exports = getbuf;
