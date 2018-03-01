import React from 'react';
import { connect } from 'react-redux';
import "./style.css";
import Header from "../header/page.js";
import List from "./list.js";
import Filler from "./filler.js";
import Footer from "../footer";
import lodashget from 'lodash.get';

class App extends React.Component {

    render() {
       const {curdevice,devicelist,devices} = this.props;
        return (
            <div className="datameterPage">
                <Header title="数据监控" history={this.props.history} ishidereturn/>
                { !!curdevice && <Filler curdevice={curdevice}/> }
                <List history={this.props.history} devicelist={devicelist} devices={devices}/>
                <Footer history={this.props.history} sel={"datameter"} />
            </div>
        );
    }
}

const mapStateToProps = ({device:{devicelist,devices},userlogin:{usersettings}}) => {
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
    return {curdevice,devicelist,devices};
}
export default connect(mapStateToProps)(App);
