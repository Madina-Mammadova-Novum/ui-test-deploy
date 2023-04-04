'use client';

import React from 'react';
import { Controller } from 'react-hook-form';

import classnames from 'classnames';
import PropTypes from 'prop-types';

import { Input, InputErrorMessage } from '@/elements';

const CheckBoxInput = ({ customStyles, labelStyles, onChange, checked, children, name }) => {
  return (
    <Controller
      name={name}
      render={({ field: { ref, ...field }, formState: { errors, isSubmitting } }) => {
        const error = errors[name];
        return (
          <div className="flex gap-2.5 items-center">
            <Input
              {...field}
              ref={ref}
              type="checkbox"
              disabled={isSubmitting}
              onChange={onChange}
              checked={checked}
              className={classnames('w-5 h-5', customStyles)}
            />
            {children && (
              <label htmlFor={name} className={labelStyles}>
                {children}
              </label>
            )}
            {error ?? <InputErrorMessage>{error?.message}</InputErrorMessage>}
          </div>
        );
      }}
    />
  );
};

CheckBoxInput.defaultProps = {
  customStyles: '',
  labelStyles: '',
  label: '',
  name: null,
  checked: false,
};

CheckBoxInput.propTypes = {
  customStyles: PropTypes.string,
  labelStyles: PropTypes.string,
  label: PropTypes.string,
  name: PropTypes.string,
  onChange: PropTypes.func,
  register: PropTypes.func,
  checked: PropTypes.bool,
};

export default CheckBoxInput;
