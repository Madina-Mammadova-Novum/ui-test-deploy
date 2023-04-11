'use client';

import { useState } from 'react';

import PropTypes from 'prop-types';
import AsyncSelect from 'react-select/async';

import { Label } from '@/elements';
import OptionRow from '@/elements/Dropdown/OptionRow';
import OptionsList from '@/elements/Dropdown/OptionsList';
import { dropdownStyles, dropdownTheme } from '@/elements/Dropdown/styles';

export const DefaultAsyncDropdown = ({ name, label, options, onChange, disabled, customStyles, ...rest }) => {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleChange = (option) => {
    setSelectedOption(option);
    onChange(option);
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
    <div className={`relative bottom-1 ${customStyles}`}>
      <Label htmlFor={name} className="text-xs-sm">
        {label}
      </Label>
      <AsyncSelect
        {...rest}
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
        styles={dropdownStyles(selectedOption)}
        theme={dropdownTheme}
        isDisabled={disabled}
      />
    </div>
  );
};

DefaultAsyncDropdown.defaultProps = {
  label: null,
  disabled: false,
  customStyles: '',
};

DefaultAsyncDropdown.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  customStyles: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
};
