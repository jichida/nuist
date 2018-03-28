import { createReducer } from 'redux-act';
import {
    notify_socket_connected,
    getsystemconfig_result,
    set_uiapp,
    ui_setmapstyle,
} from '../actions';


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
        }
    },
};

const app = createReducer({
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
