const config = require('../../config.js');
const DBModels = require('../../db/models.js');
const mongoose  = require('mongoose');
const winston = require('../../log/log.js');
// const coordtransform = require('coordtransform');
const _ = require('lodash');
const moment = require('moment');
const getdevicesids = require('../getdevicesids');
const debug = require('debug')('appsrv:device');

/*
获取设备列表 actiondata为客户端传过来的参数，ctx 为上下文,callback为返回数据回调
返回数据形式，一般是请求
*/
exports.getdevicelist = (actiondata,ctx,callback)=>{
  const deviceModel = DBModels.DeviceModel;
  const query = actiondata.query || {};
  const fields = actiondata.fields || {};
  getdevicesids(ctx.userid,ctx.usertype,(deviceIds)=>{
    if(!query.DeviceId){
      query.DeviceId = {'$in':deviceIds};
    }
    // debug(query);
    const queryexec = deviceModel.find(query).select(fields)
      .lean();
    queryexec.exec((err,list)=>{
      // debug(list)
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
