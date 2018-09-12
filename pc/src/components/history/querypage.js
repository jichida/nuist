import React from 'react';
import { connect } from 'react-redux';
// import Exit from "../../img/22.png";
import lodashmap from 'lodash.map';
import lodashget from 'lodash.get';
import {getCoureName} from '../../util';
// import jt2 from "../../img/jt.png";


const QueryPage = (props)=>{
	const {fieldslist_brief,fields} = props;
	return (<div className="bounced_box">
        <div className="bounced_left">
        <h2>自定义范围</h2>
        <ul>
        <li>
        <p>从</p>
        <input type="text" />
        <span className="btn_span_button"><img src="images/rl.png" /></span>
        </li>
        <li>
        <p>到</p>
        <input type="text" />
        <span className="btn_span_button"><img src="images/rl.png" /></span>
        </li>
        <li>
        <p>刷新每</p>
        <input type="text" />
        <span className="btn_span_button">Apply</span>
        </li>
        </ul>
        </div>
        <div className="bounced_right">
        <h2>快速的范围</h2>
        <dl>
        <dd>最后2天</dd>
        <dd>最后1天</dd>
        <dd>最后4天</dd>
        <dd>最后3天</dd>
        </dl>
        <dl>
        <dd>昨天</dd>
        <dd>最后2天</dd>
        <dd>最后2天</dd>
        <dd>最后2天</dd>
        </dl>
        <dl>
        <dd>最后2天</dd>
        <dd>最后2天</dd>
        <dd>最后2天</dd>
        <dd>最后2天</dd>
        </dl>
        </div>
        </div>);
}


export default QueryPage;
