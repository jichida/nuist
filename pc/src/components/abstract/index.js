import React from "react";
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Investigation from "./investigation";
import Monitoring from "./monitoring";

class App extends React.Component {
  render() {
    return (
      	<div className="left_con huadong">
            <div className="weather">
                <img src="images/tianqi.png" alt=""/>
                <span>晴天 25℃～28℃ <br />今天(周一) </span>
            </div>
            <div className="real_time">
                <h2 className="title left_bg"><img src="images/add.png" alt=""/><span>账号密码登录</span></h2>
                <div className="left_box">
                    <div className="login_box">
                        <label><span>账号</span><input type="text" name="" className="login_input" placeholder="输入账号" /></label>
                        <label><span>密码</span><input type="text" name="" className="login_input" placeholder="输入密码" /></label>
                    </div>
                    <span className="btn_button">立即登录</span>
                </div>
            </div>
            <Monitoring />
            <Investigation />

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
