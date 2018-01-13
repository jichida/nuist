import React, { Component } from 'react';
import { connect } from 'react-redux';
import Paper from 'material-ui/Paper';
import EditTable from './material-ui-table-edit.js';
import { Fields } from 'redux-form';
import Divider from 'material-ui/Divider';
import _ from 'lodash';

const renderPms = ({ meta: { touched, error } = {}, input: { ...inputProps }, ...props }) =>{
  console.log(`renderGroupEdit form ==>inputProps:${JSON.stringify(inputProps)},props:${JSON.stringify(props)}`);
  let vsz = inputProps.value;
  if(typeof vsz === 'string'){
    vsz = [];
  }
  let onDelete =(values)=>{
    console.log(`onDelete :${JSON.stringify(values)}`);
    let index = _.get(values,'rowId',-1);

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
  let onChange = (values)=>{
    console.log(`onChange :${JSON.stringify(values)}`);
    let newv = _.clone(vsz);
    let index = _.get(values,'id',-1);
    if(index != -1 && index < vsz.length ){
      let permissionid = values["columns"][0].value;
      let visiablefields = values["columns"][1].value;
      newv[index] = {permissionid,visiablefields};
    }
    else if(index >= vsz.length){
      let permissionid = values["columns"][0].value;
      let visiablefields = values["columns"][1].value;
      newv.push({permissionid,visiablefields});
    }
    else{
      return;
    }

    console.log(`onChange newv:${JSON.stringify(newv)}`);
    inputProps.onChange(newv);
  }
  let rows = [];
  let headers = [
     {value: '权限名', type: 'TextFieldOnly', width: 200,options:[
       {
         value:'5a5a1113da6e595af4eb515e',
         label:'气象'
       },
       {
         value:'5a5a1198da6e595af4eb515f',
         label:'水文'
       },
       {
         value:'5a5a1846da6e595af4eb516c',
         label:'农林'
       },
       {
         value:'5a5a1850da6e595af4eb516d',
         label:'航空'
       },
       {
         value:'5a5a185eda6e595af4eb516e',
         label:'海洋'
       },
       {
         value:'5a5a186bda6e595af4eb516f',
         label:'科考'
       },
     ]},
     {value: '字段列表', type: 'Select', multi:true,width: 'auto',options:[
       { value: 'temperature', label: '温度' },
       { value: 'rainfall', label: '降雨量' },
       { value: 'humidity', label: '湿度' },
       { value: 'windspeed', label: '风力' },
       { value: 'winddirection', label: '风向' },
       { value: 'pressure', label: '大气压' },
     ]},
  ];

  _.map(vsz,(v)=>{
    rows.push(
      {columns: [
      {value: v.permissionid},
      {value: v.visiablefields},
      ]}
    );
  });

  return (<EditTable
    onDelete={onDelete}
    onChange={onChange}
    rows={rows}
    enableDelete={false}
    enableNew={false}
    headerColumns={headers}
  />);
};

export default renderPms;
