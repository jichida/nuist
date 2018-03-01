import React from 'react';
import { connect } from 'react-redux';
import Meter from "./meter";
import "./style.css";
import Header from "../header/page.js";
import List from "./list.js";
import Filler from "./filler.js";
import Report from "./report.js";
import Footer from "../footer";
import lodashget from 'lodash.get';

class App extends React.Component {

    render() {
        const {curdevice,index} = this.props;
        return (
            <div className="monitorPage">
                <Header history={this.props.history} title="01-南京-金润广场" />
                <Meter />
                { !!curdevice && <Filler curdevice={curdevice}/> }
                <List />
                <Report />
            </div>
        );
    }
}

const mapStateToProps = ({device:{devices}},props) => {
		const curdevice = devices[props.match.params.id];
    const index = props.match.params.index;
    return {curdevice,index};
}
export default connect(mapStateToProps)(App);
