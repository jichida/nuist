import React from 'react';
import { connect } from 'react-redux';
import lodashget from 'lodash.get';
import lodashmap from 'lodash.map';
import {
  setvote_request,
  set_weui
} from '../../actions';

import ImageSel from '../../img/sele_sel.png';
import ImageSelNo from '../../img/selel.png';
// import "./investigation.css";

class App extends React.Component {
  constructor(props) {  
       super(props); 
       this.state = {
         selectedoption:null,
         voteindex:0
       };
  } 
  componentDidMount(){
    this.setState({
      selectedoption:lodashget(this.props,'curvote.selectedoption')
    });
  }
  onClickOption = (selectedoption)=>{
    this.setState({selectedoption});
  }
  onClickAdd = ()=>{
    const {votelist,loginsuccess} = this.props;
    if(!loginsuccess){
      this.props.dispatch(set_weui({
        toast:{
            text:'请先登录',
            type:'warning'
        }
      }));
      return;
    }
    const voteid = votelist[this.state.voteindex];
    const voteresult = lodashget(this.state,'selectedoption');
    if(!!voteid && !!voteresult){
      this.props.dispatch(setvote_request({voteid,voteresult}));
    }
  }
  onClickOther = ()=>{
    let i = this.state.voteindex + 1;
    i  = i % this.props.votelist.length;
    this.setState({voteindex:i});
  }
  render() {
    const {votelist,votes} = this.props;
    const curvote = votes[votelist[this.state.voteindex]];
    if(!curvote){
      return <div />
    }
    const isfilled = lodashget(curvote,'isfilled',false);
    const {selectedoption} = this.state;
    return (
      <div className="real_time">
          <h2 className="title"><img src="images/add.png" alt=""/><span>在线调查</span></h2>
          <div className="left_bg">
             <div className="t">{lodashget(curvote,'name','')}</div>
             <div className="li">
               {
                 lodashmap(lodashget(curvote,'answeroptions',[]),(option,index)=>{
                   if(selectedoption === option.optionname){
                     return (<a className="sele sel" key={index} onClick={()=>{
                       if(!isfilled){
                         this.onClickOption(option.optionname)
                       }
                     }} style={{
                       backgroundImage: `url(${ImageSel})`,
                     }}><span>{option.optionname}</span><span>{option.answername}</span></a>);
                   }
                   return (<a className="sele" key={index} onClick={()=>{
                     if(!isfilled){
                       this.onClickOption(option.optionname)
                     }
                   }}
                   style={{
                     backgroundImage: `url(${ImageSelNo})`,
                   }}
                   ><span>{option.optionname}</span><span>{option.answername}</span></a>)
                 })
               }

             </div>
  		       <div className="btn">
                <button onClick={this.onClickAdd.bind(this)}>提交</button>
                <button onClick={this.onClickOther.bind(this)}>换一批</button>
              </div>
          </div>

      </div>
    );
  }
}

const mapStateToProps = ({vote:{votelist,votes},userlogin:{loginsuccess}},props) => {

    return {votelist,votes,loginsuccess};
}
export default connect(mapStateToProps)(App);
