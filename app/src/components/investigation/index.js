import React from 'react';
import { connect } from 'react-redux';
import Swiperimg from "./swiperimg";
import "./style.css";
import List from "./list.js";
import Footer from "../footer";
import {getvotelist_request} from '../../actions';

class App extends React.Component {

    componentDidMount () {
      this.props.dispatch(getvotelist_request({}));
    }

  	render() {
	    return (
	      	<div className="investigationPage">
	        	<Swiperimg />
	        	<List history={this.props.history} />
	        	<Footer history={this.props.history} sel={"investigation"}  />
	      	</div>
	    );
  	}
}

export default connect()(App);
