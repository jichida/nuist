import React from 'react';
import Swiperimg from "./swiperimg";
import "./style.css";
import List from "./list.js";
import Footer from "../footer";

class App extends React.Component {

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

export default App;
