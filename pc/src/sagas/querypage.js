import {call,take,race,takeLatest,put,select} from 'redux-saga/effects';
import {delay} from 'redux-saga';
import {
  querypage_set_condition,
  querypage_set_condition_sendsrv,
  // ui_historydevicequeryselect,

  ui_startalarm,
  ui_stopalarm,
  ui_resetalarm,

  getrealtimealarmlist_request,
  getrealtimealarmlist_result,

  gethistorydevicelist_request,
  ui_savequery
} from '../actions';
// import moment from 'moment';
import * as dateMath from '../util/datemath';
import lodashget from 'lodash.get';

export function* querypageflow(){//仅执行一次
  yield takeLatest(`${querypage_set_condition_sendsrv}`, function*(action) {
    const {savequery_historychart,viewtype,deviceid} = yield select((state)=>{
      const {app:{savequery_historychart},device:{viewtype},userlogin:{usersettings}} = state;
      const deviceid = usersettings.indexdeviceid;
      return {savequery_historychart,viewtype,deviceid};
    });
    const fieldslist_brief = lodashget(viewtype,'fieldslist_brief',[]);
    if(fieldslist_brief.length > 0){
      const {starttime,endtime} = savequery_historychart;
      const periodname = 'minutely';
      yield put(gethistorydevicelist_request({
        fieldslist:fieldslist_brief,
        _id:deviceid,
        periodname,
        starttime,
        endtime
      }));
    }
  });



  yield takeLatest(`${querypage_set_condition}`, function*(action) {
    const {sel,type} = action.payload;

    const starttime_m = dateMath.parse(sel.from,false);
    const endtime_m = dateMath.parse(sel.to,true);
    const starttime = starttime_m.format('YYYY-MM-DD HH:mm:ss');
    const endtime = endtime_m.format('YYYY-MM-DD HH:mm:ss');
    console.log(`starttime:${starttime},endtime:${endtime}`);
    // endtime:${endtime.format('YYYY-MM-DD HH:mm:ss')}`);
    yield put(ui_savequery({type,starttime,endtime}));
    if(type === 'historychart'){
      // const periodname = 'minutely';
      // yield put(ui_historydevicequeryselect({periodname,starttime,endtime}));
      yield put(querypage_set_condition_sendsrv({}));
    }
    else if(type === 'alarm'){
      //查询历史报警
      yield put(ui_resetalarm({}));
      // const {usersettings} = yield select((state)=>{
      //   const {usersettings} = state.userlogin;
      //   return {usersettings};
      // });
      // const indexdeviceid = lodashget(usersettings,'indexdeviceid','');
      // yield put(getrealtimealarmlist_request({query:{
      //   did:indexdeviceid,
      //   UpdateTime:{
      //       $gte:starttime,
      //       $lte:endtime
      //   }
      // }}));
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

  yield takeLatest(`${ui_startalarm}`,function*(action) {
    let isstopped = false;
    while(!isstopped){
      //选中一个默认节点
      const {usersettings,savequery_historychart} = yield select((state)=>{
        const {usersettings} = state.userlogin;
        const {savequery_historychart} = state.app;
        return {usersettings,savequery_historychart};
      });
      const {starttime,endtime} = savequery_historychart;
      const indexdeviceid = lodashget(usersettings,'indexdeviceid','');
      const query = {
        did:indexdeviceid,
        UpdateTime:{
            $gte:starttime,
            $lte:endtime
        }
      };
      yield put(getrealtimealarmlist_request({query}));
      console.log(query)
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
          reset:take(`${ui_resetalarm}`),
          timeout2: call(delay, 5000)
      });
      isstopped = !!stop2;
    }
  });
}
