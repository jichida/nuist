import React from 'react';
import { connect } from 'react-redux';
import "./index.css";
import Header from "../header";
import AbstractBar from "../abstract";
import HistoryDataBar from "../history_data";
import Footer from "../footer";

import {
  ui_notifyresizeformap,
  ui_setmapstyle
} from '../../actions';
import NodeSel from '../nodesel';

class App extends React.Component {
    componentDidMount(){
      const setmapstyle = (delay)=>{
				// window.setTimeout(()=>{
					this.props.dispatch(ui_notifyresizeformap({
						divid:'mapidplaceholder',
						delay
					}));
				// },0);
			}

			setmapstyle(0);

			window.addEventListener('resize', ()=>{
				setmapstyle(50);
			});
    }

    componentWillUnmount() {
      const {mapstyle} = this.props;
			const mapstylenew = {...mapstyle,display:'none'};

			this.props.dispatch(ui_setmapstyle(mapstylenew));
			window.removeEventListener('resize',()=>{
			});
    }
    render() {
        return (
            <div className="deployment-page root-page">
                <Header />
                <div className="dashboard">
                <AbstractBar />
                <main></main>
                <HistoryDataBar />
                </div>
            </div>
        //     <div className="indexPage">
        //     <Header />
        //     <div className="content">
        //     <div className="indextit">欢迎访问大坝智能监控系统</div>
        //     <div className="cont">
        //     <div className="left">
        //     <div className="tit">节点列表</div>
        //       <NodeSel />
        //     </div>
        //       <div className="center_right">
        //           <div className="tt">节点拓扑</div>
        //           <div id='mapidplaceholder' style={{height:'680px',width:'875px'}}/>
        //       </div>
        // </div>
        // </div>
        // <Footer />
        // </div>
    );
    }
}

const mapStateToProps = ({app:{mapstyle}})=> {
    return {mapstyle};
}
export default connect(mapStateToProps)(App);
