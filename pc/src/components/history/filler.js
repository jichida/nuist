import React from 'react';
import { connect } from 'react-redux';
import DatePicker from 'react-mobile-datepicker';
import Search from "../../img/search.png";
import moment from 'moment';
import {
  ui_historydevicequeryselect,
  gethistorydevicelist_request
} from '../../actions';
import lodashmap from 'lodash.map';
import lodashget from 'lodash.get';

class App extends React.Component {
    componentDidMount () {
      this.onClickQuery(this.props);
    }
    componentWillReceiveProps (nextProps) {
        const oldcurdeviceid = lodashget(this.props,'curdevice._id');
        const newcurdeviceid = lodashget(nextProps,'curdevice._id');
        if(oldcurdeviceid !== newcurdeviceid){
          //chang curdevice
          this.onClickQuery(nextProps);
        }
      }

    onClickQuery = (props)=>{
      const {periodquery,curdevice,viewtype} = props;
      console.log(periodquery);
      const {periodname,starttime,endtime} = periodquery;
      this.props.dispatch(gethistorydevicelist_request({
        fieldslist:viewtype.fieldslist_brief,
        _id:curdevice._id,
        periodname,
        starttime,
        endtime
      }));
    }

    onSelectPeriod = (periodname)=>{
      this.props.dispatch(ui_historydevicequeryselect({periodname}));
    }
    handleCancel = () => {
        // this.setState({ isOpen: false });
        this.props.dispatch(ui_historydevicequeryselect({isdateopen:false}));
    }

    onClickOpen = ({isdateopen,seltype})=>{
      this.props.dispatch(ui_historydevicequeryselect({isdateopen,seltype}));
    }

    handleSelect = (time) => {
        const {periodquery:{seltype}} = this.props;
        const t = moment(time).format('YYYY-MM-DD HH:mm:ss');
        if( seltype === 0){
          this.props.dispatch(ui_historydevicequeryselect({
            isdateopen:false,
            starttime:t
          }));
        }
        if( seltype === 1){
          this.props.dispatch(ui_historydevicequeryselect({
            isdateopen:false,
            endtime:t
          }));
        }
    }

  	render() {
      const {periodquery} = this.props;
      const {isdateopen,showFormat,dateFormat,starttime,endtime,periodname,seltype} = periodquery;
      let curtime = moment(starttime);
      if(seltype === 1){
        curtime = moment(endtime);
      }
      curtime = new Date(curtime);

      let starttime_s = moment(starttime);
      let endtime_s = moment(endtime);
      if(periodname === 'monthly'){
        starttime_s = starttime_s.format('YYYY-MM');
        endtime_s = endtime_s.format('YYYY-MM');
      }
      else if(periodname === 'minutely'){
        starttime_s = starttime_s.format('DD HH:mm');
        endtime_s = endtime_s.format('DD HH:mm');
      }
      else if(periodname === 'hourly'){
        starttime_s = starttime_s.format('MM-DD HH');
        endtime_s = endtime_s.format('MM-DD HH');
      }
      else{
        starttime_s = starttime_s.format('MM-DD');
        endtime_s = endtime_s.format('MM-DD');
      }

      const peroiddivs = [
        {
          name:'月',value:'monthly'
        },
        {
          name:'周',value:'weekly'
        },
        {
          name:'日',value:'daily'
        },
        {
          name:'时',value:'hourly'
        },
        {
          name:'分',value:'minutely'
        },
      ];

	    return (
	      	<div className="monitorfiller">
            {
              lodashmap(peroiddivs,(v)=>{
                if(v.value === periodname){
                  return (<div key={v.value} className="lselect">{v.name}</div>);
                }
                return (<div onClick={()=>{
                  this.onSelectPeriod(v.value);
                }} key={v.value} className="l">{v.name}</div>);
              })
            }
	      		<div className="d">
	      			<span >{starttime_s}</span>
	      			<span>至</span>
              <span onClick={
                ()=>{
                  this.onClickOpen({isdateopen:true,seltype:1})
                }
              }>{endtime_s}</span>
	      			<span className="search" onClick={()=>{
                this.onClickQuery(this.props)}}><img alt="" src={Search} /></span>
	      		</div>
            <DatePicker
                value={curtime}
                isOpen={isdateopen}
                onSelect={this.handleSelect}
                onCancel={this.handleCancel}
                max={new Date()}
                showFormat={showFormat}
                dateFormat={dateFormat}
                theme="ios" />
	      	</div>
	    );
  	}
}

const mapStateToProps = ({historydevice:{periodquery},device:{viewtype}},props) => {
    return {periodquery,viewtype};
}
export default connect(mapStateToProps)(App);
