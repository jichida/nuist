import React from 'react';
import "./layerdevice.css";
import ImageArrow from '../../img/arrow-right.png';
import ImageLocation from '../../img/location.png';

class App extends React.Component {
  render() {
    return (
      <div className ="weui-dialog">
        <div className="weui-dialog__bd">
          <p>ID:1522<img src={ImageArrow} /></p>
          <p>风力 3级<span>气压 32%</span></p>
          <p>风力 3级<span>气压 32%</span></p>
          <p>风力 3级<span>气压 32%</span></p>
        </div>
        <div className="icon-bottom"><img src={ImageLocation} /></div>
      </div>
    );
  }
}

export default App;
