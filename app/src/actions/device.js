import { createAction } from 'redux-act';
//获取结点信息
export const getdevicelist_request = createAction('getdevicelist_request');
export const getdevicelist_result = createAction('getdevicelist_result');

//查询报警信息
export const queryrealtimealarm_request = createAction('queryrealtimealarm_request');
export const queryrealtimealarm_result = createAction('queryrealtimealarm_result');

export const serverpush_alarm =  createAction('serverpush_alarm');
