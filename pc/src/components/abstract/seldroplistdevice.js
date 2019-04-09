import React from "react";
// import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import lodashget from 'lodash.get';
import { Select } from 'antd';
import lodashmap from 'lodash.map';
import lodashincludes from 'lodash.includes';
import {ui_seldropdowndevice} from '../../actions';

const Option = Select.Option;

class App extends React.Component {

  handleChange(value) {
    console.log(`selected devices ${value}`);
    const {devices} = this.props;
    if(!!devices[value]){
      this.props.dispatch(ui_seldropdowndevice({value,type:this.props.type}));
    }
  }

  render() {
    const {curdevice,devices,indexgatewayid,allowviewtypeids,viewtypes,} = this.props;
    let options = [];
    lodashmap(devices,(v)=>{
      if(indexgatewayid === v.gatewayid && lodashincludes(allowviewtypeids,v.viewtype)){
        //还需要判断当前类型是否和节点类型匹配
        options.push(<Option key={v._id} value={`${v._id}`}>{v.name}({`${viewtypes[v.viewtype].name}`})</Option>);
      }
    });
    return (
        <em>
          <Select
          showSearch
          value={lodashget(curdevice,'_id','')}
style={{ width: 140 }}
          placeholder="选择一个节点"
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

const mapStateToProps = ({device:{gateways,viewtypes,devicelist,devices,allowviewtypeids},userlogin:{usersettings}}) => {
  let curdevice;
  let curdeviceid = lodashget(usersettings,'indexdeviceid');
  let indexgatewayid = lodashget(usersettings,'indexgatewayid');
  if(!!curdeviceid){
    curdevice = devices[curdeviceid];
  }
  if(!curdevice){
    for(let i = 0 ;i < devicelist.length ;i++){
      if(lodashincludes(allowviewtypeids,devicelist[i].viewtype)){
        curdevice = devices[devicelist[i]];
        break;
      }
    }
  }
  return {curdevice,devices,indexgatewayid,viewtypes,allowviewtypeids};
}

export default connect(mapStateToProps)(App);
