import React from 'react';
import { connect } from 'react-redux';
import lodashmap from 'lodash.map';
import lodashget from 'lodash.get';
import Jtimg from "../../img/jt.png";
import "./index.css";


class App extends React.Component {

    render() {
        const {devicelist,devices,usersettings} = this.props;
				const indexdeviceid = usersettings.indexdeviceid;
        return (
          <div className="shuju_centet">
          <div className="shuju_tit">
            <div className="shuju_titleft">
              <span className="active">48小时数据</span>
              <span>历史数据</span>
              <span>温度<img alt="" src={Jtimg} /></span>
            </div>
            <div className="shuju_titright">
              从<span>2018-12-12 14:50</span>到<span>2018-12-12 14:50</span>
            </div>
          </div>
          <ul className="shuju scroll_bar">
              <li className="bge5">
                <em>ID</em>
                <span>节点</span>
                <span>时间</span>
                <span>数值</span>
              </li>
              <li>
                <em>1</em>
                <span>桃花水库1</span>
                <span>2018-02-12 12:20:20</span>
                <span>12.9</span>
              </li>
              <li>
                <em>1</em>
                <span>桃花水库1</span>
                <span>2018-02-12 12:20:20</span>
                <span>12.9</span>
              </li>
              <li>
                <em>1</em>
                <span>桃花水库1</span>
                <span>2018-02-12 12:20:20</span>
                <span>12.9</span>
              </li>
          </ul>
          </div>
        );
    }
}

const mapStateToProps = ({device,userlogin}) => {
    const {devicelist,devices} = device;

    return {devicelist,devices,usersettings:userlogin.usersettings};
}
export default connect(mapStateToProps)(App);
