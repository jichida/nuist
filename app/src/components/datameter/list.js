import React from 'react';
// import Exit from "../../img/22.png";
// import Meter from "./meter";
import lodashget from 'lodash.get';
import lodashmap from 'lodash.map';
import {getCoureName,getindexstring} from '../../util';
import Imgjtl from "../../img/jtl.png";
import Imgjtr from "../../img/jtr.png";

const TitleC = (props)=>{
	const {fieldslist_brief,fields,fieldstart,fieldend} = props;
	return (<div className="t1">
				{
					lodashmap(fieldslist_brief,(fieldname,fieldnameindex)=>{
						if(fieldnameindex >=fieldstart && fieldnameindex <  fieldend){
							const fieldsprops = fields[fieldname];
							if(!!fieldsprops){
								return (<span key={fieldname}>{`${fieldsprops.showname}`}</span>);
							}
						}
					})
				}
			</div>);
}

const TitleD = (props)=>{
	const {curdevice,fieldslist_brief,fields,fieldstart,fieldend} = props;
	return (<div>
				{
					lodashmap(fieldslist_brief,(fieldname,fieldnameindex)=>{
						if(fieldnameindex >=fieldstart && fieldnameindex <  fieldend){
							const fieldsprops = fields[fieldname];
							if(!!fieldsprops){
								let showvalue = lodashget(curdevice,`realtimedata.${fieldname}`,'');
								if(typeof showvalue === 'number'){
									showvalue = showvalue.toFixed(2);
								}
								if(fieldname === 'winddirection'){
									showvalue = getCoureName(lodashget(curdevice,`realtimedata.${fieldname}`));
								}
								return (<span  key={fieldname}>{showvalue}
									{`${lodashget(fieldsprops,'unit','')}`}
								</span>);
							}
						}
					})
				}
			</div>);
}
const maxshowskip = 3;
class App extends React.Component {
	constructor(props) {
			 super(props);
			 this.state = {//[fieldstart,fieldend]
				 fieldstart:0,
				 fieldend:3
			 }
		}
	 pushurl=(name)=>{
        this.props.history.push(`/${name}`);
    }

  	render() {
			const {devicelist,devices,viewtypes} = this.props;
			const onClickPrev =()=>{
				const fieldstart = this.state.fieldstart;
				if( fieldstart > 0){
					this.setState({
						fieldstart:fieldstart -1,
						fieldend:fieldstart -1 + maxshowskip,
					})
				}
			}
			const onClickNext =(fieldslist_brief)=>{
				const fieldstart = this.state.fieldstart;
				if( fieldstart + 1 + maxshowskip < fieldslist_brief.length){
					this.setState({
						fieldstart:fieldstart + 1,
						fieldend:fieldstart + 1 + maxshowskip,
					})
				}
			}
	    return (
	      	<div className="datamonitordata">
							{
								lodashmap(devicelist,(did,index)=>{
									const curdevice = devices[did];
									const {fields,fieldslist_brief} = viewtypes[curdevice.viewtype];
									if(!!curdevice){
										return (
											<ul key={did}>
												<li className="tt" onClick={this.pushurl.bind(this, `deviceinfo/${did}/${index+1}`)}>
						        			<div>
						        				<span>{getindexstring(index+1,2)}</span>
						        				<span> {lodashget(curdevice,'name')}  {lodashget(curdevice,'locationname')}</span>
						        			</div>
						        			<div>
						        				<span>查看详细数据</span>
						        			</div>
						        		</li>
						        		<li className="dd">
										<div className="monitordata_tit">
										<img alt="" src={Imgjtl}  onClick={()=>{
												onClickPrev();
											}}/>
						        			<TitleC  key={`${did}_c`} fieldslist_brief={fieldslist_brief} fields={fields}
													fieldstart={this.state.fieldstart} fieldend={this.state.fieldend}/>
											<img alt="" src={Imgjtr}  onClick={()=>{
												onClickNext(fieldslist_brief);
											}}/>
											</div>
													{
														!!curdevice.realtimedata ?
														 (<TitleD key={`${did}_d`} fieldslist_brief={fieldslist_brief} fields={fields} curdevice={curdevice}
															 fieldstart={this.state.fieldstart} fieldend={this.state.fieldend}/>):
														(<div><p className = "text_center" >暂无数据</p></div>)
													}
						        		</li>
											</ul>
										)
									}
								})
							}
	      	</div>
	    );
  	}
}

export default App;
