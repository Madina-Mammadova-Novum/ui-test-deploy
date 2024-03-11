'use client';

import { useCallback, useState } from 'react';

import { SimpleDropdown } from './SimpleDropdown';

import { DropdownPropTypes } from '@/lib/types';

import { Label } from '@/elements';
import { dropdownStyles } from '@/elements/Dropdown/styles';

const Dropdown = ({
  options,
  onChange = () => {},
  customStyles = {},
  name = '',
  label = '',
  loading = false,
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
    <div className={`relative top-px ${disabled && 'opacity-70'} ${className}`}>
      <Label htmlFor={name} className="text-xs-sm">
        {label}
      </Label>
      <SimpleDropdown
        {...rest}
        id={name}
        loading={loading}
        options={options}
        onChange={handleChange}
        styles={dropdownStyles(selectedOption, null, dropdownWidth)}
        isDisabled={disabled}
        asyncCall={asyncCall}
      />
    </div>
  );
};

Dropdown.propTypes = DropdownPropTypes;

export default Dropdown;
