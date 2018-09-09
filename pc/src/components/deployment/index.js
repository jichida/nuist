import React from 'react';
import { connect } from 'react-redux';
import "./index.css";
import Header from "../header";
import ChartsRealtime from '../history_data/chartsrealtime';
import HistoryBar from '../history/historybar';

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
                <div className="w_1220">
        <div className="left_con left_con_bg">
        <div className="real_time">
        <h2 className="title left_bg"><img src="images/add.png" alt=""/><span>实时监控</span></h2>
                  <NodeSel />
    </div>
    </div>

    <div className="center_con">
        <div className="bor_con center_box rhuadong">
        <h2 className="title"><img src="images/jied.png"  alt=""/><span>节点拓扑</span></h2>
    <div className="map_con" style={{marginBottom:'0px'}}><div id='mapidplaceholder' style={{height:'814px',width:'100%'}}/></div>
        </div>
                    </div>
                    <div className="right_con rhuadong">
                        <ChartsRealtime />
    <div className="bor_con border_top">
    <h2 className="title"><img src="images/lis.png" alt=""/><span>历史数据</span></h2>
    <HistoryBar showflag="1"/>
    <div /> </div>

                        <div />
                    </div>

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
