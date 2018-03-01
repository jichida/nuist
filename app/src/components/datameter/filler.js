import React from 'react';
import City from "../../img/24.png";
import Point from "../../img/25.png";
import Collect from "../../img/26.png";
import lodashget from 'lodash.get';

class App extends React.Component {

  	render() {
      const {curdevice} = this.props;
      if(!curdevice){
        return (<div />);
      }
	    return (
	      	<div className="datamonitorfiller">
	      		<div className="fillerhead city"><img src={City} /><span>{lodashget(curdevice,'name')}</span></div>
	        	<div className="fillerhead point"><img src={Point} /><span>{lodashget(curdevice,'locationname')}</span></div>
	      		<div className="fillerhead collect"><img src={Collect} /><span>我的关注</span></div>
	      	</div>
	    );
  	}
}

export default App;
