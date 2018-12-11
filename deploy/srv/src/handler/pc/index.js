const systemconfig = require('../common/systemconfig');
const userlogin = require('../common/userlogin');
const gateway = require('../common/gateway');
const device = require('../common/device.js');
const historydevice = require('../common/historydevice.js');
const realtimealarm = require('../common/realtimealarm.js');
const moment = require('moment');
const tip = require('../common/tip');
const product = require('../common/product.js');
const vote = require('../common/vote.js');
const debugpc = require('debug')('appsrv:pc:index');
//PC端所有消息中心
const actiondatahandler = {
  'getvotelist':vote.getvotelist,
  'getproductlist':product.getproductlist,
  'getproductdetail':product.getproductdetail,
  'getsystemconfig':systemconfig.getsystemconfig,
  'loginwithtoken':userlogin.loginwithtoken,
  'logout':userlogin.logout,
  'login':userlogin.loginuser,

  'gethistorydevicelist':historydevice.gethistorydevicelist,
  'getgatewaylist':gateway.getgatewaylist,
  'getdevicelist':device.getdevicelist,
  'getrealtimealarmlist':realtimealarm.getrealtimealarmlist,

  'saveusersettings':userlogin.saveusersettings,
};

const authhandler = {
  'setvote':vote.setvote,
  'changepwd':userlogin.changepwd,
};

module.exports = (socket,actiondata,ctx)=>{
  //console.log("PC端获取数据--->" + JSON.stringify(actiondata));
  //console.log("PC端获取上下文--->" + JSON.stringify(ctx));
  debugpc(`actiondata=>${JSON.stringify(actiondata)},ctx==>${JSON.stringify(ctx)}`);
  try{
      if(ctx.usertype !== 'pc'){
        debugpc(`不是正确的客户端--->${actiondata.cmd}`);
        socket.emit('common_err',{errmsg:'无效的pc客户端'});
        return;
      }
      if(!!actiondatahandler[actiondata.cmd]){
        actiondatahandler[actiondata.cmd](actiondata.data,ctx,(result)=>{
          debugpc(`回复--->${JSON.stringify(result)}`);
          socket.emit(result.cmd,result.payload);
        });
      }
      else{
        if(!!authhandler[actiondata.cmd]){
          if(!ctx['userid']){
            debugpc("需要登录--->" + actiondata.cmd);
            socket.emit('common_err',{errmsg:'请先登录'});
          }
          else{
            authhandler[actiondata.cmd](actiondata.data,ctx,(result)=>{

              debugpc(`${actiondata.cmd}回复`);
              socket.emit(result.cmd,result.payload);
            });
          }
        }
        else{
          debugpc("未找到处理函数--->" + actiondata.cmd);
          socket.emit('common_err',{errmsg:`未找到处理函数${actiondata.cmd}`});
        }
      }
    }
    catch(e){
      debugpc("服务端内部错误--->" + e);
      socket.emit('common_err',{errmsg:`服务端内部错误:${JSON.stringify(e)}`});
    }
}
