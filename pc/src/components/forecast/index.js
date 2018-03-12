import React from 'react';
import "./index.css";
import Jtimg from "../../img/jt.png";
import Header from "../header";
import Footer from "../footer";
import NodeSel from '../nodesel';
import Wximg from "../../img/wx_icon.jpg";
import Tdimg from "../../img/tp_d.jpg";


class App extends React.Component {
    render() {
        return (
            <div className="indexPage">
            <Header />
            <div className="content">
            <div className="indextit">欢迎访问大坝智能监控系统</div>
            <div className="tita"><div className="tit_left">切换到：贵阳<img alt="" src={Jtimg}/></div><h2>综合警报</h2><div className="tit_right"><img alt="" src={Wximg} /></div></div>
            <div className="cont">

              <div className="left pt0">
                
                  <NodeSel />

        <ul className="tt_right">
            <li>异常节点</li>
            <li>全部节点</li>
            </ul>
            </div>
            <div className="center">
                <ul className="zhyj_box">
                <li className="zhyj"><img alt="" src={Tdimg} /><p>降雨量</p></li>
            <li className="zhyj"><img alt="" src={Tdimg} /><p>水位</p></li>
            <li className="zhyj"><img alt="" src={Tdimg} /><p>温度</p></li>
            <li className="zhyj"><img alt="" src={Tdimg} /><p>应力0</p></li>
            <li className="zhyj"><img alt="" src={Tdimg} /><p>湿度</p></li>
            <li className="zhyj"><img alt="" src={Tdimg} /><p>应力1</p></li>
            <li className="zhyj"><img alt="" src={Tdimg} /><p>电压</p></li>
            <li className="zhyj"><img alt="" src={Tdimg} /><p>变形</p></li>
            <li className="zhyj"><img alt="" src={Tdimg} /><p>电压</p></li></ul>
            </div>
        <div className="left pt0">
            <dl className="dl_bg">
            <dt>ID</dt>
            <dd><span>城市</span><span>状态</span></dd>
        </dl>
        <div className="h_625 scroll_bar h_520">
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
        <ul className="tt_right">
            <li>异常节点</li>
            <li>全部节点</li>
            </ul>
            </div>

            </div>
            <div className="shuju_centet">
            <div className="shuju_tit"><div className="shuju_titleft"><span className="active">48小时数据</span><span>历史数据</span><span>温度<img alt="" src={Jtimg} /></span></div><div className="shuju_titright">从<span>2018-12-12 14:50</span>到<span>2018-12-12 14:50</span></div></div>
        <ul className="shuju scroll_bar">
            <li className="bge5">
            <em>ID</em>
            <span>节点</span>
            <span>时间</span>
            <span>数值</span>
            </li>
            <li>
            <em>1</em>
            <span>桃花水库1</span>
            <span>2018-02-12 12:20:20</span>
        <span>12.9</span>
        </li>
        <li>
        <em>1</em>
        <span>桃花水库1</span>
        <span>2018-02-12 12:20:20</span>
        <span>12.9</span>
        </li>
        <li>
        <em>1</em>
        <span>桃花水库1</span>
        <span>2018-02-12 12:20:20</span>
        <span>12.9</span>
        </li>

        </ul>
        </div>
            </div>
            <Footer />
            </div>
    );
    }
}

export default App;
