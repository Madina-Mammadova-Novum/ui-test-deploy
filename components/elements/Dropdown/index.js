'use client';

import { useState } from 'react';
import { Controller } from 'react-hook-form';
import Select from 'react-select';

import PropTypes from 'prop-types';

import { InputErrorMessage } from '@/elements';
import OptionRow from '@/elements/Dropdown/OptionRow';
import OptionsList from '@/elements/Dropdown/OptionsList';
import { dropdownStyles, dropdownTheme } from '@/elements/Dropdown/styles';
import { getValueWithPath } from '@/utils/helpers';

const Dropdown = ({ name, label, value, options, onChange, disabled, customStyles, useForm = true }) => {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleChange = (option) => {
    setSelectedOption(option);
    onChange(option);
  };

  const renderOption = ({ countryFlag, label: labelValue }) => (
    <OptionRow countryFlag={countryFlag} value={labelValue} />
  );
  return useForm ? (
    <Controller
      name={name}
      render={({ field: { ref, ...field }, formState: { errors, isSubmitting } }) => {
        const error = getValueWithPath(errors, name)?.value;

        return (
          <div className={`relative bottom-1 ${customStyles}`}>
            <label htmlFor={name} className="text-[12px] text-gray font-semibold uppercase">
              {label}
            </label>
            <Select
              ref={ref}
              id={name}
              {...field}
              options={options}
              components={{ Option: OptionsList }}
              onChange={handleChange}
              closeMenuOnSelect
              formatOptionLabel={renderOption}
              styles={dropdownStyles(selectedOption, error)}
              theme={dropdownTheme}
              isDisabled={disabled || isSubmitting}
            />
            {error && <InputErrorMessage message={error?.message} />}
          </div>
        );
      }}
    />
  ) : (
    <Select
      id={name}
      value={value}
      options={options}
      components={{ Option: OptionsList }}
      onChange={handleChange}
      closeMenuOnSelect
      formatOptionLabel={renderOption}
      styles={dropdownStyles(selectedOption)}
      theme={dropdownTheme}
      isDisabled={disabled}
    />
  );
};

Dropdown.defaultProps = {
  label: null,
  disabled: false,
  customStyles: '',
  useForm: true,
  value: '',
};

Dropdown.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
  label: PropTypes.string,
  customStyles: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  useForm: PropTypes.bool,
};

export default Dropdown;
