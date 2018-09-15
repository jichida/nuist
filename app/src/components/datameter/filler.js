import React from 'react';
import { connect } from 'react-redux';
import City from "../../img/24.png";
import Point from "../../img/25.png";
import Collect from "../../img/26.png";
import lodashget from 'lodash.get';
import {
	set_uiapp,
} from '../../actions';
import { withRouter } from 'react-router-dom';

class App extends React.Component {
		pushurl(name){
			 this.props.history.push(`/${name}`);
	 }
    onClickPopCareSel = ()=>{
      this.props.dispatch(set_uiapp({ispopcaresel_single_index_gateway:true}));
    }
  	render() {
      const {gateways,curgatewayid} = this.props;
      if(!gateways[curgatewayid]){
        return (<div />);
      }
	    return (
	      	<div className="datamonitorfiller">
		        <div onClick={this.onClickPopCareSel} className="fillerhead collect">
							<img alt="" src={Collect} />
							<span>当前网关</span>
							<span>{gateways[curgatewayid].name}</span>
						</div>
  	      </div>
	    );
  	}
}

const APP2 = withRouter(App);
export default connect()(APP2);
