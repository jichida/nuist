import { createAction } from 'redux-act';
//获取结点信息
export const getviewtypeslist_request = createAction('getviewtypeslist_request');
export const getviewtypeslist_result = createAction('getviewtypeslist_result');

export const getgatewaylist_request = createAction('getgatewaylist_request');
export const getgatewaylist_result = createAction('getgatewaylist_result');
export const getgatewaylist_result_4reducer = createAction('getgatewaylist_result_4reducer');
//查询报警信息
export const getrealtimealarmlist_request = createAction('getrealtimealarmlist_request');
export const getrealtimealarmlist_result = createAction('getrealtimealarmlist_result');


export const serverpush_device =  createAction('serverpush_device');
export const serverpush_gateway =  createAction('serverpush_gateway');
export const serverpush_device_list = createAction('serverpush_device_list');
export const serverpush_device_alarm = createAction('serverpush_device_alarm');

export const getdevicelist_request = createAction('getdevicelist_request');
export const getdevicelist_result = createAction('getdevicelist_result');

export const gethistorydevicelist_request  = createAction('gethistorydevicelist_request');
export const gethistorydevicelist_result = createAction('gethistorydevicelist_result');
//定时查询报警信息
export const ui_startalarm = createAction('ui_startalarm');
export const ui_stopalarm = createAction('ui_stopalarm');
export const ui_resetalarm = createAction('ui_resetalarm');
//历史记录信息
export const ui_historydevicequeryselect = createAction('ui_historydevicequeryselect');
