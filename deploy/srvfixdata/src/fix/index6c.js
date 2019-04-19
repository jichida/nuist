const _ = require('lodash');
const DBModels = require('../handler/models.js');
const async = require('async');
const config = require('../config');
const moment = require('moment');
const mongoose = require('mongoose');
//将所有历史数据中雨量&气压数据修改掉
const debug = require('debug')('srvfixdata:start');
const parsevalue = require('./parsevalue');

const result = [
        {
            "ftype" : "string",
            "length" : 8,
            "offset" : 17,
            "unit" : "Ω",
            "showname" : "温度",
            "name" : "temperaturev",
        },
        {
            "ftype" : "string",
            "length" : 8,
            "offset" : 25,
            "unit" : "Hz",
            "showname" : "频率",
            "name" : "freq",
        },
        {
            "name" : "channel",
            "showname" : "通道",
            "unit" : "",
            "offset" : 33,
            "length" : 1,
            "ftype" : "number"
        }
    ];



const parsefz = (data)=>{
  let jsonData = {};
  const hexraw0B = data.hexraw0B;
  const realtimedata = data.realtimedata;
  // '427e000b7d3100006c00000033818600002b302e30303030304535303030303030040102030405060700010203000102038b16f9070001'
  const ddh_deviceid_offset = 8;
  const ZigbeeData = hexraw0B;
  const ZigbeeDataNew = ZigbeeData.substr(ddh_deviceid_offset*2);

  for(let i = 0 ;i < result.length;i++){
    const viewtype = result[i];
    const ftype = _.get(viewtype,'ftype','number');
    const length = viewtype.length;
    const offset = viewtype.offset;
    if(!!length && !!offset){
      if(length > 0 && (length+offset) < ZigbeeData.length/2 ){
        const hexstring = ZigbeeData.substr(offset*2,length*2);
        debug(`name:${viewtype.name}-->hexstring:${hexstring}-->ftype:${ftype}-->offset:${offset}-->length:${length}`);
        const value = parsevalue({hexstring,length,name:viewtype.name,ftype});
        jsonData[`${viewtype.name}`] = value;
      }
    }
      //{ ftype: 'string',
        // srvtcp:protocol     length: 8,
        // srvtcp:protocol     offset: 8,
        // srvtcp:protocol     unit: 'Ω',
        // srvtcp:protocol     showname: '温度',
        // srvtcp:protocol     name: 'temperature',
        // srvtcp:protocol     _id: 5caccbf5111e72e5b33e21be },
  }

  debug(jsonData);
  //check
  let istodelete = false;

  if(!istodelete){
    if(jsonData.hasOwnProperty('freq')){
      const freq = _.get(jsonData,'freq');
      if(typeof freq === 'string'){
        debug(`${freq}--->`)
        if(_.startsWith(freq,'E')){
          istodelete = true;
          debug(`true`)
        }
        else{
          try{
            const freqv = parseFloat(freq);
            debug(`${freqv}`)
            istodelete = isNaN(freqv);
          }
          catch(e){
            istodelete = true;
          }
        }
      }//if(typeof freq === 'string'){
    }//if(jsonData.hasOwnProperty('freq')){
  }

  if(!istodelete){
    if(jsonData.hasOwnProperty('temperaturev')){
      const temperature = _.get(jsonData,'temperaturev');
      debug(`temperature:${temperature}`)
      if(typeof temperature === 'string'){
        if(_.startsWith(temperature,'E')){
          istodelete = true;
        }
        else{
          try{
            const temperaturev = parseFloat(temperature);
            debug(`temperature:${temperaturev}`)
            istodelete = isNaN(temperaturev);
          }
          catch(e){
            istodelete = true;
          }
        }
      }
    }
  }

  debug({istodelete,realtimedata:jsonData})
  return {istodelete,realtimedata:jsonData};
}
//
// const parsefz = (data)=>{
//   const hexraw0B = data.hexraw0B;
//   const realtimedata = data.realtimedata;
//   // '427e000b7d3100006c00000033818600002b302e30303030304535303030303030040102030405060700010203000102038b16f9070001'
//   const ddh_deviceid_offset = 8;
//   const ZigbeeData = hexraw0B;
//   console.log(`====>ZigbeeData:${ZigbeeData}`);
//   // const ZigbeeDataNew = ZigbeeData.substr(ddh_deviceid_offset*2);
//   const channelhex = ZigbeeData.substr(33*2,2);
//   console.log(`====>ASCII:${Buffer.from(channelhex,'hex')}`);
//   //偏移4字节后,取8字节
//   const frequencyhex = ZigbeeData.substr(25*2,16);
//   console.log(`frequencyhex====>${frequencyhex}`);
//   const frequencyvalue = Buffer.from(frequencyhex,'hex').toString('ascii');
//   //再取8字节
//   const temperaturehex = ZigbeeData.substr(17*2,16);
//   console.log(`temperaturehex====>${temperaturehex}`);
//   const temperaturevalue = Buffer.from(temperaturehex,'hex').toString('ascii');
//
//   console.log(`====>frequencyvalue:${frequencyvalue},temperaturevalue:${temperaturevalue}`);
//   let result = _.clone(realtimedata);
//   result.temperature = frequencyvalue;
//   result.freq = temperaturevalue;
//   return {realtimedata:result};
// }

const getunnormaldata = ()=>{
  const gwid = mongoose.Types.ObjectId('5b9bdb200af1a1895548c015');
  const deviceid = '6C';
  const query = {
    "DeviceId" : deviceid,
    "gatewayid" : gwid,
    "UpdateTime" : {$gt:'2019-02-01 00:00:00'}
  }

  console.log(`query-->${JSON.stringify(query)}`);
  return new Promise((resolve, reject)=>{
    const dbModel = DBModels.HistoryDeviceModel;
    console.log(`query1-->${JSON.stringify(query)}`);
    dbModel.find(query,{'hexraw0B':1,"realtimedata":1}).lean().exec((err,result)=>{
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
    console.log(`一共:${listdata.length}条记录`)
    const dbModel = DBModels.HistoryDeviceModel;
    for(let i = 0 ;i < listdata.length;i++){
      let data = listdata[i];
      fnsz.push((callbackfn)=>{
        const result = parsefz(data);
        if(result.istodelete){
          //delete
          dbModel.findOneAndRemove({_id:data._id}).exec(callbackfn);
        }
        else{
          dbModel.findOneAndUpdate({_id:data._id},{$set:{realtimedata:result.realtimedata}}).lean().exec(callbackfn);
        }
        // console.log(result);
        // callbackfn(null,true);
        // dbModel.findOneAndUpdate({_id:data._id},{$set:result}).lean().exec(callbackfn);
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
