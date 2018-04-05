import React from 'react';
import { connect } from 'react-redux';
// import Chartdemo from "../../img/z3.png";
import Report from "./report.js";
import lodashget from 'lodash.get';
import lodashmap from 'lodash.map';
import {
  gethistorydevicelist_request
} from '../../actions';
class App extends React.Component {
  componentDidMount () {
    this.onClickQuery(this.props);
  }
  onClickQuery = (props)=>{
    const {periodquery,curdevice,devicetype} = props;
    const {periodname,starttime,endtime} = periodquery;
    if(!!curdevice){
      this.props.dispatch(gethistorydevicelist_request({
        _id:curdevice._id,
        periodname,
        starttime,
        endtime,
        fieldslist:devicetype[curdevice.devicetype].fieldslist_brief,
      }));
    }
  }

  componentWillReceiveProps (nextProps) {
      const oldcurdeviceid = lodashget(this.props,'curdevice._id');
      const newcurdeviceid = lodashget(nextProps,'curdevice._id');
      if(oldcurdeviceid !== newcurdeviceid){
        //chang curdevice
        this.onClickQuery(nextProps);
      }
    }

  	render() {
      const {curdevice,devicetype,retlist} = this.props;
      if(!curdevice){
        return <div />
      }
      const ticktimestringlist = lodashget(retlist,'ticktimestring',[]);
      const {fields,fieldslist_brief} = devicetype[curdevice.devicetype];
			return (
        <div className="datachart">
          <ul>
            {
              lodashmap(fieldslist_brief,(fieldname)=>{
                const fieldsprops = fields[fieldname];
                if(!!fieldsprops && ticktimestringlist.length>0){
                  return (<li key={fieldname}>
                            <Report title={`历史${fieldsprops.showname}曲线`} ticktimestring={ticktimestringlist}
                              vlist={retlist[fieldname]}/>
                        </li>
                  );
                }
              })
            }
          </ul>
        </div>
	    );

  	}
}

const mapStateToProps = ({historydevice:{periodquery},device:{devices,devicelist,devicetype},historydevice:{historydevices},userlogin:{usersettings}}) => {
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
    return {curdevice,retlist,periodquery,devicetype};
}
export default connect(mapStateToProps)(App);
