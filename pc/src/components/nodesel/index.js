import React from 'react';
import { connect } from 'react-redux';
import lodashmap from 'lodash.map';
import lodashget from 'lodash.get';
import Jtimg from "../../img/jt.png";
import "./index.css";
import {
	ui_mycar_selcurdevice
} from '../../actions';

class App extends React.Component {
    selectdevice = (did)=>{
			const {devices} = this.props;
			if(!!devices[did]){
				this.props.dispatch(ui_mycar_selcurdevice(devices[did].DeviceId));
			}

      // const usersettings = this.props.usersettings;
      // usersettings.indexdeviceid = did;
      // this.props.dispatch(saveusersettings_request(usersettings));
    }
    render() {
        const {devicelist,devices,usersettings} = this.props;
				const indexdeviceid = usersettings.indexdeviceid;
        return (
          <div>
          <dl className="dl_bg">
            <dt>ID</dt>
            <dd><span>节点名</span><span>区域<img alt="" src={Jtimg} /></span></dd>
          </dl>
          <div className="h_625 scroll_bar">
            {
              lodashmap(devicelist,(did,index)=>{
                const curdevice = devices[did];
                if(did === indexdeviceid){
                  return (
                    <dl key={index} className="sel">
                        <dt>{lodashget(curdevice,'DeviceId','')}</dt>
                        <dd><span>{lodashget(curdevice,'name','')}</span><span>{lodashget(curdevice,'city','')}</span></dd>
                    </dl>
                  )
                }
                return (
                  <dl key={index} onClick={()=>{this.selectdevice(did)}}>
                      <dt>{lodashget(curdevice,'DeviceId','')}</dt>
                      <dd><span>{lodashget(curdevice,'name','')}</span><span>{lodashget(curdevice,'city','')}</span></dd>
                  </dl>
                )
              })
            }
        </div>
        </div>
        );
    }
}

const mapStateToProps = ({device,userlogin}) => {
    const {devicelist,devices} = device;

    return {devicelist,devices,usersettings:userlogin.usersettings};
}
export default connect(mapStateToProps)(App);
