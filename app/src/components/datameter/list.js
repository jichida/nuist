import React from 'react';
// import Exit from "../../img/22.png";
// import Meter from "./meter";
import lodashget from 'lodash.get';
import lodashmap from 'lodash.map';
import {getCoureName,getindexstring} from '../../util';

const TitleC = (props)=>{
	const {fieldslist_brief,fields} = props;
	return (<div className="t1">
				{
					lodashmap(fieldslist_brief,(fieldname)=>{
						const fieldsprops = fields[fieldname];
						if(!!fieldsprops){
							return (<span key={fieldname}>{`${fieldsprops.showname}`}</span>);
						}
					})
				}
			</div>);
}

const TitleD = (props)=>{
	const {curdevice,fieldslist_brief,fields} = props;
	return (<div>
				{
					lodashmap(fieldslist_brief,(fieldname)=>{
						const fieldsprops = fields[fieldname];
						if(!!fieldsprops){
							let showvalue = lodashget(curdevice,`realtimedata.${fieldname}`);
							if(fieldname === 'winddirection'){
								showvalue = getCoureName(lodashget(curdevice,`realtimedata.${fieldname}`));
							}
							return (<span  key={fieldname}>{showvalue}
								{`${lodashget(fieldsprops,'unit','')}`}
							</span>);
						}
					})
				}
			</div>);
}

class App extends React.Component {

	 pushurl=(name)=>{
        this.props.history.push(`/${name}`);
    }

  	render() {
			const {devicelist,devices,devicetype} = this.props;
	    return (
	      	<div className="datamonitordata">
							{
								lodashmap(devicelist,(did,index)=>{
									const curdevice = devices[did];
									const {fields,fieldslist_brief} = devicetype[curdevice.devicetype];
									if(!!curdevice){
										return (
											<ul key={did}>
												<li className="tt" onClick={this.pushurl.bind(this, `datameter/${did}/${index+1}`)}>
						        			<div>
						        				<span>{getindexstring(index+1,2)}</span>
						        				<span> {lodashget(curdevice,'name')} - {lodashget(curdevice,'locationname')}</span>
						        			</div>
						        			<div>
						        				<span>查看详细数据</span>
						        			</div>
						        		</li>
						        		<li className="dd">
						        			<TitleC  key={`${did}_c`} fieldslist_brief={fieldslist_brief} fields={fields}/>
													{
														!!curdevice.realtimedata ?
														 (<TitleD key={`${did}_d`} fieldslist_brief={fieldslist_brief} fields={fields} curdevice={curdevice}/>):
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
