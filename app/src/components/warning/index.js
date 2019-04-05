import React from 'react';
import { connect } from 'react-redux';
import "./style.css";
import List from "./list.js";
import Footer from "../footer";
import lodashincludes from 'lodash.includes';
import City from "../../img/20.png";
import Point from "../../img/21.png";
import lodashget from 'lodash.get';
import {
  set_uiapp,
  ui_startalarm,
  ui_stopalarm,
  ui_selgateway,
  ui_seldropdowndevice
} from '../../actions';
import PopcareSel from "../popcaresel";
import QueryPage from '../explore/querypage';

class App extends React.Component {

    componentDidMount () {
      this.props.dispatch(ui_startalarm());
      // this.props.dispatch(getrealtimealarmlist_request({}));
    }
    componentWillUnmount () {
      this.props.dispatch(ui_stopalarm());
      // this.props.dispatch(getrealtimealarmlist_request({}));
    }
    onClickShowAll = (uialarmshowall)=>{
      this.props.dispatch(set_uiapp({uialarmshowall}));
    }
    onClickPopCareSelGateway = ()=>{
      this.props.dispatch(set_uiapp({ispopcaresel_single_index_gateway:true}));
    }
    onClickPopCareSelDevice = ()=>{
      this.props.dispatch(set_uiapp({ispopcaresel_single_index_device:true}));
    }
    onChangeCareselGateway = (value)=>{
      console.log(`onChangeCareselGateway->${value}`);
      this.props.dispatch(ui_selgateway({value,type:'alarm'}));
    }
    onChangeCareselDevice = (value)=>{
      console.log(`onChangeCareselDevice->${value}`);
      this.props.dispatch(ui_seldropdowndevice({value,type:'alarm'}));
    }
    render() {
        const {realtimealarmcount,savequery_alaram} = this.props;
        const {from,to} = savequery_alaram;
        const {
          ispopcaresel_single_index_gateway,ispopcaresel_single_index_device,
          curdevice,curgateway,usersettings} = this.props;
        const indexdeviceid = lodashget(usersettings,'indexdeviceid','');
        const indexgatewayid = lodashget(usersettings,'indexgatewayid','');
        return (
            <div className="warningPage">
                <div className="head">
        {
    !!curdevice && (
    <div className="mainmap">
        <div onClick={this.onClickPopCareSelGateway} className="mapcanver city"><img alt="" src={City} />
    <span>{lodashget(curgateway,'name')}</span>
    </div>
    <div onClick={this.onClickPopCareSelDevice} className="mapcanver point"><img alt="" src={Point} />
    <span>{lodashget(curdevice,'name')}</span>
    </div>
    {/* <div className="maindata">
     <BottomBannerData curdevice={curdevice} viewtype={viewtype} />
     </div> */}
    </div>
)
}
<div className="n"><span className="small">共有预警信息</span><span>{realtimealarmcount>99?'99+':`${realtimealarmcount}`}</span><span  className="small">条</span></div>

                </div>
<div className="c">
    <QueryPage type="alarm"  from={from} to={to}/>
    </div>
                <List />
                {ispopcaresel_single_index_gateway  && <PopcareSel value={indexgatewayid} isgateway={true} onChange={this.onChangeCareselGateway}/>}
                {ispopcaresel_single_index_device  && <PopcareSel value={indexdeviceid} isgateway={false} onChange={this.onChangeCareselDevice}/>}
                <Footer history={this.props.history} sel={"warning"}  />
            </div>
        );
    }
}

const mapStateToProps = ({realtimealarm:{realtimealarmlist,realtimealarms},
  device:{devicelist,devices,viewtypes,allowviewtypeids,gateways},
  app:{ispopcaresel_single_index_gateway,ispopcaresel_single_index_device,uialarmshowall,savequery_alaram},
  userlogin:{usersettings,loginsuccess}}) => {
    let curgateway,curdevice;
    let indexgatewayid = lodashget(usersettings,'indexgatewayid');
    let curdeviceid = lodashget(usersettings,'indexdeviceid');
    if(!curgateway){
      curgateway = gateways[indexgatewayid];
    }
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
    return {curgateway,savequery_alaram,
      ispopcaresel_single_index_gateway,ispopcaresel_single_index_device,
      curdevice,loginsuccess,devices,usersettings,viewtype,realtimealarmcount:realtimealarmlist.length};
}
export default connect(mapStateToProps)(App);
