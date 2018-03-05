import React from 'react';
import "./index.css";
import Header from "../header";
import Footer from "../footer";
import Wdimg from "../../img/3.jpg";
import Userimg from "../../img/2.jpg";

class App extends React.Component {
    render() {
        return (
            <div className="indexPage">
            <Header />
            <div className="content">
            <div className="indextit">欢迎访问大坝智能监控系统</div>
            <div className="cont">
            <div className="login">

            <div className="login_a">管理员登录</div>
            <div className="login_dl">
            <form>
            <div className="lab"><span><img src={Userimg} /></span><input class="lab_input" placeholder="请输入您的账号"/>
            </div>
            <div className="lab"><span><img src={Wdimg} /></span><input class="lab_input" placeholder="请输入您的 密码"/>
            </div>
            </form>
            <a className="login_btn">登录</a>
            </div>

            <div className="login_b"><a>重置</a></div>
        <div className="login_c">您未登录或者登录超时！请重新登录</div>


        </div>
            </div>
            </div>
            <Footer />
            </div>
    );
    }
}

export default App;
