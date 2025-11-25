'use client';

import { useCallback, useEffect, useState } from 'react';

import SimpleDropdown from './SimpleDropdown';

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
  defaultValue = null,
  ...rest
}) => {
  const [selectedOption, setSelectedOption] = useState(defaultValue);

  const { dropdownWidth, className } = customStyles;

  const handleChange = useCallback(
    (option) => {
      setSelectedOption(option);
      onChange(option);
    },
    [onChange]
  );

  useEffect(() => {
    if (defaultValue !== selectedOption) {
      setSelectedOption(defaultValue);
    }
  }, [defaultValue, selectedOption]);

  return (
    <div className={`relative top-px ${disabled && 'cursor-not-allowed opacity-80'} ${className}`}>
      <Label name={name} className="text-xs-sm">
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
        value={selectedOption}
      />
    </div>
  );
};

Dropdown.propTypes = DropdownPropTypes;

export default Dropdown;
