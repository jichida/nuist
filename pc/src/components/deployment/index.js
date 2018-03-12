import React from 'react';
import "./index.css";
import Header from "../header";
import Footer from "../footer";
import Map from "../map/index.js";

import NodeSel from '../nodesel';

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


        <NodeSel />
      </div>
        <div className="center_right">
            <div className="tt">节点拓扑
            <ul className="tt_right">
            <li>刷新间隔：10秒</li>
        <li>开启拓扑自动更新</li>
        </ul>
        </div>
        <div className="map_img">
            <Map />
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
