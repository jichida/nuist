import React from 'react';
import { connect } from 'react-redux';
// import Exit from "../../img/22.png";
import lodashmap from 'lodash.map';
import lodashget from 'lodash.get';
import {getCoureName} from '../../util';
import Imgjtl from "../../img/jtl.png";
import Imgjtr from "../../img/jtr.png";

const TitleC = (props)=>{
	const {fieldslist_brief,fields,fieldstart,fieldend} = props;
	return (<div className="tit">
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
				<span>时间</span>
			</div>);
}

const TitleD = (props)=>{
	const {curdevice,fieldslist_brief,fields,vs,fieldstart,fieldend} = props;
	return (<li>
				{
					lodashmap(fieldslist_brief,(fieldname,fieldnameindex)=>{
						if(fieldnameindex >=fieldstart && fieldnameindex <  fieldend){
							const fieldsprops = fields[fieldname];
							if(!!fieldsprops){
								let showvalue = lodashget(curdevice,`realtimedata.${fieldname}`,'');
								if(typeof showvalue === 'number'){
									showvalue = parseInt(showvalue,10);
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
				<span>{vs}</span>
			</li>);
}


class App extends React.Component {
	constructor(props) {
	     super(props);
			 this.state = {//[fieldstart,fieldend]
				 fieldstart:0,
				 fieldend:3
			 }
	  }

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
				lilist.push (
					<TitleD key={index} curdevice={curdevice} fieldslist_brief={fieldslist_brief} fields={fields} vs={vs}
					fieldstart={this.state.fieldstart} fieldend={this.state.fieldend}/>);
				;
			}
			const onClickPrev =()=>{

			}
			const onClickNext =()=>{

			}
	    return (
	      	<div className="monitordata">
					<div className="monitordata_tit">
						<img alt="" src={Imgjtl} onClick={()=>{
							onClickPrev();
						}}/>
	      		<TitleC fieldslist_brief={fieldslist_brief} fields={fields}
						fieldstart={this.state.fieldstart} fieldend={this.state.fieldend}/>
						<img alt="" src={Imgjtr} onClick={()=>{
							onClickNext();
						}}/>
						</div>
	        	<ul>
              {lilist}
	        	</ul>
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
