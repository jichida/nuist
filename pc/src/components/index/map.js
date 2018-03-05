import React from 'react';
import Img from "../../img/z2.jpg";
import Weather2 from "../../img/5.jpg";
import "./map.css";

class App extends React.Component {
  render() {
    return (
      <div className="map_indexPage">
        <img src={Img} />
      </div>
    );
  }
}

export default App;
