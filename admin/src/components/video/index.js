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

export const VideoFilter = props => (
    <Filter {...props}>
        <TextInput label="搜索视频名" source="name_q" />
    </Filter>
);

const VideocreateTitle = ({ record }) => {
   return <span>新建 视频</span>;
};
const VideolistCreate = (props) => (
       <Create {...props} title={<VideocreateTitle />} >
           <SimpleForm>
              <TextInput label="名字" source="name" />
              <TextInput label="URL" source="url" />
              <ReferenceInput label="网关ID" source="gatewayid" reference="gateway" allowEmpty>
                <SelectInput optionText="name" />
              </ReferenceInput>
           </SimpleForm>
       </Create>
);


const VideolistTitle = ({ record }) => {
   return <span>编辑 视频信息</span>;
};

const VideolistEdit = (props) => {
      return (<Edit title={<VideolistTitle />} {...props}>
          <SimpleForm>
            <TextInput label="名字" source="name" />
            <TextInput label="URL" source="url" />
            <ReferenceInput label="网关ID" source="gatewayid" reference="gateway" allowEmpty>
              <SelectInput optionText="name" />
            </ReferenceInput>
          </SimpleForm>
      </Edit>);

};



const VideolistList = (props) => (//
     <List title="视频管理"  filters={<VideoFilter />}  {...props} >
        <Datagrid>
        <TextField label="名字" source="name" />
        <TextField label="摘要" source="url" />
        <ReferenceField label="网关" source="gatewayid" reference="gateway" allowEmpty>
          <TextField source="name" />
        </ReferenceField>
        <EditButton />
        </Datagrid>
    </List>
);


export  {VideolistCreate,VideolistList,VideolistEdit};
