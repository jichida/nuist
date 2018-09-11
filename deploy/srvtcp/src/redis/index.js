const redis = require("redis");
const config = require('../config.js');

let  client_pub;
let  client_sub;

const startup = ()=>{
  if(config.issendtoredis){
    client_pub = redis.createClient(config.srvredis);
    client_sub = redis.createClient(config.srvredis);


    client_sub.on('ready', function () {
        client_sub.subscribe('nuistiotdata_realtimedata');
        client_sub.subscribe('nuistiotdata_realtimealarm');
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
    });
  }
}

const handlerfnmap = {};
const setSubscribeHandler = (channel,handlerfn)=>{
  handlerfnmap[channel] = handlerfn;
}

const publish = (channel,message)=>{
  if(config.issendtoredis){
    client_pub.publish(channel,JSON.stringify(message));
  }
}


exports.setSubscribeHandler = setSubscribeHandler;
exports.publish = publish;
exports.startup = startup;
