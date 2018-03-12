const systemconfig = require('../common/systemconfig');
const userlogin = require('../common/userlogin');
const device = require('../common/device.js');
const historydevice = require('../common/historydevice.js');
const realtimealarm = require('../common/realtimealarm.js');
const moment = require('moment');
const product = require('../common/product.js');
const vote = require('../common/vote.js');
const debugapp = require('debug')('appsrv:app:index');

const actiondatahandler = {
  'getvotelist':vote.getvotelist,
  'getproductlist':product.getproductlist,
  'getproductdetail':product.getproductdetail,
  'getsystemconfig':systemconfig.getsystemconfig,
  'loginwithtoken':userlogin.loginwithtoken,
  'logout':userlogin.logout,
  'login':userlogin.loginuser,
  //正式版本中下面的删除
  'gethistorydevicelist':historydevice.gethistorydevicelist,
  'getdevicelist':device.getdevicelist,
  'getrealtimealarmlist':realtimealarm.getrealtimealarmlist,
};

const authhandler = {
  'setvote':vote.setvote,
  'saveusersettings':userlogin.saveusersettings,
  'changepwd':userlogin.changepwd,
};

module.exports = (socket,actiondata,ctx)=>{
  debugapp(`${actiondata.cmd},actiondata:${JSON.stringify(actiondata.data)},ctx==>${JSON.stringify(ctx)}`);
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
            socket.emit('common_err',{errmsg:'请先登录'});
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
