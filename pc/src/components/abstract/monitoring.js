import React from 'react';
import { connect } from 'react-redux';
import Dropdown from 'antd/lib/dropdown';
import Button from 'antd/lib/button';
import Icon from 'antd/lib/icon';
import {
	ui_mycar_selcurdevice
} from '../../actions';
import 'antd/dist/antd.css';
import getMenu from './dropdownselmenu';
import "./monitoring.css";
import lodashget from 'lodash.get';
import lodashmap from 'lodash.map';
import {getCoureName} from '../../util';

const DeviceInfoDetailList = (props)=>{
	const {curdevice,viewtype} = props;
	const {fieldslist_brief,fields} = viewtype;
	return (<div>
				{
					lodashmap(fieldslist_brief,(fieldname)=>{
						const fieldsprops = fields[fieldname];
						if(!!fieldsprops){
							let showvalue = lodashget(curdevice,`realtimedata.${fieldname}`,'');
							if(fieldname === 'winddirection'){
								showvalue = getCoureName(lodashget(curdevice,`realtimedata.${fieldname}`));
							}
							return (
								<p key={fieldname}>
									{`${fieldsprops.showname}`}:{showvalue}{`${lodashget(fieldsprops,'unit','')}`}
								</p>
							);
						}
					})
				}
			  <p>更新时间：{lodashget(curdevice,`realtimedata.datatime`,'未获取')}</p>
			</div>);
}

class App extends React.Component {
  onMenuClick(did){
    console.log(did);
		this.props.dispatch(ui_mycar_selcurdevice(did));
  }
  render() {
    const {gateways,curdevice,devicelist,devices,viewtype} = this.props;
    if(!curdevice){
      return <div />
    }
    // const name = lodashget(curdevice,'name','');
    return (
      <div className="real_time">
        <h2 className="title left_bg">
		  <img src="images/add.png" alt=""/><span>实时监控</span>
          <em>
            <Dropdown  overlay={getMenu({gateways,devicelist,devices,onMenuClick:
							(e)=>{
								this.onMenuClick(e.key)
							}
						})} placement="bottomLeft">
              <Button style={{ marginLeft: 8 }}>{gateways[curdevice.gatewayid].name}<Icon type="down" /></Button>
            </Dropdown>
          </em>
        </h2>
				<div className="left_box"><DeviceInfoDetailList curdevice={curdevice} viewtype={viewtype} /></div>
      </div>
    );
  }
}

const mapStateToProps = ({device:{devicelist,devices,viewtype,gateways},userlogin:{usersettings}}) => {
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
    return {curdevice,devicelist,devices,usersettings,viewtype,gateways};
}
export default connect(mapStateToProps)(App);
