import React from 'react';
import { List, EmailField,RichTextInput } from 'admin-on-rest/lib/mui';
import { CardActions } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import NavigationRefresh from 'material-ui/svg-icons/navigation/refresh';
import { required,NumberInput,NumberField,Create, Edit, SimpleForm, DisabledInput, TextInput,  Show,SimpleShowLayout,ShowButton,
   DateInput, LongTextInput, ReferenceManyField, Datagrid, TextField, DateField, EditButton,BooleanInput,ReferenceField,
 Filter,Filters,TabbedForm,FormTab } from 'admin-on-rest/lib/mui';


import { Field,FieldArray } from 'redux-form';
import ActionDelete from 'material-ui/svg-icons/action/delete';
import ContentAdd from 'material-ui/svg-icons/content/add';
import TimePicker from 'material-ui/TimePicker';
import moment from 'moment';
import {AnswerOptionsInput} from './answeroptions';

const OnlineResearchCreate = (props) => {
  return (
    <Create title="发起调查" {...props} >
      <SimpleForm>
        <TextInput label="调查名称" source="name" validate={required} />
        <AnswerOptionsInput label="调查选项" source="answeroptions" validate={required} />
      </SimpleForm>
    </Create>
  );
};

const OnlineResearchEdit = (props) => {
  return (
    <Edit title="编辑在线调查问卷" {...props} >
      <TabbedForm>
      <FormTab label="问卷信息">
        <TextInput label="问卷名称" source="name" validate={required} />
        <AnswerOptionsInput label="调查选项" source="answeroptions" validate={required} />
      </FormTab>
      <FormTab label="调查结果">

      </FormTab>
      <FormTab label="投票记录">
      </FormTab>
    </TabbedForm>
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
