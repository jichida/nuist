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

							if(typeof showvalue === 'number'){
								showvalue = showvalue.toFixed(2);
							}

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
			let lilist = [];
			for(let i = ticktimestringlist.length; i >0 ; i--){
				const index = i - 1;
				const vs = ticktimestringlist[index];
				const v = {};
				lodashmap(fieldslist_brief,(fieldname)=>{
					if(!!retlist[fieldname]){
						v[fieldname] = retlist[fieldname][index];
					}
				});
				const curdevice = {
					realtimedata:v
				}
				lilist.push(<TitleD key={index} fields={fields} fieldslist_brief={fieldslist_brief} vs={vs} curdevice={curdevice}/>);
			}
	    return (
	      	<div className="monitordata">
	      		<TitleC fields={fields} fieldslist_brief={fieldslist_brief} />

              {
                lilist
              }


	      	</div>

	    );
  	}
}

const mapStateToProps = ({historydevice:{historydevices},device:{viewtypes}},props) => {
    const did = lodashget(props,'curdevice._id');
    const retlist = lodashget(historydevices,`${did}`,[]);
		let viewtype = {};
		if(!!props.curdevice){
			viewtype = viewtypes[props.curdevice.viewtype];
		}
    return {retlist,viewtype};
}
export default connect(mapStateToProps)(App);
