import React from 'react';
import { connect } from 'react-redux';
import "./index.css";
import Jtimg from "../../img/jt.png";
import Header from "../header";
import Footer from "../footer";
import NodeSel from '../nodesel';
import Wximg from "../../img/wx_icon.jpg";
// import Tdimg from "../../img/tp_d.jpg";
import List from "./list.js";
import {
  // set_uiapp,
  ui_startalarm,
  ui_stopalarm
  // getrealtimealarmlist_request
} from '../../actions';

class App extends React.Component {
    componentDidMount () {
      this.props.dispatch(ui_startalarm());
      // this.props.dispatch(getrealtimealarmlist_request({}));
    }
    componentWillUnmount () {
      this.props.dispatch(ui_stopalarm());
      // this.props.dispatch(getrealtimealarmlist_request({}));
    }
    render() {
        return (
            <div className="indexPage">
            <Header />
            <div className="content">
            <div className="indextit">欢迎访问大坝智能监控系统</div>
            <div className="tita"><div className="tit_left">切换到：贵阳<img alt="" src={Jtimg}/></div><h2>综合警报</h2><div className="tit_right"><img alt="" src={Wximg} /></div></div>
            <div className="cont">
              <div className="left pt0">
                  <NodeSel />
            </div>
            <div className="center">
                <List />
            </div>
            </div>
            </div>
            <Footer />
            </div>
    );
    }
}

export default connect()(App);
