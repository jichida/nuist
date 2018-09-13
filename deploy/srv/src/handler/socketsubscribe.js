const winston = require('../log/log.js');
const _ =  require('lodash');
const config = require('../config');
const debug = require('debug')('appsrv:test')
/*

topic:push.device.DeviceId
{
  obj
  alarm
}
*/
const pushusermessage = (socket,ctx,data,cmd)=>{
  const resultPushDevice = {
    cmd:cmd,
    payload:data
  };
  // debug(`pushtoapp:${JSON.stringify(resultPushDevice)}`);
  socket.emit(resultPushDevice.cmd,resultPushDevice.payload);
}

const usersubfn  = (socket,ctx)=>{
  ctx.userDeviceSubscriber = ( msg, data )=>{
      // debug('r-->用户订阅请求,用户信息:'+JSON.stringify(ctx));
      // debug('r-->用户订阅消息:'+msg);
      // debug('r-->用户订阅数据:'+data);

      // debug(msg);
      if(false){
        //disable publish
        let topicsz = msg.split('.');
        if(topicsz.length === 3){
          if(topicsz[0] === 'push' && topicsz[1] === 'devicealarm'){
              const DeviceId = topicsz[2];
              pushusermessage(socket,ctx,data,'serverpush_device_alarm');
          }
        }
        debug(`------>${topicsz[1]},${ctx.userid}`)
        if(_.startsWith(msg,config.pushdevicetopic) && topicsz[1] === `${ctx.userid}`){
          debug(`pushtoapp:${JSON.stringify(data)}`);
          pushusermessage(socket,ctx,{devicelist:data},'serverpush_device_list');
        }
      }

  };//for eachuser
};


module.exports = usersubfn;
