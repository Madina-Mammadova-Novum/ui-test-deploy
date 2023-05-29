'use client';

import React, { useState } from 'react';
import Select from 'react-select';

import AsyncSelect from 'react-select/async';

import Loader from '../Loader';

import { SimpleDropdownPropTypes } from '@/lib/types';

import OptionRow from '@/elements/Dropdown/OptionRow';
import OptionsList from '@/elements/Dropdown/OptionsList';
import { dropdownTheme } from '@/elements/Dropdown/styles';
import { filterDataByLowerCase } from '@/utils/helpers';

const LoadingIndicator = () => (
  <div className="spinner-border text-primary" role="status">
    <Loader className="w-5 h-5" />
  </div>
);

export const SimpleDropdown = ({ asyncCall = false, options, ref, ...rest }) => {
  const [open, setOpen] = useState(false);

  const printOptions = ({ countryFlag, label: labelValue }) => (
    <OptionRow countryFlag={countryFlag} value={labelValue} />
  );

  if (asyncCall) {
    const loadOptions = (inputValue, callback) => callback(filterDataByLowerCase(inputValue));

    return (
      <AsyncSelect
        {...rest}
        cacheOptions
        defaultOptions={options}
        loadOptions={loadOptions}
        components={{ Option: OptionsList, LoadingIndicator }}
        formatOptionLabel={printOptions}
        isLoading={asyncCall}
        theme={dropdownTheme}
        closeMenuOnSelect
      />
    );
  }

  return (
    <div>
      <Select
        {...rest}
        isLoading={asyncCall}
        options={options}
        components={{ Option: OptionsList, LoadingIndicator }}
        formatOptionLabel={printOptions}
        theme={dropdownTheme}
        closeMenuOnSelect
        menuIsOpen={open}
        onMenuOpen={() => setOpen(true)}
        onMenuClose={() => setOpen(false)}
      />
    </div>
  );
};

SimpleDropdown.propTypes = SimpleDropdownPropTypes;
