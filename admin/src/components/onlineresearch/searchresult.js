import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import rendersearchresult from './rendersearchresult';

const SearchResult = ({source,label,record}) => {
  return(
      <span>
      <Field
          name={source}
          component={rendersearchresult}
          label={label}
          record={record}
      />
    </span>
  )
}

SearchResult.defaultProps = {
    addLabel: true,
};

export {SearchResult};
