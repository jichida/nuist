import React from 'react';
import { connect } from 'react-redux';
import "./index.css";
import Header from "../header";
import Footer from "../footer";

import {
  ui_notifyresizeformap,
  ui_setmapstyle
} from '../../actions';
import NodeSel from '../nodesel';

class App extends React.Component {
    componentDidMount(){
      const setmapstyle = ()=>{
        window.setTimeout(()=>{
          this.props.dispatch(ui_notifyresizeformap('mapidplaceholder'));
        },0);
      }

      setmapstyle();

      window.addEventListener('resize', ()=>{
        setmapstyle();
      });
    }

    componentWillUnmount() {
      this.props.dispatch(ui_setmapstyle({
        display:'none'
      }));
      window.removeEventListener('resize',()=>{
      });
    }
    render() {
        return (
            <div className="indexPage">
            <Header />
            <div className="content">
            <div className="indextit">欢迎访问大坝智能监控系统</div>
            <div className="cont">
            <div className="left">
            <div className="tit">节点列表</div>
              <NodeSel />
            </div>
              <div className="center_right">
                  <div className="tt">节点拓扑</div>
                  <div id='mapidplaceholder' style={{height:'680px',width:'875px'}}/>
              </div>
        </div>
        </div>
        <Footer />
        </div>
    );
    }
}

export default connect()(App);
