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

import "./index.css";
import {set_uiapp} from '../../actions';

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
  	render() {
			const {ispopuserinfo} = this.props;
	    return (
	      	<div
	      		className="indexPage"
	      		style={{height: `${this.state.innerHeight-64}px`}}
	      		>
	        	<Header history={this.props.history} onClickUserlnk={this.onClickUserlnk}/>
	        	<div className="mainmap">
	        		<img src={Mainmap} />
	        		<div className="mapcanver city"><img src={City} /><span>南京</span></div>
	        		<div className="mapcanver point"><img src={Point} /><span>金润广场</span></div>
	        		<div className="maindata">
						<ul>
							<li><img src={Data1} /><span>风向</span><span>偏东风</span></li>
							<li><img src={Data2} /><span>风力</span><span>3级</span></li>
							<li><img src={Data3} /><span>温度</span><span>28℃</span></li>
							<li><img src={Data4} /><span>湿度</span><span>32%</span></li>
							<li><img src={Data5} /><span>大气压</span><span>1002Pa</span></li>
							<li><img src={Data6} /><span>雨量</span><span>28mm</span></li>
						</ul>
	        		</div>
	        	</div>
	        	{ispopuserinfo  && <Usercenter /> }
	        	<Footer history={this.props.history} sel={"index"} />
	      	</div>
	    );
  	}
}

const mapStateToProps = ({app:{ispopuserinfo,}}) => {
    return {ispopuserinfo};
}
export default connect(mapStateToProps)(App);
