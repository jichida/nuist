import React from 'react';
import "./style.css";
import List from "./list.js";
import Footer from "../footer";

class App extends React.Component {

    render() {
        return (
            <div className="warningPage">
                <div className="head">
                    <div className="n"><span>56</span><span>条</span></div>
                    <div className="c"><span>共有预警信息</span></div>
                    <div className="lnk allshow">显示全部</div>
                    <div className="lnk guanzhu">我的关注</div>
                </div>
                <List />
                <Footer history={this.props.history} sel={"warning"}  />
            </div>
        );
    }
}

export default App;
