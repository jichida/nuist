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
				this.props.dispatch(ui_mycar_selcurdevice(did));
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

          <div className="left_box left_height huadong">
        <dl className="dl_bg">
        <dd>ID</dd>
        <dd>节点名</dd>
				<dd>区域<img alt="" src={Jtimg}  style={{display:'inline-block'}}/ ></dd>
        </dl>
            {
              lodashmap(devicelist,(did,index)=>{
                const curdevice = devices[did];
                if(did === indexdeviceid){
                  return (
                    <dl key={index} className="sel">
                        <dd>{lodashget(curdevice,'DeviceId','')}</dd>
                        <dd>{lodashget(curdevice,'name','')}</dd><dd>{lodashget(curdevice,'locationname','')}</dd>
                    </dl>
                  )
                }
                return (
                  <dl key={index} onClick={()=>{this.selectdevice(did)}}>
                      <dd>{lodashget(curdevice,'DeviceId','')}</dd>
                      <dd>{lodashget(curdevice,'name','')}</dd><dd>{lodashget(curdevice,'locationname','')}</dd>
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
