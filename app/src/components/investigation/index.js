import React from 'react';
import { connect } from 'react-redux';
// import Swiperimg from "./swiperimg";
import "./style.css";
import Header from "../header/page.js";
import List from "./list.js";
// import Footer from "../footer";
import {getvotelist_request} from '../../actions';

class App extends React.Component {

    componentDidMount () {
      this.props.dispatch(getvotelist_request({}));
    }

  	render() {
	    return (
	      	<div className="investigationPage">
	        	<Header history={this.props.history} title='问卷调查'/>
	        	<List history={this.props.history} />
	      	</div>
	    );
  	}
}

export default connect()(App);
