import React from 'react';
import Search from "../../img/search.png";

class App extends React.Component {

  	render() {
	    return (
	      	<div className="monitorfiller">
	      		<div className="l">按天显示</div>
	      		<div className="l">按周显示</div>
	      		<div className="l">按年显示</div>
	      		<div className="d">
	      			<span>2017-12-31</span>
	      			<span>至</span>
	      			<span>2017-12-31</span>
	      			<span className="search"><img src={Search} /></span>
	      		</div>
	      	</div>
	    );
  	}
}

export default App;
