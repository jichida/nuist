import React from 'react';
import { connect } from 'react-redux';
import "./style.css";
import List from "./list.js";
import Footer from "../footer";
import lodashfind from 'lodash.find';
import lodashmap from 'lodash.map';
import lodashget from 'lodash.get';
import {
  set_uiapp,
  getrealtimealarmlist_request
} from '../../actions';

class App extends React.Component {

    componentDidMount () {
      this.props.dispatch(getrealtimealarmlist_request({}));
    }
    onClickShowAll = (uialarmshowall)=>{
      this.props.dispatch(set_uiapp({uialarmshowall}));
    }
    render() {
        const {realtimealarmcount} = this.props;
        return (
            <div className="warningPage">
                <div className="head">
                    <div className="n"><span>{realtimealarmcount>99?'99+':`${realtimealarmcount}`}</span><span>条</span></div>
                    <div className="c"><span>共有预警信息</span></div>
                    <div onClick={()=>{this.onClickShowAll(true)}} className="lnk allshow">显示全部</div>
                    <div onClick={()=>{this.onClickShowAll(false)}} className="lnk guanzhu">我的关注</div>
                </div>
                <List />
                <Footer history={this.props.history} sel={"warning"}  />
            </div>
        );
    }
}

const mapStateToProps = ({realtimealarm:{realtimealarmlist,realtimealarms},app:{uialarmshowall},userlogin:{usersettings}}) => {
    let alllist = [];
    if(uialarmshowall){
      alllist = realtimealarmlist;
    }
    else{
      const subscriberdeviceids = lodashget(usersettings,'subscriberdeviceids',[])
      lodashmap(realtimealarmlist,(rid)=>{
        const curdeviceid = lodashget(realtimealarms[rid],'did');
        if(!!lodashfind(subscriberdeviceids,(id)=>{
          return id === curdeviceid;
        })){
          alllist.push(rid);
        }
      });
    }
    const ralist = alllist;
    return {realtimealarmcount:ralist.length};
}
export default connect(mapStateToProps)(App);
