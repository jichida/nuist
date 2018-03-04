import React from 'react';
import { connect } from 'react-redux';
import lodashmap from 'lodash.map';
import lodashget from 'lodash.get';
import lodashuniq from 'lodash.uniq';
import lodashfind from 'lodash.find';
import lodashpull from 'lodash.pull';

import Point1 from "../../img/25.png";
import {set_uiapp} from '../../actions';

class App extends React.Component {

	  constructor(props) {  
        super(props);  
				const initvalue = !props.ismulti?[props.value]:props.value;
				this.state = {
					cursel:initvalue || []
				};
    } 
		onClickClose =()=>{
			this.props.dispatch(set_uiapp({ispopcaresel_multi:false,ispopcaresel_single_index:false,ispopcaresel_single_datameter:false}));
		}
		onClickOK = ()=>{
			this.props.dispatch(set_uiapp({ispopcaresel_multi:false,ispopcaresel_single_index:false,ispopcaresel_single_datameter:false}));
			if(!!this.props.onChange){
				  if(!this.props.ismulti)
					{
						this.props.onChange(this.state.cursel.length>0?this.state.cursel[0]:'');
					}
					else
					{
						this.props.onChange(this.state.cursel);
					}
			}
		}
		onClickSel = (deviceid,isadd)=>{
			let curselarray = this.state.cursel;
			if(!this.props.ismulti){//单选
				if(curselarray.length === 0){
					curselarray.push(deviceid);
				}
				else{
					curselarray[0] = deviceid;
				}
			}
			else{				//多选
				if(isadd){
					curselarray.push(deviceid);
					curselarray = lodashuniq(curselarray);
				}
				else{
					curselarray = lodashpull(curselarray,deviceid);
				}
			}
			this.setState({
				cursel:curselarray
			});
		}
		render() {
			const {mapc,mapcity,devices,ismulti} = this.props;
			const {cursel} = this.state;
			const titleselected = !ismulti?'当前':'关注';
	    return (
	      	<div className="collectionlist">
	         	<div className="editcollectionlist">
						<div className="point"><span className="title">地点节点选择</span> <span className="close" onClick={this.onClickClose}></span></div>
						<div onClick={this.onClickOK} className="btn">确定</div>
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
																	let issel = !!lodashfind(cursel,(id)=>{return id === did;});
																	const curdevice = devices[did];
																	if(!!curdevice){
																		if(issel){
																			return (<div key={did} onClick={()=>this.onClickSel(did,false)} className="p2p issel"><img src={Point1} />
																			<span className="n">{lodashget(curdevice,'name')}</span>
																			<span className="tip">{titleselected}</span></div>)
																		}
																		else{
																			return (<div key={did} onClick={()=>this.onClickSel(did,true)} className="p2p"><img src={Point1} />
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
				cityindexarray = lodashuniq(cityindexarray);
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
