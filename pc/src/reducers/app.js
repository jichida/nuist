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
        // savequery_historydata:{
        //   from:'now-7d',//moment().format('YYYY-MM-DD HH:mm:ss'),
        //   to:'now',
        // },
        savequery_historychart:{
          from:'now-7d',//moment().format('YYYY-MM-DD HH:mm:ss'),
          to:'now',
        },
        savequery_alaram:{
          from:'now-6h',//moment().format('YYYY-MM-DD HH:mm:ss'),
          to:'now',
        }
    },
};

const app = createReducer({
    [ui_savequery]:(state,payload)=>{
      const {type,from,to} = payload;
      // if(type === 'historydata'){
      //   const savequery_historydata = {from,to};
      //   return {...state,savequery_historydata};
      // }
      if(type === 'historychart'){
        const savequery_historychart = {from,to};
        return {...state,savequery_historychart};
      }
      if(type === 'alarm'){
        const savequery_alaram = {from,to};
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
