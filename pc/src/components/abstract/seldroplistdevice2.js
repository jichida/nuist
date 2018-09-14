import React from "react";
// import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import lodashget from 'lodash.get';
import {Dropdown,Button,Icon} from 'antd';
import getMenu from './dropdownselmenu_device';
import {ui_seldropdowndevice} from '../../actions';

class App extends React.Component {
  onMenuClick(deviceid){
    this.props.dispatch(ui_seldropdowndevice({value:deviceid}));
  }
  render() {
    const {gateways,devices,curdevice} = this.props;
    if(!curdevice){
      return (<div>无选择设备</div>);
    }
    return (
      <em>
        <Dropdown  overlay={getMenu({indexgatewayid:curdevice.gatewayid,
          gateways,
          devices,
          onMenuClick:
            (e)=>{
              this.onMenuClick(e.key)
            }
        })} placement="bottomLeft">
          <Button style={{ marginLeft: 8 }}>{curdevice.name}<Icon type="down" /></Button>
        </Dropdown>
      </em>
    )
  }
}

const mapStateToProps = ({device:{gateways,viewtype,devicelist,devices},userlogin:{usersettings}}) => {
		let curdevice;
		let curdeviceid = lodashget(usersettings,'indexdeviceid');
		if(!!curdeviceid){
			curdevice = devices[curdeviceid];
		}
		if(!curdevice){
			if(devicelist.length > 0){
				curdevice = devices[devicelist[0]];
			}
		}
    return {gateways,devices,viewtype,curdevice,usersettings};
}

export default connect(mapStateToProps)(App);
