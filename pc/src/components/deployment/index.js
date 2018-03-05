import React from 'react';
import "./index.css";
import Header from "../header";
import Footer from "../footer";
import Mapimg from "../../img/map_img.png";
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
            <dd><span>位置</span><span>区域<img src={Jtimg} /></span></dd>
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
            <div className="tt">节点拓扑
            <ul className="tt_right">
            <li>刷新间隔：10秒</li>
        <li>开启拓扑自动更新</li>
        </ul>
        </div>
        <div className="map_img">
            <img src={Mapimg} />
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
