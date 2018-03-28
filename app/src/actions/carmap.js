import { createAction } from 'redux-act';

export const map_setmapinited = createAction('map_setmapinited');

export const carmapshow_createmap = createAction('carmapshow_createmap');
export const carmapshow_destorymap = createAction('carmapshow_destorymap');

export const ui_mycar_selcurdevice = createAction('ui_mycar_selcurdevice');

export const ui_selcurdevice_request = createAction('ui_selcurdevice_request');
export const ui_selcurdevice_result = createAction('ui_selcurdevice_result');

export const mapmain_seldistrict = createAction('mapmain_seldistrict');

export const mapmain_clusterMarkerClick = createAction('mapmain_clusterMarkerClick');

export const mapmain_showpopinfo = createAction('mapmain_showpopinfo');
export const mapmain_showpopinfo_list = createAction('mapmain_showpopinfo_list');

export const ui_showdistcluster = createAction('ui_showdistcluster');
export const ui_showhugepoints = createAction('ui_showhugepoints');
