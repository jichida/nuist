import React from "react";
import { connect } from 'react-redux';
import ChartHistory from "./charts_history_container_charttype";
import lodashget from 'lodash.get';
// import lodashmap from 'lodash.map';
// import moment from 'moment';
import {
  querypage_set_condition_sendsrv
} from '../../actions';

class App extends React.Component {
  timeTicket = null;

  componentDidMount () {
    // this.onClickQuery(this.props);
    this.props.dispatch(querypage_set_condition_sendsrv({}));
    this.timeTicket = setInterval( ()=> {
      this.props.dispatch(querypage_set_condition_sendsrv({}));
      // this.onClickQuery(this.props);
    }, 30000);
  }
  componentWillUnmount() {
    if (!!this.timeTicket) {
      clearInterval(this.timeTicket);
    }
  };
  // onClickQuery = (props)=>{
  //   const {curdevice,viewtype} = props;
  //   // const {periodname,starttime,endtime} = periodquery;
  //   const periodname = 'minutely';// monthly weekly daily hourly minutely
  //   const starttime = moment().subtract(10, 'minutes').format('YYYY-MM-DD HH:mm:00');//moment().format('YYYY-MM-DD HH:mm:ss'),
  //   const endtime = moment().format('YYYY-MM-DD HH:mm:00');
  //
  //   if(!!curdevice){
  //     this.props.dispatch(gethistorydevicelist_request({
  //       _id:curdevice._id,
  //       periodname,
  //       starttime,
  //       endtime,
  //       fieldslist:viewtype.fieldslist_brief,
  //     }));
  //   }
  // }

  componentWillReceiveProps (nextProps) {
      const oldcurdeviceid = lodashget(this.props,'curdevice._id');
      const newcurdeviceid = lodashget(nextProps,'curdevice._id');
      if(oldcurdeviceid !== newcurdeviceid){
        //chang curdevice
        this.props.dispatch(querypage_set_condition_sendsrv({}));
      }
    }

    // shouldComponentUpdate(nextProps, nextState) {
    //   let needrender = false;
    //   if(!needrender)
    //   {
    //     const nextData = lodashget(nextProps,'curdevice._id','');
    //     const curData = lodashget(this.props,'curdevice._id','');
    //     if( nextData !== curData ){
    //         needrender = true;
    //     }
    //   }
    //   return needrender;//render
    // }

  	render() {
      const {curdevice,viewtype,retlist,selfield} = this.props;
      const {fields} = viewtype;
      const curfield = selfield;
      if(!curdevice || !fields[curfield]){
        return <div />
      }
      const ticktimestringlist = lodashget(retlist,'ticktimestring',[]);
      console.log(`render chart history,:${ticktimestringlist.length},curdevice:${curdevice._id},curfield:${curfield}`)
			return (
            <ChartHistory
              _id={curdevice._id}
              curfield={curfield}
              ticktimestring={ticktimestringlist}
              curfieldname={fields[curfield].showname}
              retlist={retlist}
                    />
	    );

  	}
}

const mapStateToProps = ({historydevice:{periodquery},device:{devices,devicelist,viewtype},historydevice:{historydevices},userlogin:{usersettings}}) => {
		let curdeviceid = lodashget(usersettings,'indexdeviceid');
    let curdevice;
    if(!!curdeviceid){
      curdevice = devices[curdeviceid];
    }
    if(!curdevice){
      if(devicelist.length > 0){
        curdevice = devices[devicelist[0]];
      }
    }
    curdeviceid = lodashget(curdevice,'_id');
    const retlist = lodashget(historydevices,`${curdeviceid}`,[]);
    return {curdevice,retlist,periodquery,viewtype};
}
export default connect(mapStateToProps)(App);
