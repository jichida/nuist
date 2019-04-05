import { createReducer } from 'redux-act';
import {
  getgatewaylist_result_4reducer,
  getdevicelist_result,
  serverpush_device_list,
  serverpush_device_alarm,
  getviewtypeslist_result,
  logout_result
 } from '../actions';
 import {normalizrdevices} from './normalizr';
 import lodashget from 'lodash.get';
 import lodashmap from 'lodash.map';

const initial = {
    device: {
        viewtype:{
          fields:{},
          fieldslist_detail : [],
          fieldslist_brief : [],
          fieldsall : []
        },
        allowviewtypeids:[],
        viewtypes:{},
        gateways:{},
        devicelist:[],
        devices: {},
    },
};

const device = createReducer({
  [getviewtypeslist_result]:(state,payload)=>{
    //地图上要显示不允许看数据的节点
    const {list} = payload;
    const viewtypes = {...state.viewtypes};
    for(let i=0;i<list.length;i++){
      const curviewtype = list[0];
      let devicetypenew = {};
      const {fieldsall,...rest} = curviewtype;
      let fields = {};
      lodashmap(fieldsall,(v)=>{
        fields[v.name] = {
          showname:v.showname,
          iconurl:v.iconurl,
          unit:lodashget(v,'unit','')
        };
      })
      devicetypenew = {fields,...rest};
      viewtypes[curviewtype._id] = devicetypenew;
    }
    return {...state,viewtypes};
  },
  [getdevicelist_result]:(state,payload)=>{
    const {list} = payload;
    const devices = {...state.devices};
    for(let i=0;i<list.length;i++){
      const {_id,realtimedata} = list[i];
      devices[_id] = {...devices[_id],realtimedata:{...realtimedata}};
    }
    return {...state,devices};
  },
  [serverpush_device_list]:(state,payload)=>{
    const {devicelist} = payload;
    const devices = {...state.devices};
    for(let i=0;i<devicelist.length;i++){
      const {_id,realtimedata} = devicelist[0];
      devices[_id] = {...devices[_id],realtimedata:{...realtimedata}};
    }
    return {...state,devices};

  },
  [serverpush_device_alarm]:(state,payload)=>{
    const {_id,realtimedata} = payload;
    const devices = {...state.devices};
    devices[_id] = {...devices[_id],realtimedata:{...realtimedata}};
    return {...state,devices};
  },
  [getgatewaylist_result_4reducer]:(state,payload)=>{
      const {
        allowviewtypeids,
        viewtypes,
        devicelist,
        devices,
        gateways
      } = normalizrdevices(payload);
      return {...state, devicelist,allowviewtypeids,viewtypes,gateways,devices};
  },
  [logout_result]: (state, payload) => {
    return {...initial.device};
  },

}, initial.device);

export default device;
