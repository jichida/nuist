import { createReducer } from 'redux-act';
import {
    notify_socket_connected,
    getsystemconfig_result,
    set_uiapp,
    ui_setmapstyle,
    ui_savequery
} from '../actions';
import moment from 'moment';

const initial = {
    app: {
        tabindex:0,
        socketconnected:false,
        ispopuserinfo:false,
        ispoppwd:false,
        ispopcare:false,
        uialarmshowall:true,
        bannerproducturls:[],
        selectedindex:0,
        mapstyle : {
            height : 0,
            top : 0
        },
        savequery_historydata:{
          starttime:moment().subtract(360, 'minutes').format('YYYY-MM-DD HH:mm:00'),//moment().format('YYYY-MM-DD HH:mm:ss'),
          endtime:moment().format('YYYY-MM-DD 23:59:59'),
        },
        savequery_historychart:{
          starttime:moment().subtract(360, 'minutes').format('YYYY-MM-DD HH:mm:00'),//moment().format('YYYY-MM-DD HH:mm:ss'),
          endtime:moment().format('YYYY-MM-DD 23:59:59'),
        },
        savequery_alaram:{
          starttime:moment().subtract(360, 'minutes').format('YYYY-MM-DD HH:mm:00'),//moment().format('YYYY-MM-DD HH:mm:ss'),
          endtime:moment().format('YYYY-MM-DD 23:59:59'),
        }
    },
};

const app = createReducer({
    [ui_savequery]:(state,payload)=>{
      const {type,starttime,endtime} = payload;
      if(type === 'historydata'){
        const savequery_historydata = {starttime,endtime};
        return {...state,savequery_historydata};
      }
      if(type === 'historychart'){
        const savequery_historychart = {starttime,endtime};
        return {...state,savequery_historychart};
      }
      if(type === 'alarm'){
        const savequery_alaram = {starttime,endtime};
        return {...state,savequery_alaram};
      }
      return {state,payload};
    },
    [set_uiapp]:(state,payload)=>{
      return {...state,...payload};
    },
    [getsystemconfig_result]:(state,payload)=>{
        return {...state,...payload};
    },
    [notify_socket_connected]:(state,socketconnected)=>{
        return {...state,socketconnected};
    },
    [ui_setmapstyle]:(state,style)=>{
        return {...state, mapstyle:style };
    },

}, initial.app);

export default app;
