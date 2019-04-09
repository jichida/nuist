import React from 'react';
import { connect } from 'react-redux';
// import Chartdemo from "../../img/z3.png";
import Report from "../history/reportcontainer.js";
import lodashget from 'lodash.get';
// import lodashmap from 'lodash.map';
import {
  gethistorydevicelist_request
} from '../../actions';
class App extends React.Component {
  componentDidMount () {
    this.onClickQuery(this.props);
  }
  onClickQuery = (props)=>{
    const {periodquery,curdevice,viewtype} = props;
    const {periodname,starttime,endtime} = periodquery;
    if(!!curdevice){
      this.props.dispatch(gethistorydevicelist_request({
        viewtype,
        _id:curdevice._id,
        periodname,
        starttime,
        endtime,
        fieldslist:viewtype.fieldslist_brief,
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
      const {curdevice,viewtype,retlist} = this.props;
      if(!curdevice){
        return <div />
      }
      const ticktimestringlist = lodashget(retlist,'ticktimestring',[]);
      const {fields,fieldslist_brief} = viewtype;
			return (
        <div className="datachart">
            <Report
              splitcount={2}
              fieldslist_brief={fieldslist_brief}
              ticktimestring={ticktimestringlist}
              fields={fields}
              retlist={retlist}
                    />
        </div>
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
