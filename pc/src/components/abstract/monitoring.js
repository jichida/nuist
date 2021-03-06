import React from 'react';
import { connect } from 'react-redux';
import lodashincludes from 'lodash.includes';
// import Dropdown from 'antd/lib/dropdown';
// import Button from 'antd/lib/button';
// import Icon from 'antd/lib/icon';
import {
	ui_mycar_selcurdevice
} from '../../actions';
import 'antd/dist/antd.css';
import SelDropGateway from '../abstract/seldropgateway';
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
							if(typeof showvalue === 'number'){
								showvalue = showvalue.toFixed(2);
							}
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
    const {curdevice,viewtype} = this.props;
    if(!curdevice || !viewtype){
			//debugger;
      return <div />
    }
    // const name = lodashget(curdevice,'name','');
    return (
      <div className="real_time">
        <h2 className="title left_bg">
		  <img src="images/add.png" alt=""/><span>实时监控</span>
          <SelDropGateway />
        </h2>
				<div className="left_box"><DeviceInfoDetailList curdevice={curdevice} viewtype={viewtype} /></div>
      </div>
    );
  }
}

const mapStateToProps = ({device:{devicelist,devices,viewtypes,allowviewtypeids,gateways},userlogin:{usersettings}}) => {
		let curdevice;
		let curdeviceid = lodashget(usersettings,'indexdeviceid');
		if(!!curdeviceid){
			curdevice = devices[curdeviceid];
		}
		if(!curdevice){
			for(let i = 0 ;i < devicelist.length ;i++){
				if(lodashincludes(allowviewtypeids,devicelist[i].viewtype)){
					curdevice = devices[devicelist[i]];
					break;
				}
			}
		}
		let viewtype = {};
		if(!!curdevice){
			viewtype = viewtypes[curdevice.viewtype];
		}
    return {curdevice,devicelist,devices,usersettings,viewtype,gateways};
}
export default connect(mapStateToProps)(App);
