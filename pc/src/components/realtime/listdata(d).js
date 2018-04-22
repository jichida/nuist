import React from 'react';
import lodashget from 'lodash.get';
import lodashmap from 'lodash.map';
import {getCoureName} from '../../util';


const TitleC = (props)=>{
	const {fieldslist_brief,fields} = props;
	return (<dd>
				{
					lodashmap(fieldslist_brief,(fieldname)=>{
						const fieldsprops = fields[fieldname];
						if(!!fieldsprops){
							return (<span key={fieldname}>{`${fieldsprops.showname}`}</span>);
						}
					})
				}
			</dd>);
}

const TitleD = (props)=>{
	const {curdevice,fieldslist_brief,fields} = props;
	return (<dd>
        <span className="small">{curdevice.updated_at}</span>
				{
					lodashmap(fieldslist_brief,(fieldname)=>{
						const fieldsprops = fields[fieldname];
						if(!!fieldsprops){
							let showvalue = lodashget(curdevice,`realtimedata.${fieldname}`,'');
							if(fieldname === 'winddirection'){
								showvalue = getCoureName(lodashget(curdevice,`realtimedata.${fieldname}`));
							}
							return (<span  key={fieldname}>{showvalue}
								{`${lodashget(fieldsprops,'unit','')}`}
							</span>);
						}
					})
				}
			</dd>);
}

class App extends React.Component {
    render() {
      const {devicelist,devices,viewtype} = this.props;

      let datarowCo = [];
      lodashmap(devicelist,(did)=>{
        const curdevice = devices[did];
        if(!!curdevice){
          const {fields,fieldslist_brief} = viewtype;

          const name = lodashget(curdevice,'name','');
          // const updated_at = lodashget(curdevice,'updated_at','');
					//
          // const degree_point = lodashget(curdevice,'realtimedata.winddirection',0);//指针 win2
          // const windspeed = lodashget(curdevice,'realtimedata.windspeed',0);
          // const temperature = lodashget(curdevice,'realtimedata.temperature',0);
          // const rainfall = lodashget(curdevice,'realtimedata.rainfall',0);
          // const humidity = lodashget(curdevice,'realtimedata.humidity',0);
          // const pressure = lodashget(curdevice,'realtimedata.pressure',0);

          datarowCo.push(
            <dl key={did}>
              <dt>{name}</dt>
              <TitleD curdevice={curdevice} fields={fields} fieldslist_brief={fieldslist_brief} />
            </dl>
          );
        }
      });


      return (
        <div>
          <dl className="dl_bg">
            <dt>节点</dt>
            <TitleC fields={fields} fieldslist_brief={fieldslist_brief} />

        </dl>
          <div className="h_625 scroll_bar">
            {datarowCo}
          </div>
        </div>
      )
    }
  }

  export default App;
