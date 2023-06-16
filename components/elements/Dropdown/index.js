'use client';

import { useCallback, useState } from 'react';

import { SimpleDropdown } from './SimpleDropdown';

import { DropdownPropTypes } from '@/lib/types';

import { Label } from '@/elements';
import { dropdownStyles } from '@/elements/Dropdown/styles';

const Dropdown = ({
  typeSelect,
  options,
  onChange,
  customStyles = {},
  name = '',
  label = '',
  disabled = false,
  asyncCall = false,
  ...rest
}) => {
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
        typeSelect={typeSelect}
        asyncCall={asyncCall}
      />
    </div>
  );
};

Dropdown.propTypes = DropdownPropTypes;

export default Dropdown;
