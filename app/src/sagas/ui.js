import {takeLatest,call,put} from 'redux-saga/effects';
// import {delay} from 'redux-saga';
//
//
import { push,replace } from 'react-router-redux';
// import moment from 'moment';
// import config from '../env/config.js';
import {set_weui,register_request} from '../actions';
import Toast from 'antd-mobile/lib/toast';  // 加载 JS
import 'antd-mobile/lib/toast/style/css';        // 加载 CSS

const popdialog = ({text,type})=>{
  return new Promise(resolve => {
      if(type === 'success'){
        Toast.success(text, 1);
      }
      if(type === 'warning'){
        Toast.fail(text, 1);
      }
      resolve();
    });
}
export function* uiflow(){//仅执行一次
  yield takeLatest(`${set_weui}`, function*(action) {
    const {toast} = action.payload;
    if(!!toast){
      yield call(popdialog,toast);
    }
  });

  yield takeLatest(`${register_request}`, function*(action) {
    try{
      yield put(set_weui({
                      toast:{
                      text:`该账号已注册,请等待激活`,
                      show: true,
                      type:'success'
                    }}));
      yield put(replace('/login'));
    }
    catch(e){
      console.log(e);
    }
  });
  
}
