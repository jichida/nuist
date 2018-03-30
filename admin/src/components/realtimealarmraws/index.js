import React from 'react';
import { List, EmailField,RichTextInput } from 'admin-on-rest/lib/mui';
import { CardActions } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import NavigationRefresh from 'material-ui/svg-icons/navigation/refresh';
import { NumberInput,
  NumberField,
  Edit,
  Show,
  SimpleForm,
  DisabledInput,
  TextInput,
  SimpleShowLayout,
  DateInput,
  LongTextInput,
  ReferenceManyField,
  Datagrid,
  TextField,
  DateField,
  EditButton,
  BooleanInput,
  TabbedForm,
  FormTab,
  Filter,
  SelectInput,
  SelectField,
  ImageField,
  ReferenceInput,
  ReferenceField } from 'admin-on-rest/lib/mui';

import { Field,FieldArray } from 'redux-form';
import TimePicker from 'material-ui/TimePicker';
import moment from 'moment';
import _ from 'lodash';
import {ShowActions} from '../controls/createeditactions';
import ShowButton from '../controls/ShowButton';

const RealtimeAlamTitle = ({record}) => {
   return <span>报警管理</span>
};



const RealtimeAlarmRawShow = (props) => {
  return (<Show title={<RealtimeAlamTitle />} {...props} actions={<ShowActions />}>
    <SimpleShowLayout>
     <TextField label="节点ID" source="DeviceId" />
     <TextField label="报警时间" source="UpdateTime"  />
     <TextField label="报警类型" source="type"  />
     <TextField label="报警等级" source="level" />
     <TextField label="当前值" source="value" />
     <TextField label="报警信息" source="content" />
    </SimpleShowLayout>
  </Show>
  );
};

const DeviceFilter = (props) => (
  <Filter {...props}>
    <TextInput label="搜索节点" source="DeviceId_q" />
    <SelectInput  label="报警等级"  source="warninglevel" choices={[
        { id: '高', name: '高' },
        { id: '中', name: '中' },
        { id: '低', name: '低' },
    ]} />
  </Filter>
)

const RealtimeAlarmRawList = (props) => (
  <List title={<RealtimeAlamTitle />} filters={<DeviceFilter />} {...props} sort={{field:'MessageTime',order:'DESC'}}>
    <Datagrid  bodyOptions={{ showRowHover: true }}>
      <TextField label="节点ID" source="DeviceId" />
      <TextField label="报警时间" source="UpdateTime"  />
      <TextField label="报警类型" source="type"  />
      <TextField label="报警等级" source="level" />
      <TextField label="当前值" source="value" />
      <TextField label="报警信息" source="content" />
      <ShowButton />
    </Datagrid>
  </List>
);

export {RealtimeAlarmRawList,RealtimeAlarmRawShow};
