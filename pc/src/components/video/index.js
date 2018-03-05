import React from 'react';
import "./index.css";
import Header from "../header";
import Footer from "../footer";

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
            <dd><span>位置</span><span>区域<img src="jt.png" /></span></dd>
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
            <div><img src="jta.png" /> </div>
            <ul>
            <li className="active">
            <img src="spimg.jpg" />
            <div className="titile">南京宣武门广场</div>
            </li>
            <li>
            <img src="spimg.jpg"/>
            <div className="titile">南京宣武门广场</div>
            </li>
            <li>
            <img src="spimg.jpg"/>
            <div className="titile">南京宣武门广场</div>
            </li>
            <li>
            <img src="spimg.jpg"/>
            <div className="titile">南京宣武门广场</div>
            </li>
            </ul>
            <div><img src="jtb.png"/> </div>
            </div>
            <div className="w_630">
            <img src="spimg1.jpg"/>
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
