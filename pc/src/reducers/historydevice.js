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
          seltype:1,
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
    let starttime = periodquery.starttime;
    let endtime = periodquery.endtime;
    if(!!payload.periodname){
      if(payload.periodname === 'monthly'){
        periodquery.showFormat = 'YYYY/MM';
        periodquery.dateFormat = ['YY年', 'MM月'];
        starttime = moment(endtime).subtract(10, 'months').format('YYYY-MM-DD 00:00:00');
      }
      else if(payload.periodname === 'minutely'){
        periodquery.showFormat = 'YYYY/MM/DD hh:mm';
        periodquery.dateFormat = ['YY年', 'MM月', 'DD日', 'hh时', 'mm分'];
        starttime = moment(endtime).subtract(10, 'minutes').format('YYYY-MM-DD HH:mm:00');
      }
      else if(payload.periodname === 'hourly'){
        periodquery.showFormat = 'YYYY/MM/DD hh';
        periodquery.dateFormat = ['YY年', 'MM月', 'DD日', 'hh时'];
        starttime = moment(endtime).subtract(10, 'hours').format('YYYY-MM-DD HH:00:00');
      }
      else{
        periodquery.showFormat = 'YYYY/MM/DD';
        periodquery.dateFormat = ['YY年', 'MM月', 'DD日'];
        if(payload.periodname === 'daily'){
          starttime = moment(endtime).subtract(10, 'days').format('YYYY-MM-DD 00:00:00');
        }
        else{
          starttime = moment(endtime).subtract(70, 'days').format('YYYY-MM-DD 00:00:00');
        }
      }
    }
    periodquery = {...periodquery,starttime,...payload};
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
