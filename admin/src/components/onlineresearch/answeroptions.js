import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import renderansweroptions from './renderansweroptions';

const AnswerOptionsInput = ({source,label}) => {
  return(
      <span>
      <Field
          name={source}
          component={renderansweroptions}
          label={label}
      />
    </span>
  )
}

AnswerOptionsInput.defaultProps = {
    addLabel: true,
};

export {AnswerOptionsInput};
