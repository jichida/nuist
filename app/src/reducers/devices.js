import { createReducer } from 'redux-act';
import {
  getdevicelist_result,
 } from '../actions';
import lodashmap from 'lodash.map';

const initial = {
    device: {
        devicelist:[],
        devices: {},
    },
};

const device = createReducer({
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

}, initial.device);

export default device;
