import React from 'react';
import { connect } from 'react-redux';
import "./index.css";
import Header from "../header";
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
    const setmapstyle = ()=>{
      window.setTimeout(()=>{
        this.props.dispatch(ui_notifyresizeformap('mapidplaceholder'));
      },0);
    }

    setmapstyle();

    window.addEventListener('resize', ()=>{
      setmapstyle();
    });
  }

  componentWillUnmount() {
      this.props.dispatch(ui_setmapstyle({
        display:'none'
      }));
      window.removeEventListener('resize',()=>{

      });
  }
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
					<div id='mapidplaceholder' style={{height:'300px',width:'550px'}}/>
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
