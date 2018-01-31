import React from 'react';
import Exit from "../../img/22.png";

class App extends React.Component {

  	render() {
	    return (
	      	<div className="monitordata">
	      		<div className="tit">
	      			<span>风向</span>
	      			<span>风力</span>
	      			<span>风力</span>
	      			<span>湿度</span>
	      			<span>气压</span>
	      			<span>雨量</span>
	      			<span>时间</span>
	      		</div>
	        	<ul>
	        		<li>
	        			<span>偏东风</span>
	        			<span>3级</span>
	        			<span>26℃</span>
	        			<span>36%</span>
	        			<span>1003Pa</span>
	        			<span>25mm</span>
	        			<span>01-18 11:22</span>
	        		</li>
	        		<li>
	        			<span>偏东风</span>
	        			<span>3级</span>
	        			<span>26℃</span>
	        			<span>36%</span>
	        			<span>1003Pa</span>
	        			<span>25mm</span>
	        			<span>01-18 11:22</span>
	        		</li>
	        	</ul>
	      	</div>
	    );
  	}
}

export default App;
