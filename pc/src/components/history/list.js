import React from 'react';
import { connect } from 'react-redux';
// import Exit from "../../img/22.png";
import lodashmap from 'lodash.map';
import lodashget from 'lodash.get';
import {getCoureName} from '../../util';
// import jt2 from "../../img/jt.png";


const TitleC = (props)=>{
	const {fieldslist_brief,fields} = props;
	return (<div className="tit">
				{
					lodashmap(fieldslist_brief,(fieldname)=>{
						const fieldsprops = fields[fieldname];
						if(!!fieldsprops){
							return (<span key={fieldname}>{`${fieldsprops.showname}`}</span>);
						}
					})
				}
				<span>时间</span>
			</div>);
}

const TitleD = (props)=>{
	const {curdevice,fieldslist_brief,fields,vs} = props;
	return (<li>
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
				  <span className="small">{vs}</span>
			</li>);
}

class App extends React.Component {

  	render() {
      const {retlist,devicetype,curdevice} = this.props;
			const {fields,fieldslist_brief} = devicetype[curdevice.devicetype];
      const ticktimestringlist = lodashget(retlist,'ticktimestring',[]);

	    return (
	      	<div className="monitordata">
	      		<TitleC fields={fields} fieldslist_brief={fieldslist_brief} />
	        	<ul>
              {
                lodashmap(ticktimestringlist,(vs,index)=>{
									const v = {};
									lodashmap(fieldslist_brief,(fieldname)=>{
										if(!!retlist[fieldname]){
											v[fieldname] = retlist[fieldname][index];
										}
									});
									const curdevice = {
										realtimedata:v
									}
									return (<TitleD key={index} fields={fields} fieldslist_brief={fieldslist_brief} vs={vs} curdevice={curdevice}/>);
  							})
              }
	        	</ul>

	      	</div>

	    );
  	}
}

const mapStateToProps = ({historydevice:{historydevices},device:{devicetype}},props) => {
    const did = lodashget(props,'curdevice._id');
    const retlist = lodashget(historydevices,`${did}`,[]);
    return {retlist,devicetype};
}
export default connect(mapStateToProps)(App);
