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
	const {dispatch,type,from,to} = props;
	const onChangeTime = (v)=>{
		// {from: "now-6M", to: "now", display: "Last 6 months", section: 0, active: false}
		console.log(v)
		if(!!dispatch){
			dispatch(querypage_set_condition({sel:v,type}));
		}
	}
	const range = {
		from,
		to
	};
	return (
<TimePicker onChangeTime={onChangeTime} range={range}>
					<DatePickerWrap showTime
						locale={locale}
						format="YYYY-MM-DD HH:mm:ss"
						placeholder="选择时间"/>
				 </TimePicker>);
}

export default connect()(QueryPage);
