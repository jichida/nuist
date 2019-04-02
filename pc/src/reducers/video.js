import { createReducer } from 'redux-act';
import {
  getvideolist_result,
 } from '../actions';
import lodashmap from 'lodash.map';

const initial = {
    video: {
        videolist:[],
        videos: {},
    },
};

const video = createReducer({

  [getvideolist_result]:(state,payload)=>{
      const {list} = payload;
      const videolist = [];
      const videos = {...state.videos};
      lodashmap(list,(video)=>{
        videolist.push(video._id);
        videos[video._id] = video;
      });
      return {...state, videolist,videos};
  },
  // [getvideodetail_result]:(state,payload)=>{
  //     const videos = {...state.videos};
  //     videos[payload._id] = payload;
  //     return {...state, videos};
  // },

}, initial.video);

export default video;
