import React from 'react';
import { List, EmailField,RichTextInput } from 'admin-on-rest/lib/mui';

import { required,NumberInput,Create, Edit, SimpleForm, DisabledInput, TextInput,Show,SimpleShowLayout,ShowButton,
   DateInput, LongTextInput, ReferenceManyField, Datagrid, TextField, DateField, EditButton,BooleanInput,ReferenceField,
 Filter,Filters,ReferenceInput,SelectInput } from 'admin-on-rest/lib/mui';

 import { ReferenceArrayInput, SelectArrayInput } from 'admin-on-rest';


import TimePicker from 'material-ui/TimePicker';
import moment from 'moment';
import _ from 'lodash';

import {CreateActions,EditActions} from '../controls/createeditactions';
import {getOptions} from '../controls/getselect.js';
import {CfSelectArrayInput} from '../controls/selectarrayinput.js';


const GatewayGroupTitle = ({record}) => {
  return <span>网关分组管理</span>
};

const GatewayGroupCreate = (props) => (
  <Create title="创建网关组" {...props}  actions={<CreateActions />} >
    <SimpleForm>
      <TextInput label="分组名称" source="name" validate={required} />
      <TextInput label="备注" source="memo" />
      <TextInput label="联系人" source="contact" />
      <CfSelectArrayInput label="选择网关列表" source="gatewayids" loadOptions={getOptions('gateway','name','_id')}/>
    </SimpleForm>
  </Create>
);

const GatewayGroupEdit = (props) => {
  return (<Edit title="编辑网关组" actions={<EditActions />} {...props}>
    <SimpleForm>
      <TextInput label="分组名称" source="name" validate={required} />
      <TextInput label="备注" source="memo" />
      <TextInput label="联系人" source="contact" />
      <CfSelectArrayInput label="选择网关列表" source="gatewayids" loadOptions={getOptions('gateway','name','_id')}/>
    </SimpleForm>
  </Edit>
  );
};

const EditBtnif = (props)=>{
  const {record} = props;
  return _.get(record,'systemflag',0) === 0?<EditButton {...props}/>:null;
}

const rowStyle = (record, index) => ({
    backgroundColor: record.systemflag === 1 ? '#efe' : 'white',
});
const GatewayGroupList = (props) => (
  <List title={<GatewayGroupTitle />} {...props}>
    {permissions =>
      <Datagrid  bodyOptions={{ showRowHover: true }} rowStyle={rowStyle}>
        <TextField label="分组名称" source="name" />
        <TextField label="备注" source="memo" />
        <TextField label="联系人" source="contact" />
        {permissions==='admin'?<EditBtnif />:null}
      </Datagrid>
    }
  </List>
);




export {GatewayGroupCreate,GatewayGroupList,GatewayGroupEdit};
