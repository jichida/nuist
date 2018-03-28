import React from 'react';
import { connect } from 'react-redux';
import {
  set_uiapp
} from '../../actions';

import "./style.css";
import F1 from "../../img/3.png";
import F2 from "../../img/4.png";
import F3 from "../../img/5.png";
import F4 from "../../img/27.png";
import F5 from "../../img/7.png";
import F1_1 from "../../img/8.png";
import F2_1 from "../../img/9.png";
import F3_1 from "../../img/10.png";
import F4_1 from "../../img/28.png";
import F5_1 from "../../img/12.png";

class App extends React.Component {

    pushurl=({name,index})=>{
      this.props.dispatch(set_uiapp({selectedindex:index}));
      this.props.history.push(`/${name}`);
    }

    render() {
        return (
          	<div className="footerPage">
            	<ul>
                    <li onClick={this.pushurl.bind(this, {name:"",index:0})}>
                        <img alt="" src={this.props.sel==="index"?F1:F1_1} />
                        <a className={this.props.sel==="index"?"sel":""}>首页</a>
                    </li>
                    <li onClick={this.pushurl.bind(this, {name:"datameter",index:1})}>
                        <img alt="" src={this.props.sel==="datameter"?F2:F2_1} />
                        <a className={this.props.sel==="datameter"?"sel":""}>监控</a>
                    </li>
                    <li onClick={this.pushurl.bind(this, {name:"warning",index:2})}>
                        <img alt="" src={this.props.sel==="warning"?F3:F3_1} />
                        <a className={this.props.sel==="warning"?"sel":""}>预警</a>
                    </li>
                    <li onClick={this.pushurl.bind(this, {name:"video",index:3})}>
                        <img alt="" src={this.props.sel==="video"?F4:F4_1} />
                        <a className={this.props.sel==="video"?"sel":""}>视频</a>
                    </li>
                    <li onClick={this.pushurl.bind(this, {name: "pro",index:4})}>
                        <img alt="" src={this.props.sel==="pro"?F5:F5_1} />
                        <a className={this.props.sel==="pro"?"sel":""}>产品</a>
                    </li>
            	</ul>
          	</div>
        );
    }
}

export default connect()(App);
