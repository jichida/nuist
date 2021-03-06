import React from 'react';
import { connect } from 'react-redux';
import Meter from "./meter";
import "./style.css";
import Header from "../header/page.js";
import lodashincludes from 'lodash.includes';
import lodashget from 'lodash.get';
import {getindexstring} from '../../util';
import DeviceInfoDetailList from './detaillist';
import {
  ui_seldropdowndevice
} from '../../actions';

class App extends React.Component {
  viewhistory=()=>{
    const {curdevice} = this.props;
    this.props.history.push(`/history/${curdevice._id}`);
   }

   componentDidMount(){
     const value = this.props.match.params.id;
     console.log(`onChangeCareselDevice->${value}`);
     this.props.dispatch(ui_seldropdowndevice({value,type:'historychart'}));
   }

    render() {
        const {curdevice,viewtype,index} = this.props;
        if(!!curdevice){
          return (
              <div className="monitorPage">
                  <Header history={this.props.history} title={`${getindexstring(index,2)} ${lodashget(curdevice,'name','')} ${lodashget(curdevice,'locationname','')}`}/>
                  <Meter curdevice={curdevice} viewtype={viewtype}/>
                  <DeviceInfoDetailList curdevice={curdevice} viewtype={viewtype}/>
              </div>
          );
        }
        return <div />

    }
}

const mapStateToProps = ({device:{devices,devicelist,allowviewtypeids,viewtypes},historydevice:{historydevices}},props) => {
		let curdevice = devices[props.match.params.id];
    const index = props.match.params.index;
    if(!curdevice){
      for(let i = 0 ;i < devicelist.length ;i++){
				if(lodashincludes(allowviewtypeids,devicelist[i].viewtype)){
					curdevice = devices[devicelist[i]];
					break;
				}
			}
		}
    let viewtype = {};
    if(!!curdevice){
      viewtype = viewtypes[curdevice.viewtype];
    }
    return {curdevice,viewtype,index};
}
export default connect(mapStateToProps)(App);
