const config = require('./src/config');
const tcpsrv = require('./src/handler/tcpsrv');
const mongoose     = require('mongoose');
const debug = require('debug')('srvtcp:app');
const winston = require('./src/log/log.js');
const PubSub = require('pubsub-js');
const redis = require('./src/redis/index.js');
const moment = require('moment');
const _ = require('lodash');
const ddh = require('./src/sd/ddh');
const dbhgetdata = require('./src/handler/dbh');

winston.initLog();
winston.getlog().info(`appversion:${config.appversion}`);
mongoose.Promise = global.Promise;
mongoose.connect(config.mongodburl,{
    mongos:config.mongos,

    useMongoClient: true,
    // This options is 1 second by default, its possible the ha
    // takes longer than 30 seconds to recover.
    reconnectInterval: 5000,
    // This options is 30 by default, why not make it 60
    reconnectTries: Number.MAX_VALUE
});

redis.startup();
tcpsrv.starttcpsrv();



PubSub.subscribe(`nuistdata`, ( msg, data )=>{
    debug(`-->用户订阅消息:${msg}`);
    debug(`-->用户订阅数据:${JSON.stringify(data)}`);
    //---------------添加其他模拟数据--------------
    const amtype = _.get(data,'amtype','0B');
    if(amtype === '0B'){
      dbhgetdata(data).then((data)=>{
        const simuloator_realtimedata = {
              "datatime":moment().format('YYYY-MM-DD HH:mm:ss');
        };

        _.map(simuloator_realtimedata,(v,k)=>{
          if(!_.get(data,`realtimedata.${k}`)){
            _.set(data,`realtimedata.${k}`,v);
          }
        });

        redis.publish('nuistiotdata_realtimedata_redis',data);
      });

    }
    else if(amtype === '03'){
      //0x03：   TOS_Msg Header，AM Type： AM_HEALTH
      redis.publish('nuistiotdata_realtimedata_redis',data);
    }
    // if(_.random(0,4) > 1){
    //   const nextdeviceid = _.random(parseInt(config.deviceid_data_min), parseInt(config.deviceid_data_max));
    //   data.nextdeviceid = ddh.deviceid.gethex(nextdeviceid);
    // }

    console.log(`-->发布数据:${JSON.stringify(data)}`);


});
