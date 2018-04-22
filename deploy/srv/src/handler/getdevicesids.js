const _ = require('lodash');
const DBModels = require('../db/models');
const mongoose = require('mongoose');
const debug = require('debug')('appsrv:deviceids');
const getDeviceIds = (gwgroups,callbackfn)=>{
  let gwids = [];
  _.map(gwgroups,(gwgroup)=>{
    const gatewayids =  _.get(gwgroup,'gatewayids',[]);
    _.map(gatewayids,(gwid)=>{
      gwids.push(mongoose.Types.ObjectId(gwid));
    });
  });
  debug(`get gwids --->${JSON.stringify(gwids)}`);
  const deviceModel = DBModels.DeviceModel;
  deviceModel.find({gatewayid:{
    $in:gwids
  }}).populate([
      {
        path:'gatewayid',
        model: 'gateway',
    }]).lean().exec((err,devicelist)=>{
      let DeviceIds = [];
      if(!err && !!devicelist){
        _.map(devicelist,(item)=>{
          DeviceIds.push(item.DeviceId);
        });
      }
      callbackfn(DeviceIds);
  });
}
const getdevicesids = (userid,callbackfn)=>{
  if(!!userid){//登录用户
    const dbModel = DBModels.UserModel;
    dbModel.findOne({ _id: ctx.userid })
      .populate([
        {
          path:'gatewaygroups',
          model: 'gatewaygroup',
      },{
          path:'viewtype',
          model: 'viewtype',
        }
    ]).lean().exec((err, user)=> {
      const gwgroups = _.get(user,'gatewaygroups',[]);
      // const viewtype = _.get(user,'viewtype');
      getDeviceIds(gwgroups,callbackfn);
    });
  }
  else{
    const dbModel = DBModels.SystemConfigModel;
    dbModel.findOne()
      .populate([
        {
          path:'gatewaygroups',
          model: 'gatewaygroup',
      },{
          path:'viewtype',
          model: 'viewtype',
        }
    ]).lean().exec((err, systemconfig)=> {
      const gwgroups = _.get(systemconfig,'gatewaygroups',[]);
      getDeviceIds(gwgroups,callbackfn);
    });
  }


  // if(!userid){
  //   const dbModel = DBModels.SystemConfigModel;
  //   dbModel.findOne({}).populate([
  //     {
  //       path:'demodevicegroupid',
  //       model: 'devicegroup',
  //       populate:[
  //       {
  //         path:'deviceids', select:'_id DeviceId', model: 'device'
  //       },
  //     ]
  //   }]).lean().exec((err, systemconfig)=> {
  //       let deviceIds = [];
  //       let devicegroupIds = [];
  //       if(!err && !!systemconfig){
  //         // devicegroupIds
  //         if(!!systemconfig.demodevicegroupid){
  //           devicegroupIds.push(systemconfig.demodevicegroupid._id);
  //           const devicelist = _.get(systemconfig.demodevicegroupid,'deviceids',[]);
  //           // //console.log(`devicelist=>${JSON.stringify(devicelist)}`)
  //           _.map(devicelist,(deviceinfo)=>{
  //             // //console.log(`deviceinfo=>${JSON.stringify(deviceinfo)}`)
  //             // //console.log(`DeviceId=>${deviceinfo.DeviceId}`)
  //             deviceIds.push(deviceinfo.DeviceId);
  //           });
  //         }
  //       }
  //       callbackfn({
  //         adminflag:0,
  //         devicegroupIds,
  //         deviceIds
  //       });
  //     });
  //     return;
  // }
  // if(typeof userid === 'string'){
  //   userid = mongoose.Types.ObjectId(userid);
  // }
  // const dbModel = DBModels.UserModel;
  // dbModel.findOne({ _id: userid })
  //   .populate([
  //     {
  //       path:'devicegroups',
  //       model: 'devicegroup',
  //       populate:[
  //       {
  //         path:'deviceids', select:'_id DeviceId', model: 'device'
  //       },
  //     ]
  //   }]).lean().exec((err, user)=> {
  //     // //console.log(JSON.stringify(user));
  //     let deviceIds = [];
  //     let devicegroupIds = [];
  //     let adminflag = 0;
  //     if(!err && !!user){
  //       adminflag = _.get(user,'adminflag',0);
  //       const devicegrouplist = _.get(user,'devicegroups',[]);
  //       _.map(devicegrouplist,(groupinfo)=>{
  //         devicegroupIds.push(mongoose.Types.ObjectId(groupinfo._id));
  //         const devicelist = _.get(groupinfo,'deviceids',[]);
  //         // //console.log(`devicelist=>${JSON.stringify(devicelist)}`)
  //         _.map(devicelist,(deviceinfo)=>{
  //           // //console.log(`deviceinfo=>${JSON.stringify(deviceinfo)}`)
  //           // //console.log(`DeviceId=>${deviceinfo.DeviceId}`)
  //           deviceIds.push(deviceinfo.DeviceId);
  //         });
  //       });
  //     }
  //     //deviceIds去重
  //     // //console.log(`deviceIds==>${JSON.stringify(deviceIds)}`)
  //     deviceIds = _.uniq(deviceIds);
  //     callbackfn({
  //       adminflag,
  //       devicegroupIds,
  //       deviceIds
  //     });
  // });
}


module.exports = getdevicesids;
