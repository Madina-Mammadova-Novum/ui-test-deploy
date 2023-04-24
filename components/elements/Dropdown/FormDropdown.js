'use client';

import { useCallback } from 'react';
import { Controller } from 'react-hook-form';

import PropTypes from 'prop-types';

import { SimpleDropdown } from './SimpleDropdown';

import { InputErrorMessage, Label } from '@/elements';
import { dropdownStyles } from '@/elements/Dropdown/styles';
import { getValueWithPath } from '@/utils/helpers';

const FormDropdown = ({ asyncCall, name, label, options, onChange, disabled, customStyles }) => {
  const { dropdownWidth, className } = customStyles;

  const handleChange = useCallback(
    (option) => {
      onChange(option);
    },
    [onChange]
  );

  return (
    <Controller
      name={name}
      render={({ field: { ref, ...field }, formState: { errors, isSubmitting } }) => {
        const error = getValueWithPath(errors, name)?.value ?? getValueWithPath(errors, name);
        return (
          <div className={`relative bottom-1 ${className}`}>
            <Label htmlFor={name} className="text-xs-sm">
              {label}
            </Label>
            <SimpleDropdown
              {...field}
              ref={ref}
              id={name}
              options={options}
              onChange={handleChange}
              styles={dropdownStyles({ ...field }.value?.value, error, dropdownWidth)}
              isDisabled={disabled || isSubmitting}
              asyncCall={asyncCall}
            />
            {error && <InputErrorMessage message={error?.message} />}
          </div>
        );
      }}
    />
  );
};

FormDropdown.defaultProps = {
  label: null,
  disabled: false,
  asyncCall: false,
  customStyles: '',
};

FormDropdown.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  customStyles: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  asyncCall: PropTypes.bool,
};

export default FormDropdown;
