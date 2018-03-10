import { put,call,takeLatest,take,race} from 'redux-saga/effects';
import {delay} from 'redux-saga';
import {
  common_err,

  md_login_result,
  login_result,

  set_weui,

  getdevicelist_request,
  // getdevicelist_result,

  ui_startalarm,
  ui_stopalarm,
  getrealtimealarmlist_request,
  getrealtimealarmlist_result,

  setvote_result,
  changepwd_result,
  set_uiapp
} from '../actions';
// import { goBack } from 'react-router-redux';//https://github.com/reactjs/react-router-redux
// import map from 'lodash.map';

import config from '../env/config.js';
// import  {
//   getrandom
// } from '../test/bmsdata.js';

export function* wsrecvsagaflow() {
  yield takeLatest(`${changepwd_result}`, function*(action) {
    yield put(set_uiapp({ ispoppwd: false }));
    yield put(set_weui({
      toast:{
        text:'修改新密码成功',
        show: true,
        type:'success'
    }}));
  });

  yield takeLatest(`${setvote_result}`, function*(action) {
    yield put(set_weui({
      toast:{
        text:'问卷递交成功,感谢参与!',
        show: true,
        type:'success'
    }}));
  });


  yield takeLatest(`${md_login_result}`, function*(action) {
      try{
      let {payload:result} = action;
        //console.log(`md_login_result==>${JSON.stringify(result)}`);
        if(!!result){
            yield put(login_result(result));
            if(result.loginsuccess){
              localStorage.setItem(`nuist_${config.softmode}_token`,result.token);
              // if(config.softmode === 'pc'){
              //   yield put(gettipcount_request({}));//获取个数
              // }
              yield put(getdevicelist_request({}));

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

  yield takeLatest(`${ui_startalarm}`,function*(action) {
    let isstopped = false;
    while(!isstopped){
      yield put(getrealtimealarmlist_request({}));
      const { stop } = yield race({
          stop: take(`${ui_stopalarm}`),
          result: take(`${getrealtimealarmlist_result}`),
          timeout: call(delay, 10000)
      });
      isstopped = !!stop;
      if(isstopped){
        break;
      }
      const { stop2 } = yield race({
          stop2: take(`${ui_stopalarm}`),
          timeout2: call(delay, 5000)
      });
      isstopped = !!stop2;
    }
  });
}
