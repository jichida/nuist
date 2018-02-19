import React from 'react';
import City from "../../img/24.png";
import Point from "../../img/25.png";
import Collect from "../../img/26.png";

class App extends React.Component {

  	render() {
	    return (
	      	<div className="datamonitorfiller">
	      		<div className="fillerhead city"><img src={City} /><span>南京</span></div>
	        	<div className="fillerhead point"><img src={Point} /><span>金润广场</span></div>
	      		<div className="fillerhead collect"><img src={Collect} /><span>我的关注</span></div>
	      	</div>
	    );
  	}
}

export default App;
