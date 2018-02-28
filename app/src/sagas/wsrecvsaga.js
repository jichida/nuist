import { put,call,takeLatest,fork,take,race} from 'redux-saga/effects';
import {delay} from 'redux-saga';
import {
  common_err,

  md_login_result,
  login_result,

  set_weui,

  querydevicegroup_request,
  querydevicegroup_result,

  querydevice_request,
  querydevice_result,

  md_querydeviceinfo_result,
  querydeviceinfo_result,


} from '../actions';
import { goBack } from 'react-router-redux';//https://github.com/reactjs/react-router-redux
import map from 'lodash.map';

import config from '../env/config.js';
// import  {
//   getrandom
// } from '../test/bmsdata.js';

export function* wsrecvsagaflow() {


  yield takeLatest(`${md_login_result}`, function*(action) {
      try{
      let {payload:result} = action;
        //console.log(`md_login_result==>${JSON.stringify(result)}`);
        if(!!result){
            yield put(login_result(result));
            if(result.loginsuccess){
              localStorage.setItem(`bms_${config.softmode}_token`,result.token);
              // if(config.softmode === 'pc'){
              //   yield put(gettipcount_request({}));//获取个数
              // }
              yield put(querydevicegroup_request({}));

              // if(config.ispopalarm){
              //   yield put(start_serverpush_alarm_sz({}));
              // }
              //
              // yield put(getworkusers_request({}));
              // //登录成功,获取今天所有报警信息列表
              // yield put(getcurallalarm_request({}));
              // //获取所有工单
              // yield put(getallworkorder_request({}));

            }
        }

      }
      catch(e){
        console.log(e);
      }

  });


  yield takeLatest(`${common_err}`, function*(action) {
        let {payload:result} = action;

        yield put(set_weui({
          toast:{
          text:result.errmsg,
          show: true,
          type:'warning'
        }}));
  });

  yield takeLatest(`${querydevicegroup_result}`, function*(action) {
    try{
      const {payload:{list}} = action;
      //获取到分组列表
      let groupids = [];
      map(list,(group)=>{
        groupids.push(group._id);
      });
      yield put(querydevice_request({query:{}}));
    }
    catch(e){
      console.log(e);
    }

  });



}
