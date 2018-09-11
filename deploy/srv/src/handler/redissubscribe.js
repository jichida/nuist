const PubSub = require("pubsub-js");
const _ = require('lodash');
const moment = require('moment');
const DBModels = require('../db/models.js');
const mongoose  = require('mongoose');
const alarmrule = require('../alarmrule');

const debug = require('debug')('appsrv:redismsg')

// appsrv:redismsg handlermsg_realtimealarm===>{"value":11,"type":"windspeed","level":"高","content":"10级以上大风","DeviceId":"LH001"} +1ms
//   appsrv:redismsg handlermsg_realtimealarm===>{"value":50,"type":"temperature","level":"高","content":"温度过高","DeviceId":"LH001"} +4ms
//   appsrv:redismsg handlermsg_realtimedata===>{"DeviceId":"NODE1","realtimedata":{"pressure":63,"winddirection":341,"windspeed":11,"humidity":39,"rainfall":274,"temperature":50}} +5s
const handlermsg_historydevice = (devicedata)=>{
  const devicedatanew = _.omit(devicedata,['_id']);
  devicedatanew.did = devicedata._id;
  devicedatanew.UpdateTime = moment().format('YYYY-MM-DD HH:mm:ss');

  const dbModel = DBModels.HistoryDeviceModel;
  const entity = new dbModel(devicedatanew);
  entity.save((err,result)=>{
    debug(err);
    debug(`result->${JSON.stringify(result)}`);
  });
};

const handlermsg_alarmdata = (alarmdata)=>{
  alarmdata.UpdateTime = moment().format('YYYY-MM-DD HH:mm:ss');
  const dbModel = DBModels.RealtimeAlarmRawModel;

  const entity = new dbModel(alarmdata);
  entity.save((err,result)=>{
    debug(err);
    debug(`result->${JSON.stringify(result)}`);
    if(!err && !!result){
      PubSub.publish(`push.devicealarm.${result.DeviceId}`,result);
    }
  });
};


//=======
const getgatewayid  = (GatewayId,callbackfn)=>{
  const gwModel = DBModels.GatewayModel;
  gwModel.findOneAndUpdate({GatewayId},{$set:{GatewayId}},{new:true,upsert:true}).
    lean().exec((err,result)=>{
      let gwid;
      if(!err && !!result){
        gwid = result._id;
      }
      callbackfn(gwid);
    });
};

const handlermsg_realtimedata = (devicedata)=>{
  debug(`handlermsg_realtimedata===>${JSON.stringify(devicedata)}`)
  getgatewayid((gwid)=>{
    if(!!gwid){
      const deviceModel = DBModels.DeviceModel;
      deviceModel.findOneAndUpdate({DeviceId:devicedata.deviceid,gatewayid:gwid},
        {$set:{DevicId:devicedata.deviceid,
          gatewayid:gwid,
          realtimedata:devicedata.realtimedata,}},{new:true,upsert:true}).
        lean().exec((err,newdevice)=>{
          //<----------
          if(!err && !!newdevice){
            handlermsg_historydevice(newdevice);
            // PubSub.publish(`push.device.${newdevice.DeviceId}`,newdevice);

            alarmrule.matchalarm(newdevice.realtimedata,(resultalarmmatch)=>{
              _.map(resultalarmmatch,(al)=>{
                // console.log(al);
                al.DeviceId = devicedata.deviceid;
                al.did = newdevice._id;
                handlermsg_alarmdata(al);
              });
            });

          }
          callbackfn(gwid);
      });
    }
  });
}

const handlermsg_realtimedata_redis = (devicedata)=>{
  debug(`handlermsg_realtimedata_redis===>${JSON.stringify(devicedata)}`);
  getgatewayid(devicedata.gwid,(gatewayid)=>{
    if(!!gatewayid){
      const deviceModel = DBModels.DeviceModel;
      deviceModel.findOneAndUpdate({DeviceId:devicedata.deviceid,gatewayid},{$set:{
        DeviceId:devicedata.deviceid,
        gatewayid,
        realtimedata:devicedata.realtimedata
      }},{new:true,upsert:true}).
        lean().exec((err,newdevice)=>{
          //<----------
          if(!err && !!newdevice){
            handlermsg_historydevice(newdevice);

            // PubSub.publish(`push.device.${newdevice.DeviceId}`,newdevice);
            //不用publish了

            alarmrule.matchalarm(newdevice.realtimedata,(resultalarmmatch)=>{
              _.map(resultalarmmatch,(al)=>{
                console.log(al);
                al.DeviceId = devicedata.DeviceId;
                al.did = newdevice._id;
                handlermsg_alarmdata(al);
              });
            });
          }
      });
    }
  })
}

exports.handlermsg_realtimedata_redis = handlermsg_realtimedata_redis;
