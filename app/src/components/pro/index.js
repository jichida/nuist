import React from 'react';
import Swiperimg from "./swiperimg";
import Exit from "../../img/22.png";
import List from "./list.js";
import Info from "./info.js";
import Footer from "../footer";
import "./style.css";

class App extends React.Component {

    constructor(props) {  
        super(props);  
        this.state = {showproinfo: false};
    } 

    pushurl=(name)=>{
        this.props.history.push(`/${name}`);
    }

    showinfo=()=>{

    }

    render() {
        const { showproinfo } = this.props;
        return (
            <div className="proPage">
                <Swiperimg />
                <div className="investigationlnk" onClick={this.pushurl.bind(this, "investigation")}><span>参与问卷调查</span><img src={Exit} /></div>
                <List />
                { !!showproinfo && <Info /> }
                <Footer history={this.props.history} sel={"pro"} />
            </div>
        );
    }
}

export default App;
