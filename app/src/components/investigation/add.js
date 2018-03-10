import React from 'react';
import { connect } from 'react-redux';
import Header from "../header/page.js";
import "./style.css";
// import List from "./list.js";
import lodashget from 'lodash.get';
import lodashmap from 'lodash.map';
import {setvote_request} from '../../actions';

class App extends React.Component {
    constructor(props) {  
         super(props); 
         this.state = {selectedoption:null};
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
      const voteid = lodashget(this.props,'curvote._id');
      const voteresult = lodashget(this.state,'selectedoption');
      if(!!voteid && !!voteresult){
        this.props.dispatch(setvote_request({voteid,voteresult}));
      }
    }
    onClickView = ()=>{

    }
  	render() {
      const {curvote} = this.props;
      if(!curvote){
        return <div />
      }
      const isfilled = lodashget(curvote,'isfilled',false);
      const {selectedoption} = this.state;
	    return (
	      	<div className="addinvestigationPage">
	        	<Header history={this.props.history} title={lodashget(curvote,'name','')}/>
	        	<div className="tt"><span>{lodashget(curvote,'publishdate')}</span><span> 参与人数{lodashget(curvote,'researchrecords',[]).length}人</span></div>
	        	<div className="ll">
					<ul>
						<li>
							<div className="tit"></div>
							<div className="aslist">
                {
                  lodashmap(lodashget(curvote,'answeroptions',[]),(option,index)=>{
                    return (<div className="dd" key={index}><span>{option.optionname}.{option.answername}</span></div>)
                  })
                }
							</div>
							<div className="btnlist">
                {
                  lodashmap(lodashget(curvote,'answeroptions',[]),(option,index)=>{
                    if(selectedoption === option.optionname){
                      return (<div key={index} onClick={()=>{
                        if(!isfilled){
                          this.onClickOption(option.optionname)
                        }
                      }} className="sel"><span>{option.optionname}</span></div>);
                    }
                    return (<div key={index} onClick={()=>{
                      if(!isfilled){
                        this.onClickOption(option.optionname)
                      }
                    }}><span>{option.optionname}</span></div>)
                  })
                }
							</div>
						</li>
					</ul>
					{isfilled?<div />:<div onClick={this.onClickAdd} className="addbtn">提交调查问卷</div>}
	        </div>
	      	</div>
	    );
  	}
}
//<div onClick={this.onClickView} className="addbtn">查看结果</div>

const mapStateToProps = ({vote:{votelist,votes}},props) => {
    const curvote = votes[props.match.params.id];
    return {curvote};
}
export default connect(mapStateToProps)(App);
