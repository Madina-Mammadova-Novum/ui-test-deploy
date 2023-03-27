'use client';

import { useState } from 'react';
import { Controller } from 'react-hook-form';

import PropTypes from 'prop-types';
import AsyncSelect from 'react-select/async';

import { InputErrorMessage } from '@/elements';
import OptionRow from '@/elements/AsyncDropdown/OptionRow';
import OptionsList from '@/elements/AsyncDropdown/OptionsList';
import { dropdownStyles, dropdownTheme } from '@/elements/AsyncDropdown/styles';

// todo: move this component to Dropdown element and compare it with original
const AsyncDropdown = ({ name, label, onChange, disabled, options = [] }) => {
  const [selectedOption, setSelectedOption] = useState('');

  const handleChange = (option) => {
    onChange(option);
    setSelectedOption(option);
  };

  const filteredOptions = (inputValue) => {
    return options.filter((i) => i.label.toLowerCase().includes(inputValue.toLowerCase())); // todo: what is it?
  };

  const loadOptions = (inputValue, callback) => {
    setTimeout(() => {
      // todo: refactor this without setTimeout
      callback(filteredOptions(inputValue));
    }, 1000);
  };

  const renderOption = ({ countryFlag, label: value }) => <OptionRow countryFlag={countryFlag} value={value} />;

  return (
    <Controller
      name={name}
      render={({ field: { ref, ...field }, formState: { errors, isSubmitting } }) => {
        const error = errors[name];

        return (
          <div className="relative bottom-1">
            <label htmlFor={name} className="text-[12px] text-gray font-semibold uppercase">
              {label}
            </label>
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
  );
};

AsyncDropdown.defaultProps = {
  label: null,
  disabled: false,
};

AsyncDropdown.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
};

export default AsyncDropdown;
