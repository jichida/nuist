import React from 'react';
import { connect } from 'react-redux';
import "./index.css";
// import Jtimg from "../../img/jt.png";
import Header from "../header";
import SeldropdownDevice from '../abstract/seldroplistdevice';
// import AbstractBar from "../abstract";
// import HistoryDataBar from "../history_data";
// import Footer from "../footer";
import NodeSel from '../nodesel';
import QueryPage from '../history/querypage.js';
// import lodashget from 'lodash.get';
// import ReportContainer from "../history/reportcontainer.js";
// import ChartsRealtime from '../history_data/chartsrealtime';
// //import Wximg from "../../img/wx_icon.jpg";
// // import Tdimg from "../../img/tp_d.jpg";
// import ChartsHistory from '../history/charts_history_container.js';
// import HistoryBar from '../history/historybar';
import List from "./list.js";
import {
  // set_uiapp,
  ui_startalarm,
  ui_stopalarm
  // getrealtimealarmlist_request
} from '../../actions';
import lodashget from 'lodash.get';

class App extends React.Component {
    componentDidMount () {
      this.props.dispatch(ui_startalarm());
      // this.props.dispatch(getrealtimealarmlist_request({}));
    }
    componentWillUnmount () {
      this.props.dispatch(ui_stopalarm());
      // this.props.dispatch(getrealtimealarmlist_request({}));
    }
    render() {
      const {devices,gateways,usersettings} = this.props;
      const indexgatewayid = usersettings.indexgatewayid;
      const curgateway = lodashget(gateways,`${indexgatewayid}`);
      if(!curgateway){
        return <div>未选择网关</div>
      }
      // const retlist = lodashget(historydevices,`${curdevice._id}`,[]);

      // const ticktimestringlist = lodashget(retlist,'ticktimestring',[]);
      // const {fields,fieldslist_brief} = viewtype;
        return (
          <div className="deployment-page root-page">
              <Header />
              <div className="w_1220">
      <div className="left_con left_con_bg">
      <div className="real_time">
      <h2 className="title left_bg"><img src="images/add.png" alt=""/><span>节点列表</span></h2>
                <NodeSel />
  </div>
  </div>

  <div className="center_con center_mr0">
      <div className="bor_con center_box">
      <h2 className="title"><img src="images/jb.png"  alt=""/>
      <span>综合警报</span>
      <span>
        <QueryPage type="alarm"/>
      </span>
      <SeldropdownDevice />
    </h2>
      <List />
      </div>
                  </div>
                  {/* <div className="right_con rhuadong">
            <div className="bor_con">
            <h2 className="title"><img src="images/lis.png" alt=""/><span>历史数据</span></h2>
            <HistoryBar showflag="all"/>
            <div /> </div>
                  </div> */}

      </div>

          </div>
            // <div className="indexPage">
            // <Header />
            // <div className="content">
            // <div className="indextit">欢迎访问大坝智能监控系统</div>
            // <div className="tita"><div className="tit_left">切换到：贵阳<img alt="" src={Jtimg}/></div><h2>综合警报</h2><div className="tit_right"></div></div>
            // <div className="cont">
            //   <div className="left pt0">
            //       <NodeSel />
            //   </div>
            // <div className="center_right">
            //     <List />
            // </div>
            // </div>
            // </div>
            // <Footer />
            // </div>
    );
    }
}

const mapStateToProps = ({device,userlogin,historydevice:{historydevices}}) => {
    const {gateways,devicelist,devices,viewtype} = device;
    return {gateways,devicelist,devices,viewtype,historydevices,usersettings:userlogin.usersettings};
}
export default connect(mapStateToProps)(App);
