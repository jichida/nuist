import {takeLatest,call} from 'redux-saga/effects';
import {querypage_set_condition} from '../actions';

export function* querypageflow(){//仅执行一次
  yield takeLatest(`${querypage_set_condition}`, function*(action) {
    const payload = action.payload;
    console.log(payload);
  });
}
