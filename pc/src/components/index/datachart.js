import React from 'react';
import { connect } from 'react-redux';
// import Chartdemo from "../../img/z3.png";
import Report from "./report.js";
import lodashget from 'lodash.get';
import {
  gethistorydevicelist_request
} from '../../actions';
class App extends React.Component {
  componentDidMount () {
    this.onClickQuery(this.props);
  }
  onClickQuery = (props)=>{
    const {periodquery,curdevice} = props;
    const {periodname,starttime,endtime} = periodquery;
    if(!!curdevice){
      this.props.dispatch(gethistorydevicelist_request({
        _id:curdevice._id,
        periodname,
        starttime,
        endtime
      }));
    }
  }

  componentWillReceiveProps (nextProps) {
      if(lodashget(this.props,'curdevice._id') !== lodashget(nextProps.props,'curdevice._id')){
        //chang curdevice
        this.onClickQuery(nextProps);
      }
    }

  	render() {
      const {curdevice,retlist} = this.props;
      if(!curdevice){
        return <div />
      }
      const ticktimestringlist = lodashget(retlist,'ticktimestring',[]);
			return (
        <div className="datachart">
          <ul>
            <li>
              {ticktimestringlist.length>0 && <Report title="历史温度曲线" ticktimestring={ticktimestringlist} vlist={retlist.temperature}/>}
            </li>
            <li>
              {ticktimestringlist.length>0 && <Report title="历史降雨量曲线" ticktimestring={ticktimestringlist} vlist={retlist.rainfall}/>}
            </li>
            <li>
              {ticktimestringlist.length>0 && <Report title="历史湿度曲线" ticktimestring={ticktimestringlist} vlist={retlist.humidity}/>}
            </li>
            <li>
              {ticktimestringlist.length>0 && <Report title="历史气压曲线" ticktimestring={ticktimestringlist} vlist={retlist.pressure}/>}
            </li>
          </ul>
        </div>
	    );

  	}
}

const mapStateToProps = ({historydevice:{periodquery},device:{devices,devicelist},historydevice:{historydevices},userlogin:{usersettings}}) => {
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
    return {curdevice,retlist,periodquery};
}
export default connect(mapStateToProps)(App);
