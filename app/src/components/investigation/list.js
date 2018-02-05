import React from 'react';
import Exit from "../../img/22.png";
import "./style.css";

class App extends React.Component {

	pushurl=(name)=>{
        this.props.history.push(`/${name}`);
    }

  	render() {
	    return (
	      	<div className="investigationlist">
	        	<ul>
	        		<li onClick={this.pushurl.bind(this, "investigation/add")}>
	        			<div className="t">01</div>
	        			<div className="c">
							<div className="c1">关于新建水利工程对环境的影响</div>
							<div className="c2"><span>2018-01-17</span><span>共15题</span><span>已有3人参与</span></div>
	        			</div>
	        			<div className="e">
							<img src={Exit} />
	        			</div>
	        		</li>
	        		<li onClick={this.pushurl.bind(this, "investigation/add")}>
	        			<div className="t">02</div>
	        			<div className="c">
							<div className="c1">关于新建水利工程对环境的影响</div>
							<div className="c2"><span>2018-01-17</span><span>共15题</span><span>已有3人参与</span></div>
	        			</div>
	        			<div className="e">
							<img src={Exit} />
	        			</div>
	        		</li>
	        		<li onClick={this.pushurl.bind(this, "investigation/result")} className="del">
	        			<div className="t">03</div>
	        			<div className="c">
							<div className="c1">关于新建水利工程对环境的影响</div>
							<div className="c2"><span>2018-01-17</span><span>共15题</span><span>已有3人参与</span></div>
	        			</div>
	        			<div className="e">
							已填
	        			</div>
	        		</li>
	        	</ul>
	      	</div>
	    );
  	}
}

export default App;
