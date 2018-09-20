import React from "react";
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
// import Investigation from "./investigation";
import Monitoring from "./monitoring";
import Login from "../index/login.js";
import moment from 'moment';
class App extends React.Component {
  render() {
    const _dayTxtList = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
    return (
      	<div className="left_con huadong">
            <div className="weather">
                <img src="images/tianqi.png" alt=""/>
                <span>阴 25℃～28℃ <br />今天({_dayTxtList[moment().day()]}) </span>
            </div>
            <div className="real_time">
                <h2 className="title left_bg"><img src="images/add.png" alt=""/><span>账号密码登录</span></h2>
                <Login />

            </div>
            <Monitoring />

        </div>
    )
  }
}

const APP2 =  withRouter(App);
const mapStateToProps = ({app:{selectedindex}}) => {
    return {selectedindex};
}
export default connect(mapStateToProps)(APP2);
//
// <div className="real_time">
//     <h2 className="title"><img src="images/add.png" alt=""/><span>实时监控</span><em>盘城新居</em></h2>
//     <div className="left_bg">
//         <p>温度:24℃ </p>
//         <p> 雨量:531mm</p>
//         <p>风向:正西 </p>
//         <p>湿度:38%</p>
//         <p>风力:7级 </p>
//         <p>气压:69Pa</p>
//         <p>更新时间：2018-01-13T<br />14:58:02</p>
//     </div>
// </div>
// <div className="real_time">
//     <h2 className="title"><img src="images/add.png" alt=""/><span>在线调查</span></h2>
//     <div className="left_bg">
//         <div className="label_check">
//             <label><input type="radio" name="radio1" className="weui-check" checked="checked" />A 很棒</label>
//             <label><input type="radio" name="radio1" className="weui-check" checked="checked" />A 一般</label>
//             <label><input type="radio" name="radio1" className="weui-check" checked="checked" />A 中等</label>
//             <label><input type="radio" name="radio1" className="weui-check" checked="checked" />A 差</label>
//         </div>
//     </div>
// </div>
