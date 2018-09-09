import React from 'react';
import { connect } from 'react-redux';
import lodashmap from 'lodash.map';
import lodashget from 'lodash.get';
// import lodashfind from 'lodash.find';
import './list.css';
import {getindexstring} from '../../util';
const mapkeystring = {
  'temperature':'温度',
  'rainfall':'降雨量',
  'humidity':'湿度',
  'windspeed':'风力',
  'winddirection':'风向',
  'pressure':'大气压'
};
class App extends React.Component {

  	render() {
      const {ralist,realtimealarms,devices} = this.props;

	    return (
	      	<div className="sjyj_box rhuadong">
	        	<ul>
              {
								lodashmap(ralist,(rid,index)=>{
										const realtimealarm = realtimealarms[rid];
										if(!!realtimealarm){
                      const curdevice = lodashget(devices,`${realtimealarm.did}`);
                      const content = lodashget(realtimealarm,'content','');
                      const type = lodashget(realtimealarm,'type','');
                      const value = lodashget(realtimealarm,'value','');
                      const devicename = lodashget(curdevice,'name','');
                      const devicelocationname = lodashget(curdevice,'locationname','');
                      const updatetime = lodashget(realtimealarm,'UpdateTime','');
                      const addressname = lodashget(curdevice,'addressname','');
                      return ( <li key={rid}>
                      	        			<div className="sjyj_li">
                      	        				<div className="tit">{`${content}-${mapkeystring[type]}(${value})`} <span>{`${devicename}`} - {`${devicelocationname}`}</span> <span> {`${updatetime}`}</span> <span>地址：{`${addressname}`}</span></div>
                      	        				<div className="cont">

                      	        				</div>
<span className="num">{getindexstring(index+1,2)}</span>
                      	        			</div>
                      	        		</li>);
                    }
                  })
              }
	        	</ul>
	      	</div>
	    );
  	}
}

const mapStateToProps = ({realtimealarm:{realtimealarmlist,realtimealarms},device:{devices},app:{uialarmshowall},userlogin:{usersettings}}) => {
    let alllist = [];
    const curid = lodashget(usersettings,'indexdeviceid');
    if(!!devices[curid]){
        lodashmap(realtimealarmlist,(rid)=>{
          const curdeviceid = lodashget(realtimealarms[rid],'did');
          if(curid === curdeviceid){
            alllist.push(rid);
          }
        });
    }
    else{
      alllist = realtimealarmlist;
    }
    // if(uialarmshowall){
    //   alllist = realtimealarmlist;
    // }
    // else{
    //   // const subscriberdeviceids = lodashget(usersettings,'subscriberdeviceids',[])
    //   lodashmap(realtimealarmlist,(rid)=>{
    //     // const curdeviceid = lodashget(realtimealarms[rid],'did');
    //     // if(!!lodashfind(subscriberdeviceids,(id)=>{
    //     //   return id === curdeviceid;
    //     // })){
    //     //   alllist.push(rid);
    //     // }
    //     alllist.push(rid);
    //   });
    // }
    const ralist = alllist;
    return {ralist,realtimealarms,devices,uialarmshowall};
}
export default connect(mapStateToProps)(App);
