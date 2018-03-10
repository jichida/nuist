import React from 'react';
import "./index.css";
import Header from "../header";
import Footer from "../footer";
import Upimg from "../../img/jta.png";
import Downimg from "../../img/jtb.png";
import Spimg from "../../img/spimg.jpg";
import Spxqimg from "../../img/spimg1.jpg";
import Jtimg from "../../img/jt.png";

class App extends React.Component {
    render() {
        return (
            <div className="indexPage">
            <Header />
            <div className="content">
            <div className="indextit">欢迎访问大坝智能监控系统</div>
            <div className="cont">
            <div className="left">
            <div className="tit">节点列表</div>
            <dl className="dl_bg">
            <dt>ID</dt>
            <dd><span>位置</span><span>区域<img alt="" src={Jtimg}/></span></dd>
        </dl>
        <div className="h_625 scroll_bar">
            <dl>
            <dt>01</dt>
            <dd><span>基站</span><span>桂阳</span></dd>
        </dl>
        <dl>
        <dt>01</dt>
        <dd><span>基站</span><span>桂阳</span></dd>
        </dl>
        <dl>
        <dt>01</dt>
        <dd><span>基站</span><span>桂阳</span></dd>
        </dl>
        <dl>
        <dt>01</dt>
        <dd><span>基站</span><span>桂阳</span></dd>
        </dl>
        <dl>
        <dt>01</dt>
        <dd><span>基站</span><span>桂阳</span></dd>
        </dl>
        <dl>
        <dt>01</dt>
        <dd><span>基站</span><span>桂阳</span></dd>
        </dl>
        <dl>
        <dt>01</dt>
        <dd><span>基站</span><span>桂阳</span></dd>
        </dl>
        <dl>
        <dt>01</dt>
        <dd><span>基站</span><span>桂阳</span></dd>
        </dl>
        <dl>
        <dt>01</dt>
        <dd><span>基站</span><span>桂阳</span></dd>
        </dl>
        <dl>
        <dt>01</dt>
        <dd><span>基站</span><span>桂阳</span></dd>
        </dl>
        <dl>
        <dt>01</dt>
        <dd><span>基站</span><span>桂阳</span></dd>
        </dl>
        <dl>
        <dt>01</dt>
        <dd><span>基站</span><span>桂阳</span></dd>
        </dl>
        <dl>
        <dt>01</dt>
        <dd><span>基站</span><span>桂阳</span></dd>
        </dl>
        <dl>
        <dt>01</dt>
        <dd><span>基站</span><span>桂阳</span></dd>
        </dl>
        <dl>
        <dt>01</dt>
        <dd><span>基站</span><span>桂阳</span></dd>
        </dl>
        <dl>
        <dt>01</dt>
        <dd><span>基站</span><span>桂阳</span></dd>
        </dl>
        <dl>
        <dt>01</dt>
        <dd><span>基站</span><span>桂阳</span></dd>
        </dl>
        <dl>
        <dt>01</dt>
        <dd><span>基站</span><span>桂阳</span></dd>
        </dl>
        <dl>
        <dt>01</dt>
        <dd><span>基站</span><span>桂阳</span></dd>
        </dl>
        <dl>
        <dt>01</dt>
        <dd><span>基站</span><span>桂阳</span></dd>
        </dl>
        <dl>
        <dt>01</dt>
        <dd><span>基站</span><span>桂阳</span></dd>
        </dl>
        </div>
        </div>
        <div className="center_right">
            <div className="tt">视频监控
            </div>
            <div className="w_182">
            <div><img alt="" src={Upimg} /> </div>
            <ul>
            <li className="active">
            <img alt="" src={Spimg} />
            <div className="titile">南京宣武门广场</div>
            </li>
            <li>
            <img alt="" src={Spimg}/>
            <div className="titile">南京宣武门广场</div>
            </li>
            <li>
            <img alt="" src={Spimg}/>
            <div className="titile">南京宣武门广场</div>
            </li>
            <li>
            <img alt="" src={Spimg}/>
            <div className="titile">南京宣武门广场</div>
            </li>
            </ul>
            <div><img alt="" src={Downimg}/> </div>
            </div>
            <div className="w_630">
            <img alt="" src={Spxqimg}/>
            <p>正在监控</p>
            <p>南京宣武门广场</p>
            </div>
            </div>
            </div>
            </div>
            <Footer />
            </div>
    );
    }
}

export default App;
