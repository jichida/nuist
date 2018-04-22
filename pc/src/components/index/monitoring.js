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
	return (<div className="monitoringli">
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
			  <p>更新时间：{curdevice.updated_at}</p>
			</div>);
}

class App extends React.Component {
  onMenuClick(did){
    console.log(did);
		this.props.dispatch(ui_mycar_selcurdevice(did));
  }
  render() {
    const {curdevice,devicelist,devices,viewtype} = this.props;
    if(!curdevice){
      return <div />
    }
    const name = lodashget(curdevice,'name','');
    return (
      <div className="monitoring_indexPage">
        <div className="tit">
          <span>实时监控</span>
          <span>
            <Dropdown  overlay={getMenu({devicelist,devices,onMenuClick:
							(e)=>{
								this.onMenuClick(e.key)
							}
						})} placement="bottomLeft">
              <Button style={{ marginLeft: 8 }}>{name}<Icon type="down" /></Button>
            </Dropdown>
          </span>
        </div>
				<DeviceInfoDetailList curdevice={curdevice} viewtype={viewtype} />
      </div>
    );
  }
}

const mapStateToProps = ({device:{devicelist,devices,viewtype},userlogin:{usersettings}}) => {
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
    return {curdevice,devicelist,devices,usersettings,viewtype};
}
export default connect(mapStateToProps)(App);
