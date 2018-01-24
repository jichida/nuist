import React from 'react';
import "./index.css";
import Header from "../header";
import Login from "../login";
import Weather from "./weather";
import Swiper from "./swiper";
import Mapindex from "./map";
import Monitoring from "./monitoring";
import Investigation from "./investigation";

class App extends React.Component {
  render() {
    return (
      <div className="indexPage">
        <Header />
        <div className="content">
        	<div className="indextit">欢迎访问大坝智能监控系统</div>
        	<div className="cont">
				<div className="left">
					<Login />
					<Weather />
				</div>
				<div className="center">
					<Swiper />
					<Mapindex />
				</div>
				<div className="right">
					<Monitoring />
					<Investigation />
				</div>
			</div>
        </div>
      </div>
    );
  }
}

export default App;
