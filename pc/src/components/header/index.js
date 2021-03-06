import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import lodashmap from 'lodash.map';
// import Logo from "../../img/logo.png";
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
        name:'首 页'
      },
      {
        url:'/deployment',
        name:'部署展示'
      },
      {
        url:'/realtime',
        name:'数据检测'
      },
      {
        url:'/video',
        name:'视频监控'
      },
      {
        url:'/forecast',
        name:'数据预警'
      },
      // {
      //   url:'/forecast',
      //   name:'预警参数管理'
      // },
    ];
    const selectedindex = this.props.selectedindex;
    let lnkscompents = [];
    lodashmap(lnks,(link,index)=>{
      if(index === selectedindex){
        lnkscompents.push(
          // <span key={index} className="sel">{link.name}</span>
          <li className="active" key={index} onClick={()=>{ this.onClickIndex(index,link.url); }}><a>{link.name}<i></i></a></li>
        )
      }//activeClassName="sel"
      else{
        lnkscompents.push(
          // <span key={index} onClick={()=>{ this.onClickIndex(index,link.url); }}>{link.name}</span>
          <li key={index}  onClick={()=>{ this.onClickIndex(index,link.url); }}><a>{link.name}</a></li>
        )
      }
    });
    const {indexbannerurl} = this.props;

    const indexbannerimage = indexbannerurl;

    return (
      <div className="head_top ">
        <div className="head_img">
            <img src={indexbannerimage} className="logo" alt=""/>
            <ul className="headnav">
                {lnkscompents}
                <li key={`${lnkscompents.length}`}><a href="http://admin.nuistiot.com:50000/#/login" target="blank">管理员登录</a></li>
            </ul>
        </div>
      </div>
    );
  }
}

const APP2 =  withRouter(App);
const mapStateToProps = ({app:{selectedindex,indexbannerurl},userlogin:{usersettings}}) => {
    return {selectedindex,indexbannerurl};
}
export default connect(mapStateToProps)(APP2);
