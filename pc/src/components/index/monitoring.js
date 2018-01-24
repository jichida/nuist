import React from 'react';
import Weather1 from "../../img/4.jpg";
import Weather2 from "../../img/5.jpg";
import "./monitoring.css";

class App extends React.Component {
  render() {
    return (
      <div className="monitoring_indexPage">
        <div className="tit">
          <span>实时监控</span>
          <span>南京</span>
        </div>
        <div className="monitoringli">
           <p>空气温度：20.2℃</p>
           <p>相对湿度：77%</p>
           <p>数据来源：西库水</p>
           <p>节点电压：4.3</p>
           <p>接受时间：2017／10/13 15:23</p>
        </div>
      </div>
    );
  }
}

export default App;
