import React from 'react';
import "./style.css";
import Header from "../header/page.js";
import { connect } from 'react-redux';
// import Demo from "../../img/videodemo.png";
// import List from "./list.js";
import Filler from "../datameter/filler.js";
import Footer from "../footer";
import PopcareSel from "../popcaresel";
import lodashget from 'lodash.get';
import lodashincludes from 'lodash.includes';
import {
	ui_selgateway
} from '../../actions';
import config from '../../env/config';

class App extends React.Component {
    onChangeCareselGateway = (value)=>{
      console.log(`onChangeCareselGateway->${value}`);
      this.props.dispatch(ui_selgateway({value,type:'historychart'}));
    }
    render() {
        const {ispopcaresel_single_index_gateway,gateways,curgatewayid,viewtype,gw2videos} = this.props;
				const curgw = gateways[curgatewayid];
				const videoname1 = lodashget(gw2videos[curgatewayid],'name1','青龙峡大坝');
				const videoname2 = lodashget(gw2videos[curgatewayid],'name2','青龙峡大坝');
				const videourl1 = `${config.serverurl}/video/${curgatewayid}/1`;
				const videourl2 = `${config.serverurl}/video/${curgatewayid}/1`;
        return (
            <div className="datameterPage">
                <Header title= "视频监控" history={this.props.history} ishidereturn/>
                <Filler gateways={gateways} curgatewayid={curgatewayid} viewtype={viewtype}/>
                {
                  !!curgw && (
                    <div className="videodata">
										<h2>{videoname1}</h2>
									    <iframe src={`${videourl1}`} width="100%" height="220px" frameBorder="0"></iframe>
									    </div>)
               }
							 {
								 !!curgw && (
									 <div className="videodata">
									 <h2>{videoname2}</h2>
										<iframe src={`${videourl2}`} width="100%" height="220px" frameBorder="0"></iframe>
										</div>)
							}
                <Footer history={this.props.history} sel={"video"} />
								{ispopcaresel_single_index_gateway  && <PopcareSel value={curgatewayid} isgateway={true} onChange={this.onChangeCareselGateway}/>}
            </div>
        );
    }
}

const mapStateToProps = ({device:{gateways,viewtypes,devicelist,devices,allowviewtypeids},
	userlogin:{usersettings},video,app:{ispopcaresel_single_index_gateway}}) => {
		const curgatewayid = lodashget(usersettings,'indexgatewayid');
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
		const {videolist,videos}  = video;
    let gw2videos = {};
    for(let i =0 ;i < videolist.length; i++){
      const curvideo = videos[videolist[i]];
      if(!!curvideo){
        if(!!gateways[curvideo.gatewayid]){
          gw2videos[curvideo.gatewayid] = curvideo;
        }
      }
    }
    return {gateways,curgatewayid,ispopcaresel_single_index_gateway,viewtype,gw2videos};
}
export default connect(mapStateToProps)(App);


//<div className="li"><span className="name">{lodashget(curgw,'name','')}</span>
//    <span className="runing">正在播放</span></div>
