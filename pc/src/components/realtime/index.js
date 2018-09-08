import React from 'react';
import { connect } from 'react-redux';
import Header from "../header";
import AbstractBar from "../abstract";
import HistoryDataBar from "../history_data";
import Footer from "../footer";
import NodeSel from '../nodesel';
import Meter from "./meter";
import List from "../history/list.js";
import Filler from "../history/filler.js";
import ChartsHistory from '../history/charts_history_container.js';
import ReportContainer from "../history/reportcontainer.js";
import ChartsRealtime from '../history_data/chartsrealtime';
import lodashget from 'lodash.get';
// import lodashmap from 'lodash.map';

import {set_uiapp} from '../../actions';

class App extends React.Component {
    componentDidMount() {
      if(lodashget(this.props,'match.params.id','') !== ''){
        this.props.dispatch(set_uiapp({
            selectedindex:2
        }));
      }
    }

    render() {
        const {devices,usersettings,historydevices,viewtype} = this.props;
        const indexdeviceid = usersettings.indexdeviceid;
        const curdevice = devices[indexdeviceid];
        if(!curdevice){
          return <div>无设备</div>
        }
        const retlist = lodashget(historydevices,`${curdevice._id}`,[]);

        const ticktimestringlist = lodashget(retlist,'ticktimestring',[]);
        const {fields,fieldslist_brief} = viewtype;
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
      <div className="center_box">

      <ChartsRealtime /> <div className="bor_con" style={{marginTop: '10px'}}>
      <h2 className="title"><img src="images/jied.png"  alt=""/>
      <span>历史数据</span></h2>

                    <div className="curve_box data_list_box rhuadong">
                      <List curdevice={curdevice}/>
                    </div>
                  </div>
                 </div>
                  </div>
                  <div className="right_con rhuadong">
            <div className="bor_con">
            <h2 className="title"><img src="images/lis.png" alt=""/><span>历史数据</span></h2>
        <ul className="curve_lis">
            <li>
            <h2>历史风向曲线</h2>
            <ChartsHistory />
            </li><li>
            <h2>历史湿度曲线</h2>
            <ChartsHistory />
            </li><li>
            <h2>历史风力曲线</h2>
            <ChartsHistory />
            </li>
            </ul>
            <div /> </div>
            </div>

      </div>

          </div>

            // <div className="indexPage">
            //     <Header />
            //     <div className="content">
            //     <div className="indextit">欢迎访问大坝智能监控系统</div>
            //     <div className="cont">
            //     <div className="left">
            //     <div className="tit">节点列表</div>
            //     <NodeSel />
            // </div>
            // <div className="center_right">
            //       <div className="tt">
            //           节点数据
            //         </div>
            //         { !!curdevice && <Meter curdevice={curdevice} viewtype={viewtype}/> }
            //         { !!curdevice && <Filler curdevice={curdevice} viewtype={viewtype}/> }
            //         { !!curdevice && <List curdevice={curdevice}  viewtype={viewtype}/>}
            //         {
            //           <ReportContainer
            //             splitcount={1}
            //             fieldslist_brief={fieldslist_brief}
            //             ticktimestring={ticktimestringlist}
            //             fields={fields}
            //             retlist={retlist}
            //                   />
            //         }
            //       </div>
            //     </div>
            // </div>
            // <Footer />
            // </div>
          );
    }
}

const mapStateToProps = ({device,userlogin,historydevice:{historydevices}}) => {
    const {devicelist,devices,viewtype} = device;
    return {devicelist,devices,viewtype,historydevices,usersettings:userlogin.usersettings};
}
export default connect(mapStateToProps)(App);
