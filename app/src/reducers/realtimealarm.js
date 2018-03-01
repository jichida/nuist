import { createReducer } from 'redux-act';
import {
  getrealtimealarmlist_result,
 } from '../actions';
import lodashmap from 'lodash.map';

const initial = {
    realtimealarm: {
        realtimealarmlist:[],
        realtimealarms: {},
    },
};

const realtimealarm = createReducer({
  [getrealtimealarmlist_result]:(state,payload)=>{
      const {list} = payload;
      const realtimealarmlist = [];
      const realtimealarms = {...state.realtimealarms};
      lodashmap(list,(realtimealarm)=>{
        realtimealarmlist.push(realtimealarm._id);
        realtimealarms[realtimealarm._id] = realtimealarm;
      });
      return {...state, realtimealarmlist,realtimealarms};
  },

}, initial.realtimealarm);

export default realtimealarm;
