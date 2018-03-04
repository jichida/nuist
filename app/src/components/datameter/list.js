import React from 'react';
import Exit from "../../img/22.png";
import Meter from "./meter";
import lodashget from 'lodash.get';
import lodashmap from 'lodash.map';
import {getCoureName,getindexstring} from '../../util';

class App extends React.Component {

	 pushurl=(name)=>{
        this.props.history.push(`/${name}`);
    }

  	render() {
			const {devicelist,devices} = this.props;
	    return (
	      	<div className="datamonitordata">

							{
								lodashmap(devicelist,(did,index)=>{
									const curdevice = devices[did];
									if(!!curdevice){
										return (
											<ul key={did}>
												<li className="tt" onClick={this.pushurl.bind(this, `datameter/${did}/${index+1}`)}>
						        			<div>
						        				<span>{getindexstring(index,2)} </span>
						        				<span>{lodashget(curdevice,'name')} - {lodashget(curdevice,'locationname')}</span>
						        			</div>
						        			<div>
						        				<span>查看详细数据</span>
						        			</div>
						        		</li>
						        		<li className="dd">
						        			<div className="t1">
							        			<span>风向</span>
								      			<span>风力</span>
								      			<span>湿度</span>
								      			<span>气压</span>
								      			<span>雨量</span>
								      			<span>时间</span>
							      			</div>
													{
														!!curdevice.realtimedata ? (	<div>
									        			<span>{getCoureName(lodashget(curdevice,'realtimedata.winddirection'))}风</span>
										      			<span>{lodashget(curdevice,'realtimedata.windspeed')}级</span>
										      			<span>{lodashget(curdevice,'realtimedata.temperature')}℃</span>
										      			<span>{lodashget(curdevice,'realtimedata.humidity')}%</span>
										      			<span>{lodashget(curdevice,'realtimedata.pressure')}Pa</span>
										      			<span>{lodashget(curdevice,'realtimedata.rainfall')}mm</span>
									      			</div>):(<div>暂无数据</div>)
													}

						        		</li>
											</ul>
										)
									}
								})
							}
	        	{/* <ul>
	        		<li>
	        			<Meter />
	        		</li>
	        	</ul> */}
	      	</div>
	    );
  	}
}

export default App;
