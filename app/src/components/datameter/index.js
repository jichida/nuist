import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import "./style.css";
// import Meter from "../deviceinfo/meter";
import Header from "../header/page.js";
import List from "./list.js";
import Filler from "./filler.js";
import Footer from "../footer";
import lodashget from 'lodash.get';
import PopcareSel from "../popcaresel";
import {
	// saveusersettings_request,
	// ui_historydevicequeryselect
} from '../../actions';
import lodashmap from 'lodash.map';

class App extends React.Component {
	componentDidMount() {
				// this.props.dispatch(ui_historydevicequeryselect({
				// 		periodname:'minutely',
				// 		starttime:moment().subtract(10, 'minutes').format('YYYY-MM-DD HH:mm:00'),//moment().format('YYYY-MM-DD HH:mm:ss'),
				// 		endtime:moment().format('YYYY-MM-DD HH:mm:00'),
				// 		seltype:0,
				// 		isdateopen:false,
				// }));
		}


		onChangeCareselGateway = (value)=>{
			// let usersettings = this.props.usersettings;
			// usersettings.indexdeviceid = value;
			// this.props.dispatch(saveusersettings_request(usersettings));
		}
		onChangeCareselDevice = (value)=>{

			// const {devices} = this.props;
			// if(!!devices[value]){
			// 	this.props.dispatch(ui_mycar_selcurdevice(value));
			// }

		}
    render() {
        const {ispopcaresel_single_index_gateway,
					gateways,curgatewayid,viewtype,devices,devicelist} = this.props;
        return (
            <div className="datameterPage">
                <Header title="数据监控" history={this.props.history} ishidereturn/>
                <Filler gateways={gateways} curgatewayid={curgatewayid} viewtype={viewtype}/>
                {/* { !!curdevice && <Meter curdevice={curdevice} viewtype={viewtype}/> } */}
                <List history={this.props.history} devicelist={devicelist}
									 devices={devices} viewtype={viewtype}/>
                <Footer history={this.props.history} sel={"datameter"} />
								{ispopcaresel_single_index_gateway  && <PopcareSel value={curgatewayid} isgateway={true} onChange={this.onChangeCaresel}/>}
            </div>
        );
    }
}

const mapStateToProps = ({device:{devices,gateways,viewtype},userlogin:{usersettings},
	app:{ispopcaresel_single_index_gateway}}) => {
		let curdevice;
		let curdeviceid = lodashget(usersettings,'indexdeviceid');
		let curgatewayid = lodashget(usersettings,'indexgatewayid');
		let devicelist = [];
		if(!!curdeviceid){
			curdevice = devices[curdeviceid];
		}
		if(!!gateways[curgatewayid]){
			lodashmap(devices,(dv)=>{
				if(dv.gatewayid === curgatewayid){
					devicelist.push(dv._id);
				}
			})
		}

    return {curdevice,devicelist,devices,gateways,curgatewayid,
			ispopcaresel_single_index_gateway,viewtype,usersettings};
}
export default connect(mapStateToProps)(App);
