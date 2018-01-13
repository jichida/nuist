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


export const ProductFilter = props => (
    <Filter {...props}>
        <TextInput label="搜索产品名" source="name_q" />
    </Filter>
);

const ProductcreateTitle = ({ record }) => {
   return <span>新建 产品</span>;
};
const ProductlistCreate = (props) => (
       <Create {...props} title={<ProductcreateTitle />} >
           <SimpleForm>
              <TextInput label="名字" source="name" />
              <TextInput label="摘要" source="brief" />
              <ImageInputUpload label="图片"  source="picurl" />
              <ImageInputUploadArray label="产品图片列表"  source="picurls" />
              <ImageInputUpload label="详情"  source="picurldetail" />
              <DateInput label="发布时间"  source="publishdate" />
              <BooleanInput label="是否启用" source="isenabled" defaultValue={true} />
           </SimpleForm>
       </Create>
);


const ProductlistTitle = ({ record }) => {
   return <span>编辑 产品信息</span>;
};

const ProductlistEdit = (props) => {
      return (<Edit title={<ProductlistTitle />} {...props}>
          <SimpleForm>
              <DisabledInput label="Id" source="id" />
              <TextInput label="名字" source="name" />
              <ImageInputUpload label="图片"  source="picurl" />
              <ImageInputUploadArray label="产品图片列表"  source="picurls" />
              <ImageInputUpload label="详情"  source="picurldetail" />
              <DateInput label="发布时间"  source="publishdate" />
              <BooleanInput label="是否启用" source="isenabled" defaultValue={true} />
          </SimpleForm>
      </Edit>);

};



const ProductlistList = (props) => (//
     <List title="产品管理"  filters={<ProductFilter />}  {...props} >
        <Datagrid>
        <ImageField source="picurl" label="封面图片"/>
        <TextField label="名字" source="name" />
        <EditButton />
        </Datagrid>
    </List>
);


export  {ProductlistCreate,ProductlistList,ProductlistEdit};
