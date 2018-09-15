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
  ShowButton,
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
import {getOptions} from '../controls/getselect.js';
import {CfSelectArrayInput} from '../controls/selectarrayinput.js';
import _ from 'lodash';

const GatewayDefaultValue = {created_at:new Date(),updated_at:new Date()};

const GatewayCreate = (props) => (
  <Create title="创建网关"  {...props} actions={<CreateActions />}>
    <SimpleForm defaultValue={GatewayDefaultValue}>
      <TextInput label="网关ID" source="GatewayId" validate={required} />
      <TextInput label="网关名字" source="name" validate={required} />
      <TextInput label="所属城市" source="city"  validate={required} />
      <TextInput label="所属城市首字母" source="cityindex"  validate={required} />
    </SimpleForm>
  </Create>
);


const GatewayEdit = (props) => {
  // console.log(props)
  const gatewayid = _.get(props,'match.params.id');
  let query = {};
  if(!!gatewayid){
    query = {gatewayid:gatewayid};
  }
  return (<Edit title="网关信息" {...props}  actions={<EditActions />}>
      <TabbedForm>
        <FormTab label="节点基本信息">
          <TextField label="网关ID" source="GatewayId"  />
          <TextInput label="网关名字" source="name"  validate={required} />
          <TextInput label="所属城市" source="city"  validate={required} />
          <TextInput label="所属城市首字母" source="cityindex"  validate={required} />
          <TextInput label="所在区域" source="locationname"  />
          <NumberInput label="经度" source="Longitude"  />
          <NumberInput label="纬度" source="Latitude"  />
          <TextField label="详细地址" source="addressname"  />
          <TextField label="创建时间" source="created_at"  />
          <TextField label="更新时间" source="updated_at"  />
        </FormTab>
        <FormTab label="传输路径">
          <CfSelectArrayInput label="选择节点列表" source="devicepath" loadOptions={getOptions('device','name','_id',query)}/>
        </FormTab>
      </TabbedForm>
    </Edit>
    );
};

const GatewayShowActions = ({basePath,data,refresh}) => (
  <CardActions>
    <ListButton basePath={basePath} />
    <EditButton basePath={basePath} record={data} />
    <FlatButton primary label="Refresh" onClick={refresh} icon={<NavigationRefresh />} />
  </CardActions>
);

const GatewayFilter = (props) => (
  <Filter {...props}>
    <TextInput label="搜索网关" source="GatewayId_q" />
  </Filter>
)

const GatewayList = (props) => (
  <List title="网关管理" filters={<GatewayFilter />} sort={{field:'updated_at',order:'DESC'}} {...props}>
  {permissions =>
    <Datagrid  bodyOptions={{ showRowHover: true }}>
      <TextField label="网关ID" source="GatewayId" />
      <TextField label="网关名字" source="name"/>
      <TextField label="所在区域" source="locationname"/>
      <TextField label="最后更新时间" source="updated_at"/>
      <EditButton />
    </Datagrid>
  }
  </List>
);

export {GatewayCreate,GatewayList,GatewayEdit}
