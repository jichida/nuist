import { createReducer } from 'redux-act';
import {
  getdevicelist_result,
  serverpush_device,
  logout_result
 } from '../actions';
import lodashmap from 'lodash.map';

const initial = {
    device: {
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
  [getdevicelist_result]:(state,payload)=>{
      const {list} = payload;
      const devicelist = [];
      const devices = {...state.devices};
      lodashmap(list,(device)=>{
        devicelist.push(device._id);
        devices[device._id] = device;
      });
      return {...state, devicelist,devices};
  },
  [logout_result]: (state, payload) => {
    return {...initial.device};
  },

}, initial.device);

export default device;
