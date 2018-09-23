const _ = require('lodash');
const DBModels = require('../handler/models.js');
const async = require('async');
const config = require('../config');
const moment = require('moment');
//将所有历史数据中雨量&气压数据修改掉
const debug = require('debug')('srvtcp:dbh');

// "gwid" :`${gwid}`,
// "deviceid":`${result.deviceid}`,

const getnearestrainfall = (gwid,deviceid,realtimedata)=>{
  return new Promise((resolve, reject)=>{
    if(realtimedata.hasOwnProperty('rainfall')){
      const updatetime = _.get(realtimedata,'datatime');
      const timestamp = moment(updatetime).unix();
      const timestamp1hoursago = moment(updatetime).subtract(60, 'minutes').unix();
      const gwdevicekey = `${gwid}${deviceid}`;
      const dbModel = DBModels.RainfalldatahistoryModel;
      dbModel.aggregate([
          {$match: {gwdevicekey}},
          // Project a diff field that's the absolute difference along with the original doc.
          {$project: {diff: {$abs: {$subtract: [timestamp1hoursago, '$timestamp']}}, doc: '$$ROOT'}},
          // Order the docs by diff
          {$sort: {diff: 1}},
          // Take the first one
          {$limit: 1}
      ],(err,result)=>{
        debug(result);
        if(!!err){
            reject(err);
        }
        else{
            const rainfallraw = _.get(realtimedata,'rainfall',0);
            if(!!result){
              if(result.length === 1){
                const rainfallprev1hour = _.get(result[0],'doc.rainfallraw');
                const timestampprev1hour = _.get(result[0],'doc.timestamp');
                const spantimesec = (timestamp - timestampprev1hour)/60;//分钟
                const rainfall = (rainfallraw-rainfallprev1hour)*0.5* spantimesec/60;
                resolve({
                  updatetime,
                  timestamp,
                  gwdevicekey,
                  linkid:_.get(result[0],'_id'),
                  gwid,
                  deviceid,
                  rainfallraw,
                  rainfallprev1hour,
                  rainfall
                });
                return;
              }
            }

            resolve({
              updatetime,
              timestamp,
              gwdevicekey,
              gwid,
              deviceid,
              rainfallraw
            });


        }
      });
      // const dbModel = DBModels.RainfalldatahistoryModel;
      // dbModel.find({ "_id" : "5ba17df2b39a92000160beea"}).lean().exec((err,result)=>{
      //   if(!!err){
      //       reject(err);
      //   }
      //   else{
      //       resolve(result);
      //   }
      // });
    }
    else{
      reject(err);
    }
  });
}

const updatedata = (record)=>{
  return new Promise((resolve, reject)=>{
    const dbModel = DBModels.RainfalldatahistoryModel;
    dbModel.findOneAndUpdate({gwdevicekey:record.gwdevicekey,timestamp:record.timestamp},
      {$set:record},{new: true,upsert:true},(err,result)=>{
          if(!!err){
              reject(err);
          }
          else{
              resolve(result);
          }
      });
  });
}

const getdata = (data)=>{
  const gwid = _.get(data,'gwid');
  const deviceid = _.get(data,'deviceid');
  const realtimedata = _.get(data,'realtimedata');
  return new Promise((resolve, reject)=>{
    getnearestrainfall(gwid,deviceid,realtimedata).then((record)=>{
        return updatedata(record);
    }).then((result)=>{
      _.set(data,`realtimedata.rainfall`,result.rainfall);
      resolve(data);//替换rainfall
    }).catch((e) => {
      resolve(data);//保持不动
    });
  });
}

module.exports= getdata;

// db.getCollection('rainfalldatahistories').aggregate(
// [
//     {$match: {gwdevicekey:'0002AE'}},
//     // Project a diff field that's the absolute difference along with the original doc.
//     {$project: {diff: {$abs: {$subtract: [1537713015, '$timestamp']}}, doc: '$$ROOT'}},
//     // Order the docs by diff
//     {$sort: {diff: 1}},
//     // Take the first one
//     {$limit: 1}
// ]);

// db.rainfalldatahistories.createIndex({gwdevicekey:1}) 
// db.rainfalldatahistories.createIndex({timestamp:1}, {expireAfterSeconds:36000}) ／／10 hours

// db.getCollection('historydevices').aggregate([
// {$project: {diff: {$abs: {$subtract: [120, '$realtimedata.rainfall']}}, doc: '$$ROOT'}},
// // Order the docs by diff
// {$sort: {diff: 1}},
// // Take the first one
// {$limit: 1}]);
