import React from 'react';
import Title from "../../img/indextitle.png";
import Userlnk from "../../img/13.png";
import "./main.css";

class App extends React.Component {
  	render() {
    	return (
      		<div className="header">
      	 		<img src={Title} className="maintitle" />
      	 		<img src={Userlnk} className="userlnk" />
      		</div>
    	);
  	}
}

export default App;
