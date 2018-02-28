const config = require('../../config.js');
const DBModels = require('../../db/models.js');
const mongoose  = require('mongoose');
const winston = require('../../log/log.js');
const _ = require('lodash');
const moment = require('moment');

exports.getvotelist = (actiondata,ctx,callback)=>{
  const voteModel = DBModels.OnlineResearchModel;
  const queryexec = voteModel.find({}).select().lean();
  queryexec.exec((err,list)=>{
    if(!err && !!list){
        callback({
          cmd:'getvotelist_result',
          payload:{list}
        });
      }
      else{
        callback({
          cmd:'common_err',
          payload:{errmsg:err.message,type:'getvotelist'}
        });
      }
  });
};



exports.setvote = (actiondata,ctx,callback)=>{
  const voteModel = DBModels.OnlineResearchModel;
};
