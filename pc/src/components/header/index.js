import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import lodashmap from 'lodash.map';
import "./style.css";
import Headimg from "../../img/1.jpg";
import {set_uiapp} from '../../actions';

let resizetimecontent = null;

class App extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
          innerWidth: window.innerWidth,
          innerHeight: window.innerHeight,
      };
  }
  componentDidMount() {
      window.addEventListener('resize', this.onWindowResize);
  }
  componentWillUnmount() {
      window.removeEventListener('resize', this.onWindowResize);
  }

  onWindowResize=()=> {
      window.clearTimeout(resizetimecontent);
      resizetimecontent = window.setTimeout(()=>{
          this.setState({
              innerWidth: window.innerWidth,
              innerHeight: window.innerHeight
          });
      }, 10)
  }
  onClickIndex =(index,lnk)=>{
    this.props.dispatch(set_uiapp({
        selectedindex:index
    }));
    this.props.history.replace(lnk);
  }
  render() {
    const lnks = [
      {
        url:'/',
        name:'大坝首页'
      },
      {
        url:'/deployment',
        name:'部署展示'
      },
      {
        url:'/realtime',
        name:'实时数据'
      },
      {
        url:'/video',
        name:'视频监控'
      },
      {
        url:'/forecast',
        name:'数据预警'
      },
      {
        url:'/forecast',
        name:'预警参数管理'
      },
      {
        url:'/adminlogin',
        name:'后台管理'
      },
    ];
    const selectedindex = this.props.selectedindex;
    let lnkscompents = [];
    lodashmap(lnks,(link,index)=>{
      if(index === selectedindex){
        lnkscompents.push(
          <span key={index} className="sel">{link.name}</span>
        )
      }//activeClassName="sel"
      else{
        lnkscompents.push(
          <span key={index} onClick={()=>{
            this.onClickIndex(index,link.url);
          }}>{link.name}</span>
        )
      }

    });
    return (
      <div className="header">
      	 <div className="head" style={{width:"100%", overflow : "hidden"}}>
			     <img alt="" src={Headimg} />
      	 </div>
      	 <div className="headnav">
      	 	<div className="nav">
				        {lnkscompents}
			     </div>
      	 </div>
      </div>
    );
  }
}

const APP2 =  withRouter(App);
const mapStateToProps = ({app:{selectedindex}}) => {
    return {selectedindex};
}
export default connect(mapStateToProps)(APP2);
