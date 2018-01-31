import React from 'react';
import "./page.css";
import Leftlnk from "../../img/23.png";

class App extends React.Component {
  	render() {
  		const { title } = this.props;
  		const newtitle = title || "这里是标题";
    	return (
      		<div className="pageheader">
      	 		<span className="leftlnk"><img src={Leftlnk} /></span>
      	 		<span className="title">{newtitle}</span>
      		</div>
    	);
  	}
}

export default App;
