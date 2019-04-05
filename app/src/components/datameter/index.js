import React from 'react';
import { connect } from 'react-redux';
// import moment from 'moment';
import "./style.css";
// import Meter from "../deviceinfo/meter";
import Header from "../header/page.js";
import List from "./list.js";
import Filler from "./filler.js";
import Footer from "../footer";
import lodashget from 'lodash.get';
import lodashincludes from 'lodash.includes';
import PopcareSel from "../popcaresel";
import {
	ui_selgateway,
	// ui_historydevicequeryselect
} from '../../actions';
import lodashmap from 'lodash.map';

class App extends React.Component {
		componentDidMount() {
		}

		onChangeCareselGateway = (value)=>{
				console.log(`onChangeCareselGateway->${value}`);
				this.props.dispatch(ui_selgateway({value,type:'historychart'}));
		}
    render() {
        const {ispopcaresel_single_index_gateway,
					gateways,curgatewayid,viewtype,viewtypes,devices,devicelist} = this.props;
        return (
            <div className="datameterPage">
                <Header title="数据监控" history={this.props.history} ishidereturn/>
                <Filler gateways={gateways} curgatewayid={curgatewayid} viewtype={viewtype}/>
                {/* { !!curdevice && <Meter curdevice={curdevice} viewtype={viewtype}/> } */}
                <List history={this.props.history} devicelist={devicelist}
									 devices={devices} viewtypes={viewtypes}/>
                <Footer history={this.props.history} sel={"datameter"} />
								{ispopcaresel_single_index_gateway  && <PopcareSel value={curgatewayid} isgateway={true} onChange={this.onChangeCareselGateway}/>}
            </div>
        );
    }
}

const mapStateToProps = ({device:{devices,gateways,allowviewtypeids,viewtypes},userlogin:{usersettings},
	app:{ispopcaresel_single_index_gateway}}) => {
		let curgatewayid = lodashget(usersettings,'indexgatewayid');
		let devicelist = [];

		if(!!gateways[curgatewayid]){
			lodashmap(devices,(dv)=>{
				if(dv.gatewayid === curgatewayid){
					devicelist.push(dv);
				}
			})
		}

		let curdevice;
		let curdeviceid = lodashget(usersettings,'indexdeviceid');
		if(!!curdeviceid){
			curdevice = devices[curdeviceid];
		}
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

		let devlistnew = [];
		for(let i = 0 ;i < devicelist.length ;i++){
			if(lodashincludes(allowviewtypeids,devicelist[i].viewtype)){
				devlistnew.push(devicelist[i]._id);
			}
		}
    return {curdevice,devicelist:devlistnew,devices,gateways,curgatewayid,viewtypes,
			ispopcaresel_single_index_gateway,viewtype,usersettings};
}
export default connect(mapStateToProps)(App);
