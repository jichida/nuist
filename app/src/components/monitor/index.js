import React from 'react';
import Meter from "./meter";
import "./style.css";
import Header from "../header/page.js";
import List from "./list.js";
import Filler from "./filler.js";
import Report from "./report.js";
import Footer from "../footer";

class App extends React.Component {

    render() {
        console.log("this.props.showproid");
        console.log(this.props.showproid);
        return (
            <div className="monitorPage">
                <Header history={this.props.history} title="01-南京-金润广场" />
                <Meter />
                <Filler />
                <List />
                <Report />
            </div>
        );
    }
}

export default App;
