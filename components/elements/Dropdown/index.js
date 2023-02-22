import React, { useState } from 'react';
import Select from 'react-select';

import PropTypes from 'prop-types';

import OptionRow from '@/elements/Dropdown/OptionRow';

const dropdownStyles = (selectedOption) => ({
  option: (base) => ({
    ...base,
    color: '#000000',
    '&:hover': {
      background: '#FFFFFF',
    },
  }),
  control: (base, { menuIsOpen }) => ({
    ...base,
    '&:hover': {
      border: menuIsOpen && '1px solid #199AF5',
    },
    background: selectedOption && '#E7ECF8',
    borderRadius: '6px',
    padding: '0.13rem',
    border: menuIsOpen ? '1px solid #199AF5' : '1px solid #DADFEA',
  }),
  dropdownIndicator: (base, { isFocused }) => ({
    ...base,
    color: isFocused && '#199AF5',
    transform: isFocused && 'rotate(180deg)',
    transition: 'all .5s ease',
  }),
  indicatorSeparator: (base) => ({
    ...base,
    display: 'none',
  }),
});

const dropdownTheme = (theme) => ({
  ...theme,
  borderRadius: 0,
  colors: {
    ...theme.colors,
    primary25: 'transpasrent',
    primary: 'transparent',
  },
});

const Dropdown = ({ onChange, label, id, dropdownOptions }) => {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleChange = (option) => {
    setSelectedOption(option);
    onChange(option);
  };

  const renderOption = ({ countryFlag, value }) => <OptionRow countryFlag={countryFlag} value={value} />;

  return (
    <div className="relative bottom-1.5">
      <label htmlFor={id} className="text-[12px] text-gray font-semibold uppercase">
        {label}
      </label>
      <Select
        id={id}
        options={dropdownOptions}
        closeMenuOnSelect={false}
        onChange={(option) => handleChange(option)}
        formatOptionLabel={renderOption}
        styles={dropdownStyles(selectedOption)}
        theme={dropdownTheme}
      />
    </div>
  );
};

Dropdown.defaultProps = {
  onChange: () => {},
  label: '',
};

Dropdown.propTypes = {
  onChange: PropTypes.func,
  label: PropTypes.string,
  id: PropTypes.oneOf([PropTypes.string, PropTypes.number]).isRequired,
  dropdownOptions: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

export default Dropdown;
