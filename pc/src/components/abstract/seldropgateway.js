import React from "react";
// import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import lodashget from 'lodash.get';
import { Select } from 'antd';
import lodashmap from 'lodash.map';

import {ui_selgateway} from '../../actions';

const Option = Select.Option;

class App extends React.Component {

  handleChange(value) {
    console.log(`selected gateway ${value}`);
    const {gateways} = this.props;
    if(!!gateways[value]){
      this.props.dispatch(ui_selgateway({value}));
    }
  }

  render() {
    const {curgateway,gateways} = this.props;
    let options = [];
    lodashmap(gateways,(gw)=>{
      options.push(<Option key={gw._id} value={`${gw._id}`}>{gw.name}</Option>);
    });
    return (
        <em className="sele_em">
          <Select
          showSearch
          value={lodashget(curgateway,'_id','')}
          placeholder="选择一个网关"
          optionFilterProp="children"
          onChange={(v)=>this.handleChange(v)}
          filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
        >
        {options}
        </Select>
      </em>
    )
  }
}

const mapStateToProps = ({device:{gateways,viewtype,devicelist,devices},userlogin:{usersettings}}) => {
		let curgateway;
		let indexgatewayid = lodashget(usersettings,'indexgatewayid');
		if(!curgateway){
			curgateway = gateways[indexgatewayid];
		}
    return {curgateway,gateways};
}

export default connect(mapStateToProps)(App);
