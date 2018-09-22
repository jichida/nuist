import React from 'react';
import { List, EmailField,RichTextInput } from 'admin-on-rest/lib/mui';
import { FunctionField } from 'admin-on-rest/lib/mui'

import { required,NumberInput,Create, Edit, SimpleForm, DisabledInput, TextInput,Show,SimpleShowLayout,ShowButton,
   DateInput, LongTextInput, ReferenceManyField, Datagrid, TextField, DateField, EditButton,BooleanInput,ReferenceField,
 Filter,Filters,ReferenceInput,SelectInput } from 'admin-on-rest/lib/mui';

 import { ReferenceArrayInput, SelectArrayInput } from 'admin-on-rest';


import TimePicker from 'material-ui/TimePicker';
import moment from 'moment';
import _ from 'lodash';
import {CreateActions,EditActions} from '../controls/createeditactions';
import {CfAlaramRuleInput} from '../systemconfig/cf.js';

const AlarmruleTitle = ({record}) => {
  return <span>报警规则管理</span>
};

const AlarmruleCreate = (props) => (
  <Create title="创建报警规则" {...props}  actions={<CreateActions />} >
    <SimpleForm>
      <TextInput label="报警规则名称" source="name" validate={required} />
    </SimpleForm>
  </Create>
);

const AlarmruleEdit = (props) => {
  return (<Edit title="编辑网关组" actions={<EditActions />} {...props}>
    <SimpleForm>
      <TextInput label="报警规则名称" source="name" validate={required} />
      <CfAlaramRuleInput label="报警规则设置(高)" source="warningrulelevel0" />
      <CfAlaramRuleInput label="报警规则设置(中)" source="warningrulelevel1" />
      <CfAlaramRuleInput label="报警规则设置(低)" source="warningrulelevel2" />
    </SimpleForm>
  </Edit>
  );
};

const EditBtnif = (props)=>{
  const {record} = props;
  return _.get(record,'systemflag',0) === 0?<EditButton {...props}/>:null;
}

const rowStyle = (record, index) => ({
    backgroundColor: record.systemflag === 1 ? '#efe' : 'white',
});


const render0 = record => record.warningrulelevel0.length;
const render1 = record => record.warningrulelevel1.length;
const render2 = record => record.warningrulelevel2.length;
const RuleItemsField0 = (props) => <FunctionField {...props} render={render0} />;
const RuleItemsField1 = (props) => <FunctionField {...props} render={render1} />;
const RuleItemsField2 = (props) => <FunctionField {...props} render={render2} />;
RuleItemsField0.defaultProps = {
    label: '高报警规则个数',
    style: { textAlign: 'right' },
    headerStyle: { textAlign: 'right' },
};
RuleItemsField1.defaultProps = {
    label: '中报警规则个数',
    style: { textAlign: 'right' },
    headerStyle: { textAlign: 'right' },
};
RuleItemsField2.defaultProps = {
    label: '低报警规则个数',
    style: { textAlign: 'right' },
    headerStyle: { textAlign: 'right' },
};

const AlarmruleList = (props) => (
  <List title={<AlarmruleTitle />} {...props}>
    {permissions =>
      <Datagrid  bodyOptions={{ showRowHover: true }} rowStyle={rowStyle}>
        <TextField label="报警规则名称" source="name" />
        <RuleItemsField0 />
        <RuleItemsField1 />
        <RuleItemsField2 />
        {permissions==='admin'?<EditBtnif />:null}
      </Datagrid>
    }
  </List>
);




export {AlarmruleCreate,AlarmruleList,AlarmruleEdit};
