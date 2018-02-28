import React from 'react';
import { connect } from 'react-redux';
import Header from "../header/page.js";
import "./style.css";
import List from "./list.js";
import lodashget from 'lodash.get';
import lodashmap from 'lodash.map';

class App extends React.Component {

  	render() {
      const {curvote} = this.props;
	    return (
	      	<div className="addinvestigationPage">
	        	<Header history={this.props.history} />
	        	<div className="tt"><span>2018-01-17</span><span>参与人数{lodashget(curvote,'researchrecords',[]).length}人</span></div>
	        	<div className="ll">
					<ul>
						<li>
							<div className="tit">{lodashget(curvote,'name','')}</div>
							<div className="aslist">
                {
                  lodashmap(lodashget(curvote,'answeroptions',[]),(option,index)=>{
                    return (<div className="dd" key={index}><span>{option.optionname}.{option.answername}</span></div>)
                  })
                }
							</div>
							<div className="btnlist">
								<div><span>A</span></div>
								<div className="sel"><span>B</span></div>
								<div><span>C</span></div>
								<div><span>D</span></div>
							</div>
						</li>
					</ul>
					<div className="addbtn">提交调查问卷</div>
	        	</div>
	      	</div>
	    );
  	}
}

const mapStateToProps = ({vote:{votelist,votes}},props) => {
    const curvote = votes[props.match.params.id];
    return {curvote};
}
export default connect(mapStateToProps)(App);
