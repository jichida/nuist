const config = require('../../config.js');
const DBModels = require('../../db/models.js');
const mongoose  = require('mongoose');
const winston = require('../../log/log.js');
// const coordtransform = require('coordtransform');
const _ = require('lodash');
const moment = require('moment');
const getdevicesids = require('../getdevicesids');
const debug = require('debug')('appsrv:device');

exports.getdevicelist = (actiondata,ctx,callback)=>{
  const deviceModel = DBModels.DeviceModel;
  const query = actiondata.query || {};
  const fields = actiondata.fields || {};
  getdevicesids(ctx.userid,({deviceIds})=>{
    if(!query.DeviceId){
      query.DeviceId = {'$in':deviceIds};
    }

    let queryexec = deviceModel.find(query).select(fields).lean();
    queryexec.exec((err,list)=>{
      if(!err){
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
