'use client';

import { useCallback, useMemo, useState } from 'react';

import PropTypes from 'prop-types';

import { SimpleDropdown } from './SimpleDropdown';

import { Label } from '@/elements';
import OptionRow from '@/elements/Dropdown/OptionRow';
import OptionsList from '@/elements/Dropdown/OptionsList';
import { dropdownStyles, dropdownTheme } from '@/elements/Dropdown/styles';

const Dropdown = ({ async, name, label, options, onChange, disabled, customStyles, ...rest }) => {
  const [selectedOption, setSelectedOption] = useState(null);

  const { dropdownWidth, className } = customStyles;

  const handleChange = useCallback(
    (option) => {
      setSelectedOption(option);
      onChange(option);
    },
    [onChange]
  );

  const printOptions = ({ countryFlag, label: labelValue }) => (
    <OptionRow countryFlag={countryFlag} value={labelValue} />
  );

  const printDropdown = useMemo(() => {
    if (async) {
      return (
        <SimpleDropdown
          {...rest}
          id={name}
          loadOptions={options}
          components={{ Option: OptionsList }}
          onChange={handleChange}
          formatOptionLabel={printOptions}
          styles={dropdownStyles(selectedOption, null, dropdownWidth)}
          theme={dropdownTheme}
          isDisabled={disabled}
          closeMenuOnSelect
          async
        />
      );
    }
    return (
      <SimpleDropdown
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
    );
  }, [async, disabled, dropdownWidth, handleChange, name, options, rest, selectedOption]);

  return (
    <div className={`relative ${className}`}>
      <Label htmlFor={name} className="text-xs-sm">
        {label}
      </Label>
      {printDropdown}
    </div>
  );
};

Dropdown.defaultProps = {
  label: null,
  async: false,
  disabled: false,
  customStyles: {
    dropdownWidth: '',
    className: '',
  },
};

Dropdown.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  customStyles: PropTypes.shape({
    dropdownWidth: PropTypes.string,
    className: PropTypes.string,
  }),
  async: PropTypes.bool,
  options: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default Dropdown;
