import { createAction } from 'redux-act';

export const notify_socket_connected = createAction('notify_socket_connected');

export const common_err  = createAction('common_err');

export const getsystemconfig_request = createAction('getsystemconfig_request');
export const getsystemconfig_result = createAction('getsystemconfig_result');

export const set_routers = createAction('set_routers');

export const set_weui = createAction('set_weui');

export const set_uiapp = createAction('set_uiapp');
export const ui_setmapstyle = createAction('ui_setmapstyle');
export const ui_notifyresizeformap = createAction('ui_notifyresizeformap');
export const ui_selgateway = createAction('ui_selgateway');
export const ui_seldropdowndevice = createAction('ui_seldropdowndevice');

export const ui_savequery = createAction('ui_savequery');
