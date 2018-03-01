const systemconfig = require('../common/systemconfig');
const userlogin = require('../common/userlogin');
const device = require('../common/device.js');
const realtimealarm = require('../common/realtimealarm.js');
const moment = require('moment');
const userrelate = require('../common/userrelate');
const product = require('../common/product.js');
const vote = require('../common/vote.js');
const debugapp = require('debug')('appsrv:app:index');
//司机端
const actiondatahandler = {
  'getvotelist':vote.getvotelist,
  'setvote':vote.setvote,
  'getproductlist':product.getproductlist,
  'getproductdetail':product.getproductdetail,
  'getsystemconfig':systemconfig.getsystemconfig,
  'loginwithtoken':userlogin.loginwithtoken,
  'logout':userlogin.logout,
  'login':userlogin.loginuser,
  //正式版本中下面的删除
};

const authhandler = {
  'saveusersettings':userlogin.saveusersettings,
  'changepwd':userlogin.changepwd,
  'querydevice':device.querydevice,
  'querydevicegroup':device.querydevicegroup,
  // 'queryrealtimealarm':realtimealarm.queryrealtimealarm,
  'querydeviceinfo':device.querydeviceinfo,
  'querydeviceinfo_list':device.querydeviceinfo_list,
  // 'searchbattery':device.searchbattery,
  'serverpush_devicegeo_sz':device.serverpush_devicegeo_sz,
  'collectdevice':userrelate.collectdevice,
  // 'searchbatteryalarm':realtimealarm.searchbatteryalarm,
  // 'searchbatteryalarmsingle':realtimealarm.searchbatteryalarmsingle,
  'uireport_searchalarmdetail':realtimealarm.uireport_searchalarmdetail,
};

module.exports = (socket,actiondata,ctx)=>{
  debugapp(`${actiondata.cmd},actiondata:${actiondata.data},ctx==>${JSON.stringify(ctx)}`);
  try{
      if(ctx.usertype !== 'app'){
        debugapp("不是正确的客户端--->" + actiondata.cmd);
        socket.emit('common_err',{errmsg:'无效的app客户端'});
        return;
      }
      if(!!actiondatahandler[actiondata.cmd]){
        actiondatahandler[actiondata.cmd](actiondata.data,ctx,(result)=>{
          debugapp("服务端回复--->" + JSON.stringify(result));
          socket.emit(result.cmd,result.payload);
        });
      }
      else{
        if(!!authhandler[actiondata.cmd]){
          if(!ctx['userid']){
            debugapp("需要登录--->" + actiondata.cmd);
            socket.emit('common_err',{errmsg:'请先重新登录'});
          }
          else{
            authhandler[actiondata.cmd](actiondata.data,ctx,(result)=>{
              if(JSON.stringify(result).length < 10000){
                debugapp("服务端回复--->" + JSON.stringify(result));
              }
              socket.emit(result.cmd,result.payload);
            });
          }
        }
        else{
          debugapp("未找到处理函数--->" + actiondata.cmd);
          socket.emit('common_err',{errmsg:`未找到处理函数${actiondata.cmd}`});
        }
      }
    }
    catch(e){
      debugapp("服务端内部错误--->" + e);
      socket.emit('common_err',{errmsg:`服务端内部错误:${JSON.stringify(e)}`});
    }
}
