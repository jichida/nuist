import React from 'react';
import { connect } from 'react-redux';
import "./index.css";
import Header from "../header";
import Footer from "../footer";
import NodeSel from '../nodesel';
import Meter from "./meter";
import List from "../history/list.js";
import Filler from "../history/filler.js";
import Report from "../history/report.js";

import lodashget from 'lodash.get';
import lodashmap from 'lodash.map';
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
        const {devices,usersettings,historydevices,devicetype} = this.props;
        const indexdeviceid = usersettings.indexdeviceid;
        const curdevice = devices[indexdeviceid];
        if(!curdevice){
          return <div>无设备</div>
        }
        const retlist = lodashget(historydevices,`${curdevice._id}`,[]);

        const ticktimestringlist = lodashget(retlist,'ticktimestring',[]);
        const {fields,fieldslist_brief} = devicetype[curdevice.devicetype];
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
                    { !!curdevice && <Meter curdevice={curdevice} devicetype={devicetype}/> }
                    { !!curdevice && <Filler curdevice={curdevice}  devicetype={devicetype}/> }
                    { !!curdevice && <List curdevice={curdevice}  devicetype={devicetype}/>}
                    {

                      lodashmap(fieldslist_brief,(fieldname)=>{
                        const fieldsprops = fields[fieldname];
                        if(!!fieldsprops && ticktimestringlist.length>0){
                          return (<Report title={`历史${fieldsprops.showname}曲线`} ticktimestring={ticktimestringlist}
                            vlist={retlist[fieldname]} key={fieldname}/>);
                        }
                      })
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
    const {devicelist,devices,devicetype} = device;
    return {devicelist,devices,devicetype,historydevices,usersettings:userlogin.usersettings};
}
export default connect(mapStateToProps)(App);
