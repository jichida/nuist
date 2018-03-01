const config = require('../../config.js');
const DBModels = require('../../db/models.js');
const mongoose  = require('mongoose');
const winston = require('../../log/log.js');
const coordtransform = require('coordtransform');
const _ = require('lodash');
const moment = require('moment');
const getdevicesids = require('../getdevicesids');


exports.getdevicelist = (actiondata,ctx,callback)=>{
  const deviceModel = DBModels.DeviceModel;
  const query = actiondata.query || {};
  const fields = actiondata.fields || {};
  getdevicesids(ctx.userid,({devicegroupIds,deviceIds})=>{
    if(!query.DeviceId){
      query.DeviceId = {'$in':deviceIds};
    }
    let queryexec = deviceModel.find(query).select(fields);
    queryexec.exec((err,list)=>{
      if(!err){
        if(list.length > 0){
          //console.log(`-->${JSON.stringify(list[0])}`);
        }
        callback({
          cmd:'getdevicelist_result',
          payload:{list}
        });
      }
      else{
        callback({
          cmd:'common_err',
          payload:{errmsg:err.message,type:'getdevicelist'}
        });
      }
    });
  });
}
