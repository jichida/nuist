const redis = require("redis");
const config = require('../config.js');
const debug = require('debug')('appsrv:redis');

let client_pub,client_sub;


const handlerfnmap = {};
const setSubscribeHandler = (channel,handlerfn)=>{
  handlerfnmap[channel] = handlerfn;
}
const publish = (channel,message)=>{
  if(!!client_pub){
    client_pub.publish(channel,JSON.stringify(message));
  }

}


const startupredis = ()=>{
  client_pub = redis.createClient(config.srvredis);
  client_sub = redis.createClient(config.srvredis);


  client_sub.on('ready', function () {
      client_sub.subscribe('nuistiotdata_realtimedata_redis');
      client_sub.subscribe('nuistiotdata_realtimealarm_redis');
  });

  client_sub.on('message', (channel, message)=> {

      const handler = handlerfnmap[channel];
      if(!!handler){
        let msg = message;
        try{
          msg = JSON.parse(message);
        }
        catch(e){

        }
        handler(msg);
      }
      else{
        debug(`can not on message->${channel}`);
      }
  });
}

exports.startupredis = startupredis;
exports.setSubscribeHandler = setSubscribeHandler;
exports.publish = publish;
