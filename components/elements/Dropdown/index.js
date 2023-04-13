'use client';

import { useCallback, useState } from 'react';

import PropTypes from 'prop-types';

import { SimpleDropdown } from './SimpleDropdown';

import { dropdownOptionTypes } from '@/lib/types';

import { Label } from '@/elements';
import { dropdownStyles } from '@/elements/Dropdown/styles';

const Dropdown = ({ name, label, options, onChange, disabled, customStyles, asyncCall = false, ...rest }) => {
  const [selectedOption, setSelectedOption] = useState(null);

  const { dropdownWidth, className } = customStyles;

  const handleChange = useCallback(
    (option) => {
      setSelectedOption(option);
      onChange(option);
    },
    [onChange]
  );

  return (
    <div className={`relative ${className}`}>
      <Label htmlFor={name} className="text-xs-sm">
        {label}
      </Label>
      <SimpleDropdown
        {...rest}
        id={name}
        options={options}
        onChange={handleChange}
        styles={dropdownStyles(selectedOption, null, dropdownWidth)}
        isDisabled={disabled}
        asyncCall={asyncCall}
      />
    </div>
  );
};

Dropdown.defaultProps = {
  label: null,
  asyncCall: false,
  disabled: false,
  customStyles: {
    dropdownWidth: '',
    className: '',
  },
};

Dropdown.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  asyncCall: PropTypes.bool,
  options: PropTypes.arrayOf(dropdownOptionTypes).isRequired,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  customStyles: PropTypes.shape({
    dropdownWidth: PropTypes.string,
    className: PropTypes.string,
  }),
};

export default Dropdown;
