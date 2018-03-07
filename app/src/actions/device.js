import { createAction } from 'redux-act';
//获取结点信息
export const getdevicelist_request = createAction('getdevicelist_request');
export const getdevicelist_result = createAction('getdevicelist_result');

//查询报警信息
export const getrealtimealarmlist_request = createAction('getrealtimealarmlist_request');
export const getrealtimealarmlist_result = createAction('getrealtimealarmlist_result');

export const serverpush_alarm =  createAction('serverpush_alarm');
export const serverpush_device =  createAction('serverpush_device');

//定时查询报警信息
export const ui_startalarm = createAction('ui_startalarm');
export const ui_stopalarm = createAction('ui_stopalarm');
