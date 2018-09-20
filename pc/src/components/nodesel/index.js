import React from 'react';
import { connect } from 'react-redux';
import lodashmap from 'lodash.map';
import lodashget from 'lodash.get';
import Jtimg from "../../img/jt.png";
import "./index.css";
import {
	// ui_mycar_selcurdevice,
	ui_selgateway
} from '../../actions';

class App extends React.Component {
    selectgateway = (gid)=>{
			const {gateways} = this.props;
			if(!!gateways[gid]){
				this.props.dispatch(ui_selgateway({value:gid}));
			}

      // const usersettings = this.props.usersettings;
      // usersettings.indexdeviceid = did;
      // this.props.dispatch(saveusersettings_request(usersettings));
    }
    render() {
        const {indexgatewayid,gateways }= this.props;
				// debugger;
				const innerheight2 = window.innerHeight;
				console.log(`innerheight->${innerheight2-156-38}`)
        return (
          <div>
          <div className="left_box huadong" style={{height:`800px`, overflowY:' scroll'}}>
        <dl className="dl_bg">
        <dd>ID</dd>
        <dd>网关名</dd>
				<dd>区域<img alt="" src={Jtimg}  style={{display:'inline-block'}}/ ></dd>
        </dl>
            {
              lodashmap(gateways,(gateway,gid)=>{
                if(indexgatewayid === gid){
                  return (
                    <dl key={gid} className="sel">
                        <dd>{lodashget(gateway,'GatewayId','')}</dd>
                        <dd>{lodashget(gateway,'name','')}</dd><dd>{lodashget(gateway,'locationname','')}</dd>
                    </dl>
                  )
                }
                return (
                  <dl key={gid} onClick={()=>{this.selectgateway(gid)}}>
                      <dd>{lodashget(gateway,'GatewayId','')}</dd>
                      <dd>{lodashget(gateway,'name','')}</dd><dd>{lodashget(gateway,'locationname','')}</dd>
                  </dl>
                )
              })
            }
        </div>
        </div>
        );
    }
}

const mapStateToProps = ({device,userlogin}) => {
    const {gateways} = device;
		const indexgatewayid = userlogin.usersettings.indexgatewayid;
    return {gateways,indexgatewayid};
}
export default connect(mapStateToProps)(App);
