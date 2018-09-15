import React from 'react';
import { connect } from 'react-redux';
// import Pro1 from "../../img/pro1.png";
import Close from "../../img/close.png";
// import Point1 from "../../img/25.png";
import {
	logout_request,
	set_uiapp,
} from '../../actions';
import "./style.css";

class App extends React.Component {

	constructor(props) {  
        super(props);  
        this.state = {};
    }
		onClickCloseUser = ()=>{
			this.props.dispatch(set_uiapp({ispopuserinfo:false}));
		}
		onClickPwd = ()=>{
			this.props.dispatch(set_uiapp({ispopuserinfo:false,ispoppwd:true}));
		}
		onClickCare = ()=>{
			this.props.dispatch(set_uiapp({ispopuserinfo:false,ispopcare:true}));
		}
		onClickLogout = ()=>{
			this.props.dispatch(set_uiapp({ispopuserinfo:false}));
			this.props.dispatch(logout_request({}));
		}
  	render() {
	    return (
	      	<div className="usercenter">
	      		<div className="wamp"></div>
	      		<div className="infocontent">
		        	<div className="tit">用户中心</div>
		        	<div className="list">
							<div onClick={this.onClickPwd}>修改密码</div>
							<div onClick={this.onClickLogout}>退出登录</div>
			       </div>
		        	<div onClick={this.onClickCloseUser} className="closediv">
								<img alt="" className="close" src={Close} />
							</div>
	        	</div>
	      	</div>
	    );
  	}
}

export default connect()(App);
