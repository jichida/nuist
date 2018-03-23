import React from 'react';
import { connect } from 'react-redux';
import "./index.css";
import Header from "../header";
import Login from "./login.js";
import Weather from "./weather";
import Swiper from "./swiper";
import Mapindex from "./map";
import Monitoring from "./monitoring";
import Investigation from "./investigation";
import DataChart from './datachart';
import ProductList from './prolist';
import Footer from "../footer";
import Changepwd from "./pwd.js";

class App extends React.Component {
  render() {
    const {ispoppwd,loginsuccess} = this.props;
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
			<DataChart />
			<ProductList />
        </div>
        {ispoppwd && loginsuccess && <Changepwd />}
        <Footer />
    </div>
    );
  }
}

const mapStateToProps = ({app:{ispoppwd},
	userlogin:{loginsuccess}}) => {

    return {ispoppwd,loginsuccess};
}
export default connect(mapStateToProps)(App);
