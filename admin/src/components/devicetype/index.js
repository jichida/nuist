import React from 'react';
import { List, EmailField } from 'admin-on-rest/lib/mui';
import { CardActions } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import NavigationRefresh from 'material-ui/svg-icons/navigation/refresh';
import {
  CreateButton,
  RichTextField,
  NumberInput,
  Create,
  Edit,
  Filter,
  SimpleForm,
  DisabledInput,
  TextInput,
  Show,
  SimpleShowLayout,
  ShowButton,
  DateInput,
  LongTextInput,
  ReferenceManyField,
  ReferenceInput,
  Datagrid,
  TextField,
  DateField,
  EditButton,
  SelectInput,
  BooleanInput,
  BooleanField,
  ImageField,
  NumberField,
  ReferenceField
} from 'admin-on-rest/lib/mui';

import { Field } from 'redux-form';
import ActionDelete from 'material-ui/svg-icons/action/delete';
import ContentAdd from 'material-ui/svg-icons/content/add';
import TimePicker from 'material-ui/TimePicker';

import moment from 'moment';

import {ImageInputUpload} from '../controls/imageupload.js';
import {ImageInputUploadArray} from '../controls/imageuploadarray.js';
import RichTextInput from '../controls/richtoolbar.js';


export const DeviceTypeFilter = props => (
    <Filter {...props}>
        <TextInput label="搜索节点类型" source="name_q" />
    </Filter>
);

const DeviceTypecreateTitle = ({ record }) => {
   return <span>新建 节点类型</span>;
};
const DeviceTypeCreate = (props) => (
       <Create {...props} title={<DeviceTypeTitle />} >
           <SimpleForm>
              <TextInput label="名字" source="name" />
              <ImageInputUpload label="普通节点图标"  source="iconurl_normal" />
              <ImageInputUpload label="报警节点图标"  source="iconurl_alarm" />
              <ImageInputUpload label="故障节点图标"  source="iconurl_error" />
           </SimpleForm>
       </Create>
);


const DeviceTypeTitle = ({ record }) => {
   return <span>编辑 节点类型</span>;
};

const DeviceTypeEdit = (props) => {
      return (<Edit title={<DeviceTypeTitle />} {...props}>
          <SimpleForm>
            <TextInput label="名字" source="name" />
            <ImageInputUpload label="普通节点图标"  source="iconurl_normal" />
            <ImageInputUpload label="报警节点图标"  source="iconurl_alarm" />
            <ImageInputUpload label="故障节点图标"  source="iconurl_error" />
          </SimpleForm>
      </Edit>);

};



const DeviceTypeList = (props) => (//
     <List title="节点类型"  filters={<DeviceTypeFilter />}  {...props} >
        <Datagrid>
        <ImageField source="iconurl_normal" label="普通节点图标"/>
        <ImageField source="iconurl_alarm" label="报警节点图标"/>
        <ImageField source="iconurl_error" label="故障节点图标"/>
        <TextField label="名字" source="name" />
        <EditButton />
        </Datagrid>
    </List>
);


export  {DeviceTypeCreate,DeviceTypeList,DeviceTypeEdit};
