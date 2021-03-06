import React from 'react';
import { connect } from 'react-redux';

// import "./style.css";
import Header from "../header/page.js";
// import List from "./list.js";
// import Filler from "./filler.js";
// import Report from "./report.js";
// import Footer from "../footer";
import lodashget from 'lodash.get';
// import lodashmap from 'lodash.map';
import HistoryBar from './historybar';
import QueryPage from '../explore/querypage';

class App extends React.Component {

    render() {
        const {curdevice,savequery_historychart} = this.props;
        const {from,to} = savequery_historychart;
        if(!!curdevice){
          return (
              <div className="monitorPage">
                  <Header history={this.props.history} title={`${lodashget(curdevice,'name','')} ${lodashget(curdevice,'locationname','')}`}/>
                  <span className="tt">
                    <QueryPage type="historychart"  from={from} to={to}/>
                  </span>
                  <HistoryBar showflag="all"/>
              </div>
          );
        }
        return <div />

    }
}

const mapStateToProps = ({device:{devices},app:{savequery_historychart}},props) => {
		const curdevice = devices[props.match.params.id];
    return {curdevice,savequery_historychart};
}
export default connect(mapStateToProps)(App);
