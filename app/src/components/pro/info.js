import React from 'react';
import { connect } from 'react-redux';
import Pro1 from "../../img/pro1.png";
import Close from "../../img/close.png";
import {
	set_uiapp,
} from '../../actions';
import lodashget from 'lodash.get';

class App extends React.Component {
		onClickPopProductInfo = ()=>{
			this.props.dispatch(set_uiapp({ispopproductinfo:false}));
		}
  	render() {
			const {curproduct} = this.props;

			return (
	      	<div className="proinfo">
	      		<div className="wamp"></div>
	      		<div className="infocontent">
		        	<div className="tit">{lodashget(curproduct,'name','')}</div>
		        	<div className="img"><img src={lodashget(curproduct,'picurl',Pro1)} /></div>
		        	<div className="info">
								<p className="t">{lodashget(curproduct,'brief','')}</p>
								<div className="imgpicurldetail"><img src={lodashget(curproduct,'picurldetail',Pro1)} /></div>
							</div>
		        	<div onClick={this.onClickPopProductInfo} className="closediv"><img className="close" src={Close} /></div>
	        	</div>
	      	</div>
	    );

  	}
}

export default connect()(App);
