import React from 'react';
// import Footer from "../footer";
import lodashget from 'lodash.get';
import lodashmap from 'lodash.map';
import {getCoureName} from '../../util';

const DeviceInfoDetailList = (props)=>{
	const {curdevice,devicetype} = props;
	const {fieldslist_brief,fields} = devicetype[curdevice.devicetype];
	return (<ul className="data_list">
				{
					lodashmap(fieldslist_brief,(fieldname)=>{
						const fieldsprops = fields[fieldname];
						if(!!fieldsprops){
							let showvalue = lodashget(curdevice,`realtimedata.${fieldname}`);
							if(fieldname === 'winddirection'){
								showvalue = getCoureName(lodashget(curdevice,`realtimedata.${fieldname}`));
							}
							return (
								<li  key={fieldname}>
									<span>
										{`${fieldsprops.showname}`}
									</span>
									<span>
										{showvalue}
										{`${lodashget(fieldsprops,'unit','')}`}
									</span>
							</li>);
						}
					})
				}
			</ul>);
}

export default DeviceInfoDetailList;
