'use client';

import { useState } from 'react';
import { Controller } from 'react-hook-form';

import PropTypes from 'prop-types';
import AsyncSelect from 'react-select/async';

import { InputErrorMessage, Label } from '@/elements';
import OptionRow from '@/elements/Dropdown/OptionRow';
import OptionsList from '@/elements/Dropdown/OptionsList';
import { dropdownStyles, dropdownTheme } from '@/elements/Dropdown/styles';

export const ControlledAsyncDropdown = ({ name, label, onChange, disabled, errorMsg, options = [] }) => {
  const [selectedOption, setSelectedOption] = useState('');

  const handleChange = (option) => {
    onChange(option);
    setSelectedOption(option);
  };

  const filteredOptions = (inputValue) => {
    return options.filter((i) => i.label.toLowerCase().includes(inputValue.toLowerCase())); // todo: what is it?
  };

  const loadOptions = (inputValue, callback) => {
    callback(filteredOptions(inputValue));
  };

  const printOptions = ({ countryFlag, label: labelValue }) => (
    <OptionRow countryFlag={countryFlag} value={labelValue} />
  );

  return (
    <Controller
      name={name}
      render={({ field: { ref, ...field }, formState: { errors, isSubmitting } }) => {
        const error = errorMsg ?? errors[name]?.message;

        return (
          <div className="relative bottom-1">
            <Label htmlFor={name} className="text-xs-sm">
              {label}
            </Label>
            <AsyncSelect
              {...field}
              ref={ref}
              id={name}
              cacheOptions
              closeMenuOnSelect
              value={selectedOption}
              defaultOptions={options}
              loadOptions={loadOptions}
              isLoading={!options?.length}
              components={{ Option: OptionsList }}
              onChange={handleChange}
              formatOptionLabel={printOptions}
              styles={dropdownStyles(selectedOption, error)}
              theme={dropdownTheme}
              isDisabled={disabled || isSubmitting}
            />
            {error && <InputErrorMessage message={error} />}
          </div>
        );
      }}
    />
  );
};

ControlledAsyncDropdown.defaultProps = {
  label: null,
  disabled: false,
};

ControlledAsyncDropdown.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  errorMsg: PropTypes.string,
};

export default ControlledAsyncDropdown;
