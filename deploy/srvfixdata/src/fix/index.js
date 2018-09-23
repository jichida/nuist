const _ = require('lodash');
const DBModels = require('../handler/models.js');
const async = require('async');
const config = require('../config');
const moment = require('moment');
//将所有历史数据中雨量&气压数据修改掉
const debug = require('debug')('srvfixdata:start');
const getunnormaldata = ()=>{
  return new Promise((resolve, reject)=>{
    const dbModel = DBModels.HistoryDeviceModel;
    dbModel.find({ "_id" : "5ba17df2b39a92000160beea"}).lean().exec((err,result)=>{
      if(!!err){
          reject(err);
      }
      else{
          resolve(result);
      }
    });
  });
}

const fixlistdata = (listdata)=>{
  return new Promise((resolve, reject)=>{
    let fnsz = [];
    const dbModel = DBModels.HistoryDeviceModel;
    for(let i = 0 ;i < listdata.length;i++){
      let data = listdata[i];
      fnsz.push((callbackfn)=>{
        data.realtimedata.windspeed = 0;
        data.realtimedata.rainfall = 0;
        dbModel.findOneAndUpdate({_id:data._id},{$set:data}).lean().exec(callbackfn);
      });
    }
    async.parallelLimit(fnsz,100,(err,result)=>{
      if(!!err){
          reject(err);
      }
      else{
          resolve(result);
      }
    });
  });
}

const fixdata = ()=>{
  getunnormaldata().then((result)=>{
    debug(`first result`);
    debug(result);
    return fixlistdata(result);
  }).then((result)=>{
    debug(`second`);
    debug(result);
  }).catch((e)=>{
    debug(e);
  });

}

module.exports= fixdata;
