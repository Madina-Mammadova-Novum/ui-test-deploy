'use client';

import React from 'react';

import Select from 'react-select';

import AsyncSelect from 'react-select/async';

import { SimpleDropdownPropTypes } from '@/lib/types';

import OptionRow from '@/elements/Dropdown/OptionRow';
import OptionsList from '@/elements/Dropdown/OptionsList';
import { dropdownTheme } from '@/elements/Dropdown/styles';
import { filterDataByLowerCase } from '@/utils/helpers';

export const SimpleDropdown = ({ asyncCall = false, options, ref, ...rest }) => {
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
        components={{ Option: OptionsList }}
        formatOptionLabel={printOptions}
        isLoading={!options?.length}
        theme={dropdownTheme}
        closeMenuOnSelect
      />
    );
  }

  return (
    <Select
      {...rest}
      options={options}
      components={{ Option: OptionsList }}
      formatOptionLabel={printOptions}
      theme={dropdownTheme}
      closeMenuOnSelect
    />
  );
};

SimpleDropdown.propTypes = SimpleDropdownPropTypes;
