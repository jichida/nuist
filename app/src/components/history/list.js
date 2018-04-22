import React from 'react';
import { connect } from 'react-redux';
// import Exit from "../../img/22.png";
import lodashmap from 'lodash.map';
import lodashget from 'lodash.get';
import {getCoureName} from '../../util';
import Imgjtl from "../../img/jtl.png";
import Imgjtr from "../../img/jtr.png";

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
				<span>{vs}</span>
			</li>);
}


class App extends React.Component {

  	render() {
      const {retlist,viewtype} = this.props;
			const {fields,fieldslist_brief} = viewtype;

      const ticktimestringlist = lodashget(retlist,'ticktimestring',[]);
	    return (
	      	<div className="monitordata">
				<div className="monitordata_tit"><img alt="" src={Imgjtl} />
	      		<TitleC fieldslist_brief={fieldslist_brief} fields={fields} />
			<img alt="" src={Imgjtr} />
			</div>
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
                  return (
                    <TitleD key={index} curdevice={curdevice} fieldslist_brief={fieldslist_brief} fields={fields} vs={vs}/>);
                  })
              }
	        	</ul>
	      	</div>
	    );
  	}
}

const mapStateToProps = ({historydevice:{historydevices},device:{viewtype}},props) => {
    const did = lodashget(props,'curdevice._id');
    const retlist = lodashget(historydevices,`${did}`,[]);
    return {retlist,viewtype};
}
export default connect(mapStateToProps)(App);
