import React from 'react';
import { connect } from 'react-redux';
import "./style.css";
import List from "./list.js";
import Footer from "../footer";

import {getrealtimealarmlist_request} from '../../actions';

class App extends React.Component {

    componentDidMount () {
      this.props.dispatch(getrealtimealarmlist_request({}));
    }
    render() {
        const {realtimealarmcount} = this.props;
        return (
            <div className="warningPage">
                <div className="head">
                    <div className="n"><span>{realtimealarmcount>99?'99+':`${realtimealarmcount}`}</span><span>条</span></div>
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

const mapStateToProps = ({realtimealarm:{realtimealarmlist}}) => {
    return {realtimealarmcount:realtimealarmlist.length};
}
export default connect(mapStateToProps)(App);
