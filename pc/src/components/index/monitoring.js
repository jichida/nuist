import React from 'react';
import { connect } from 'react-redux';
import Dropdown from 'antd/lib/dropdown';
import Button from 'antd/lib/button';
import Icon from 'antd/lib/icon';
import {
	saveusersettings_request
} from '../../actions';
/*
问题：
如果我引入import 'antd/dist/antd.css';则菜单显示正常，但会影响全局的css
如果我引入单个组件对应的css，则弹框不正常
如何才能解决这个问题？

我如何才能找到缺失的css，而不引入无关的css?
*/
import 'antd/dist/antd.css';
// import 'antd/lib/menu/style';
// import 'antd/lib/dropdown/style';
// import 'antd/lib/button/style';
// import 'antd/lib/icon/style';

import getMenu from './dropdownselmenu';
import "./monitoring.css";
import lodashget from 'lodash.get';
import {getCoureName} from '../../util';

class App extends React.Component {
  onMenuClick(did){
    console.log(did);
		const usersettings = this.props.usersettings;
		usersettings.indexdeviceid = did;
		this.props.dispatch(saveusersettings_request(usersettings));
  }
  render() {
    const {curdevice,devicelist,devices} = this.props;
    if(!curdevice){
      return <div />
    }
    const name = lodashget(curdevice,'name','');
    const updated_at = lodashget(curdevice,'updated_at','');
    const degree_point = lodashget(curdevice,'realtimedata.winddirection',0);//指针 win2
    const windspeed = lodashget(curdevice,'realtimedata.windspeed',0);
    const temperature = lodashget(curdevice,'realtimedata.temperature',0);
    const rainfall = lodashget(curdevice,'realtimedata.rainfall',0);
    const humidity = lodashget(curdevice,'realtimedata.humidity',0);
    const pressure = lodashget(curdevice,'realtimedata.pressure',0);
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
        <div className="monitoringli">
           <p>温度:{temperature}℃</p>
           <p>湿度:{humidity}%</p>
           <p>大气压:{pressure}Pa</p>
           <p>雨量:{rainfall}mm</p>
           <p>风力:{windspeed}级</p>
           <p>风向:{getCoureName(degree_point)}</p>
           <p>更新时间：{updated_at}</p>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({device:{devicelist,devices},userlogin:{usersettings}}) => {
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
    return {curdevice,devicelist,devices,usersettings};
}
export default connect(mapStateToProps)(App);
