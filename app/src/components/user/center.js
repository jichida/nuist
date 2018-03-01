import React from 'react';
import Pro1 from "../../img/pro1.png";
import Close from "../../img/close.png";
import Point1 from "../../img/25.png";
import "./style.css";

class App extends React.Component {

	constructor(props) {  
        super(props);  
        this.state = {};
    }

  	render() {
	    return (
	      	<div className="usercenter">
	      		<div className="wamp"></div>
	      		<div className="infocontent">
		        	<div className="tit">用户中心</div>
		        	<div className="list">
						<div>修改密码</div>
						<div>关注设置</div>
						<div>退出登录</div>
		        	</div>
		        	<div className="closediv"><img className="close" src={Close} /></div>
	        	</div>
	      	</div>
	    );
  	}
}

export default App;
