import { createReducer } from 'redux-act';
import {
    notify_socket_connected,
    getsystemconfig_result,
    set_uiapp,
} from '../actions';


const initial = {
    app: {
        socketconnected:false,
        ispopuserinfo:false,
        ispoppwd:false,
        ispopcare:false,
        uialarmshowall:true,
        bannerproducturls:[],
        selectedindex:0
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

}, initial.app);

export default app;
