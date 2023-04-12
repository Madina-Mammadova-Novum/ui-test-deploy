'use client';

import { useCallback, useState } from 'react';
import { Controller } from 'react-hook-form';

import PropTypes from 'prop-types';

import { SimpleDropdown } from './SimpleDropdown';

import { InputErrorMessage, Label } from '@/elements';
import OptionRow from '@/elements/Dropdown/OptionRow';
import OptionsList from '@/elements/Dropdown/OptionsList';
import { dropdownStyles, dropdownTheme } from '@/elements/Dropdown/styles';
import { getValueWithPath } from '@/utils/helpers';

const FormDropdown = ({ async, name, label, options, onChange, disabled, customStyles }) => {
  const [selectedOption, setSelectedOption] = useState(null);

  const { dropdownWidth, className } = customStyles;

  const handleChange = useCallback(
    (option) => {
      setSelectedOption(option);
      onChange(option);
    },
    [onChange]
  );

  const printDropdown = useCallback(
    ({ ref, error, isSubmitting, field }) => {
      if (async) {
        return (
          <SimpleDropdown
            {...field}
            ref={ref}
            id={name}
            options={options}
            components={{ Option: OptionsList }}
            onChange={handleChange}
            formatOptionLabel={printOptions}
            styles={dropdownStyles(selectedOption, error, dropdownWidth)}
            theme={dropdownTheme}
            isDisabled={disabled || isSubmitting}
            closeMenuOnSelect
            async
          />
        );
      }
      return (
        <SimpleDropdown
          {...field}
          ref={ref}
          id={name}
          options={options}
          components={{ Option: OptionsList }}
          onChange={handleChange}
          formatOptionLabel={printOptions}
          styles={dropdownStyles(selectedOption, error, dropdownWidth)}
          theme={dropdownTheme}
          isDisabled={disabled || isSubmitting}
          closeMenuOnSelect
        />
      );
    },
    [async, disabled, dropdownWidth, handleChange, name, options, selectedOption]
  );

  const printOptions = ({ countryFlag, label: labelValue }) => (
    <OptionRow countryFlag={countryFlag} value={labelValue} />
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
            {printDropdown({ ref, error, isSubmitting, field })}
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
  async: false,
  customStyles: '',
};

FormDropdown.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  customStyles: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  async: PropTypes.bool,
};

export default FormDropdown;
