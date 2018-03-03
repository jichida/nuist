import React from 'react';
import { connect } from 'react-redux';
import lodashmap from 'lodash.map';
import lodashget from 'lodash.get';
import loashuniq from 'lodash.uniq';
import Point1 from "../../img/25.png";
import {set_uiapp} from '../../actions';

class App extends React.Component {

	  constructor(props) {  
        super(props);  
				this.state = {
					ismulti:true,
					cursel:props.cursel || []
				};
    } 
		onClickClose =()=>{
			this.props.dispatch(set_uiapp({ispopcaresel:false}));
		}
		onClickOK = ()=>{
			this.props.dispatch(set_uiapp({ispopcaresel:false}));
		}
		onClickSel = (deviceid)=>{

		}
		render() {
			const {mapc,mapcity,devices} = this.props;

	    return (
	      	<div className="collectionlist">
	         	<div className="editcollectionlist">
						<div className="point"><span className="title">地点节点选择</span> <span className="close" onClick={this.onClickClose}></span></div>
						<div onClick={this.onClickOK} className="btn">确定关注</div>
						<div className="pointlist">
							{
								lodashmap(mapc,(citynamearray,cityindex)=>{
									return (<div className="li" key={cityindex}>
										<div className="t">{cityindex}</div>
										<div className="p">
											{
												lodashmap(citynamearray,(cityname,citynameindex)=>{
													const didlist = mapcity[cityname];
													return (<div className="li2" key={citynameindex}>
														<div className="p2">
															<div className="t p2p">{cityname}</div>
															{
																lodashmap(didlist,(did)=>{
																	let issel = false;
																	const curdevice = devices[did];
																	if(!!curdevice){
																		if(issel){
																			return (<div key={did} className="p2p issel"><img src={Point1} />
																			<span className="n">{lodashget(curdevice,'name')}</span>
																			<span className="tip">已关注</span></div>)
																		}
																		else{
																			return (<div key={did} className="p2p"><img src={Point1} />
																			<span className="n">{lodashget(curdevice,'name')}</span>
																		 </div>);
																		}
																	}
																})
															}
														</div>
													</div>);
												})
											}
										</div>
									</div>);
								})
							}
						</div>
	      	</div>
					</div>
	    );
  	}
}

const mapStateToProps = ({device:{devicelist,devices}}) => {
		const mapc = {};//{'N':['南京','南宁']}
		const mapcity = {};//{'南京':[id,id2]}
		lodashmap(devicelist,(did)=>{
			const curdevice = devices[did];
			if(!!curdevice){
				const mapckey = lodashget(curdevice,'cityindex','其他');
				const citykey = lodashget(curdevice,'city','南京');

				let cityindexarray = lodashget(mapc,mapckey,[]);
				cityindexarray.push(citykey);
				cityindexarray = loashuniq(cityindexarray);
				mapc[mapckey] = cityindexarray;

				let cityarray = lodashget(mapcity,citykey,[]);
				cityarray.push(did);
				mapcity[citykey] = cityarray;
			}
		});
		console.log(mapc);
		console.log(mapcity);
    return {mapc,mapcity,devices};
}
export default connect(mapStateToProps)(App);
