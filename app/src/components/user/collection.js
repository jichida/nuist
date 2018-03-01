import React from 'react';
import { connect } from 'react-redux';
import Pro1 from "../../img/pro1.png";
import Close from "../../img/close.png";
import Point1 from "../../img/25.png";
import "./style.css";
import {set_uiapp} from '../../actions';

class App extends React.Component {

	constructor(props) {  
        super(props);  
        this.state = {showedit:true};
    } 

    closeEdit=()=>{
		this.setState({showedit: false});
    }

    openEdit=()=>{
		this.setState({showedit: true});
    }
		onClickCloseCare = ()=>{
			this.props.dispatch(set_uiapp({ispopcare:false}));
		}
  	render() {
	    return (
	      	<div className="collectionlist">
	      		<div className="wamp"></div>
	      		<div className="infocontent">
		        	<div className="tit">我已关注</div>
		        	<div className="list">
						<span>南京 - 金润广场</span>
						<span>南京 - 金润广场</span>
						<span>南京 - 金润广场</span>
						<span>南京 - 金润广场</span>
						<span>南京 - 金润广场</span>
						<span>南京 - 金润广场</span>
						<span>南京 - 金润广场</span>
						<span>南京 - 金润广场</span>
						<span>南京 - 金润广场</span>
						<span>南京 - 金润广场</span>
						<span>南京 - 金润广场</span>
						<span>南京 - 金润广场</span>
						<span>南京 - 金润广场</span>
						<span>南京 - 金润广场</span>
						<span>南京 - 金润广场</span>
						<span>南京 - 金润广场</span>
						<span>南京 - 金润广场</span>
						<span>南京 - 金润广场</span>
						<span>南京 - 金润广场</span>
						<span>南京 - 金润广场</span>
						<span>南京 - 金润广场</span>
						<span>南京 - 金润广场</span>
						<span>南京 - 金润广场</span>
						<span>南京 - 金润广场</span>
						<span>南京 - 金润广场</span>
						<span>南京 - 金润广场</span>
						<span>南京 - 金润广场</span>
						<span>南京 - 金润广场</span>
		        	</div>
		        	<div className="edit" onClick={this.openEdit}>编辑</div>
		        	<div onClick={this.onClickCloseCare} className="closediv"><img className="close" src={Close} /></div>
	        	</div>
				{
					!!this.state.showedit &&
		        	<div className="editcollectionlist">
						<div className="point"><span className="title">地点节点选择</span> <span className="close" onClick={this.closeEdit}></span></div>
						<div className="btn">确定关注</div>
						<div className="pointlist">
							<div className="li">
								<div className="t">B</div>
								<div className="p">
									<div className="li2">
										<div className="t2">北京</div>
										<div className="p2">
											<div className="t p2p">南京全部节点</div>
											<div className="p2p issel"><img src={Point1} /><span className="n">金润广场</span><span className="tip">已关注</span></div>
											<div className="p2p"><img src={Point1} /><span className="n">金润广场</span></div>
										</div>
									</div>
								</div>
							</div>
						</div>
		        	</div>
	        	}
	      	</div>
	    );
  	}
}

export default connect()(App);
