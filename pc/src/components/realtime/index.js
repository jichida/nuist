import React from 'react';
import { connect } from 'react-redux';
import "./index.css";
import Header from "../header";
import Footer from "../footer";
import NodeSel from '../nodesel';
import Meter from "./meter";
import List from "../history/list.js";
import Filler from "../history/filler.js";
import Report from "../history/report2.js";

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
                    { !!curdevice && <Meter curdevice={curdevice} viewtype={viewtype}/> }
                    { !!curdevice && <Filler curdevice={curdevice} viewtype={viewtype}/> }
                    { !!curdevice && <List curdevice={curdevice}  viewtype={viewtype}/>}
                    {
                      <Report fieldslist_brief={fieldslist_brief}
                        ticktimestring={ticktimestringlist}
                        fields={fields}
                        retlist={retlist}
                              />
                    }
                  </div>
                </div>
            </div>
            <Footer />
            </div>
          );
    }
}

const mapStateToProps = ({device,userlogin,historydevice:{historydevices}}) => {
    const {devicelist,devices,viewtype} = device;
    return {devicelist,devices,viewtype,historydevices,usersettings:userlogin.usersettings};
}
export default connect(mapStateToProps)(App);
