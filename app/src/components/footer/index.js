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
    render() {
        return (
          	<div className="footerPage">
            	<ul>
                    <li><img src={F1} /><span href="#" className="sel">首页</span></li>
                    <li><img src={F2_1} /><span href="#">监控</span></li>
                    <li><img src={F3_1} /><span href="#">预警</span></li>
                    <li><img src={F4_1} /><span href="#">调查</span></li>
                	<li><img src={F5_1} /><span href="#">产品</span></li>
            	</ul>
          	</div>
        );
    }
}

export default App;
