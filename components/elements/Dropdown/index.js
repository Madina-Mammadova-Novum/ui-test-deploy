import { useState } from 'react';
import { Controller } from 'react-hook-form';
import Select from 'react-select';

import PropTypes from 'prop-types';

import OptionRow from '@/elements/Dropdown/OptionRow';

const dropdownStyles = (selectedOption, error) => ({
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
    border: menuIsOpen ? '1px solid #199AF5' : `1px solid ${!error ? '#EADADA' : '#E53636'} `,
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

const Dropdown = ({ onChange, name, control, label, id, dropdownOptions, error }) => {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleChange = (option) => {
    setSelectedOption(option.value);
    onChange(option.value);
  };

  const renderOption = ({ countryFlag, value }) => <OptionRow countryFlag={countryFlag} value={value} />;

  return (
    <div className="relative bottom-0.5">
      <label htmlFor={id} className="text-[12px] text-gray font-semibold uppercase">
        {label}
      </label>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Select
            id={id}
            options={dropdownOptions}
            closeMenuOnSelect={false}
            value={selectedOption}
            onChange={(option) => handleChange(option)}
            formatOptionLabel={renderOption}
            styles={dropdownStyles(selectedOption, error)}
            theme={dropdownTheme}
            {...field}
          />
        )}
      />
      {error && <p className="text-[12px] text-red">{error}</p>}
    </div>
  );
};

Dropdown.defaultProps = {
  onChange: () => {},
  label: '',
  error: '',
  name: '',
  control: {},
};

Dropdown.propTypes = {
  name: PropTypes.string,
  onChange: PropTypes.func,
  error: PropTypes.string,
  label: PropTypes.string,
  control: PropTypes.shape({}),
  id: PropTypes.oneOf([PropTypes.string, PropTypes.number]).isRequired,
  dropdownOptions: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

export default Dropdown;
