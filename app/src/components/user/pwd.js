import React from 'react';
import { connect } from 'react-redux';
import Pro1 from "../../img/pro1.png";
import Close from "../../img/close.png";
import Point1 from "../../img/25.png";
import "./style.css";
import {set_uiapp} from '../../actions';

class App extends React.Component {

	  constructor(props) {  
        super(props);  
        this.state = {};
    }
		onClickClosePwd = ()=>{
			this.props.dispatch(set_uiapp({ispoppwd:false}));
		}
  	render() {
	    return (
	      	<div className="changepwd">
	      		<div className="wamp"></div>
	      		<div className="infocontent">
		        	<div className="tit">修改密码</div>
		        	<div className="list">
						<div><span>旧密码：</span><input name="oldpwd"  /></div>
						<div><span>新密码：</span><input name="newpwd" /></div>
						<div><span>再次确认：</span><input name="confirmpwd"/></div>
		        	</div>
		        	<div className="btn"><span>确认修改</span></div>
		        	<div onClick={this.onClickClosePwd} className="closediv"><img className="close" src={Close} /></div>
	        	</div>
	      	</div>
	    );
  	}
}

export default connect()(App);
