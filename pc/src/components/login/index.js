import React from 'react';
import "./index.css";
import Header from "../header";
import Footer from "../footer";
import Wdimg from "../../img/3.jpg";
import Userimg from "../../img/2.jpg";

class App extends React.Component {
    render() {
        return (<div>
            <div className="login_bg"><img src="images/dl1.jpg" /></div>
            <div className="xsqbt"><img src="images/dl1.png" /></div>
            <div className="login_m">
               <div className="login_boder">
                    <div className="login_padding">
                         <h2>用户名</h2>
                         <label>
                         <input type="text" id="username" className="txt_input txt_input2" placeholder="请输入您的账号" />
                         </label>
                         <h2>密码</h2>
                        <label>
                        <input type="password" name="textfield2" id="userpwd" className="txt_input" placeholder="请输入您的 密码" />
                        </label>
                      <p className="forgot"><a href="javascript:void(0);">忘记密码?</a></p>
                <div className="rem_sub">
                   <a href="#">登录</a>
                </div>
            </div>
            </div>
            </div></div>
    );
    }
}

export default App;
