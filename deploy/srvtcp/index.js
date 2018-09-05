const config = require('./src/config');
const tcpsrv = require('./src/handler/tcpsrv');
const mongoose     = require('mongoose');
const debug = require('debug')('srvtcp:app');
const winston = require('./src/log/log.js');
const PubSub = require('pubsub-js');
const redis = require('./src/redis/index.js');

mongoose.Promise = global.Promise;
mongoose.connect(config.mongodburl,{
    // This options is 1 second by default, its possible the ha
    // takes longer than 30 seconds to recover.
    reconnectInterval: 5000,
    // This options is 30 by default, why not make it 60
    reconnectTries: Number.MAX_VALUE
  });


debug(`mongodburl:${config.mongodburl}`);
winston.initLog();
winston.getlog().info(`appversion:${config.appversion},mongodburl:${config.mongodburl}`);

mongoose.connection.on("connected",function(){
  debug("mongoose connect sucess");
  tcpsrv.starttcpsrv();
})


PubSub.subscribe(`nuistdata`, ( msg, data )=>{
    debug(`-->用户订阅消息:${msg}`);
    debug(`-->用户订阅数据:${JSON.stringify(data)}`);
    redis.publish('nuistiotdata_realtimedata',data);
});
