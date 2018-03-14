import React from 'react';
import { connect } from 'react-redux';
import "./index.css";
import Header from "../header";
import Footer from "../footer";
import NodeSel from '../nodesel';
import Meter from "./meter";
// import ListData from './listdata';

class App extends React.Component {
    render() {
        const {devices,usersettings} = this.props;
        const indexdeviceid = usersettings.indexdeviceid;
        const curdevice = devices[indexdeviceid];
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
        </div>
          { !!curdevice && <Meter curdevice={curdevice}/> }
        </div>
            </div>
            </div>
            <Footer />
            </div>
          );
    }
}

const mapStateToProps = ({device,userlogin}) => {
    const {devicelist,devices} = device;

    return {devicelist,devices,usersettings:userlogin.usersettings};
}
export default connect(mapStateToProps)(App);
