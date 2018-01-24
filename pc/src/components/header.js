import React from 'react';
import "../css/header.css";
import Headimg from "../img/1.jpg";

class App extends React.Component {
  render() {
    return (
      <div className="header">
      	 <div className="head">
			<img src={Headimg} />
      	 </div>
      	 <div className="headnav">
      	 	<div className="nav">
				<span className="sel">大坝首页</span>
				<span>部署展示</span>
				<span>实时数据</span>
				<span>数据预警</span>
				<span>预警参数管理</span>
				<span>后台管理</span>
			</div>
      	 </div>
      </div>
    );
  }
}

export default App;
