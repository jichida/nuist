import React from 'react';
import { connect } from 'react-redux';
import Exit from "../../img/22.png";
import "./style.css";
import lodashmap from 'lodash.map';
import lodashget from 'lodash.get';

class App extends React.Component {

	 pushurl=(name)=>{
        this.props.history.push(`/${name}`);
    }

  	render() {
			const {votelist,votes} = this.props;
	    return (
	      	<div className="investigationlist">
	        	<ul>
							{
									lodashmap((votelist),(vid,index)=>{
										const vote = votes[vid];
										if(!!vote){
											let isfilled = index%2 == 0;
											return (
												<li key={vid} onClick={this.pushurl.bind(this, `investigation/add/${vid}`)} className={isfilled?"del":""}>
						        			<div className="t">{index}</div>
						        			<div className="c">
												<div className="c1">{vote.name}</div>
												<div className="c2"><span>{lodashget(vote,'publishdate')}</span><span>已有{vote.researchrecords.length}人参与</span></div>
						        			</div>
						        			<div className="e">
														{isfilled ? '已填':<img src={Exit} />}
						        			</div>
						        		</li>);
										}
									})
							}
	        	</ul>
	      	</div>
	    );
  	}
}

const mapStateToProps = ({vote:{votelist,votes}}) => {
    return {votelist,votes};
}
export default connect(mapStateToProps)(App);
