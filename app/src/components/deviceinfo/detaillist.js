import React from 'react';
// import Footer from "../footer";
import lodashget from 'lodash.get';
import lodashmap from 'lodash.map';
import {getCoureName} from '../../util';

const DeviceInfoDetailList = (props)=>{
	const {curdevice,viewtype} = props;
	const {fieldslist_detail,fields} = viewtype;
	return (<ul className="data_list">
				{
					lodashmap(fieldslist_detail,(fieldname,index)=>{
						const fieldsprops = fields[fieldname];
						if(!!fieldsprops){
							let showvalue = lodashget(curdevice,`realtimedata.${fieldname}`);
							if(fieldname === 'winddirection'){
								showvalue = getCoureName(lodashget(curdevice,`realtimedata.${fieldname}`));
							}
							const modeindex = index%4;
							const classnamesel = (modeindex===2||modeindex===3)?'cur':'';
							return (
								<li  key={fieldname} className={`${classnamesel}`}>
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
