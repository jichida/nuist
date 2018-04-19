import React from 'react';
import { List, EmailField } from 'admin-on-rest/lib/mui';
import { CardActions } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import NavigationRefresh from 'material-ui/svg-icons/navigation/refresh';
import { Field } from 'redux-form';
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
  ReferenceField,
  TabbedForm,
  FormTab
} from 'admin-on-rest/lib/mui';

import FieldList from './fieldlist';
import ActionDelete from 'material-ui/svg-icons/action/delete';
import ContentAdd from 'material-ui/svg-icons/content/add';
import TimePicker from 'material-ui/TimePicker';

import moment from 'moment';

import {ImageInputUpload} from '../controls/imageupload.js';
import {ImageInputUploadArray} from '../controls/imageuploadarray.js';
import RichTextInput from '../controls/richtoolbar.js';

import FieldSelectArrayInput from './fieldarrayselect';

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
           <TabbedForm>
             <FormTab label="基本信息">
               <TextInput label="名字" source="name" />
               <ImageInputUpload label="普通节点图标"  source="iconurl_normal" />
               <ImageInputUpload label="报警节点图标"  source="iconurl_alarm" />
               <ImageInputUpload label="故障节点图标"  source="iconurl_error" />
            </FormTab>
           <FormTab label="自定义字段">
             <FieldList label="全部字段" source="fieldsall" />
             <FieldSelectArrayInput  label="简要字段列表【不超过4个】" source="fieldslist_brief" />
             <FieldSelectArrayInput label="详细字段列表" source="fieldslist_detail" />
              </FormTab>
           </TabbedForm>
       </Create>
);


const DeviceTypeTitle = ({ record }) => {
   return <span>编辑 节点类型</span>;
};

const DeviceTypeEdit = (props) => {
      return (<Edit title={<DeviceTypeTitle />} {...props}>
        <TabbedForm>
          <FormTab label="基本信息">
            <TextInput label="名字" source="name" />
            <ImageInputUpload label="普通节点图标"  source="iconurl_normal" />
            <ImageInputUpload label="报警节点图标"  source="iconurl_alarm" />
            <ImageInputUpload label="故障节点图标"  source="iconurl_error" />
         </FormTab>
        <FormTab label="自定义字段">
           <FieldList label="全部字段" source="fieldsall" />
           <FieldSelectArrayInput  label="简要字段列表【不超过4个】" source="fieldslist_brief" />
           <FieldSelectArrayInput label="详细字段列表" source="fieldslist_detail" />
         </FormTab>
        </TabbedForm>
      </Edit>);

};

{/* <CfSelectArrayInput label="简要字段列表【不超过6个】" source="fieldslist_brief" loadOptions={getOptions(props)}/>
<CfSelectArrayInput label="详细字段列表" source="fieldslist_detail" loadOptions={getOptions(props)}/> */}


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
