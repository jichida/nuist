import React from 'react';
import { connect } from 'react-redux';
import "./index.css";
import Header from "../header";
import ChartsRealtime from '../history_data/chartsrealtime';
// import AbstractBar from "../abstract";
// import {Dropdown,Button,Icon} from 'antd';
// import getMenu from '../abstract/dropdownselmenu_device';
import HistoryBar from '../history/historybar';
// import Footer from "../footer";
// import Upimg from "../../img/jta.png";
// import Downimg from "../../img/jtb.png";
// import Spimg from "../../img/spimg.jpg";
import Spxqimg from "../../img/spimg1.jpg";
import NodeSel from '../nodesel';
import lodashget from 'lodash.get';
import config from '../../env/config';

class App extends React.Component {
    constructor(props) {  
         super(props); 
         this.state = {
           videoindex:1
         };
    } 

    render() {
      const {gateways,usersettings,gw2videos} = this.props;
      const indexgatewayid = usersettings.indexgatewayid;
      const curgateway = lodashget(gateways,`${indexgatewayid}`);
      if(!curgateway){
        return <div>未选择网关</div>
      }

      const videoname1 = lodashget(gw2videos[indexgatewayid],'name1','青龙峡大坝');
      const videoname2 = lodashget(gw2videos[indexgatewayid],'name2','青龙峡大坝');
      const onclick = (videoindex)=>{
        this.setState({videoindex});
      }
      const videourl = `${config.serverurl}/video/${indexgatewayid}/${this.state.videoindex}`;//lodashget(gw2videos[indexgatewayid],'url','http://www.newxh.com18.cn/spindex.html');
        return (
          <div className="deployment-page root-page">
              <Header />
              <div className="w_1220">
      <div className="left_con left_con_bg">
      <div className="real_time">
      <h2 className="title left_bg"><img src="images/add.png" alt=""/><span>网关列表</span></h2>
                <NodeSel />
  </div>
  </div>

  <div className="center_con">
      <div className="bor_con center_box">
      <h2 className="title"><img src="images/jko.png"  alt=""/><span>实时监控</span>

    </h2>
        <div className="spjk_box">
            <div className="spjk_left">
            <h2><span className={this.state.videoindex===1?'active':''} onClick={()=>{
              onclick(1);
            }}> {`${videoname1}`}</span>
            <span className={this.state.videoindex===2?'active':''} onClick={()=>{
              onclick(2);
            }}>{`${videoname2}`}</span></h2>
            <div className=" box_box" style={{position: 'relative',padding:'0'}}>


 <iframe src={`${videourl}`} width="100%" height="680" frameBorder="0" title=""></iframe>
</div>
            </div>

            </div>

         </div>
  </div>

                  <div className="right_con rhuadong">
                      <ChartsRealtime shownum={10}/>
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

const mapStateToProps = ({device,userlogin,video}) => {
    const {gateways,devicelist,devices} = device;
    const {videolist,videos}  = video;
    let gw2videos = {};
    for(let i =0 ;i < videolist.length; i++){
      const curvideo = videos[videolist[i]];
      if(!!curvideo){
        if(!!gateways[curvideo.gatewayid]){
          gw2videos[curvideo.gatewayid] = curvideo;
        }
      }
    }
    return {gateways,devicelist,devices,usersettings:userlogin.usersettings,gw2videos};
}
export default connect(mapStateToProps)(App);
