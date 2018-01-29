
import React from 'react';
import "./style.css";
import LoginBg from "../../img/loginbg.png";
import Img1 from "../../img/1.png";
import Img2 from "../../img/2.png";
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
            });
        },10)
    }

  	render() {
    	return (
      		<div 
      			className="loginPage" 
      			style={{
      				width: "100%",
      				height: `${this.state.innerHeight}px`,
      				overflow: "hidden"
      			}}
      			>
        		<img src={LoginBg} className="loginbg" />
        		<div className="loginForm">
        			<div className="tit">
        				<p className="t">大坝智能监控系统</p>
        				<p className="i">Intelligent monitoring system for dam</p>
        			</div>
					<div className="li">
						<img src={Img1} />
						<input type="text" name="username" placeholder="请输入您的账号" />
					</div>
					<div className="li">
						<img src={Img2} />
						<input type="text" name="username" placeholder="请输入您的密码" />
					</div>
					<div className="butn">
						<button>登录</button>
					</div>
        		</div>
        		<div className="esclnk"><a href="#">退出</a></div>
      		</div>
    	);
  	}
}

export default App;