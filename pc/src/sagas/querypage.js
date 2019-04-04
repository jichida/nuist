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
// import lodashmap from 'lodash.map';

export function* querypageflow(){//仅执行一次
  yield takeLatest(`${querypage_set_condition_sendsrv}`, function*(action) {
    const {savequery_historychart,viewtype,deviceid} = yield select((state)=>{
      const {app:{savequery_historychart},device:{viewtypes,devices},userlogin:{usersettings}} = state;
      const deviceid = usersettings.indexdeviceid;
      let viewtype;
      if(!!devices[deviceid]){
        viewtype = viewtypes[devices[deviceid].viewtype];
      }
      return {savequery_historychart,viewtype,deviceid};
    });
    const fieldslist_brief = lodashget(viewtype,'fieldslist_brief',[]);
    if(fieldslist_brief.length > 0){
      const {from,to} = savequery_historychart;
      const starttime_m = dateMath.parse(from,false);
      const endtime_m = dateMath.parse(to,true);
      const starttime = starttime_m.format('YYYY-MM-DD HH:mm:ss');
      const endtime = endtime_m.format('YYYY-MM-DD HH:mm:ss');
      console.log(`starttime:${starttime},endtime:${endtime}`);
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


    // endtime:${endtime.format('YYYY-MM-DD HH:mm:ss')}`);
    yield put(ui_savequery({type,from:sel.from,to:sel.to}));
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
      const {usersettings,savequery_alaram,allowviewtypeids,viewtypes,devices} = yield select((state)=>{
        const {usersettings} = state.userlogin;
        const {savequery_alaram} = state.app;
        const {viewtypes,allowviewtypeids,devices} = state.device;
        return {usersettings,savequery_alaram,viewtypes,allowviewtypeids,devices};
      });

      let fieldslist_detail = [];
      const {from,to} = savequery_alaram;
      const starttime_m = dateMath.parse(from,false);
      const endtime_m = dateMath.parse(to,true);
      const starttime = starttime_m.format('YYYY-MM-DD HH:mm:ss');
      const endtime = endtime_m.format('YYYY-MM-DD HH:mm:ss');
      const indexdeviceid = lodashget(usersettings,'indexdeviceid','');
      if(!!devices[indexdeviceid]){
        const viewtype = viewtypes[devices[indexdeviceid].viewtype];
        if(!!viewtype){
          fieldslist_detail = lodashget(viewtype,'fieldslist_detail',[]);
        }
      }

      const query = {
        did:indexdeviceid,
        type:{$in:fieldslist_detail},
        UpdateTime:{
            $gte:starttime,
            $lte:endtime
        }
      };
      //viewtype
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
