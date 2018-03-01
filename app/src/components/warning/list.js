import React from 'react';
import { connect } from 'react-redux';
import lodashmap from 'lodash.map';
import lodashget from 'lodash.get';

class App extends React.Component {

  	render() {
      const {realtimealarmlist,realtimealarms,devices} = this.props;
	    return (
	      	<div className="warninglist">
	        	<ul>
              {
								lodashmap((realtimealarmlist),(rid,index)=>{
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
                      	        			<span className="num">{index}</span>
                      	        		</li>);
                    }
                  })
              }
	        	</ul>
	      	</div>
	    );
  	}
}

const mapStateToProps = ({realtimealarm:{realtimealarmlist,realtimealarms},device:{devices}}) => {
    return {realtimealarmlist,realtimealarms,devices};
}
export default connect(mapStateToProps)(App);
