import React from 'react';
import { connect } from 'react-redux';

import "./style.css";
import Header from "../header/page.js";
import List from "./list.js";
// import Filler from "./filler.js";
// import Report from "./report.js";
// import Footer from "../footer";
import lodashget from 'lodash.get';
// import lodashmap from 'lodash.map';
import QueryPage from '../explore/querypage';
import {querypage_set_condition_sendsrv} from '../../actions';

class App extends React.Component {
    componentDidMount () {
      // this.onClickQuery(this.props);
      this.props.dispatch(querypage_set_condition_sendsrv({}));
    }
    render() {
        const {curdevice,viewtype} = this.props;
        if(!!curdevice){
          // const ticktimestringlist = lodashget(retlist,'ticktimestring',[]);
          // const {fields,fieldslist_brief} = viewtype;
          return (
              <div className="monitorPage">
                  <Header history={this.props.history} title={`${lodashget(curdevice,'name','')} ${lodashget(curdevice,'locationname','')}`}/>
                  <span className="tt">
                    <QueryPage type="historychart"/>
                  </span>
                  <List curdevice={curdevice} viewtype={viewtype}/>
              </div>
          );
        }
        return <div />

    }
}

const mapStateToProps = ({device:{devices,viewtype},historydevice:{historydevices}},props) => {
		const curdevice = devices[props.match.params.id];
    const retlist = lodashget(historydevices,`${props.match.params.id}`,[]);
    return {curdevice,viewtype,retlist};
}
export default connect(mapStateToProps)(App);
