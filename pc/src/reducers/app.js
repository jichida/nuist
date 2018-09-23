import { createReducer } from 'redux-act';
import {
    notify_socket_connected,
    getsystemconfig_result,
    set_uiapp,
    ui_setmapstyle,
    ui_savequery
} from '../actions';
// import moment from 'moment';

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
        },
        windgradesettings:[
          {
            grade:0,
            min:0,
            max:0.2,
          },
          {
            grade:1,
            min:0.3,
            max:1.5,
          },
          {
            grade:2,
            min:1.6,
            max:3.3,
          },
          {
            grade:3,
            min:3.4,
            max:5.4,
          },
          {
            grade:4,
            min:5.5,
            max:7.9,
          },
          {
            grade:5,
            min:8.0,
            max:10.7,
          },
          {
            grade:6,
            min:10.8,
            max:13.8,
          },
          {
            grade:7,
            min:13.9,
            max:17.1,
          },
          {
            grade:8,
            min:17.2,
            max:20.7,
          },
          {
            grade:9,
            min:20.8,
            max:24.4,
          },
          {
            grade:10,
            min:24.5,
            max:28.4,
          },
          {
            grade:11,
            min:28.5,
            max:32.6,
          },
          {
            grade:12,
            min:32.7,
            max:100,
          }
        ]
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
