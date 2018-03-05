import React from 'react';
import { connect } from 'react-redux';
import lodashmap from 'lodash.map';
import lodashget from 'lodash.get';
import lodashfind from 'lodash.find';
import {getindexstring} from '../../util';

class App extends React.Component {

  	render() {
      const {ralist,realtimealarms,devices} = this.props;

	    return (
	      	<div className="warninglist">
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
                      const updatetime = lodashget(realtimealarm,'updatetime','');
                      const addressname = lodashget(curdevice,'addressname','');
                      return ( <li key={rid}>
                      	        			<div>
                      	        				<div className="tit">{`${content}-${type}(${value})`}</div>
                      	        				<div className="cont">
                      								<p><span>{`${devicename}`} - {`${devicelocationname}`}</span><span> {`${updatetime}`}</span></p>
                      								<p>地址：{`${addressname}`}</p>
                      	        				</div>
                      	        			</div>
                      	        			<span className="num">{getindexstring(index+1,2)}</span>
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
    if(uialarmshowall){
      alllist = realtimealarmlist;
    }
    else{
      const subscriberdeviceids = lodashget(usersettings,'subscriberdeviceids',[])
      lodashmap(realtimealarmlist,(rid)=>{
        const curdeviceid = lodashget(realtimealarms[rid],'did');
        if(!!lodashfind(subscriberdeviceids,(id)=>{
          return id === curdeviceid;
        })){
          alllist.push(rid);
        }
      });
    }
    const ralist = alllist;
    return {ralist,realtimealarms,devices,uialarmshowall};
}
export default connect(mapStateToProps)(App);
