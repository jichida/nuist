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
import {MapDragSel} from '../controls/mapdragsel';

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
      <TextInput label="所在区域" source="locationname"  />
      <ReferenceInput label="报警规则" source="alarmruleid" reference="alarmrule" allowEmpty>
        <SelectInput optionText="name" />
      </ReferenceInput>
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
        <FormTab label="网关基本信息">
          <TextField label="网关ID" source="GatewayId"  />
          <TextInput label="网关名字" source="name"  validate={required} />
          <TextInput label="所在区域" source="locationname"  />
          <MapDragSel label="经纬度" source={["Longitude","Latitude"]} />
          <TextField label="创建时间" source="created_at"  />
          <TextField label="更新时间" source="updated_at"  />
          <ReferenceInput label="报警规则" source="alarmruleid" reference="alarmrule" allowEmpty>
            <SelectInput optionText="name" />
          </ReferenceInput>
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
    <ReferenceInput label="网关ID" source="gatewayid" reference="gateway" allowEmpty>
      <SelectInput optionText="name" />
    </ReferenceInput>
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
      <ReferenceField label="报警规则" source="alarmruleid" reference="alarmrule" allowEmpty>
        <TextField source="name" />
      </ReferenceField>
      <EditButton />
    </Datagrid>
  }
  </List>
);

export {GatewayCreate,GatewayList,GatewayEdit}
