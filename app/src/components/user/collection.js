import React from 'react';
import { connect } from 'react-redux';
import PopcareSel from "../popcaresel";
import Close from "../../img/close.png";
import lodashget from 'lodash.get';
import lodashmap from 'lodash.map';
import "./style.css";
import {
	set_uiapp,
	saveusersettings_request
} from '../../actions';

class App extends React.Component {

// 	  constructor(props) {  
//         super(props);  
//     } 
		onClickPopCareSel = ()=>{
			this.props.dispatch(set_uiapp({ispopcaresel_multi:true}));
		}
		onClickCloseCare = ()=>{
			this.props.dispatch(set_uiapp({ispopcare:false}));
		}
		onChangeCaresel = (value)=>{
			let usersettings = this.props.usersettings;
			usersettings.subscriberdeviceids = value;
			this.props.dispatch(saveusersettings_request(usersettings));
		}
  	render() {
			const {devices,usersettings,ispopcaresel_multi} = this.props;
			const subscriberdeviceids = lodashget(usersettings,'subscriberdeviceids',[]);
	    return (
	      	<div className="collectionlist">
	      		<div className="wamp"></div>
	      		<div className="infocontent">
		        	<div className="tit">我已关注</div>
		        	<div className="list">
								{
									lodashmap(subscriberdeviceids,(did,index)=>{
										const curdevice = devices[did];
										if(!!curdevice){
											return (<span key={index}>{lodashget(curdevice,'name','')} - {lodashget(curdevice,'locationname','')}</span>)
										}
								})
							}
		        	</div>
		        	<div className="edit" onClick={this.onClickPopCareSel}>编辑</div>
		        	<div onClick={this.onClickCloseCare} className="closediv"><img alt="" className="close" src={Close} /></div>
	        	</div>
				{ ispopcaresel_multi && <PopcareSel ismulti={true} value={subscriberdeviceids} onChange={this.onChangeCaresel}/>}
	      	</div>
	    );
  	}
}

const mapStateToProps = ({app:{ispopcaresel_multi},userlogin:{usersettings},device:{devices}}) =>{
	return {ispopcaresel_multi,usersettings,devices};
}
export default connect(mapStateToProps)(App);
