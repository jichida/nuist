import { put,takeLatest,select,} from 'redux-saga/effects';
import {delay} from 'redux-saga';
import {
  common_err,

  md_login_result,
  login_result,

  set_weui,

  getgatewaylist_request,
  getgatewaylist_result_4reducer,
  ui_selectgateway4draw,
  ui_resetalarm,

  setvote_result,
  changepwd_result,
  set_uiapp,
  ui_seldropdowndevice,
  ui_selgateway,
  saveusersettings_result,
  ui_notifyresizeformap,
  ui_setmapstyle,
  logout_result
} from '../actions';
// import { goBack } from 'react-router-redux';//https://github.com/reactjs/react-router-redux
// import map from 'lodash.map';
import lodashget from 'lodash.get';
import lodashmap from 'lodash.map';
import config from '../env/config.js';
import {getdomposition} from '../util/index';

export function* wsrecvsagaflow() {
  yield takeLatest(`${ui_seldropdowndevice}`,function*(action){
    //若第一次usersettings里面字段为空，则设置
      const {type,value} = action.payload;
      const deviceid = value;

      let usersettings = yield select((state)=>{
        const usersettings = lodashget(state,'userlogin.usersettings',{
          indexdeviceid:'',
          warninglevel:'',
          subscriberdeviceids : []
        });
        return usersettings;
      });


      usersettings.indexdeviceid = deviceid;

      yield put(saveusersettings_result({usersettings}));

      if(type === 'historychart'){
        //ui auto
      }
      else if(type==='alarm'){
        yield put(ui_resetalarm({}));
      }
  });


  yield takeLatest(`${ui_selgateway}`,function*(action){
    //若第一次usersettings里面字段为空，则设置
      const {type,value} = action.payload;
      const gatewayid = value;
      debugger;
      const devices = yield select((state)=>{
        const {devices} = state.device;
        return devices;
      });

      let usersettings = yield select((state)=>{
        const usersettings = lodashget(state,'userlogin.usersettings',{
          indexdeviceid:'',
          warninglevel:'',
          subscriberdeviceids : []
        });
        return usersettings;
      });
      let seldeviceid;
      if(lodashget(devices,`${usersettings.indexdeviceid}.gatewayid`) === gatewayid){
        seldeviceid = usersettings.indexdeviceid;
      }
      lodashmap(devices,(device)=>{
        if(!seldeviceid && device.gatewayid === gatewayid){
          seldeviceid = device._id;
        }
      });

      usersettings.indexdeviceid = seldeviceid;
      usersettings.indexgatewayid = gatewayid;
      // debugger;
      yield put(saveusersettings_result({usersettings}));

      yield put(ui_selectgateway4draw(gatewayid));
  });


  yield takeLatest(`${getgatewaylist_result_4reducer}`,function*(action){
    //若第一次usersettings里面字段为空，则设置
    const {list} = action.payload;
    if(list.length > 0){
      let usersettings = yield select((state)=>{
        const usersettings = lodashget(state,'userlogin.usersettings',{
          indexdeviceid:'',
          warninglevel:'',
          subscriberdeviceids : []
        });
        return usersettings;
      });
      if(usersettings.indexdeviceid === ''){
        usersettings.indexdeviceid = list[0]._id;
        usersettings.indexgatewayid = lodashget(list[0],'gatewayid._id');
        yield put(saveusersettings_result({usersettings}));
      }
    }
  });

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
              yield put(getgatewaylist_request({}));

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



  yield takeLatest(`${logout_result}`, function*(action) {
      yield put(getgatewaylist_request({}));
  });

  yield takeLatest(`${ui_notifyresizeformap}`, function*(action) {
      const {payload:{divid,delay:delayms}} = action;
      yield delay(delayms);//防抖动
      const positiondiv = getdomposition(divid);
      console.log(`ui_notifyresizeformap--->${JSON.stringify(positiondiv)}`)
      yield put(ui_setmapstyle(positiondiv));
  });
}
