import React from 'react';
import { connect } from 'react-redux';
import Footer from "../footer";
import Header from "../header/main";
// import Header2 from "../header/page";
// import Mainmap from "../../img/mapbg.png";
import Data1 from "../../img/14.png";
import Data2 from "../../img/15.png";
import Data3 from "../../img/16.png";
import Data4 from "../../img/17.png";
import Data5 from "../../img/18.png";
import Data6 from "../../img/19.png";
import City from "../../img/20.png";
import Point from "../../img/21.png";

import Collection from "../user/collection.js";
import Changepwd from "../user/pwd.js";
import Usercenter from "../user/center.js";
import PopcareSel from "../popcaresel";
import Map from '../map';
import lodashget from 'lodash.get';


import "./index.css";
import {
	set_uiapp,
	saveusersettings_request
} from '../../actions';
import {getCoureName} from '../../util';

let resizetimecontent;


class App extends React.Component {

	constructor(props) {
        super(props);
        this.state = {
          innerHeight : window.innerHeight,
          innerWidth : window.innerWidth
        };
    }

	componentDidMount() {
        window.addEventListener('resize', this.onWindowResize);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.onWindowResize);
    }

    onWindowResize=()=> {
        window.clearTimeout(resizetimecontent);
        resizetimecontent = window.setTimeout(()=>{
            this.setState({
                innerHeight: window.innerHeight,
                innerWidth : window.innerWidth
            });
        },10)
    }
		onClickUserlnk = ()=>{
			this.props.dispatch(set_uiapp({ispopuserinfo:true}));
		}
		onClickPopCareSel = ()=>{
			this.props.dispatch(set_uiapp({ispopcaresel_single_index:true}));
		}
		onChangeCaresel = (value)=>{
			let usersettings = this.props.usersettings;
			usersettings.indexdeviceid = value;
			this.props.dispatch(saveusersettings_request(usersettings));
		}
  	render() {
			const {ispopuserinfo,ispoppwd,ispopcare,ispopcaresel_single_index,curdevice,usersettings} = this.props;
			const indexdeviceid = lodashget(usersettings,'indexdeviceid','');
			const mapheight =  window.innerHeight - 80 - 64;
	    return (
	      	<div
	      		className="indexPage"
	      		style={{height: `${this.state.innerHeight-64}px`}}
	      		>
	        	<Header history={this.props.history} onClickUserlnk={this.onClickUserlnk}/>
						{
							!!curdevice && (
								<div className="mainmap">
			        		<div style={{width: '100%',height:`${mapheight}px`}} ><Map curdevice={curdevice}/></div>
			        		<div onClick={this.onClickPopCareSel} className="mapcanver city"><img alt="" src={City} /><span>{lodashget(curdevice,'name')}</span></div>
			        		<div onClick={this.onClickPopCareSel} className="mapcanver point"><img alt="" src={Point} /><span>{lodashget(curdevice,'locationname')}</span></div>
			        		<div className="maindata">
								<ul>
									<li><img alt="" src={Data1} /><span>风向</span>
									<span>{getCoureName(lodashget(curdevice,'realtimedata.winddirection'))}风</span>
									</li>
									<li><img alt="" src={Data2} /><span>风力</span><span>{lodashget(curdevice,'realtimedata.windspeed')}级</span></li>
									<li><img alt="" src={Data3} /><span>温度</span><span>{lodashget(curdevice,'realtimedata.temperature')}℃</span></li>
									<li><img alt="" src={Data4} /><span>湿度</span><span>{lodashget(curdevice,'realtimedata.humidity')}%</span></li>
									<li><img alt="" src={Data5} /><span>大气压</span><span>{lodashget(curdevice,'realtimedata.pressure')}Pa</span></li>
									<li><img alt="" src={Data6} /><span>雨量</span><span>{lodashget(curdevice,'realtimedata.rainfall')}mm</span></li>
								</ul>
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

const mapStateToProps = ({app:{ispopuserinfo,ispoppwd,ispopcare,ispopcaresel_single_index},device:{devicelist,devices},userlogin:{usersettings}}) => {
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
    return {ispopuserinfo,ispoppwd,ispopcare,ispopcaresel_single_index,curdevice};
}
export default connect(mapStateToProps)(App);
