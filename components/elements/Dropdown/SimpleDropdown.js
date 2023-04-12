'use client';

import Select from 'react-select';

import PropTypes from 'prop-types';
import AsyncSelect from 'react-select/async';

import { filterDataByLowerCase } from '@/utils/helpers';

export const SimpleDropdown = ({ async, options, ...rest }) => {
  if (async) {
    const loadOptions = (inputValue, callback) => callback(filterDataByLowerCase(inputValue));

    return (
      <AsyncSelect
        cacheOptions
        defaultOptions={options}
        isLoading={!options?.length}
        loadOptions={loadOptions}
        {...rest}
      />
    );
  }

  return <Select options={options} {...rest} />;
};

SimpleDropdown.defaultProps = {
  async: false,
  options: [],
  loadOptions: [],
};

SimpleDropdown.propTypes = {
  async: PropTypes.bool,

  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    }).isRequired
  ),
  loadOptions: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    }).isRequired
  ),
};
