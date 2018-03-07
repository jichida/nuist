import { createReducer } from 'redux-act';
import {
  gethistorydevicelist_result,
  ui_historydevicequeryselect
 } from '../actions';
// import lodashmap from 'lodash.map';
import moment from 'moment';

const initial = {
    historydevice: {
        periodquery:{
          periodname:'hourly',//yearly monthly daily hourly minutely
          starttime:moment().format('YYYY-MM-DD HH:mm:ss'),
          endtime:moment().format('YYYY-MM-DD HH:mm:ss'),
          seltype:0,
          isdateopen:false,
          showFormat:'YYYY/MM/DD hh',
          dateFormat:['YY年', 'MM月', 'DD日', 'hh时']
        },
        historydevices: {},
    },
};

const historydevice = createReducer({
  [ui_historydevicequeryselect]:(state,payload)=>{
    let periodquery = {...state.periodquery};
    if(!!payload.periodname){
      if(payload.periodname === 'monthly'){
        periodquery.showFormat = 'YYYY/MM';
        periodquery.dateFormat = ['YY年', 'MM月'];
      }
      else if(payload.periodname === 'minutely'){
        periodquery.showFormat = 'YYYY/MM/DD HH:mm';
        periodquery.dateFormat = ['YY年', 'MM月', 'DD日', 'hh时', 'mm分'];
      }
      else if(payload.periodname === 'hourly'){
        periodquery.showFormat = 'YYYY/MM/DD HH';
        periodquery.dateFormat = ['YY年', 'MM月', 'DD日', 'hh时'];
      }
      else{
        periodquery.showFormat = 'YYYY/MM/DD';
        periodquery.dateFormat = ['YY年', 'MM月', 'DD日'];
      }
    }
    periodquery = {...periodquery,...payload};
    return {...state,periodquery};
  },
  [gethistorydevicelist_result]:(state,payload)=>{
      const {deviceid,list} = payload;
      const historydevices = {...state.historydevices};
      historydevices[deviceid] = list;
      return {...state,historydevices};
  },

}, initial.historydevice);

export default historydevice;
