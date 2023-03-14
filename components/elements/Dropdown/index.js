'use client';

import React from 'react';
import { Controller } from 'react-hook-form';
import Select from 'react-select';

import PropTypes from 'prop-types';

import { InputErrorMessage } from '@/elements';

// import OptionRow from '@/elements/Dropdown/OptionRow';
// import OptionsList from '@/elements/Dropdown/OptionsList';
// import { dropdownStyles, dropdownTheme } from '@/elements/Dropdown/styles';

const Dropdown = ({ name, label, options, onChange, disabled }) => {
  // const [selectedOption, setSelectedOption] = useState(null);

  const handleChange = (option) => {
    onChange(option);
  };

  // const renderOption = ({ countryFlag, value }) => <OptionRow countryFlag={countryFlag} value={value} />;

  return (
    <Controller
      name={name}
      render={({ field: { ref, ...field }, formState: { errors, isSubmitting } }) => {
        console.log({ errors });
        const error = errors[name]?.value;
        return (
          <div className="relative bottom-1.5">
            <label htmlFor={name} className="text-[12px] text-gray font-semibold uppercase">
              {label}
            </label>
            <Select
              ref={ref}
              id={name}
              {...field}
              isDisabled={disabled || isSubmitting}
              options={options}
              onChange={handleChange}

              // closeMenuOnSelect={false}
              // value={selectedOption}
              // formatOptionLabel={renderOption}
              // styles={dropdownStyles(selectedOption, error)}
              // theme={dropdownTheme}
            />
            {error && <InputErrorMessage message={error?.message} />}
          </div>
        );
      }}
    />
  );
};

Dropdown.defaultProps = {
  label: null,
  disabled: false,
};

Dropdown.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
};

export default Dropdown;
