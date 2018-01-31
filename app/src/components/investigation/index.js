import React from 'react';
import Swiperimg from "./swiperimg";
import "./style.css";
import List from "./list.js";


class App extends React.Component {

  	render() {
	    return (
	      	<div className="investigationPage">
	        	<Swiperimg />
	        	<List />
	      	</div>
	    );
  	}
}

export default App;
