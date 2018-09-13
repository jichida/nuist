import React from 'react';
import { connect } from 'react-redux';
import * as dateMath from '../../util/datemath';
// // import Exit from "../../img/22.png";
// import lodashmap from 'lodash.map';
// import lodashget from 'lodash.get';
// import {getCoureName} from '../../util';
// import jt2 from "../../img/jt.png";
import { DatePicker } from 'antd';
import locale from 'antd/lib/date-picker/locale/zh_CN';

import {querypage_set_condition} from '../../actions';
import TimePicker from '../explore/TimePicker';

const DatePickerWrap = (props)=>{
	const {value,roundUp,onChange,...rest} = props;
	const valueK = dateMath.parse(value, roundUp);
	const onChangeK = (v)=>{
		const e = {
			target:{
				value:v
			}
		}
		// console.log(v);
		onChange(e);
	}
	return <DatePicker value={valueK} onChange={onChangeK} {...rest} />
}

const QueryPage = (props)=>{
	const {dispatch,type} = props;
	const onChangeTime = (v)=>{
		// {from: "now-6M", to: "now", display: "Last 6 months", section: 0, active: false}
		console.log(v)
		if(!!dispatch){
			dispatch(querypage_set_condition({sel:v,type}));
		}
	}

	return <TimePicker onChangeTime={onChangeTime}>
					<DatePickerWrap showTime
						locale={locale}
						format="YYYY-MM-DD HH:mm:ss"
						placeholder="选择时间"/>
				 </TimePicker>


	// const {fieldslist_brief,fields,dispatch} = props;
	// const c1 = [
	// 	{name:'最近2天',key:''},
	// 	{name:'最近7天',key:''},
	// 	{name:'最近30天',key:''},
	// 	{name:'最近90天',key:''},
	// 	{name:'最近90天',key:''},
	// ]
	// return (<div className="bounced_box">
  //       <div className="bounced_left">
  //       <h2>自定义范围</h2>
  //       <ul>
  //       <li>
  //       <p>从</p>
  //       <input type="text" />
  //       <span className="btn_span_button"><img src="images/rl.png" /></span>
  //       </li>
  //       <li>
  //       <p>到</p>
  //       <input type="text" />
  //       <span className="btn_span_button"><img src="images/rl.png" /></span>
  //       </li>
  //       <li>
  //       <p>刷新每</p>
  //       <input type="text" />
  //       <span className="btn_span_button">Apply</span>
  //       </li>
  //       </ul>
  //       </div>
  //       <div className="bounced_right">
  //       <h2>快速的范围</h2>
	// 			<dl>
	// 			<dd>最近2天</dd>
  //       <dd>最近7天</dd>
  //       <dd>最近30天</dd>
  //       <dd>最近90天</dd>
	// 			<dd>半年内</dd>
  //       <dd>一年内</dd>
  //       <dd>两年内</dd>
  //       <dd>三年内</dd>
  //       </dl>
	// 			<dl>
  //       <dd>昨天</dd>
  //       <dd>前天</dd>
  //       <dd>上周的今天</dd>
	// 			<dd>上周</dd>
	// 			<dd>上月</dd>
	// 			<dd>去年</dd>
  //       </dl>
  //       <dl>
  //       <dd>今天</dd>
  //       <dd>今天开始截止到目前</dd>
  //       <dd>本周</dd>
	// 			<dd>本周截止到目前</dd>
	// 			<dd>本月</dd>
	// 			<dd>本月截止到目前</dd>
	// 			<dd>今年</dd>
	// 			<dd>今年截止到目前</dd>
  //       </dl>
  //       <dl>
  //       <dd>最近5分钟</dd>
  //       <dd>最近15分钟</dd>
  //       <dd>最近30分钟</dd>
	// 			<dd>最近1小时</dd>
	// 			<dd>最近3小时</dd>
	// 			<dd>最近6小时</dd>
	// 			<dd>最近12小时</dd>
	// 			<dd>最近24小时</dd>
  //       </dl>
  //       </div>
  //       </div>);
}

export default connect()(QueryPage);
