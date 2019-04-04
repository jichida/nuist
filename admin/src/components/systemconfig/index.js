import React from 'react';
import {
    Datagrid,
    DateField,
    Create,
    EditButton,
    Filter,
    FormTab,
    List,
    NumberInput,
    ReferenceInput,
    ReferenceManyField,
    RichTextField,
    SelectInput,
    TabbedForm,
    TextField,
    TextInput,
    SimpleShowLayout,
    SelectArrayInput,
    ChipField,
    Edit as EditPage,
    Show as ShowPage,
    SimpleForm,
} from 'admin-on-rest/lib/mui';
import Chip from 'material-ui/Chip';
import ShowPageOne from '../singledocumentpage/index.js';
import {CfAlaramRuleInput} from './cf.js';
import {PmsSelectArrayInputDetail} from './pms.js';
import {ImageInputUploadArray} from '../controls/imageuploadarray.js';
import {CfSelectArrayInput} from '../controls/selectarrayinput.js';
import {getOptions} from '../controls/getselect.js';
import "./style.css";


const SystemconfigTitle = ({ record }) => <span>系统设置</span>;


const SystemconfigCreateTitle = ({ record }) => {
   return <span>新建 系统配置</span>;
};
 const SystemconfigCreate = (props) => (
       <Create {...props} title={<SystemconfigCreateTitle />} >
       <SimpleForm>
           <NumberInput label="故障及异常判断时间【单位：分钟】" source="SettingOfflineMinutes"  />
           <CfSelectArrayInput label="允许查看数据类型" source="allowviewtypes" loadOptions={getOptions('viewtype','name','_id')}/>
           <ReferenceInput label="默认报警规则" source="alarmruleid" reference="alarmrule" allowEmpty>
             <SelectInput optionText="name" />
           </ReferenceInput>
           <CfSelectArrayInput label="演示网关组[PC]" source="gatewaygroups4pc" loadOptions={getOptions('gatewaygroup','name','_id')}/>
           <CfSelectArrayInput label="演示网关组[APP]" source="gatewaygroups4app" loadOptions={getOptions('gatewaygroup','name','_id')}/>
       </SimpleForm>
       </Create>
);

 const SystemconfigEdit = (props) => (
    <EditPage {...props} title={<SystemconfigTitle />}>
          <SimpleForm>
          {/* <ImageInputUploadArray label="产品首页banner图"  source="bannerproducturls" /> */}
          <NumberInput label="故障及异常判断时间【单位：分钟】" source="SettingOfflineMinutes" />
          <CfSelectArrayInput label="允许查看数据类型" source="allowviewtypes" loadOptions={getOptions('viewtype','name','_id')}/>
          <ReferenceInput label="默认报警规则" source="alarmruleid" reference="alarmrule" allowEmpty>
            <SelectInput optionText="name" />
          </ReferenceInput>
          <CfSelectArrayInput label="演示网关组[PC]" source="gatewaygroups4pc" loadOptions={getOptions('gatewaygroup','name','_id')}/>
          <CfSelectArrayInput label="演示网关组[APP]" source="gatewaygroups4app" loadOptions={getOptions('gatewaygroup','name','_id')}/>
        </SimpleForm>
    </EditPage>
);

export const SystemconfigList = props => (
    <ShowPageOne Create={SystemconfigCreate} Edit={SystemconfigEdit} {...props}/>
);
