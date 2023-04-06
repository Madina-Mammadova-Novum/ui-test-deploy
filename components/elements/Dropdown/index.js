'use client';

import { useState } from 'react';
import { Controller } from 'react-hook-form';
import Select from 'react-select';

import PropTypes from 'prop-types';

import { InputErrorMessage } from '@/elements';
import OptionRow from '@/elements/Dropdown/OptionRow';
import OptionsList from '@/elements/Dropdown/OptionsList';
import { dropdownStyles, dropdownTheme } from '@/elements/Dropdown/styles';
import { getValueWithPath } from '@/utils/helpers';

const Dropdown = ({ name, label, options, onChange, disabled, customStyles }) => {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleChange = (option) => {
    setSelectedOption(option);
    onChange(option);
  };

  const renderOption = ({ countryFlag, label: value }) => <OptionRow countryFlag={countryFlag} value={value} />;
  return (
    <Controller
      name={name}
      render={({ field: { ref, ...field }, formState: { errors, isSubmitting } }) => {
        const error = getValueWithPath(errors, name)?.value;

        return (
          <div className={`relative bottom-1 ${customStyles}`}>
            <label htmlFor={name} className="text-[12px] text-gray font-semibold uppercase">
              {label}
            </label>
            <Select
              ref={ref}
              id={name}
              {...field}
              options={options}
              components={{ Option: OptionsList }}
              onChange={handleChange}
              closeMenuOnSelect={true}
              formatOptionLabel={renderOption}
              styles={dropdownStyles(selectedOption, error)}
              theme={dropdownTheme}
              isDisabled={disabled || isSubmitting}
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
  customStyles: '',
};

Dropdown.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  customStyles: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
};

export default Dropdown;
