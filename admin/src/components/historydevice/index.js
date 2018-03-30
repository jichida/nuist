import React from 'react';
import { List, EmailField,RichTextInput } from 'admin-on-rest/lib/mui';
import { CardActions } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import NavigationRefresh from 'material-ui/svg-icons/navigation/refresh';
import { NumberInput,
  required,
  NumberField,
  Create,
  Edit,
  SimpleForm,
  DisabledInput,
  TextInput,
  ListButton,
  Show,
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
import {CreateActions,EditActions} from '../controls/createeditactions';
import {ShowActions} from '../controls/createeditactions';
import ShowButton from '../controls/ShowButton';

const deviceDefaultValue = {created_at:new Date(),updated_at:new Date()};


const choices = [
  {_id:'A',status:'定位'},
  {_id:'V',status:'不定位'},
];

const HistoryDeviceShow = (props) => {
  return (<Show title="历史节点信息" {...props}  actions={<ShowActions />} >
      <TabbedForm>
        <FormTab label="节点基本信息">
          <TextField label="节点ID" source="DeviceId"  />
          <TextField label="节点名字" source="name" />
          <TextField label="地理位置" source="locationname"  />
          <TextField label="详细地址" source="addressname"  />
        </FormTab>
        <FormTab label="数据">
          <TextField label="温度" source="realtimedata.temperature"  />
          <TextField label="降雨量" source="realtimedata.rainfall"  />
          <TextField label="湿度" source="realtimedata.humidity" />
          <TextField label="风力" source="realtimedata.windspeed" />
          <TextField label="风向" source="realtimedata.winddirection" />
          <TextField label="大气压" source="realtimedata.pressure" />
          <TextField label="最后更新时间" source="realtimedata.datatime" />
        </FormTab>
      </TabbedForm>
    </Show>
    );
};

const DeviceShowActions = ({basePath,data,refresh}) => (
  <CardActions>
    <ListButton basePath={basePath} />
    <EditButton basePath={basePath} record={data} />
    <FlatButton primary label="Refresh" onClick={refresh} icon={<NavigationRefresh />} />
  </CardActions>
);

const DeviceFilter = (props) => (
  <Filter {...props}>
    <TextInput label="搜索节点" source="DeviceId_q" />
  </Filter>
)

const HistoryDeviceList = (props) => (
  <List title="节点历史数据管理" filters={<DeviceFilter />} sort={{field:'LastRealtimeAlarm.DataTime',order:'DESC'}} {...props}>
    <Datagrid  bodyOptions={{ showRowHover: true }}>
      <TextField label="节点ID" source="DeviceId" />
      <TextField label="节点名字" source="name"/>
      <TextField label="所在区域" source="locationname"/>
      <TextField label="更新时间" source="realtimedata.datatime"  />
      <ShowButton />
    </Datagrid>

  </List>
);

export {HistoryDeviceList,HistoryDeviceShow}
