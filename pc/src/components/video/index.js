import React from 'react';
import "./index.css";
import Header from "../header";
import ChartsRealtime from '../history_data/chartsrealtime';
import AbstractBar from "../abstract";
import HistoryDataBar from "../history_data";
import Footer from "../footer";
import Upimg from "../../img/jta.png";
import Downimg from "../../img/jtb.png";
import Spimg from "../../img/spimg.jpg";
import Spxqimg from "../../img/spimg1.jpg";
import NodeSel from '../nodesel';

class App extends React.Component {
    render() {
        return (
          <div className="deployment-page root-page">
              <Header />
              <div className="w_1220">
      <div className="left_con left_con_bg">
      <div className="real_time">
      <h2 className="title left_bg"><img src="images/add.png" alt=""/><span>实时监控</span></h2>
                <NodeSel />
  </div>
  </div>

  <div className="center_con">
      <div className="bor_con center_box">
      <h2 className="title"><img src="images/jied.png"  alt=""/><span>节点拓扑</span></h2>
        <div className="spjk_box">
            <div className="spjk_left">
            <h2>正在监控  南京宣武门广场</h2>
            <div className=" box_box" style={{position: 'relative'}}> <img alt="" src={Spxqimg} style={{width:'100%',height:'400px'}} />
<div className="jk_bg">
<div className="jz_box">
<img src="images/jz.gif" />
    <p>正在加载，请稍后</p>
</div>
</div>
</div>
            </div>
            <div className="spjk_right">
            <ul>
            <li>
            <div className="spjk_li"> <img alt="" src={Spimg} style={{width:'100%'}}/>
            <p>胡佛大坝</p>
            </div>
            </li>
<li>
<div className="spjk_li"> <img alt="" src={Spimg} style={{width:'100%'}}/>
<p>胡佛大坝</p>
</div>
</li>
<li>
<div className="spjk_li"> <img alt="" src={Spimg} style={{width:'100%'}}/>
<p>胡佛大坝</p>
</div>
</li>
<li>
<div className="spjk_li"> <img alt="" src={Spimg} style={{width:'100%'}}/>
<p>胡佛大坝</p>
</div>
</li>
<li>
<div className="spjk_li"> <img alt="" src={Spimg} style={{width:'100%'}}/>
<p>胡佛大坝</p>
</div>
</li>
            </ul>
            </div>
            </div>

         </div>
  </div>
    
                  <div className="right_con rhuadong">
                      <ChartsRealtime />
    <div className="bor_con border_top">
    <h2 className="title"><img src="images/lis.png" /><span>历史数据</span></h2>
<ul className="curve_lis">
    <li>
    <h2>历史风向曲线</h2>
    <img src="images/tup1.png" style={{width:'100%'}} />
</li>
</ul>
<div /> </div>
                      <div />
                  </div>

      </div>

          </div>

        //     <div className="indexPage">
        //     <Header />
        //     <div className="content">
        //     <div className="indextit">欢迎访问大坝智能监控系统</div>
        //     <div className="cont">
        //     <div className="left">
        //         <div className="tit">节点列表</div>
        //         <NodeSel />
        //     </div>
        // <div className="center_right">
        //     <div className="tt">视频监控
        //     </div>
        //     <div className="w_182">
        //     <div><img alt="" src={Upimg} /> </div>
        //     <ul>
        //     <li className="active">
        //     <img alt="" src={Spimg} />
        //     <div className="titile">南京宣武门广场</div>
        //     </li>
        //     <li>
        //     <img alt="" src={Spimg}/>
        //     <div className="titile">南京宣武门广场</div>
        //     </li>
        //     <li>
        //     <img alt="" src={Spimg}/>
        //     <div className="titile">南京宣武门广场</div>
        //     </li>
        //     <li>
        //     <img alt="" src={Spimg}/>
        //     <div className="titile">南京宣武门广场</div>
        //     </li>
        //     </ul>
        //     <div><img alt="" src={Downimg}/> </div>
        //     </div>
        //     <div className="w_630">
        //     <img alt="" src={Spxqimg}/>
        //     <p>正在监控</p>
        //     <p>南京宣武门广场</p>
        //     </div>
        //     </div>
        //     </div>
        //     </div>
        //     <Footer />
        //     </div>
    );
    }
}

export default App;
