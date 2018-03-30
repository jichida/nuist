const _ = require('lodash');
const DBModels = require('./models');
const mongoose = require('mongoose');
const pwd = require('../util/pwd.js');

const initjson = [
  {
      "_id" : mongoose.Types.ObjectId("5a03b66013e7410cd0ef3093"),
      "name" : "大坝监控平台电脑端",
      "memo" : "大坝监控平台电脑端",
      "type" : "操作权限",
      systemflag:1,
  },
  {
      "_id" : mongoose.Types.ObjectId("5a03b66e13e7410cd0ef3094"),
      "name" : "大坝监控平台手机端",
      "memo" : "大坝监控平台手机端",
      "type" : "操作权限",
      systemflag:1,
  },
  {
    "_id" : mongoose.Types.ObjectId("5a5a1113da6e595af4eb515e"),
    "name" : "导出数据",
    "memo" : "导出数据",
    "type" : "操作权限",
    systemflag:1,
  },
  {
    "_id" : mongoose.Types.ObjectId("5a5a1198da6e595af4eb515f"),
    "name" : "水文",
    "memo" : "水文",
    datafields:[],
    "systemflag" : 1,
    "type" : "数据权限",
  },
  {
    "_id" : mongoose.Types.ObjectId("5a5a1846da6e595af4eb516c"),
    "name" : "农林",
    "memo" : "农林",
    datafields:[],
    "systemflag" : 1,
    "type" : "数据权限",
  },
  {
    "_id" : mongoose.Types.ObjectId("5a5a1850da6e595af4eb516d"),
    "name" : "航空",
    "memo" : "航空",
    datafields:[],
    "systemflag" : 1,
    "type" : "数据权限",
  },
  {
    "_id" : mongoose.Types.ObjectId("5a5a185eda6e595af4eb516e"),
    "name" : "海洋",
    "memo" : "海洋",
    datafields:[],
    "systemflag" : 1,
    "type" : "数据权限",
  },
  {
    "_id" : mongoose.Types.ObjectId("5a5a186bda6e595af4eb516f"),
    "name" : "科考",
    "memo" : "科考",
    datafields:[],
    "systemflag" : 1,
    "type" : "数据权限",
  },
];

const groupobj = {
    "_id" : mongoose.Types.ObjectId("599b88f5f63f591defcf5f71"),
    "name" : "全部设备",
    "memo" : "全部设备",
    "contact" : "admin",
    "deviceids" : [],
    systemflag:1,
};

const initDB = ()=>{
  const dbModel = DBModels.PermissionModel;
  _.map(initjson,(v)=>{
    dbModel.findOneAndUpdate({_id:v._id}, {$set:v},{new: true,upsert:true},(err,result)=>{
    });
  });

  //createadmin
  const passwordsalt = pwd.getsalt();
  pwd.hashPassword('admin',passwordsalt,(err,passwordhash)=>{
    if(!err){
      adminuser = {
        username:'admin',
        passwordsalt,
        passwordhash,
        adminflag:1
      };
      const userModel = DBModels.UserModel;
      userModel.findOneAndUpdate({username:adminuser.username}, {$set:adminuser},{new: true,upsert:true},(err,result)=>{
      });
    }
  });

  //新建一个全部数据的分组
  const deviceModel = DBModels.DeviceModel;
  const queryexec = deviceModel.find({}).select({
    '_id':1});
  queryexec.exec((err,list)=>{
    if(!err && !!list){
      _.map(list,(deviceinfo)=>{
        groupobj.deviceids.push(mongoose.Types.ObjectId(deviceinfo._id));
      });
    }
    const devicegroupModel = DBModels.DeviceGroupModel;
    devicegroupModel.findOneAndUpdate({_id:groupobj._id}, {$set:groupobj},{new: true,upsert:true},(err,result)=>{
    });
  });
}

module.exports= initDB;
