import React from 'react';
import "./investigation.css";

class App extends React.Component {
  render() {
    return (
      <div className="investigation_indexPage">
        <div className="tit">
          <span>在线调查</span>
        </div>
        <div className="investigationli">
           <div className="t">您对我们的研究项目感兴趣吗？</div>
           <div className="li">
            <div className="i"><label><input type="checkbox" /><span>很感兴趣</span></label></div>
            <div className="i"><label><input type="checkbox" /><span>略感兴趣</span></label></div>
            <div className="i"><label><input type="checkbox" /><span>不感兴趣</span></label></div>
            <div className="btn">
              <button>提交</button>
              <button>查看投票</button>
            </div>
           </div>
        </div>
      </div>
    );
  }
}

export default App;
