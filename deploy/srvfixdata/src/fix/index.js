const _ = require('lodash');
const DBModels = require('../handler/models.js');
const async = require('async');
const config = require('../config');
const moment = require('moment');
const mongoose = require('mongoose');
//将所有历史数据中雨量&气压数据修改掉
const debug = require('debug')('srvfixdata:start');
const getunnormaldata = ()=>{
  const gwid = mongoose.Types.ObjectId('5b9bdb200af1a1895548c015');
  const query = {
    gatewayid: {$ne : gwid}
  }

  console.log(`query-->${JSON.stringify(query)}`);
  return new Promise((resolve, reject)=>{
    const dbModel = DBModels.HistoryDeviceModel;
    console.log(`query1-->${JSON.stringify(query)}`);
    dbModel.find(query,{'realtimedata.pressure':1}).lean().exec((err,result)=>{
      console.log(err);
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
        data.realtimedata.pressure = _.random(1000, 1100);
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
    console.log(`first result:${result.length}`);
    // debug(result);
    return fixlistdata(result);
  }).then((result)=>{
    console.log(`second`);
    // debug(result);
  }).catch((e)=>{
    console.log(e);
  });

}

module.exports= fixdata;
