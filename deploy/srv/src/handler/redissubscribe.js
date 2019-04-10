const PubSub = require("pubsub-js");
const _ = require('lodash');
const moment = require('moment');
const DBModels = require('../db/models.js');
const mongoose  = require('mongoose');
const alr = require('../alarmrule');
const geo = require('../util/geo');
const debug = require('debug')('appsrv:redismsg')

// appsrv:redismsg handlermsg_realtimealarm===>{"value":11,"type":"windspeed","level":"高","content":"10级以上大风","DeviceId":"LH001"} +1ms
//   appsrv:redismsg handlermsg_realtimealarm===>{"value":50,"type":"temperature","level":"高","content":"温度过高","DeviceId":"LH001"} +4ms
//   appsrv:redismsg handlermsg_realtimedata===>{"DeviceId":"NODE1","realtimedata":{"pressure":63,"winddirection":341,"windspeed":11,"humidity":39,"rainfall":274,"temperature":50}} +5s
const handlermsg_historydevice_0B= (devicedata,hexraw0B)=>{
  const devicedatanew = _.omit(devicedata,['_id']);
  devicedatanew.did = devicedata._id;
  devicedatanew.UpdateTime = moment().format('YYYY-MM-DD HH:mm:ss');
  devicedatanew.hexraw0B = hexraw0B;
  const dbModel = DBModels.HistoryDeviceModel;
  const entity = new dbModel(devicedatanew);
  entity.save((err,result)=>{
    debug(`saved result`);
    debug(result);
  });
};

const handlermsg_historydevice_BC = (devicedata,hexrawBC)=>{
  const devicedatanew = _.omit(devicedata,['_id']);
  devicedatanew.did = devicedata._id;
  devicedatanew.UpdateTime = moment().format('YYYY-MM-DD HH:mm:ss');
  devicedatanew.hexrawBC = hexrawBC;
  const dbModel = DBModels.HistoryDeviceModel;
  const entity = new dbModel(devicedatanew);
  entity.save((err,result)=>{
    debug(`saved result`);
    debug(result);
  });
};

const handlermsg_alarmdata = (alarmdata)=>{
  alarmdata.UpdateTime = moment().format('YYYY-MM-DD HH:mm:ss');
  const dbModel = DBModels.RealtimeAlarmRawModel;

  const entity = new dbModel(alarmdata);
  entity.save((err,result)=>{
    if(!err && !!result){
      PubSub.publish(`push.devicealarm.${result.DeviceId}`,result);

      const realtimealarm = alarmdata;
      const deviceModel = DBModels.DeviceModel;
      deviceModel.findOneAndUpdate({
        _id:alarmdata.did},
        {$set:{realtimealarm}},{new:true,upsert:false}).
        lean().exec((err,newdevice)=>{
          debug(newdevice);
        });
    }

    //更新device--->

  });
};

const getdefault_alarmruleid = (callbackfn)=>{
  const systemconfigModel = DBModels.SystemConfigModel;
  systemconfigModel.findOne({}).lean().exec((err, systemconfig)=> {
    let alarmruleid;
    if(!err && !!systemconfig){
      alarmruleid = systemconfig.alarmruleid;
    }
    callbackfn(alarmruleid);
  });
}
//=======
const getgatewayid  = (GatewayId,callbackfn)=>{
  debug(`GatewayId===>${GatewayId}`)
  getdefault_alarmruleid((alarmruleid)=>{
    debug(`GatewayId===>${alarmruleid}`)

    const gwModel = DBModels.GatewayModel;
    gwModel.findOneAndUpdate({GatewayId},{
      $set:{
        "updated_at" : moment().format('YYYY-MM-DD HH:mm:ss'),
      },
      $setOnInsert:{
        GatewayId,
        alarmruleid,
        name:`网关${GatewayId}`,
        "Longitude" : 118.716673851,
        "Latitude" : 32.2023251564,
        "locationname" : "南京浦口",
        "city" : "南京",
        "cityindex" : "N",
        "created_at" : moment().format('YYYY-MM-DD HH:mm:ss'),
      }
    },{new:true,upsert:true}).populate([
        {
          path:'alarmruleid',
          model: 'alarmrule',
      }]).
      lean().exec((err,result)=>{
        let gwid,Longitude,Latitude,alarmrule;
        if(!err && !!result){
          gwid = result._id;
          Longitude = result.Longitude;
          Latitude = result.Latitude;
          alarmrule = result.alarmruleid;
        }
        callbackfn({gwid,Longitude,Latitude,alarmrule});
      });
  });

};

const handlermsg_realtimedata_redis = (devicedata)=>{
  debug(devicedata);
  if(!!devicedata.gwid){
    if(devicedata.gwid.length === 4){
      getgatewayid(devicedata.gwid,({gwid,Longitude,Latitude,alarmrule})=>{
        if(!!gwid){
          const DeviceGeoSz = geo.getRandomLocation(Latitude,Longitude,5000);
          const deviceModel = DBModels.DeviceModel;
          debug(`gwid===>${gwid},deviceid=>${devicedata.deviceid},nextdeviceid->${devicedata.nextdeviceid}`)
          let updated_data;
          if(devicedata.amtype ==='03'){
            updated_data = {
              $set:{
                nextdeviceid:devicedata.nextdeviceid,
                gwid:devicedata.gwid,
              },
              $setOnInsert:{
                Longitude:DeviceGeoSz[0],//product环境中需要将这两行代码移动到下面$setOnInsert中
                Latitude:DeviceGeoSz[1],
                DeviceId:devicedata.deviceid,
                gwid:devicedata.gwid,
                gatewayid:gwid,
                name:`节点${devicedata.deviceid}`,
              }
            };
          }
          else if(devicedata.amtype ==='0B' || devicedata.amtype ==='BC'){
            updated_data = {
              $set:{
                realtimedata:devicedata.realtimedata,
                gwid:devicedata.gwid,
              },
              $setOnInsert:{
                Longitude:DeviceGeoSz[0],//product环境中需要将这两行代码移动到下面$setOnInsert中
                Latitude:DeviceGeoSz[1],
                DeviceId:devicedata.deviceid,
                gwid:devicedata.gwid,
                gatewayid:gwid,
                name:`节点${devicedata.deviceid}`,
              }
            };
          }
          else{
            return;
          }
          deviceModel.findOneAndUpdate({
            DeviceId:devicedata.deviceid,
            gatewayid:gwid},
            updated_data,{new:true,upsert:true}).
            lean().exec((err,newdevice)=>{
              //<----------
              if(!err && !!newdevice){
                if(devicedata.amtype ==='0B' || devicedata.amtype ==='BC'){
                  if(devicedata.amtype ==='0B'){
                    handlermsg_historydevice_0B(newdevice,devicedata.hexraw0B);
                  }
                  else{
                    handlermsg_historydevice_BC(newdevice,devicedata.hexrawBC);
                  }

                  // PubSub.publish(`push.device.${newdevice.DeviceId}`,newdevice);
                  debug(alarmrule);
                  debug(newdevice.realtimedata);
                  alr.matchalarm(alarmrule,newdevice.realtimedata,(resultalarmmatch)=>{
                    _.map(resultalarmmatch,(al)=>{
                      debug(`getal==>`);
                      debug(al);
                      al.gatewayid = gwid;
                      al.DeviceId = devicedata.deviceid;
                      al.did = newdevice._id;
                      handlermsg_alarmdata(al);
                    });
                  });
                }

              }
          });
        }
      });
    }
  }

}


exports.handlermsg_realtimedata_redis = handlermsg_realtimedata_redis;
