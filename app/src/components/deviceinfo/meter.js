import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Progress  from 'antd/lib/progress';
import 'antd/dist/antd.css';
import Wind1 from "../../img/wind1.png";
import Wind2 from "../../img/wind2.png";
import Wind3 from "../../img/wind3.png";
import {getCoureName,getspeedgrade} from '../../util';
import lodashget from 'lodash.get';
import lodashincludes from 'lodash.includes';
import lodashmap from 'lodash.map';
import Imgjtra from "../../img/lssj.png";
import Imgjtrb from "../../img/lis.png";

const WindcontrolC = (props)=>{
  const {curdevice,windgradesettings} = props;
  const getstyleimage1 = (degree)=>{
    return {
        'transform':        `rotate(${degree}deg)`,
        'msTransform':      `rotate(${degree}deg)`,
        'MozTransform':     `rotate(${degree}deg)`,
        'WebkitTransform':  `rotate(${degree}deg)`,
        'OTransform':       `rotate(${degree}deg)`,
        };
  }
  const degree_winddirection = 0;//方向 win3
  const degree_point = lodashget(curdevice,'realtimedata.winddirection',0);//指针 win2
  const windspeed = lodashget(curdevice,'realtimedata.windspeed',0);
  const windgrade = getspeedgrade(windspeed,windgradesettings);
  const degree_windspeed = 360-windgrade/12*360+degree_point;//风力 win1
  return (
    <div className="windcontrol">
        <div className="windcontrolcol">
			<img alt="" style={getstyleimage1(degree_windspeed)} src={Wind1} className="wind1" />
			<img alt="" style={getstyleimage1(degree_winddirection)}  src={Wind3} className="wind3" />
			<img alt="" style={getstyleimage1(degree_point)}  src={Wind2} className="wind2" />
        </div>
			<div className="windcontroltxt">
				<p>
					<span>{getCoureName(lodashget(curdevice,'realtimedata.winddirection'))}风</span>
					<span>风向</span>
				</p>
				<p>
					<span>{lodashget(curdevice,'realtimedata.windspeed')}级</span>
					<span>风力</span>
				</p>
			</div>
		</div>);
}
const mapStateToProps = ({app:{windgradesettings}}) => {
  return {windgradesettings}
}
const Windcontrol = connect(mapStateToProps)(WindcontrolC);

const ProgressCtrl = (props)=>{
  const {curdevice,fieldname,fieldsprops,index} = props;
  let unitstring = '';
  if(lodashget(fieldsprops,'unit','') !==''){
    unitstring = `(${lodashget(fieldsprops,'unit','')})`;
  }
  return (
    <div className={`chartli chart${index}`}>
      <Progress type="circle" percent={100} width={70} format={percent => `${lodashget(curdevice,`realtimedata.${fieldname}`,'')}`} />
      <span>{`${fieldsprops.showname}`}{unitstring}</span>
    </div>
  )
}
class App extends React.Component {
    viewhistory=()=>{
      const {curdevice} = this.props;
      this.props.history.push(`/history/${curdevice._id}`);
     }

     viewhistorychart = ()=>{
       const {curdevice} = this.props;
       this.props.history.push(`/historycharts/${curdevice._id}`);
     }
  	render() {
      const {curdevice,viewtype} = this.props;
      if(!!curdevice){
        const {fields,fieldslist_detail,fieldslist_brief} = viewtype;
        let isshowwincontrol = lodashincludes(fieldslist_detail,'winddirection') && lodashincludes(fieldslist_detail,'windspeed');
        let index = 0;
        return (
  	      	<div className="meter">
  	        	<div className="title"><h2>实时数据</h2>
              <div className="titlett">
              <span><img alt="" src={Imgjtra} /><span onClick={this.viewhistory}>历史数据</span></span>
              <span><img alt="" src={Imgjtrb} /><span onClick={this.viewhistorychart}>历史图表</span></span>
</div>
              </div>
              {isshowwincontrol && <Windcontrol curdevice={curdevice} />}
  	        	<div className="meterchart">
                {
                    lodashmap(fieldslist_brief,(fieldname)=>{
                    if((fieldname === 'winddirection' || fieldname === 'windspeed') && isshowwincontrol){
                        //empty
                    }
                    else{
                        const fieldsprops = fields[fieldname];
                        if(!!fieldsprops){
                            index = index + 1;
                            return <ProgressCtrl key={fieldname} curdevice={curdevice} fieldname={fieldname} fieldsprops={fieldsprops} index={index} />
                        }
                    }
                })
            }
            </div>

  	      	</div>
  	    );
      }
      return <div />
  	}
}

export default withRouter(App);
