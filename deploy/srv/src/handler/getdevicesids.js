const _ = require('lodash');
const DBModels = require('../db/models');
const mongoose = require('mongoose');

const getdevicesids = (userid,callbackfn)=>{
  if(!userid){
    const dbModel = DBModels.SystemConfigModel;
    dbModel.findOne({}).populate([
      {
        path:'demodevicegroupid',
        model: 'devicegroup',
        populate:[
        {
          path:'deviceids', select:'_id DeviceId', model: 'device'
        },
      ]
    }]).lean().exec((err, systemconfig)=> {
        let deviceIds = [];
        let devicegroupIds = [];
        if(!err && !!systemconfig){
          // devicegroupIds
          if(!!systemconfig.demodevicegroupid){
            devicegroupIds.push(systemconfig.demodevicegroupid._id);
            const devicelist = _.get(systemconfig.demodevicegroupid,'deviceids',[]);
            // //console.log(`devicelist=>${JSON.stringify(devicelist)}`)
            _.map(devicelist,(deviceinfo)=>{
              // //console.log(`deviceinfo=>${JSON.stringify(deviceinfo)}`)
              // //console.log(`DeviceId=>${deviceinfo.DeviceId}`)
              deviceIds.push(deviceinfo.DeviceId);
            });
          }
        }
        callbackfn({
          adminflag:0,
          devicegroupIds,
          deviceIds
        });
      });
      return;
  }
  if(typeof userid === 'string'){
    userid = mongoose.Types.ObjectId(userid);
  }
  const dbModel = DBModels.UserModel;
  dbModel.findOne({ _id: userid })
    .populate([
      {
        path:'devicegroups',
        model: 'devicegroup',
        populate:[
        {
          path:'deviceids', select:'_id DeviceId', model: 'device'
        },
      ]
    }]).lean().exec((err, user)=> {
      // //console.log(JSON.stringify(user));
      let deviceIds = [];
      let devicegroupIds = [];
      let adminflag = 0;
      if(!err && !!user){
        adminflag = _.get(user,'adminflag',0);
        const devicegrouplist = _.get(user,'devicegroups',[]);
        _.map(devicegrouplist,(groupinfo)=>{
          devicegroupIds.push(mongoose.Types.ObjectId(groupinfo._id));
          const devicelist = _.get(groupinfo,'deviceids',[]);
          // //console.log(`devicelist=>${JSON.stringify(devicelist)}`)
          _.map(devicelist,(deviceinfo)=>{
            // //console.log(`deviceinfo=>${JSON.stringify(deviceinfo)}`)
            // //console.log(`DeviceId=>${deviceinfo.DeviceId}`)
            deviceIds.push(deviceinfo.DeviceId);
          });
        });
      }
      //deviceIds去重
      // //console.log(`deviceIds==>${JSON.stringify(deviceIds)}`)
      deviceIds = _.uniq(deviceIds);
      callbackfn({
        adminflag,
        devicegroupIds,
        deviceIds
      });
  });
}


module.exports = getdevicesids;
