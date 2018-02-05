import React from 'react';
import Header from "../header/page.js";
import "./style.css";
import List from "./list.js";

class App extends React.Component {

  	render() {
	    return (
	      	<div className="addinvestigationPage">
	        	<Header history={this.props.history} />
	        	<div className="tt"><span>2018-01-17</span><span>共15题</span><span>参与人数963258人</span></div>
	        	<div className="ll">
					<ul>
						<li>
							<div className="tit">01.新农田水利设施建设以后，以前的水利设施使用情况是？</div>
							<div className="aslist">
								<div className="dd"><span>A.和新水利设施共同使用</span></div>
								<div className="dd"><span>B.和新水利设施共同使用</span></div>
								<div className="dd"><span>C.和新水利设施共同使用</span></div>
								<div className="dd"><span>D.和新水利设施共同使用</span></div>
							</div>
							<div className="btnlist">
								<div><span>A</span></div>
								<div className="sel"><span>B</span></div>
								<div><span>C</span></div>
								<div><span>D</span></div>
							</div>
						</li>
					</ul>
					<div className="addbtn">提交调查问卷</div>
	        	</div>
	      	</div>
	    );
  	}
}

export default App;
