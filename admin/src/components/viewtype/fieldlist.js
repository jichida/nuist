import React, { Component } from 'react';
import { Field } from 'redux-form';
import { connect } from 'react-redux';
import Paper from 'material-ui/Paper';
import EditTable from './material-ui-table-edit.js';
import { Fields } from 'redux-form';
import Divider from 'material-ui/Divider';
import _ from 'lodash';

const renderAlaramRuleEdit = ({ meta: { touched, error } = {}, input: { ...inputProps }, ...props }) =>{
  console.log(`renderAlaramRuleEdit form ==>inputProps:${JSON.stringify(inputProps)},props:${JSON.stringify(props)}`);
  let vsz = inputProps.value || [];
  if(typeof vsz === 'string'){
    vsz = [];
  }
  const onDelete =(values)=>{
    console.log(`onDelete :${JSON.stringify(values)}`);
    const index = _.get(values,'rowId',-1);

    console.log(`onDelete index:${index}`);

    let newv = [];
    if(index !== -1 && index < vsz.length ){
      for(let i = 0;i < vsz.length; i++){
        if(i !== index){
          newv.push(vsz[i]);
        }
      }
    }
    else{
      newv = _.clone(vsz);
    }
    console.log(`onDelete newv:${JSON.stringify(newv)}`);
    inputProps.onChange(newv);
    // onDelete :{"rowId":0,"row":{"columns":[{"value":"GPS信息","selected":false,"rowId":0,"id":0,"width":150},{"value":["ChargeACVoltage","AL_Under_Ucell","AL_Over_Tcell"],"selected":false,"rowId":0,"id":1,"width":150}],"id":0}}
  };
  const onChange = (values)=>{
    console.log(`onChange :${JSON.stringify(values)}`);
    console.log(`onChange :${typeof vsz}`);
    const newv = _.clone(vsz);
    const index = _.get(values,'id',-1);
    if(index != -1 && index < vsz.length ){
      const name = values["columns"][0].value;
      const showname = values["columns"][1].value;
      const unit = values["columns"][2].value;
      const offset = values["columns"][3].value;
      const length = values["columns"][4].value;
      const ftype = values["columns"][5].value;
      newv[index] = {name,showname,unit,offset,length,ftype};
    }
    else if(index >= vsz.length){
      const name = values["columns"][0].value;
      const showname = values["columns"][1].value;
      const unit = values["columns"][2].value;
      const offset = values["columns"][3].value;
      const length = values["columns"][4].value;
      const ftype = values["columns"][5].value;
      // const iconurl = values["columns"][3].value;
      newv.push( {name,showname,unit,offset,length,ftype});
    }
    else{
      return;
    }

    console.log(`onChange newv:${JSON.stringify(newv)}`);
    inputProps.onChange(newv);
  }
  let rows = [];
  let headers = [
     {value:'字段名',type:'TextField',width:200},
     {value: '字段显示名', type: 'TextField', width: 200},
     {value: '单位', type: 'TextField', width: 200},
     {value: '偏移', type: 'TextField', width: 200},
     {value: '长度', type: 'TextField', width: 200},
     {value: '类型', type: 'TextField', width: 200},
  ];

  _.map(vsz,(v)=>{
    rows.push(
      {columns: [
        {value: v.name},
        {value: v.showname},
        {value: v.unit},
        {value: v.offset},
        {value: v.length},
        {value: v.ftype},
      ]}
    );
  });

  return (<EditTable
    enableNew={true}
    onDelete={onDelete}
    onChange={onChange}
    rows={rows}
    enableDelete={true}
    headerColumns={headers}
  />);
};



const CfAlaramRuleInput = ({source,label}) => {
  return(
      <span>
        <Field
            name={source}
            component={renderAlaramRuleEdit}
            label={label}
        />
    </span>
  )
}

CfAlaramRuleInput.defaultProps = {
    addLabel: true,
};

export default CfAlaramRuleInput;
