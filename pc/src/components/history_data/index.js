import React from "react";
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

class App extends React.Component {
  render() {
    return (
      	<div className="right_con huadong">
            <div className="bor_con">
                <h2 className="title"><img src="images/sjjc.png" /><span>数据检测</span></h2>
                <div className="data_box"><img src="images/img4.png" width="100%" /></div>
            </div>
            <div className="bor_con">
                <h2 className="title">
                	<img src="images/cpzs.png" /><span>产品展示</span>
                </h2>
                <ul className="prolist">
                    <li>
                        <p>温湿度传感器</p><img src="images/img5.png" />
                    </li>
                    <li>
                        <p>风速传感器</p><img src="images/img6.png" />
                    </li>
                    <li>
                        <p>气压传感器</p><img src="images/img7.png" />
                    </li>
                    <li>
                        <p>雨量传感器</p><img src="images/img8.png" />
                    </li>
                </ul>
            </div>
        </div>
    )
  }
}

const APP2 =  withRouter(App);
const mapStateToProps = ({app:{selectedindex}}) => {
    return {selectedindex};
}
export default connect(mapStateToProps)(APP2);