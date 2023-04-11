'use client';

import { useState } from 'react';
import Select from 'react-select';

import PropTypes from 'prop-types';

import { Label } from '@/elements';
import OptionRow from '@/elements/Dropdown/OptionRow';
import OptionsList from '@/elements/Dropdown/OptionsList';
import { dropdownStyles, dropdownTheme } from '@/elements/Dropdown/styles';

export const DefaultDropdown = ({ name, label, options, onChange, disabled, customStyles, ...rest }) => {
  const [selectedOption, setSelectedOption] = useState(null);

  const { dropdownWidth, className } = customStyles;

  const handleChange = (option) => {
    setSelectedOption(option);
    onChange(option);
  };

  const printOptions = ({ countryFlag, label: labelValue }) => (
    <OptionRow countryFlag={countryFlag} value={labelValue} />
  );

  return (
    <div className={`relative ${className}`}>
      <Label htmlFor={name} className="text-xs-sm">
        {label}
      </Label>
      <Select
        {...rest}
        id={name}
        options={options}
        components={{ Option: OptionsList }}
        onChange={handleChange}
        formatOptionLabel={printOptions}
        styles={dropdownStyles(selectedOption, null, dropdownWidth)}
        theme={dropdownTheme}
        isDisabled={disabled}
        closeMenuOnSelect
      />
    </div>
  );
};

DefaultDropdown.defaultProps = {
  label: null,
  disabled: false,
  customStyles: {
    dropdownWidth: '',
    className: '',
  },
};

DefaultDropdown.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  customStyles: PropTypes.shape({
    dropdownWidth: PropTypes.string,
    className: PropTypes.string,
  }),
  options: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};
