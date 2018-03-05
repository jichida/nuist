import React from 'react';
import { Link } from "react-router-dom";

import "./style.css";
import Headimg from "../../img/1.jpg";
let resizetimecontent = null;

class App extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
          innerWidth: window.innerWidth,
          innerHeight: window.innerHeight
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
              innerWidth: window.innerWidth,
              innerHeight: window.innerHeight
          });
      }, 10)
  }
  render() {
    return (
      <div className="header">
      	 <div className="head" style={{width:"100%", overflow : "hidden"}}>
			     <img src={Headimg} />
      	 </div>
      	 <div className="headnav">
      	 	<div className="nav">
				<span className="sel"><Link to='/'>大坝首页</Link></span>
				<span><Link to='/deployment'>部署展示</Link></span>
				<span><Link to='/realtime'>实时数据</Link></span>
                <span><Link to='/video'>视频监控</Link></span>
				<span><Link to='/forecast'>数据预警</Link></span>
				<span>预警参数管理</span>
				<span><Link to='/adminlogin'>后台管理</Link></span>
			</div>
      	 </div>
      </div>
    );
  }
}

export default App;
