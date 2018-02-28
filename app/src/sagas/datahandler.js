import {
    common_err,

    loginwithtoken_request,
    login_request,
    md_login_result,//这个result特殊，需要判断是否登录

    logout_request,
    logout_result,

    getsystemconfig_request,
    getsystemconfig_result,


    querydevicegroup_request,
    querydevicegroup_result,

    querydevice_request,
    querydevice_result,

    querydeviceinfo_request,
    querydeviceinfo_result,

    querydeviceinfo_list_request,
    querydeviceinfo_list_result,

    queryrealtimealarm_request,
    queryrealtimealarm_result,

    changepwd_request,
    changepwd_result,

    savealarmsettings_request,
    savealarmsettings_result,

    serverpush_alarm,

    getproductlist_request,
    getproductlist_result,

    getvotelist_request,
    getvotelist_result,
  } from '../actions';

//接收的对应关系
let recvmessagetoresultpair = {
  'getproductlist_result':getproductlist_result,
  'getvotelist_result':getvotelist_result,

  'savealarmsettings_result':savealarmsettings_result,
  'serverpush_alarm':serverpush_alarm,

  'getsystemconfig_result':getsystemconfig_result,

  'common_err':common_err,

  'login_result':md_login_result,
  'logout_result':logout_result,
  'querydevicegroup_result':querydevicegroup_result,
  'querydevice_result':querydevice_result,
  'querydeviceinfo_result':querydeviceinfo_result,
  'querydeviceinfo_list_result':querydeviceinfo_list_result,
  'queryrealtimealarm_result':queryrealtimealarm_result,

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

};

//验证发送接口
let sendmessageauthfnsz = {
  'savealarmsettings':`${savealarmsettings_request}`,
  'changepwd':`${changepwd_request}`,
  'querydevicegroup':`${querydevicegroup_request}`,

  'querydevice':`${querydevice_request}`,
  'querydeviceinfo':`${querydeviceinfo_request}`,
  'querydeviceinfo_list':`${querydeviceinfo_list_request}`,
  'queryrealtimealarm':`${queryrealtimealarm_request}`,
};

export default {recvmessagetoresultpair,sendmessagefnsz,sendmessageauthfnsz};
