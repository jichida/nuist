import {takeLatest,put,select} from 'redux-saga/effects';
import {
  querypage_set_condition,
  querypage_set_condition_sendsrv,
  ui_historydevicequeryselect,
  gethistorydevicelist_request
} from '../actions';
// import moment from 'moment';
import {parse} from '../util/datemath';

export function* querypageflow(){//仅执行一次
  yield takeLatest(`${querypage_set_condition_sendsrv}`, function*(action) {
    const {periodquery,viewtype,deviceid} = yield select((state)=>{
      const {historydevice:{periodquery},device:{viewtype},userlogin:{usersettings}} = state;
      const deviceid = usersettings.indexdeviceid;
      return {periodquery,viewtype,deviceid};
    });

    const {periodname,starttime,endtime} = periodquery;
    yield put(gethistorydevicelist_request({
      fieldslist:viewtype.fieldslist_brief,
      _id:deviceid,
      periodname,
      starttime,
      endtime
    }));
  });



  yield takeLatest(`${querypage_set_condition}`, function*(action) {
    const {sel,type} = action.payload;

    const starttime_m = parse(sel.from);
    const endtime_m = parse(sel.to);
    const starttime = starttime_m.format('YYYY-MM-DD HH:mm:ss');
    const endtime = endtime_m.format('YYYY-MM-DD HH:mm:ss');
    console.log(`starttime:${starttime},endtime:${endtime}`);
    // endtime:${endtime.format('YYYY-MM-DD HH:mm:ss')}`);
    if(type === 'history'){
      const periodname = 'minutely';
      yield put(ui_historydevicequeryselect({periodname,starttime,endtime}));
      yield put(querypage_set_condition_sendsrv({}));
    }
    else if(type === 'alarm'){
      //查询历史报警
    }

	// {from: "now-6M", to: "now", display: "Last 6 months", section: 0, active: false}
    // console.log(payload);
    // const {periodquery,curdevice,viewtype} = props;
    // console.log(periodquery);
    // const {periodname,starttime,endtime} = periodquery;
    // this.props.dispatch(gethistorydevicelist_request({
    //   fieldslist:viewtype.fieldslist_brief,
    //   _id:curdevice._id,
    //   periodname,
    //   starttime,
    //   endtime
    // }));
  });
}
