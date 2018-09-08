import React from 'react';
import { connect } from 'react-redux';
// import "./index.css";
import Header from "../header";
import AbstractBar from "../abstract";
import HistoryDataBar from "../history_data";
import ChartsHistory from '../history/charts_history_container.js';
// import Login from "./login.js";
// import Weather from "./weather";
// import Swiper from "./swiper";
//
// // import Monitoring from "./monitoring";
// // import Investigation from "./investigation";
// import DataChart from './datachart';
// import ProductList from './prolist';
// import Footer from "../footer";
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
        <div className="w_1220">
          <AbstractBar />

          <div className="center_con">
            <div className="map_con border">
              <div id='mapidplaceholder' style={{height:'400px'}}/>
            </div>
            <div className="bor_con con_height">
                <h2 className="title">
                  <img src="images/lssj.png" alt=""/>
                  <span>历史数据</span>
                  <div className="title_tab">
                    <span className="active">温度</span>
                    <span>湿度</span>
                    <span>气压</span>
                    <span>雨量</span>
                    <span>风力</span>
                  </div>
                </h2>
                <div className="curve_box">
                  <ChartsHistory />
                </div>
            </div>
          </div>

          <HistoryDataBar />
        </div>
        {ispoppwd && loginsuccess && <Changepwd />}
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
