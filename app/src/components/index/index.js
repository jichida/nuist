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
// import lodashmap from 'lodash.map';
import {ui_selgateway,ui_seldropdowndevice} from '../../actions';

import "./index.css";
import {
	set_uiapp,
	// ui_mycar_selcurdevice,
	ui_notifyresizeformap,
	ui_setmapstyle
} from '../../actions';
// import {getCoureName} from '../../util';
//
// const BottomBannerData = (props)=>{
// 	const {curdevice,viewtype} = props;
// 	if(!viewtype){
// 		return (<div>无法获取节点类型</div>);
// 	}
// 	const {fields,fieldslist_brief} = viewtype;
// 	if(!fields){
// 		return (<div>无法获取节点类型的字段属性</div>);
// 	}
// 	return (
// 		<ul>
// 			{
// 				lodashmap(fieldslist_brief,(fieldname)=>{
// 					const fieldsprops = fields[fieldname];
// 					if(!!fieldsprops){
// 						let showvalue = lodashget(curdevice,`realtimedata.${fieldname}`);
// 						if(fieldname === 'winddirection'){
// 							showvalue = getCoureName(lodashget(curdevice,`realtimedata.${fieldname}`));
// 						}
//
// 						return (
// 							<li key={fieldname}>
// 								<img alt="" src={`${fieldsprops.iconurl}`} />
// 								<span>{`${fieldsprops.showname}`}</span>
// 								<span>{showvalue}
// 									{`${lodashget(fieldsprops,'unit','')}`}
// 								</span>
// 							</li>
// 						)
// 					}
// 				})
// 			}
// 	</ul>);
// }


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
		onClickPopCareSelGateway = ()=>{
			this.props.dispatch(set_uiapp({ispopcaresel_single_index_gateway:true}));
		}
		onClickPopCareSelDevice = ()=>{
			this.props.dispatch(set_uiapp({ispopcaresel_single_index_device:true}));
		}
		onChangeCareselGateway = (value)=>{
			console.log(`onChangeCareselGateway->${value}`);
			this.props.dispatch(ui_selgateway({value,type:'historychart'}));
		}
		onChangeCareselDevice = (value)=>{
			console.log(`onChangeCareselDevice->${value}`);
			this.props.dispatch(ui_seldropdowndevice({value,type:'historychart'}));
		}
  	render() {
			const {ispopuserinfo,ispoppwd,ispopcare,
				ispopcaresel_single_index_gateway,ispopcaresel_single_index_device,
				curdevice,curgateway,usersettings} = this.props;
			const indexdeviceid = lodashget(usersettings,'indexdeviceid','');
			const indexgatewayid = lodashget(usersettings,'indexgatewayid','');
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
			        		<div onClick={this.onClickPopCareSelGateway} className="mapcanver city"><img alt="" src={City} />
										<span>{lodashget(curgateway,'name')}</span>
								</div>
			        		<div onClick={this.onClickPopCareSelDevice} className="mapcanver point"><img alt="" src={Point} />
										<span>{lodashget(curdevice,'name')}</span>
									</div>
			        		{/* <div className="maindata">
											<BottomBannerData curdevice={curdevice} viewtype={viewtype} />
			        		</div> */}
			        	</div>
							)
						}
	        	{ispopuserinfo  && <Usercenter /> }
						{ispoppwd && <Changepwd />}
						{ispopcare && <Collection />}
						{ispopcaresel_single_index_gateway  && <PopcareSel value={indexgatewayid} isgateway={true} onChange={this.onChangeCareselGateway}/>}
						{ispopcaresel_single_index_device  && <PopcareSel value={indexdeviceid} isgateway={false} onChange={this.onChangeCareselDevice}/>}

	        	<Footer history={this.props.history} sel={"index"} />
	      	</div>
	    );
  	}
}

const mapStateToProps = ({app:{ispopuserinfo,ispoppwd,ispopcare,
	ispopcaresel_single_index_gateway,ispopcaresel_single_index_device,
	mapstyle},
	device:{devicelist,devices,viewtype,gateways},
	userlogin:{usersettings,loginsuccess}}) => {

		let curgateway,curdevice;
		let indexgatewayid = lodashget(usersettings,'indexgatewayid');
		let curdeviceid = lodashget(usersettings,'indexdeviceid');
		if(!curgateway){
			curgateway = gateways[indexgatewayid];
		}
		if(!!curdeviceid){
			curdevice = devices[curdeviceid];
		}
		if(!curdevice){
			if(devicelist.length > 0){
				curdevice = devices[devicelist[0]];
			}
		}
    return {ispopuserinfo,curgateway,ispoppwd,ispopcare,
			ispopcaresel_single_index_gateway,ispopcaresel_single_index_device,
			curdevice,loginsuccess,devices,usersettings,mapstyle,viewtype};
}
export default connect(mapStateToProps)(App);
