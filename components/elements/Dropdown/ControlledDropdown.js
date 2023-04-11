'use client';

import { useState } from 'react';
import { Controller } from 'react-hook-form';
import Select from 'react-select';

import PropTypes from 'prop-types';

import { InputErrorMessage, Label } from '@/elements';
import OptionRow from '@/elements/Dropdown/OptionRow';
import OptionsList from '@/elements/Dropdown/OptionsList';
import { dropdownStyles, dropdownTheme } from '@/elements/Dropdown/styles';
import { getValueWithPath } from '@/utils/helpers';

export const ControlledDropdown = ({ name, label, options, onChange, disabled, customStyles }) => {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleChange = (option) => {
    setSelectedOption(option);
    onChange(option);
  };

  const printOptions = ({ countryFlag, label: labelValue }) => (
    <OptionRow countryFlag={countryFlag} value={labelValue} />
  );

  return (
    <Controller
      name={name}
      render={({ field: { ref, ...field }, formState: { errors, isSubmitting } }) => {
        const error = getValueWithPath(errors, name)?.value;

        return (
          <div className={`relative bottom-1 ${customStyles}`}>
            <Label htmlFor={name} className="text-xs-sm">
              {label}
            </Label>
            <Select
              ref={ref}
              id={name}
              {...field}
              options={options}
              components={{ Option: OptionsList }}
              onChange={handleChange}
              closeMenuOnSelect
              formatOptionLabel={printOptions}
              styles={dropdownStyles(selectedOption, error)}
              theme={dropdownTheme}
              isDisabled={disabled || isSubmitting}
            />
            {error && <InputErrorMessage message={error?.message} />}
          </div>
        );
      }}
    />
  );
};

ControlledDropdown.defaultProps = {
  label: null,
  disabled: false,
  customStyles: '',
};

ControlledDropdown.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  customStyles: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
};
