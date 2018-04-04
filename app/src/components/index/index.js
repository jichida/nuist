import React from 'react';
import { connect } from 'react-redux';
import Footer from "../footer";
import Header from "../header/main";
// import Header2 from "../header/page";
// import Mainmap from "../../img/mapbg.png";
// import Data1 from "../../img/14.png";
// import Data2 from "../../img/15.png";
// import Data3 from "../../img/16.png";
// import Data4 from "../../img/17.png";
// import Data5 from "../../img/18.png";
// import Data6 from "../../img/19.png";
import City from "../../img/20.png";
import Point from "../../img/21.png";

import Collection from "../user/collection.js";
import Changepwd from "../user/pwd.js";
import Usercenter from "../user/center.js";
import PopcareSel from "../popcaresel";

import lodashget from 'lodash.get';
import lodashmap from 'lodash.map';

import "./index.css";
import {
	set_uiapp,
	ui_mycar_selcurdevice,
	ui_notifyresizeformap,
	ui_setmapstyle
} from '../../actions';
import {getCoureName} from '../../util';

const BottomBannerData = (props)=>{
	const {curdevice,devicetype} = props;
	const curdevicetype = devicetype[curdevice.devicetype];
	if(!curdevicetype){
		return (<div>无法获取节点类型</div>);
	}
	const {fields,fieldslist_brief} = curdevicetype;
	if(!fields){
		return (<div>无法获取节点类型的字段属性</div>);
	}
	return (
		<ul>
			{
				lodashmap(fieldslist_brief,(fieldname)=>{
					const fieldsprops = fields[fieldname];
					if(!!fieldsprops){
						if(fieldname === 'winddirection'){
							return (
								<li key={fieldname}>
									<img alt="" src={`${fieldsprops.iconurl}`} />
									<span>{`${fieldsprops.showname}`}</span>
									<span>{getCoureName(lodashget(curdevice,`realtimedata.${fieldname}`))}风</span>
								</li>)
						}

						return (
							<li key={fieldname}>
								<img alt="" src={`${fieldsprops.iconurl}`} />
								<span>{`${fieldsprops.showname}`}</span>
								<span>{lodashget(curdevice,`realtimedata.${fieldname}`)}
									{`${lodashget(fieldsprops,'unit','')}`}
								</span>
							</li>
						)
					}
				})
			}
	</ul>);
}


class App extends React.Component {

	// constructor(props) {
  //       super(props);
  //   }

		componentDidMount(){
			const setmapstyle = (delay)=>{
				// window.setTimeout(()=>{
					this.props.dispatch(ui_notifyresizeformap({
						divid:'mapidplaceholder',
						delay
					}));
				// },0);
			}

			setmapstyle(0);

			window.addEventListener('resize', ()=>{
				setmapstyle(50);
			});
		}

		componentWillUnmount() {
			const {mapstyle} = this.props;
			const mapstylenew = {...mapstyle,display:'none'};

			this.props.dispatch(ui_setmapstyle(mapstylenew));
			window.removeEventListener('resize',()=>{
			});
		}
		onClickUserlnk = ()=>{
			const {loginsuccess} = this.props;
			if(!loginsuccess){
				this.props.history.push(`/login`);
			}
			else{
				this.props.dispatch(set_uiapp({ispopuserinfo:true}));
			}

		}
		onClickPopCareSel = ()=>{
			this.props.dispatch(set_uiapp({ispopcaresel_single_index:true}));
		}
		onChangeCaresel = (value)=>{

			const {devices} = this.props;
			if(!!devices[value]){
				this.props.dispatch(ui_mycar_selcurdevice(value));
			}

		}
  	render() {
			const {ispopuserinfo,ispoppwd,ispopcare,ispopcaresel_single_index,curdevice,usersettings,devicetype} = this.props;
			const indexdeviceid = lodashget(usersettings,'indexdeviceid','');
	    return (
	      	<div
	      		className="indexPage"
	      		style={{height: `${window.innerHeight-64}px`}}
	      		>
	        	<Header history={this.props.history} onClickUserlnk={this.onClickUserlnk}/>
						<div id='mapidplaceholder' style={{
							zIndex: 0,
							position: `absolute`,
							height:`${window.innerHeight-64-80}px`,
							width:`${window.innerWidth}px`,
							top:`80px`,
							}}/>

						{
							!!curdevice && (
								<div className="mainmap" style={{height: `${window.innerHeight-64}px`}}>
			        		<div onClick={this.onClickPopCareSel} className="mapcanver city"><img alt="" src={City} /><span>{lodashget(curdevice,'name')}</span></div>
			        		<div onClick={this.onClickPopCareSel} className="mapcanver point"><img alt="" src={Point} /><span>{lodashget(curdevice,'locationname')}</span></div>
			        		<div className="maindata">
											<BottomBannerData curdevice={curdevice} devicetype={devicetype} />
			        		</div>
			        	</div>
							)
						}
	        	{ispopuserinfo  && <Usercenter /> }
						{ispoppwd && <Changepwd />}
						{ispopcare && <Collection />}
						{ispopcaresel_single_index && <PopcareSel value={indexdeviceid} onChange={this.onChangeCaresel}/>}

	        	<Footer history={this.props.history} sel={"index"} />
	      	</div>
	    );
  	}
}

const mapStateToProps = ({app:{ispopuserinfo,ispoppwd,ispopcare,ispopcaresel_single_index,mapstyle},
	device:{devicelist,devices,devicetype},
	userlogin:{usersettings,loginsuccess}}) => {
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
    return {ispopuserinfo,ispoppwd,ispopcare,ispopcaresel_single_index,curdevice,loginsuccess,devices,usersettings,mapstyle,devicetype};
}
export default connect(mapStateToProps)(App);
