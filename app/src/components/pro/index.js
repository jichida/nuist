import React from 'react';
import { connect } from 'react-redux';
import Swiperimg from "./swiperimg";
import Exit from "../../img/22.png";
import List from "./list.js";
import Info from "./info.js";

import Footer from "../footer";
import "./style.css";
import {getproductlist_request} from '../../actions';

class App extends React.Component {

    constructor(props) {  
        super(props);  
        this.state = {showproinfo:true};
    } 

    componentDidMount () {
      this.props.dispatch(getproductlist_request({}));
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
                <List />
                { !!showproinfo && <Info /> }
                
                <Footer history={this.props.history} sel={"pro"} />
            </div>
        );
    }
}

export default connect()(App);
