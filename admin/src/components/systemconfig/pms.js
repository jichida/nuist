import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import renderPms from './renderPms';

const PmsSelectArrayInputDetail = ({source,label}) => {
  return(
      <span>
      <Field
          name={source}
          component={renderPms}
          label={label}
      />
    </span>
  )
}

PmsSelectArrayInputDetail.defaultProps = {
    addLabel: true,
};

export {PmsSelectArrayInputDetail};
