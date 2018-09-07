import React from 'react';
import { connect } from 'react-redux';
// import "./index.css";
import Header from "../header";
import AbstractBar from "../abstract";
import HistoryDataBar from "../history_data";
import Login from "./login.js";
import Weather from "./weather";
import Swiper from "./swiper";

import Monitoring from "./monitoring";
import Investigation from "./investigation";
import DataChart from './datachart';
import ProductList from './prolist';
import Footer from "../footer";
import Changepwd from "./pwd.js";

import {
  ui_notifyresizeformap,
  ui_setmapstyle
} from '../../actions';

class App extends React.Component {
  componentDidMount(){
    const setmapstyle = (delay)=>{
      // window.setTimeout(()=>{
        this.props.dispatch(ui_notifyresizeformap({
          divid:'mapidplaceholder',
          delay
        }));
      // },0);
    }

    setmapstyle(0);

    window.addEventListener('resize', ()=>{
      setmapstyle(50);
    });
  }

  componentWillUnmount() {
    const {mapstyle} = this.props;
    const mapstylenew = {...mapstyle,display:'none'};

    this.props.dispatch(ui_setmapstyle(mapstylenew));
    window.removeEventListener('resize',()=>{
    });
  }
  render() {
    const {ispoppwd,loginsuccess} = this.props;
    return (
      <div className="index-page root-page">
        <Header />
        <div className="dashboard">
          <AbstractBar />
          <main></main>
          <HistoryDataBar />
        </div>
      </div>
    //   <div className="indexPage">
    //     <Header />
    //     <div className="content">
    //     	<div className="indextit">欢迎访问大坝智能监控系统</div>
    //     	<div className="cont">
		// 		<div className="left">
		// 			<Login />
		// 			<Weather />
		// 		</div>
		// 		<div className="center">
		// 			<Swiper />
		// 			<div id='mapidplaceholder' style={{height:'300px',width:'550px'}}/>
		// 		</div>
		// 		<div className="right">
		// 			<Monitoring />
		// 			<Investigation />
		// 		</div>
		// 	</div>
		// 	<DataChart />
		// 	<ProductList />
    //     </div>
    //     {ispoppwd && loginsuccess && <Changepwd />}
    //     <Footer />
    // </div>
    );
  }
}

const mapStateToProps = ({app:{ispoppwd,mapstyle},
	userlogin:{loginsuccess}}) => {
    return {ispoppwd,loginsuccess,mapstyle};
}
export default connect(mapStateToProps)(App);
