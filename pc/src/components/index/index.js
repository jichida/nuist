import React from 'react';
import "./index.css";
import Header from "../header";
import Login from "../login";
import Weather from "./weather";
import Swiper from "./swiper";
import Mapindex from "./map";
import Monitoring from "./monitoring";
import Investigation from "./investigation";
import Chartdemo from "../../img/z3.png";
import Pro1 from "../../img/z4.png";
import Footer from "../footer";

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
			<div className="datachart">
				<ul>
					<li>
						<div className="tt">温度曲线分析</div>
						<div className="chart"><img src={Chartdemo} /></div>
					</li>
					<li>
						<div className="tt">温度曲线分析</div>
						<div className="chart"><img src={Chartdemo} /></div>
					</li>
					<li>
						<div className="tt">温度曲线分析</div>
						<div className="chart"><img src={Chartdemo} /></div>
					</li>
					<li>
						<div className="tt">温度曲线分析</div>
						<div className="chart"><img src={Chartdemo} /></div>
					</li>
				</ul>
			</div>
			<div className="prolist">
				<ul>
					<li>
						<div className="l">
							<div className="pro"><img src={Pro1} /></div>
							<div className="tt">温度曲线分析</div>
						</div>
					</li>
					<li>
						<div className="l">
							<div className="pro"><img src={Pro1} /></div>
							<div className="tt">温度曲线分析</div>
						</div>
					</li>
					<li>
						<div className="l">
							<div className="pro"><img src={Pro1} /></div>
							<div className="tt">温度曲线分析</div>
						</div>
					</li>
					<li>
						<div className="l">
							<div className="pro"><img src={Pro1} /></div>
							<div className="tt">温度曲线分析</div>
						</div>
					</li>
					<li>
						<div className="l">
							<div className="pro"><img src={Pro1} /></div>
							<div className="tt">温度曲线分析</div>
						</div>
					</li>
					<li>
						<div className="l">
							<div className="pro"><img src={Pro1} /></div>
							<div className="tt">温度曲线分析</div>
						</div>
					</li>
				</ul>
			</div>
        </div>
        <Footer />
    </div>
    );
  }
}

export default App;
