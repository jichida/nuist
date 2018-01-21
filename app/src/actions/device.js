import { createAction } from 'redux-act';
//获取车辆分组信息
export const querydevicegroup_request = createAction('querydevicegroup_request');
export const querydevicegroup_result = createAction('querydevicegroup_result');
//查询车辆【首页上的高级搜索】
export const querydevice_request = createAction('querydevice_request');
export const querydevice_result = createAction('querydevice_result');
//获取一个device所有信息
export const querydeviceinfo_request = createAction('querydeviceinfo_request');
export const querydeviceinfo_result = createAction('querydeviceinfo_result');

export const querydeviceinfo_list_request = createAction('querydeviceinfo_list_request');
export const querydeviceinfo_list_result = createAction('querydeviceinfo_list_result');
//查询报警信息
export const queryrealtimealarm_request = createAction('queryrealtimealarm_request');
export const queryrealtimealarm_result = createAction('queryrealtimealarm_result');

export const serverpush_alarm =  createAction('serverpush_alarm');
