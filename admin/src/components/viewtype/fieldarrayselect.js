import React from 'react';
import { Field } from 'redux-form';
import {CfSelectArrayInput} from '../controls/selectarrayinput.js';
import {getOptions} from './fieldlist_getoptions.js';

const renderFieldSelectArrayInput = ({source,record}) => {
  return (<CfSelectArrayInput label="简要字段列表【不超过6个】" source={source} loadOptions={getOptions(record)}/>)
}

const FieldSelectArrayInput = ({record,source,label}) => {
  return(
    <span>
      <Field name={source} component={renderFieldSelectArrayInput} label={label} record={record} source={source}/>
    </span>
)
}

FieldSelectArrayInput.defaultProps = {
    addLabel: true,
};

export default FieldSelectArrayInput;
