import React from 'react';
import "./style.css";
import F1 from "../../img/3.png";
import F2 from "../../img/4.png";
import F3 from "../../img/5.png";
import F4 from "../../img/6.png";
import F5 from "../../img/7.png";
import F1_1 from "../../img/8.png";
import F2_1 from "../../img/9.png";
import F3_1 from "../../img/10.png";
import F4_1 from "../../img/11.png";
import F5_1 from "../../img/12.png";

class App extends React.Component {

    pushurl=(name)=>{
        this.props.history.push(`/${name}`);
    }

    render() {
        return (
          	<div className="footerPage">
            	<ul>
                    <li onClick={this.pushurl.bind(this, "")}>
                        <img src={this.props.sel==="index"?F1:F1_1} />
                        <a className={this.props.sel==="index"?"sel":""}>首页</a>
                    </li>
                    <li onClick={this.pushurl.bind(this, "datameter")}>
                        <img src={this.props.sel==="datameter"?F2:F2_1} />
                        <a className={this.props.sel==="datameter"?"sel":""}>监控</a>
                    </li>
                    <li onClick={this.pushurl.bind(this, "warning")}>
                        <img src={this.props.sel==="warning"?F3:F3_1} />
                        <a className={this.props.sel==="warning"?"sel":""}>预警</a>
                    </li>
                    <li onClick={this.pushurl.bind(this, "investigation")}>
                        <img src={this.props.sel==="investigation"?F4:F4_1} />
                        <a className={this.props.sel==="investigation"?"sel":""}>调查</a>
                    </li>
                    <li onClick={this.pushurl.bind(this, "pro")}>
                        <img src={this.props.sel==="pro"?F5:F5_1} />
                        <a className={this.props.sel==="pro"?"sel":""}>产品</a>
                    </li>
            	</ul>
          	</div>
        );
    }
}

export default App;
