const config = require('../../config.js');
const DBModels = require('../../db/models.js');
const mongoose  = require('mongoose');
const winston = require('../../log/log.js');
const _ = require('lodash');
const moment = require('moment');

/*
获取视频列表
*/
exports.getvideolist = (actiondata,ctx,callback)=>{
  const videoModel = DBModels.VideoModel;
  const queryexec = videoModel.find({isenabled:true}).select().lean();
  queryexec.exec((err,list)=>{
    if(!err && !!list){
        callback({
          cmd:'getvideolist_result',
          payload:{list}
        });
      }
      else{
        callback({
          cmd:'common_err',
          payload:{errmsg:err.message,type:'getvideolist'}
        });
      }
  });
};
