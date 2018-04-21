import { createReducer } from 'redux-act';
import {
  getgatewaylist_result_4reducer,
  serverpush_device,
  logout_result
 } from '../actions';
 import {normalizrdevices} from './normalizr';
// import lodashmap from 'lodash.map';


const initial = {
    device: {
        viewtype:{
          fields:{},
          "fieldslist_detail" : [],
          "fieldslist_brief" : [],
          "fieldsall" : []
        },
        gateways:{},
        devicelist:[],
        devices: {},
    },
};

const device = createReducer({
  [serverpush_device]:(state,payload)=>{
    const {_id,realtimedata} = payload;
    const devices = {...state.devices};
    devices[_id] = {...devices[_id],realtimedata:{...realtimedata}};
    return {...state,devices};
  },
  [getgatewaylist_result_4reducer]:(state,payload)=>{
      const {
        viewtype,
        devicelist,
        devices,
        gateways
      } = normalizrdevices(payload);
      return {...state, devicelist,viewtype,gateways,devices};
  },
  [logout_result]: (state, payload) => {
    return {...initial.device};
  },

}, initial.device);

export default device;
