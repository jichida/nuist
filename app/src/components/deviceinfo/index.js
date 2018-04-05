import React from 'react';
import { connect } from 'react-redux';
import Meter from "./meter";
import "./style.css";
import Header from "../header/page.js";
// import Footer from "../footer";
import lodashget from 'lodash.get';
import {getindexstring} from '../../util';
import DeviceInfoDetailList from './detaillist';

class App extends React.Component {
  viewhistory=()=>{
    const {curdevice} = this.props;
    this.props.history.push(`/history/${curdevice._id}`);
   }

    render() {
        const {curdevice,devicetype,index} = this.props;
        if(!!curdevice){
          return (
              <div className="monitorPage">
                  <Header history={this.props.history} title={`${getindexstring(index,2)}-${lodashget(curdevice,'name','')}-${lodashget(curdevice,'locationname','')}`}/>
                  <Meter curdevice={curdevice} devicetype={devicetype}/>
                  <DeviceInfoDetailList curdevice={curdevice} devicetype={devicetype}/>

                  <div onClick={this.viewhistory}>查看历史数据</div>
              </div>
          );
        }
        return <div />

    }
}

const mapStateToProps = ({device:{devices,devicetype},historydevice:{historydevices}},props) => {
		const curdevice = devices[props.match.params.id];
    const index = props.match.params.index;
    return {curdevice,devicetype,index};
}
export default connect(mapStateToProps)(App);
