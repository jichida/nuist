import React from 'react';
import { connect } from 'react-redux';
import "./index.css";
import Header from "../header";
import Footer from "../footer";
import NodeSel from '../nodesel';
import Meter from "./meter";
import lodashget from 'lodash.get';
import List from "../history/list.js";
import Filler from "../history/filler.js";
import Report from "../history/report.js";

class App extends React.Component {
    render() {
        const {devices,usersettings,retlist} = this.props;
        const indexdeviceid = usersettings.indexdeviceid;
        const curdevice = devices[indexdeviceid];
        const ticktimestringlist = lodashget(retlist,'ticktimestring',[]);
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
                  <div className="tt">
                      节点数据
                    </div>
                    { !!curdevice && <Meter curdevice={curdevice}/> }
                    { !!curdevice && <Filler curdevice={curdevice}/> }
                    { !!curdevice && <List curdevice={curdevice}/>}
                    {ticktimestringlist.length>0 && <Report title="历史温度曲线" ticktimestring={ticktimestringlist} vlist={retlist.temperature}/>}
                    {ticktimestringlist.length>0 && <Report title="历史降雨量曲线" ticktimestring={ticktimestringlist} vlist={retlist.rainfall}/>}
                    {ticktimestringlist.length>0 && <Report title="历史湿度曲线" ticktimestring={ticktimestringlist} vlist={retlist.humidity}/>}
                    {ticktimestringlist.length>0 && <Report title="历史风力曲线" ticktimestring={ticktimestringlist} vlist={retlist.windspeed}/>}
                    {ticktimestringlist.length>0 && <Report title="历史气压曲线" ticktimestring={ticktimestringlist} vlist={retlist.pressure}/>}
                  </div>
                </div>
            </div>
            <Footer />
            </div>
          );
    }
}

const mapStateToProps = ({device,userlogin,historydevice:{historydevices}}) => {
    const {devicelist,devices} = device;
    const retlist = lodashget(historydevices,`${userlogin.usersettings.indexdeviceid}`,[]);
    return {devicelist,devices,retlist,usersettings:userlogin.usersettings};
}
export default connect(mapStateToProps)(App);
