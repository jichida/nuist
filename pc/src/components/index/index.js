import React from 'react';
import { connect } from 'react-redux';
import Header from "../header";
import AbstractBar from "../abstract";
import HistoryDataBar from "../history_data";
import "../../layout/index.css";
// import Login from "./login.js";
// import Weather from "./weather";
// import Swiper from "./swiper";
//
// // import Monitoring from "./monitoring";
// // import Investigation from "./investigation";
// import DataChart from './datachart';
// import ProductList from './prolist';
// import Footer from "../footer";
// import Changepwd from "./pwd.js";

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
          <main>
            <div>
              <div id='mapidplaceholder' style={{width:'100%', height:'300px'}}/>
            </div>
            <div className="history-data-form">
              <h2 className="title">
                <img src="images/lssj.png" alt=""/>
                <span>历史数据</span>
                <div className="title_tab">
                  <span className="active">温度</span>
                  <span>湿度</span>
                  <span>气压</span>
                  <span>雨量</span>
                  <span>温度</span>
                </div>
              </h2>
              <div className="curve_box"><img src="images/img3.png" width="100%" alt=""/></div>
            </div>
          </main>
          <HistoryDataBar />
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({app:{ispoppwd,mapstyle},
	userlogin:{loginsuccess}}) => {
    return {ispoppwd,loginsuccess,mapstyle};
}
export default connect(mapStateToProps)(App);
