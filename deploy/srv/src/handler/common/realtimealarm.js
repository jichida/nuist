const config = require('../../config.js');
const DBModels = require('../../db/models.js');
const mongoose  = require('mongoose');
const winston = require('../../log/log.js');
const _ = require('lodash');
const moment = require('moment');
const getdevicesids = require('../getdevicesids');

//app中的报警分页
exports.uireport_searchalarmdetail =  (actiondata,ctx,callback)=>{
  // PC端获取数据--->{"cmd":"searchbatteryalarm","data":{"query":{"queryalarm":{"warninglevel":0}}}}
  //console.log(`ui_searchalarmdetail===>${JSON.stringify(actiondata)}`);
  const realtimealarmrawModel = DBModels.RealtimeAlarmRawModel;
  let query = actiondata.query || {};
  getdevicesids(ctx.userid,({devicegroupIds,deviceIds})=>{
    if(!query.DeviceId){
      query.DeviceId = {'$in':deviceIds};
    }
    realtimealarmrawModel.paginate(query,actiondata.options,(err,result)=>{
      if(!err){
        result = JSON.parse(JSON.stringify(result));
        let docs = [];
        _.map(result.docs,(record)=>{
          docs.push(bridge_alarmrawinfo(record));
        });
        result.docs = docs;
        callback({
          cmd:'uireport_searchalarmdetail_result',
          payload:{result}
        });
      }
      else{
        callback({
          cmd:'common_err',
          payload:{errmsg:err.message,type:'uireport_searchalarmdetail'}
        });
      }
    });
  });
}

exports.exportalarmdetail = (actiondata,ctx,callback)=>{
  //console.log(`exportalarmdetail==>${JSON.stringify(actiondata)}`);

  const realtimealarmrawModel = DBModels.RealtimeAlarmRawModel;
  let query = actiondata.query || {};
  getdevicesids(ctx.userid,({devicegroupIds,deviceIds})=>{
    if(!query.DeviceId){
      query.DeviceId = {'$in':deviceIds};
    }
    realtimealarmrawModel.find(query,(err,list)=>{
      if(!err){
        list = JSON.parse(JSON.stringify(list));
        let docs = [];
        _.map(list,(record)=>{
          let recordnew = bridge_alarmrawinfo(record);
          recordnew = _.omit(recordnew,['key']);
          docs.push(recordnew);
        });
        list = docs;
        if(list.length > 0){
          callback({
            cmd:'exportalarmdetail_result',
            payload:{list}
          });
        }
        else{
          callback({
            cmd:'common_err',
            payload:{errmsg:`找不到数据`,type:'exportalarmdetail'}
          });
        }
      }
      else{
        callback({
          cmd:'common_err',
          payload:{errmsg:err.message,type:'exportalarmdetail'}
        });
      }
    });
  });
}

//<<=============报警推送===============================
// exports.serverpush_alarm_sz = (actiondata,ctx,callback)=>{
//   const realtimealarmModel = DBModels.RealtimeAlarmModel;
//   let query = {
//     CurDay:moment().format('YYYY-MM-DD')
//   };
//   getdevicesids(ctx.userid,({devicegroupIds,deviceIds})=>{
//     if(!query.DeviceId){
//       query.DeviceId = {'$in':deviceIds};
//     }
//     realtimealarmModel.find(query,null,{
//       skip: 0,
//       limit: 10,
//       sort:{ "DataTime":-1}
//     },(err,list)=>{
//       if(!err){
//         list = JSON.parse(JSON.stringify(list));
//         let docs = [];
//         _.map(list,(record)=>{
//           let recordnew = bridge_alarminfo(record);
//           recordnew = _.omit(recordnew,['key']);
//           docs.push(recordnew);
//         });
//         list = docs;
//         callback({
//           cmd:'serverpush_alarm_sz_result',
//           payload:{list}
//         });
//       }
//       else{
//         callback({
//           cmd:'common_err',
//           payload:{errmsg:err.message,type:'serverpush_alarm_sz'}
//         });
//       }
//     });
//   });
// }
