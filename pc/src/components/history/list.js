import React from 'react';
import { connect } from 'react-redux';
// import Exit from "../../img/22.png";
import lodashmap from 'lodash.map';
import lodashget from 'lodash.get';
import {getCoureName} from '../../util';
// import jt2 from "../../img/jt.png";


const TitleC = (props)=>{
	const {fieldslist_brief,fields} = props;
	return (<dl className="bg">
				{
					lodashmap(fieldslist_brief,(fieldname)=>{
						const fieldsprops = fields[fieldname];
						if(!!fieldsprops){
							return (<dd key={fieldname}>{`${fieldsprops.showname}`}</dd>);
						}
					})
				}
				<dd>时间</dd>
			</dl>);
}

const TitleD = (props)=>{
	const {curdevice,fieldslist_brief,fields,vs} = props;
	return (<dl>
				{
					lodashmap(fieldslist_brief,(fieldname)=>{
						const fieldsprops = fields[fieldname];
						if(!!fieldsprops){
							let showvalue = lodashget(curdevice,`realtimedata.${fieldname}`,'');
							if(fieldname === 'winddirection'){
								showvalue = getCoureName(lodashget(curdevice,`realtimedata.${fieldname}`));
							}
							return (<dd  key={fieldname}>{showvalue}
								{`${lodashget(fieldsprops,'unit','')}`}
							</dd>);
						}
					})
				}
				  <dd className="small">{vs}</dd>
			</dl>);
}

class App extends React.Component {

  	render() {
      const {retlist,viewtype} = this.props;
			const {fields,fieldslist_brief} = viewtype;
      const ticktimestringlist = lodashget(retlist,'ticktimestring',[]);

	    return (
	      	<div className="monitordata">
	      		<TitleC fields={fields} fieldslist_brief={fieldslist_brief} />

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
