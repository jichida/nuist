const winston = require('../log/log.js');
const _ =  require('lodash');
const debug = require('debug')('appsrv:pushdev')
/*

topic:push.device.DeviceId
{
  obj
  alarm
}
*/
const pushusermessage = (socket,ctx,DeviceId,data)=>{
  const resultPushDevice = {
    cmd:'serverpush_device',
    payload:data
  };
  debug(`pushtoapp:${JSON.stringify(resultPushDevice)}`);
  socket.emit(resultPushDevice.cmd,resultPushDevice.payload);
}

const usersubfn  = (socket,ctx)=>{
  ctx.userDeviceSubscriber = ( msg, data )=>{
      debug('r-->用户订阅请求,用户信息:'+JSON.stringify(ctx));
      debug('r-->用户订阅消息:'+msg);
      debug('r-->用户订阅数据:'+data);

      let topicsz = msg.split('.');
      if(topicsz.length === 3){
        if(topicsz[0] === 'push' && topicsz[1] === 'device'){
            const DeviceId = topicsz[2];
            pushusermessage(socket,ctx,DeviceId,data);
        }
      }
  };//for eachuser
};


module.exports = usersubfn;
