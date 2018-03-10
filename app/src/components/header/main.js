import React from 'react';
import Title from "../../img/indextitle.png";
import Userlnk from "../../img/13.png";
import "./main.css";

class App extends React.Component {
  	render() {
    	return (
      		<div className="mainheader">
      	 		<img alt="" src={Title} className="maintitle" />
      	 		<img alt="" src={Userlnk} className="userlnk" onClick={this.props.onClickUserlnk}/>
      		</div>
    	);
  	}
}

export default App;
