import React from 'react';
import Meter from "./meter";
import "./style.css";
import Header from "../header/page.js";
import List from "./list.js";
import Filler from "./filler.js";
import Report from "./report.js";

class App extends React.Component {

    render() {
        return (
            <div className="proPage">
                <Header title="01-南京-金润广场" />
                <Meter />
                <Filler />
                <List />
                <Report />
            </div>
        );
    }
}

export default App;
