import React from 'react';
import Exit from "../../img/22.png";
import Meter from "./meter";

class App extends React.Component {

	pushurl=(name)=>{
        this.props.history.push(`/${name}`);
    }

  	render() {
	    return (
	      	<div className="datamonitordata">
	        	<ul>
	        		<li className="tt" onClick={this.pushurl.bind(this, "datameter/01")}>
	        			<div>
	        				<span>01</span>
	        				<span>南京 - 金润广场</span>
	        			</div>
	        			<div>
	        				<span>查看详细数据</span>
	        			</div>
	        		</li>
	        		<li className="dd">
	        			<div className="t1">
		        			<span>风向</span>
			      			<span>风力</span>
			      			<span>湿度</span>
			      			<span>气压</span>
			      			<span>雨量</span>
			      			<span>时间</span>
		      			</div>
		      			<div>
		        			<span>偏东风</span>
			      			<span>3级</span>
			      			<span>26℃</span>
			      			<span>36%</span>
			      			<span>1003Pa</span>
			      			<span>25mm</span>
		      			</div>
	        		</li>
	        	</ul>
	        	<ul>
	        		<li className="tt" onClick={this.pushurl.bind(this, "datameter/01")}>
	        			<div>
	        				<span>01</span>
	        				<span>南京 - 金润广场</span>
	        			</div>
	        			<div>
	        				<span>查看详细数据</span>
	        			</div>
	        		</li>
	        		<li className="dd">
	        			<div className="t1">
		        			<span>风向</span>
			      			<span>风力</span>
			      			<span>湿度</span>
			      			<span>气压</span>
			      			<span>雨量</span>
			      			<span>时间</span>
		      			</div>
		      			<div>
		        			<span>偏东风</span>
			      			<span>3级</span>
			      			<span>26℃</span>
			      			<span>36%</span>
			      			<span>1003Pa</span>
			      			<span>25mm</span>
		      			</div>
	        		</li>
	        	</ul>
	        	<ul>
	        		<li>
	        			<Meter />
	        		</li>
	        	</ul>
	      	</div>
	    );
  	}
}

export default App;
