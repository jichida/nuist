import React from 'react';
import { connect } from 'react-redux';
import "./style.css";
import Meter from "../monitor/meter";
import Header from "../header/page.js";
import List from "./list.js";
import Filler from "./filler.js";
import Footer from "../footer";
import lodashget from 'lodash.get';
import PopcareSel from "../popcaresel";
import {
	saveusersettings_request
} from '../../actions';

class App extends React.Component {
		onChangeCaresel = (value)=>{
			let usersettings = this.props.usersettings;
			usersettings.indexdeviceid = value;
			this.props.dispatch(saveusersettings_request(usersettings));
		}
    render() {
       const {ispopcaresel_single_datameter,curdevice,devicelist,devices} = this.props;
        return (
            <div className="datameterPage">
                <Header title="数据监控" history={this.props.history} ishidereturn/>
                { !!curdevice && <Filler curdevice={curdevice}/> }
                { !!curdevice && <Meter curdevice={curdevice}/> }
                <List history={this.props.history} devicelist={devicelist} devices={devices}/>
                <Footer history={this.props.history} sel={"datameter"} />
                {ispopcaresel_single_datameter && <PopcareSel value={curdevice._id} onChange={this.onChangeCaresel}/>}
            </div>
        );
    }
}

const mapStateToProps = ({device:{devicelist,devices},userlogin:{usersettings},app:{ispopcaresel_single_datameter}}) => {
		let curdevice;
		let curdeviceid = lodashget(usersettings,'indexdeviceid');
		if(!!curdeviceid){
			curdevice = devices[curdeviceid];
		}
		if(!curdevice){
			if(devicelist.length > 0){
				curdevice = devices[devicelist[0]];
			}
		}
    return {curdevice,devicelist,devices,ispopcaresel_single_datameter};
}
export default connect(mapStateToProps)(App);
