import React from 'react';
import { connect } from 'react-redux';

import "./style.css";
import Header from "../header/page.js";
import List from "./list.js";
import Filler from "./filler.js";
import Report from "./report.js";
// import Footer from "../footer";
import lodashget from 'lodash.get';
import lodashmap from 'lodash.map';


class App extends React.Component {

    render() {
        const {curdevice,devicetype,retlist} = this.props;
        if(!!curdevice){
          const ticktimestringlist = lodashget(retlist,'ticktimestring',[]);
          const {fields,fieldslist_brief} = devicetype[curdevice.devicetype];
          return (
              <div className="monitorPage">
                  <Header history={this.props.history} title={`${lodashget(curdevice,'name','')}-${lodashget(curdevice,'locationname','')}`}/>
                  <Filler curdevice={curdevice} devicetype={devicetype}/>
                  <List curdevice={curdevice} devicetype={devicetype}/>
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
          );
        }
        return <div />

    }
}

const mapStateToProps = ({device:{devices,devicetype},historydevice:{historydevices}},props) => {
		const curdevice = devices[props.match.params.id];
    const retlist = lodashget(historydevices,`${props.match.params.id}`,[]);
    return {curdevice,devicetype,retlist};
}
export default connect(mapStateToProps)(App);
