import React from 'react';
import Weather1 from "../img/4.jpg";
import Weather2 from "../img/5.jpg";
import "../css/weather_index.css";

class App extends React.Component {
  render() {
    return (
      <div className="weather_indexPage">
        <div className="tit">
          <span>区域天气预报</span>
          <span>南京</span>
        </div>
        <div className="weatherli">
           <div className="li">
              <div className="t"><img alt="" src={Weather1} /></div>
              <div className="i">
                <p>晴天</p>
                <p>2℃～8℃</p>
                <p>今天(周三)</p>
              </div>
           </div>
			     <div className="li">
              <div className="t"><img alt="" src={Weather2} /></div>
              <div className="i">
                <p>晴天</p>
                <p>2℃～8℃</p>
                <p>今天(周三)</p>
              </div>
           </div>
        </div>
      </div>
    );
  }
}

export default App;
