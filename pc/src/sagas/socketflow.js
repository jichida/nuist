import {takeLatest,put} from 'redux-saga/effects';
import {
  notify_socket_connected,
  getsystemconfig_request,
  loginwithtoken_request,
  getdevicelist_request,
  getproductlist_request,
  getvotelist_request
} from '../actions';
import config from '../env/config';

//获取地理位置信息，封装为promise
export function* socketflow(){//仅执行一次
   yield takeLatest(`${notify_socket_connected}`, function*(action) {
      let {payload:issocketconnected} = action;
      if(issocketconnected){
        yield put(getsystemconfig_request({}));
        yield put(getdevicelist_request({}));
        yield put(getproductlist_request({}));
        yield put(getvotelist_request({}));
        if(config.softmode === 'app'){
          const token = localStorage.getItem(`nuist_${config.softmode}_token`);
          if (!!token) {
            yield put(loginwithtoken_request({token}));
          }
        }
      }
    });
}
