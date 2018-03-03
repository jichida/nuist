import React from 'react';
import { connect } from 'react-redux';
import PopcareSel from "../popcaresel";
import Close from "../../img/close.png";

import "./style.css";
import {set_uiapp} from '../../actions';

class App extends React.Component {

	  constructor(props) {  
        super(props);  
    } 
		onClickPopCareSel = ()=>{
			this.props.dispatch(set_uiapp({ispopcaresel:true}));
		}
		onClickCloseCare = ()=>{
			this.props.dispatch(set_uiapp({ispopcare:false}));
		}
  	render() {
	    return (
	      	<div className="collectionlist">
	      		<div className="wamp"></div>
	      		<div className="infocontent">
		        	<div className="tit">我已关注</div>
		        	<div className="list">
						<span>南京 - 金润广场</span>
						<span>南京 - 金润广场</span>
						<span>南京 - 金润广场</span>
						<span>南京 - 金润广场</span>
						<span>南京 - 金润广场</span>
						<span>南京 - 金润广场</span>
						<span>南京 - 金润广场</span>
						<span>南京 - 金润广场</span>
						<span>南京 - 金润广场</span>
						<span>南京 - 金润广场</span>
						<span>南京 - 金润广场</span>
						<span>南京 - 金润广场</span>
						<span>南京 - 金润广场</span>
						<span>南京 - 金润广场</span>
						<span>南京 - 金润广场</span>
						<span>南京 - 金润广场</span>
						<span>南京 - 金润广场</span>
						<span>南京 - 金润广场</span>
						<span>南京 - 金润广场</span>
						<span>南京 - 金润广场</span>
						<span>南京 - 金润广场</span>
						<span>南京 - 金润广场</span>
						<span>南京 - 金润广场</span>
						<span>南京 - 金润广场</span>
						<span>南京 - 金润广场</span>
						<span>南京 - 金润广场</span>
						<span>南京 - 金润广场</span>
						<span>南京 - 金润广场</span>
		        	</div>
		        	<div className="edit" onClick={this.onClickPopCareSel}>编辑</div>
		        	<div onClick={this.onClickCloseCare} className="closediv"><img className="close" src={Close} /></div>
	        	</div>
				{ !!this.props.ispopcaresel && <PopcareSel />}
	      	</div>
	    );
  	}
}

const mapStateToProps = ({app:{ispopcaresel}}) =>{
	return {ispopcaresel};
}
export default connect(mapStateToProps)(App);
