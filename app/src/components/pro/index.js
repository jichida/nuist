import React from 'react';
import Swiperimg from "./swiperimg";
import Exit from "../../img/22.png";
import List from "./list.js";
import Info from "./info.js";
import "./style.css";


class App extends React.Component {

    render() {
        return (
            <div className="proPage">
                <Swiperimg />
                <div className="investigationlnk"><span>参与问卷调查</span><img src={Exit} /></div>
                <List />
                <Info />
            </div>
        );
    }
}

export default App;
