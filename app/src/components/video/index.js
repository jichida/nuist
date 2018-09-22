import React from 'react';
import "./style.css";
import Header from "../header/page.js";
import { connect } from 'react-redux';
import Demo from "../../img/videodemo.png";
// import List from "./list.js";
import Filler from "../datameter/filler.js";
import Footer from "../footer";
import PopcareSel from "../popcaresel";
import lodashget from 'lodash.get';
import {
	ui_selgateway
} from '../../actions';

class App extends React.Component {
    onChangeCareselGateway = (value)=>{
      console.log(`onChangeCareselGateway->${value}`);
      this.props.dispatch(ui_selgateway({value,type:'historychart'}));
    }
    render() {
        const {ispopcaresel_single_index_gateway,gateways,curgatewayid,viewtype} = this.props;
				let curgw = gateways[curgatewayid];
        return (
            <div className="datameterPage">
                <Header title="视频监控" history={this.props.history} ishidereturn/>
                <Filler gateways={gateways} curgatewayid={curgatewayid} viewtype={viewtype}/>
                {
                  !!curgw && (
                    <div className="videodata">
    <iframe src="http://www.newxh.com18.cn/spindex.html" width="100%" height="220px" frameborder="0"></iframe>

    </div>)
               }
                <Footer history={this.props.history} sel={"video"} />
								{ispopcaresel_single_index_gateway  && <PopcareSel value={curgatewayid} isgateway={true} onChange={this.onChangeCareselGateway}/>}
            </div>
        );
    }
}

const mapStateToProps = ({device:{gateways,viewtype},userlogin:{usersettings},app:{ispopcaresel_single_index_gateway}}) => {
		const curgatewayid = lodashget(usersettings,'indexgatewayid');
    return {gateways,curgatewayid,ispopcaresel_single_index_gateway,viewtype};
}
export default connect(mapStateToProps)(App);


//<div className="li"><span className="name">{lodashget(curgw,'name','')}</span>
//    <span className="runing">正在播放</span></div>
