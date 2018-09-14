import {
    common_err,

    loginwithtoken_request,
    login_request,
    md_login_result,//这个result特殊，需要判断是否登录

    logout_request,
    logout_result,

    getsystemconfig_request,
    getsystemconfig_result,

    getdevicelist_request,
    getdevicelist_result,

    getgatewaylist_request,
    getgatewaylist_result,

    getrealtimealarmlist_request,
    getrealtimealarmlist_result,

    changepwd_request,
    changepwd_result,

    saveusersettings_request,
    saveusersettings_result,

    serverpush_alarm,
    serverpush_device,
    serverpush_device_list,
    serverpush_device_alarm,
    getproductlist_request,
    getproductlist_result,

    getvotelist_request,
    getvotelist_result,

    setvote_request,
    setvote_result,

    gethistorydevicelist_request,
    gethistorydevicelist_result
  } from '../actions';

//接收的对应关系
let recvmessagetoresultpair = {
  'gethistorydevicelist_result':gethistorydevicelist_result,
  // 'serverpush_device':serverpush_device,
  'serverpush_device_list':serverpush_device_list,
  // 'serverpush_device_alarm':serverpush_device_alarm,
  'setvote_result':setvote_result,
  'getproductlist_result':getproductlist_result,
  'getvotelist_result':getvotelist_result,

  'saveusersettings_result':saveusersettings_result,

  'getsystemconfig_result':getsystemconfig_result,

  'common_err':common_err,

  'login_result':md_login_result,
  'logout_result':logout_result,

  'getdevicelist_result':getdevicelist_result,
  'getgatewaylist_result':getgatewaylist_result,

  'getrealtimealarmlist_result':getrealtimealarmlist_result,

  'changepwd_result':changepwd_result
};

//非验证发送接口
let sendmessagefnsz = {

  'getvotelist':`${getvotelist_request}`,
  'getproductlist':`${getproductlist_request}`,
  'logout':`${logout_request}`,
  'loginwithtoken':`${loginwithtoken_request}`,
  'login':`${login_request}`,

  'getsystemconfig':`${getsystemconfig_request}`,

  'gethistorydevicelist':`${gethistorydevicelist_request}`,
  'getgatewaylist':`${getgatewaylist_request}`,
  'getdevicelist':`${getdevicelist_request}`,
  'getrealtimealarmlist':`${getrealtimealarmlist_request}`,
  'saveusersettings':`${saveusersettings_request}`,
};

//验证发送接口
let sendmessageauthfnsz = {
  'setvote':`${setvote_request}`,
  'changepwd':`${changepwd_request}`,
};

export default {recvmessagetoresultpair,sendmessagefnsz,sendmessageauthfnsz};
