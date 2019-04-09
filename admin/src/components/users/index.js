import React from 'react';
import { List, EmailField,RichTextInput } from 'admin-on-rest/lib/mui';
import { CardActions } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import NavigationRefresh from 'material-ui/svg-icons/navigation/refresh';
import { required,NumberInput,Create, Edit, SimpleForm, DisabledInput, TextInput,  Show,SimpleShowLayout,ShowButton,
   DateInput, LongTextInput, ReferenceManyField, Datagrid, TextField, DateField, EditButton,BooleanInput,ReferenceField,
 Filter,Filters, ReferenceInput,SelectInput,ReferenceArrayField,SingleFieldList,ChipField} from 'admin-on-rest/lib/mui';


import { Field,FieldArray } from 'redux-form';
import ActionDelete from 'material-ui/svg-icons/action/delete';
import ContentAdd from 'material-ui/svg-icons/content/add';
import TimePicker from 'material-ui/TimePicker';
import moment from 'moment';
import ResestPassword from './resetpassword';
import {CreateActions,EditActions} from '../controls/createeditactions';
import {getOptions} from '../controls/getselect.js';
import {CfSelectArrayInput} from '../controls/selectarrayinput.js';
import {ImageInputUpload} from '../controls/imageupload.js';

const UserListTitle = ({ record }) => {
  return <span>显示 用户</span>;
};
const userDefaultValue = {created_at:new Date()};

const UserCreate = (props) => (
  <Create title="新建用户" {...props} actions={<CreateActions />}>
    <SimpleForm defaultValue={userDefaultValue}>
      <TextInput label="用户名" source="username" validate={required} />
      <TextInput label="密码" source="password" validate={required} />
      <TextInput label="真实姓名" source="truename"/>
      <TextInput label="备注" source="demo" />
      <CfSelectArrayInput label="允许查看数据类型" source="allowviewtypes" loadOptions={getOptions('viewtype','name','_id')}/>
      <CfSelectArrayInput label="网关组" source="gatewaygroups" loadOptions={getOptions('gatewaygroup','name','_id')}/>
    </SimpleForm>
  </Create>
);


const UserEdit = (props) => {
  return (
    <Edit title="编辑用户信息" {...props}  actions={<EditActions />}>
      <SimpleForm>
        <TextField source="id" />
        <ImageInputUpload label="左上角banner图"  source="indexbannerurl" />
        <TextField label="用户名" source="username" validate={required} />
        <TextInput label="真实姓名" source="truename"/>
        <TextInput label="备注" source="demo" />
        <CfSelectArrayInput label="允许查看数据类型" source="allowviewtypes" loadOptions={getOptions('viewtype','name','_id')}/>
        <CfSelectArrayInput label="网关组" source="gatewaygroups" loadOptions={getOptions('gatewaygroup','name','_id')}/>
      </SimpleForm>
    </Edit>
  );
};

const UserFilter = (props) => (
  <Filter {...props}>
    <TextInput label="搜索用户" source="username_q" />
  </Filter>
);

const rowStyle = (record, index) => ({
    backgroundColor: record.adminflag === 1 ? '#efe' : 'white',
});

const EditButtonWrap = (props)=>{
  const {record} = props;
  if(record.adminflag === 1){
      return null;
  }
  return <EditButton {...props}/>;
}

const UserList = (props) => (
  <List title="用户管理" filters={<UserFilter />} {...props} sort={{ field: 'created_at', order: 'DESC'}} >
    <Datagrid  bodyOptions={{ showRowHover: true }} rowStyle={rowStyle}>
        <TextField label="用户名" source="username" />
        <DateField label="注册时间" source="created_at" showTime />
        <DateField label="上次登录时间" source="updated_at" showTime />
        <ReferenceArrayField label="允许查看数据类型" reference="viewtype" source="allowviewtypes" >
                <SingleFieldList>
                    <ChipField source="name" />
                </SingleFieldList>
        </ReferenceArrayField>
        <ReferenceArrayField label="网关组" reference="gatewaygroup" source="gatewaygroups" >
                <SingleFieldList>
                    <ChipField source="name" />
                </SingleFieldList>
        </ReferenceArrayField>
        <ResestPassword />
        <EditButtonWrap />
    </Datagrid>
  </List>
);

export {UserCreate,UserList,UserEdit};
