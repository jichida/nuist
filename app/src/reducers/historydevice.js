import { createReducer } from 'redux-act';
import {
  gethistorydevicelist_result,
  ui_historydevicequeryselect,
  logout_result
 } from '../actions';
// import lodashmap from 'lodash.map';
import moment from 'moment';

const initial = {
    historydevice: {
        periodquery:{
          periodname:'minutely',// monthly weekly daily hourly minutely
          starttime:moment().subtract(10, 'minutes').format('YYYY-MM-DD HH:mm:00'),//moment().format('YYYY-MM-DD HH:mm:ss'),
          endtime:moment().format('YYYY-MM-DD HH:mm:00'),
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
        periodquery.showFormat = 'YYYY/MM/DD hh:mm';
        periodquery.dateFormat = ['YY年', 'MM月', 'DD日', 'hh时', 'mm分'];
      }
      else if(payload.periodname === 'hourly'){
        periodquery.showFormat = 'YYYY/MM/DD hh';
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
      const {_id,listret} = payload;
      const historydevices = {...state.historydevices};
      historydevices[_id] = listret;
      return {...state,historydevices};
  },
  [logout_result]: (state, payload) => {
    return {...initial.historydevice};
  },

}, initial.historydevice);

export default historydevice;
