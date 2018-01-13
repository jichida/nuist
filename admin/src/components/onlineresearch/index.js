import React from 'react';
import { List, EmailField,RichTextInput } from 'admin-on-rest/lib/mui';
import { CardActions } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import NavigationRefresh from 'material-ui/svg-icons/navigation/refresh';
import { required,NumberInput,NumberField,Create, Edit, SimpleForm, DisabledInput, TextInput,  Show,SimpleShowLayout,ShowButton,
   DateInput, LongTextInput, ReferenceManyField, Datagrid, TextField, DateField, EditButton,BooleanInput,ReferenceField,
 Filter,Filters } from 'admin-on-rest/lib/mui';


import { Field,FieldArray } from 'redux-form';
import ActionDelete from 'material-ui/svg-icons/action/delete';
import ContentAdd from 'material-ui/svg-icons/content/add';
import TimePicker from 'material-ui/TimePicker';
import moment from 'moment';

const OnlineResearchCreate = (props) => {
  return (
    <Create title="发起调查" {...props} >
      <SimpleForm>
        <TextInput label="调查名称" source="name" validate={required} />
      </SimpleForm>
    </Create>
  );
};

const OnlineResearchEdit = (props) => {
  return (
    <Edit title="编辑调查" {...props} >
      <SimpleForm>
        <TextInput label="调查名称" source="name" validate={required} />
      </SimpleForm>
    </Edit>
  );
};

const OnlineResearchList = (props) => (
  <List title="在线调查管理" {...props} >
    <Datagrid  bodyOptions={{ showRowHover: true }}>
      <TextField label="调查名称" source="name" />
      <EditButton />
    </Datagrid>
  </List>
);


export {OnlineResearchCreate,OnlineResearchEdit,OnlineResearchList};
