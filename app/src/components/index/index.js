import React from 'react';
import { connect } from 'react-redux';
import Footer from "../footer";
import Header from "../header/main";
import Header2 from "../header/page";
import Mainmap from "../../img/mapbg.png";
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
import lodashget from 'lodash.get';

import "./index.css";
import {set_uiapp} from '../../actions';

let resizetimecontent;
const getCoureName = (course)=> {
    var name = "";
    if(typeof course === 'string'){
      course = parseFloat(course);
    }

    if ((course >= 0 && course < 22.5) || (course >= 337.5 && course < 360)) // 0
    {
        name = "正北";
    }
    else if (course >= 22.5 && course < 67.5) // 45
    {
        name = "东北";
    }
    else if (course >= 67.5 && course < 112.5) // 90
    {
        name = "正东";
    }
    else if (course >= 112.5 && course < 157.5) //135
    {
        name = "东南";
    }
    else if (course >= 157.5 && course < 202.5) //180
    {
        name = "正南";
    }
    else if (course >= 202.5 && course < 247.5) //225
    {
        name = "西南";
    }
    else if (course >= 247.5 && course < 292.5) //270
    {
        name = "正西";
    }
    else if (course >= 292.5 && course < 337.5) //315
    {
        name = "西北";
    }
    else {
        name = "未知.";
    }
    return name;
}

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
  	render() {
			const {ispopuserinfo,ispoppwd,ispopcare,curdevice} = this.props;
	    return (
	      	<div
	      		className="indexPage"
	      		style={{height: `${this.state.innerHeight-64}px`}}
	      		>
	        	<Header history={this.props.history} onClickUserlnk={this.onClickUserlnk}/>
						{
							!!curdevice && (
								<div className="mainmap">
			        		<img src={Mainmap} />
			        		<div className="mapcanver city"><img src={City} /><span>{lodashget(curdevice,'name')}</span></div>
			        		<div className="mapcanver point"><img src={Point} /><span>{lodashget(curdevice,'locationname')}</span></div>
			        		<div className="maindata">
								<ul>
									<li><img src={Data1} /><span>风向</span><span>{getCoureName(lodashget(curdevice,'realtimedata.winddirection'))}风</span></li>
									<li><img src={Data2} /><span>风力</span><span>{lodashget(curdevice,'realtimedata.windspeed')}级</span></li>
									<li><img src={Data3} /><span>温度</span><span>{lodashget(curdevice,'realtimedata.temperature')}℃</span></li>
									<li><img src={Data4} /><span>湿度</span><span>{lodashget(curdevice,'realtimedata.humidity')}%</span></li>
									<li><img src={Data5} /><span>大气压</span><span>{lodashget(curdevice,'realtimedata.pressure')}Pa</span></li>
									<li><img src={Data6} /><span>雨量</span><span>{lodashget(curdevice,'realtimedata.rainfall')}mm</span></li>
								</ul>
			        		</div>
			        	</div>
							)
						}

	        	{ispopuserinfo  && <Usercenter /> }
						{ispoppwd && <Changepwd />}
						{ispopcare && <Collection />}
	        	<Footer history={this.props.history} sel={"index"} />
	      	</div>
	    );
  	}
}

const mapStateToProps = ({app:{ispopuserinfo,ispoppwd,ispopcare},device:{devicelist,devices},userlogin:{usersettings}}) => {
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
    return {ispopuserinfo,ispoppwd,ispopcare,curdevice};
}
export default connect(mapStateToProps)(App);
