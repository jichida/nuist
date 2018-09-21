const DBModels = require('../../db/models.js');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const config = require('../../config.js');
const winston = require('../../log/log.js');
const pwd = require('../../util/pwd.js');
const uuid = require('uuid');
const _ = require('lodash');
const moment = require('moment');
const PubSub = require('pubsub-js');
const getdevicesids = require('../getdevicesids');
const srvsystem = require('../../srvsystem.js');

let userloginsuccess =(user,callback)=>{
    //主动推送一些数据什么的
    //写入登录日志
  //   let loginlogModel = DBModels.UserLogModel;
  //   let loginlogentity = new loginlogModel({
  //                       creator:user._id,
  //                       username:user.username
  //                     });
  //  loginlogentity.save((err,loginlog)=>{
  //  });
};

const subscriberuser = (ctx)=>{
  //设置订阅设备消息
  PubSub.unsubscribe( ctx.userDeviceSubscriber );

  PubSub.subscribe(`${config.pushdevicetopic}.${ctx.userid}.${ctx.connectid}`,ctx.userDeviceSubscriber);
  getdevicesids(ctx.userid,ctx.usertype,(deviceIds)=>{
    _.map(deviceIds,(DeviceId)=>{
      PubSub.subscribe(`push.devicealarm.${DeviceId}`,ctx.userDeviceSubscriber);
      // PubSub.subscribe(`push.device.${DeviceId}`,ctx.userDeviceSubscriber);
    });
  });
  // const subscriberdeviceids = _.get(user,'usersettings.subscriberdeviceids',[]);
  // _.map(subscriberdeviceids,(DeviceId)=>{
  //   PubSub.subscribe(`push.device.${DeviceId}`,ctx.userDeviceSubscriber);
  // });
}

let getdatafromuser =(user)=>{
  return {
    username: user.username,
    userid:user._id,
    usersettings:{
      indexgatewayid:_.get(user,'usersettings.indexgatewayid',''),
      indexdeviceid:_.get(user,'usersettings.indexdeviceid',''),
      // warninglevel:_.get(user,'usersettings.warninglevel',''),
      // subscriberdeviceids:_.get(user,'usersettings.subscriberdeviceids',[]),
    }
  };
};

let setloginsuccess = (ctx,user,callback)=>{
   ctx.username = user.username;
   ctx.userid = user._id;//for test only
   if(typeof ctx.userid === "string"){
      ctx.userid = mongoose.Types.ObjectId(ctx.userid);
   }
  //  ctx.usersettings = _.get(user,'usersettings',{
  //    warninglevel:'',
  //    subscriberdeviceids:[]
  //  });

   let userdata = getdatafromuser(user);
   userdata.token =  jwt.sign({
          exp: Math.floor(Date.now() / 1000) + config.loginuserexptime,
          _id:user._id,
        },config.secretkey, {});
    userdata.loginsuccess =  true;

    callback({
      cmd:'login_result',
      payload:userdata
    });

    userloginsuccess(user,callback);

    srvsystem.loginuser_remove(null,ctx.connectid);
    subscriberuser(ctx);
    srvsystem.loginuser_add(ctx.userid,ctx.connectid);

};


exports.saveusersettings = (actiondata,ctx,callback)=>{
  const usersettings = actiondata;
  if(!!ctx.userid){
    const userModel = DBModels.UserModel;
    userModel.findByIdAndUpdate(ctx.userid,{$set:{usersettings}},{new: true},(err,usernew)=>{
      if(!err && !!usernew){
          callback({
            cmd:'saveusersettings_result',
            payload:{usersettings:usernew.usersettings}
          });
          // subscriberuser(usernew,ctx);
      }
      else{
        callback({
          cmd:'common_err',
          payload:{errmsg:`保存设置失败`,type:'saveusersettings'}
        });
      }
    });
  }
  else{
    callback({
      cmd:'saveusersettings_result',
      payload:{usersettings}
    });
  }
};


exports.loginuser = (actiondata,ctx,callback)=>{
  let oneUser = actiondata;
  let dbModel = DBModels.UserModel;
  dbModel.findOne({ username: oneUser.username })
    .populate([
      {
        path:'roleid',
        model: 'role',
        populate:[
        {
          path:'permissions_opt', select:'_id name', model: 'permission'
        },
      ]
    }]).lean().exec((err, user)=> {
    if (!!err) {
      callback({
        cmd:'common_err',
        payload:{errmsg:err.message,type:'login'}
      });
      return;
    }
    if (!user) {
      callback({
        cmd:'common_err',
        payload:{errmsg:'用户名或密码错误',type:'login'}
      });
      return;
    }
    // console.log(user);
    pwd.hashPassword(oneUser.password, user.passwordsalt, (err, passwordHash)=> {
      if(!err && !!passwordHash){
        if (passwordHash === user.passwordhash) {
          const permissions = _.get(user,'roleid.permissions_opt',[]);
          const findresult = _.find(permissions,(p)=>{
            if(ctx.usertype === 'pc' && p._id.toString() === '5a03b66013e7410cd0ef3093'){
              return true;
            }
            if(ctx.usertype === 'app' && p._id.toString() === '5a03b66e13e7410cd0ef3094'){
              return true;
            }
            return false;
          });
          if(!!findresult){
            setloginsuccess(ctx,user,callback);
            return;
          }
          callback({
            cmd:'common_err',
            payload:{errmsg:'该用户无权限登录此平台',type:'login'}
          });
          return;
        }
      }
      callback({
        cmd:'common_err',
        payload:{errmsg:'用户名或密码错误',type:'login'}
      });
    });
  });
}

exports.loginwithtoken = (actiondata,ctx,callback)=>{
  try {
      let decodeduser = jwt.verify(actiondata.token, config.secretkey);
      //console.log("decode user===>" + JSON.stringify(decodeduser));
      let userid = decodeduser._id;
      let userModel = DBModels.UserModel;
      userModel.findByIdAndUpdate(userid,{updated_at:moment().format('YYYY-MM-DD HH:mm:ss')},{new: true}).lean().exec((err,result)=>{
        if(!err && !!result){
          setloginsuccess(ctx,result,callback);
        }
        else{
          callback({
            cmd:'common_err',
            payload:{errmsg:'找不到该用户',type:'login'}
          });
        }
      });

  } catch (e) {
    //console.log("invalied token===>" + JSON.stringify(actiondata.token));
    //console.log("invalied token===>" + JSON.stringify(e));
    callback({
      cmd:'common_err',
      payload:{errmsg:`${e.message}`,type:'login'}
    });
  }

}

exports.subscriberuser = subscriberuser;
//==============================
exports.logout = (actiondata,ctx,callback)=>{
  srvsystem.loginuser_remove(ctx.userid,ctx.connectid);
  ctx.userid = null;
  subscriberuser(ctx);
  srvsystem.loginuser_add(ctx.userid,ctx.connectid);

  callback({
    cmd:'logout_result',
    payload:{}
  });
};

exports.changepwd = (actiondata,ctx,callback)=>{

  const dbModel = DBModels.UserModel;
  dbModel.findOne({ username: ctx.username }, (err, user)=> {
    if (!!err) {
      callback({
        cmd:'common_err',
        payload:{errmsg:err.message,type:'changepwd'}
      });
      return;
    }
    if (!user) {
      callback({
        cmd:'common_err',
        payload:{errmsg:'旧密码错误',type:'changepwd'}
      });
      return;
    }
    pwd.hashPassword(actiondata.password, user.passwordsalt, (err, passwordHash)=> {

        if (passwordHash === user.passwordhash) {
            const salt = uuid.v4();
            pwd.hashPassword(actiondata.passwordA,salt,(err,hashedpassword)=>{
              const newUser = {
                passwordhash:hashedpassword,
                passwordsalt:salt
              };
              //<------开始更新密码
              dbModel.findByIdAndUpdate(user._id,{$set:newUser},{new: true},(err,result)=>{
                if(!err && !!result){
                  callback({
                    cmd:'changepwd_result',
                    payload:{result:true}
                  });
                }
                else{
                  callback({
                    cmd:'common_err',
                    payload:{errmsg:'找不到该用户',type:'changepwd'}
                  });
                }
              });
        });
      }
      else{
        callback({
          cmd:'common_err',
          payload:{errmsg:'旧密码错误',type:'changepwd'}
        });
      }
  });
  });

};
