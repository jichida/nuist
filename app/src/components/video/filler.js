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
      this.props.dispatch(set_uiapp({ispopcaresel_single_video:true}));
    }
  	render() {
      const {curdevice} = this.props;
      if(!curdevice){
        return (<div />);
      }
	    return (
	      	<div className="datamonitorfiller">
	      		<div  onClick={this.pushurl.bind(this, `datameter/${curdevice._id}/0`)} className="fillerhead city"><img src={City} /><span>{lodashget(curdevice,'name')}</span></div>
	        	<div  onClick={this.pushurl.bind(this, `datameter/${curdevice._id}/0`)} className="fillerhead point"><img src={Point} /><span>{lodashget(curdevice,'locationname')}</span></div>
	      		<div onClick={this.onClickPopCareSel} className="fillerhead collect"><img src={Collect} /><span>当前设备</span></div>

	      	</div>
	    );
  	}
}

const APP2 = withRouter(App);
export default connect()(APP2);
