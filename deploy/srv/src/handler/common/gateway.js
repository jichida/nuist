const config = require('../../config.js');
const DBModels = require('../../db/models.js');
const mongoose  = require('mongoose');
const winston = require('../../log/log.js');
// const coordtransform = require('coordtransform');
const _ = require('lodash');
const moment = require('moment');
const debug = require('debug')('appsrv:gateway');

const getgatewaylist_user = (err,viewtype,gwgroups,actiondata,ctx,callback)=>{
  if(!err){
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
    if(!err && !!devicelist){
        const payload = {
          viewtype:viewtype,
          list:devicelist
        };
        debug(`get device --->${JSON.stringify(payload)}`);

        callback({
          cmd:'getgatewaylist_result',
          payload
        });
      }
      else{
        callback({
          cmd:'common_err',
          payload:{errmsg:_.get(err,'message',''),type:'getgatewaylist'}
        });
      }
    });
  }
  else{
    callback({
      cmd:'common_err',
      payload:{errmsg:_.get(err,'message',''),type:'getgatewaylist'}
    });
  }
};

exports.getgatewaylist = (actiondata,ctx,callback)=>{
  if(!!ctx.userid){//登录用户
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
      const viewtype = _.get(user,'viewtype');
      getgatewaylist_user(err,viewtype,gwgroups,actiondata,ctx,callback);
    });
  }
  else{
    const dbModel = DBModels.SystemConfigModel;
    dbModel.findOne()
      .populate([
        {
          path:'gatewaygroups4pc',
          model: 'gatewaygroup',
        },
        {
          path:'gatewaygroups4app',
          model: 'gatewaygroup',
      },{
          path:'viewtype',
          model: 'viewtype',
        }
    ]).lean().exec((err, systemconfig)=> {
      debug(systemconfig);
      debug(ctx.usertype);
      let gwgroups = _.get(systemconfig,`gatewaygroups4${ctx.usertype}`,[]);
      const viewtype = _.get(systemconfig,'viewtype');
      debug(gwgroups);
      getgatewaylist_user(err,viewtype,gwgroups,actiondata,ctx,callback);
    });
  }

}
