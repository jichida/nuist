import { createReducer } from 'redux-act';
import {
  getvotelist_result,
  setvote_result
 } from '../actions';
import lodashmap from 'lodash.map';

const initial = {
    vote: {
        votelist:[],
        votes: {},
    },
};

const vote = createReducer({
  [getvotelist_result]:(state,payload)=>{
      const {list} = payload;
      const votelist = [];
      const votes = {...state.votes};
      lodashmap(list,(vote)=>{
        votelist.push(vote._id);
        votes[vote._id] = vote;
      });
      return {...state, votelist,votes};
  },
  [setvote_result]:(state,payload)=>{
      const votes = {...state.votes};
      votes[payload._id] = payload;
      return {...state, votes};
  },

}, initial.vote);

export default vote;
