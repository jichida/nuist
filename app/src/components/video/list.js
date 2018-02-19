import React from 'react';
import Demo from "../../img/videodemo.png";
import Meter from "./meter";

class App extends React.Component {

	pushurl=(name)=>{
        this.props.history.push(`/${name}`);
    }	

  	render() {
	    return (
	      	<div className="videodata">
	        	<ul>
	        		<li className="tt">
	        			<div className="img"><img src={Demo} /></div>
	        			<div className="li"><span className="name">南京金林广场A栋</span><span className="runing">正在播放</span></div>
	        		</li>
	        		<li className="tt">
	        			<div className="img"><img src={Demo} /></div>
	        			<div className="li"><span className="name">南京金林广场A栋</span><span className="runing">正在播放</span></div>
	        		</li>
	        	</ul>
	      	</div>
	    );
  	}
}

export default App;
