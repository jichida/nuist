import React from 'react';
import "./page.css";
import Leftlnk from "../../img/23.png";

class App extends React.Component {
  	render() {
  		const { title,ishidereturn } = this.props;
  		const newtitle = title || "这里是标题";
    	return (
      		<div className="pageheader">
      	 		{!ishidereturn && <span className="leftlnk" onClick={()=>{this.props.history.goBack()}}><img src={Leftlnk} /></span>}
      	 		<span className="title">{newtitle}</span>
      		</div>
    	);
  	}
}

export default App;
