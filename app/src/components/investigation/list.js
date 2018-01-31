import React from 'react';
import Exit from "../../img/22.png";

class App extends React.Component {

  	render() {
	    return (
	      	<div className="investigationlist">
	        	<ul>
	        		<li>
	        			<div className="t">01</div>
	        			<div className="c">
							<div className="c1">关于新建水利工程对环境的影响</div>
							<div className="c2"><span>2018-01-17</span><span>共15题</span><span>已有3人参与</span></div>
	        			</div>
	        			<div className="e">
							<img src={Exit} />
	        			</div>
	        		</li>
	        		<li>
	        			<div className="t">01</div>
	        			<div className="c">
							<div className="c1">关于新建水利工程对环境的影响</div>
							<div className="c2"><span>2018-01-17</span><span>共15题</span><span>已有3人参与</span></div>
	        			</div>
	        			<div className="e">
							<img src={Exit} />
	        			</div>
	        		</li>
	        		<li>
	        			<div className="t">01</div>
	        			<div className="c">
							<div className="c1">关于新建水利工程对环境的影响</div>
							<div className="c2"><span>2018-01-17</span><span>共15题</span><span>已有3人参与</span></div>
	        			</div>
	        			<div className="e">
							<img src={Exit} />
	        			</div>
	        		</li>
	        	</ul>
	      	</div>
	    );
  	}
}

export default App;
