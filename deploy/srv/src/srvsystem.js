/**
 * Created by wangxiaoqing on 2017/3/25.
 */
const dbinit = require('./db/dbinit');
const config = require('./config');
const redis = require('./redis/index');
const handlermsg = require('./handler/redissubscribe');
const DBModels = require('./db/models');
const getdevicesids = require('./handler/getdevicesids');
const moment = require('moment');
const debug = require("debug")("appsrv:test");
const _ = require('lodash');
const PubSub = require('pubsub-js');

const userset = {};
let lasttime = moment().format('YYYY-MM-DD HH:mm:ss');
let lastdeviceid = '';
let lasttime_result = moment().format('YYYY-MM-DD HH:mm:ss');

const loginuser_add = (userid,connectid)=>{
  let usersetref = userset[userid] || [];
  _.remove(usersetref,(o)=>{
    return o === connectid;
  });
  usersetref.push(connectid);
  userset[userid] = usersetref;

  debug(`loginuser_add->${userid}+${connectid}:${JSON.stringify(userset[userid])}`)
}

const loginuser_remove = (userid,connectid)=>{
  let usersetref = userset[userid] || [];
   _.remove(usersetref,(o)=>{
    return o === connectid;
  });
  userset[userid] = usersetref;
  debug(`loginuser_remove->${userid}-${connectid}:${JSON.stringify(userset[userid])}`)
}


const checkDevice = (lasttime,callbackfn)=>{
  // debug(`start check device:${lasttime},lastdeviceid:${lastdeviceid},lasttime_result:${lasttime_result}`);

  const deviceModel = DBModels.DeviceModel;
  deviceModel.find({
    'realtimedata.datatime':{
      $gte:lasttime
    }
  }).sort({'realtimedata.datatime':1}).lean().exec((err,result)=>{
    //MongoError: Executor error during find command: OperationFailed: Sort operation used more than the maximum 33554432 bytes of RAM. Add an index, or specify a smaller limit.
    callbackfn(err,result);
  });
}

const do_updatealldevices = (alldevicelist)=>{

  _.map(userset,(v,userid)=>{
    debug(`do_updatealldevices----->${alldevicelist.length}--->${userid}`);
    if(v.length > 0){
      getdevicesids(userid,null,(deviceIds)=>{
        let ispublish = false;
        let publishvale = [];
        //设置订阅设备消息
        debug(deviceIds);

        let devicelist = [];
        _.map(deviceIds,(DeviceId)=>{
          const item = _.find(alldevicelist, (deviceitem)=>{
             return deviceitem.DeviceId === DeviceId;
           }
         );
         if(!!item){
           devicelist.push(item);
         }
        });

        if(devicelist.length > 0){
          publishvale = devicelist;
          ispublish = true;
          // PubSub.publish(`${config.pushdevicetopic}.${userid}`,devicelist);
        }

        if(ispublish){
          _.map(v,(connectid)=>{
            debug(`推送给用户:${userid}==>${connectid}==>${publishvale.length}`);
            PubSub.publish(`${config.pushdevicetopic}.${userid}.${connectid}`,publishvale);
          });
        }
      });
    }

  });
}

const do_interval = ()=>{
  checkDevice(lasttime,(err,result)=>{
    lasttime_result = moment().format('YYYY-MM-DD HH:mm:ss');
    if(!err && !!result){
      // debug(`check list----->${result.length}`);
      _.map(result,(device)=>{
        lasttime = _.get(device,'realtimedata.datatime',lasttime_result);
        lastdeviceid = device._id;
      });
      do_updatealldevices(result);//处理所有的DeviceId
    }
    else{
      debug(err);
      debug(result);
    }
  });
}


const intervalCheckDevice =()=>{
  setInterval(()=>{
    do_interval();
  }, 30000);
};

const job=()=>{

    // createadmin();
    dbinit();
    // startsrv_devpush(config);
    redis.setSubscribeHandler('nuistiotdata_realtimedata_redis',handlermsg.handlermsg_realtimedata_redis);

    // intervalCheckDevice();
};

exports.job = job;
exports.loginuser_add = loginuser_add;
exports.loginuser_remove  = loginuser_remove;
