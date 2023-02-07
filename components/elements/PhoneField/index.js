import React from 'react';
import PhoneInput from 'react-phone-input-2';

import classnames from 'classnames';
import PropTypes from 'prop-types';

const PhoneField = ({ id, name, label, labelVisible, disabled, country, isError, errorMessage, onChange, ...rest }) => {
  return (
    <div className="flex flex-1 flex-col">
      <label
        htmlFor={id}
        className={classnames('text-secondary-darker text-xsm mb-1 inline-block', {
          'opacity-50': disabled,
          'sr-only': !labelVisible,
        })}
      >
        {label}
      </label>
      <PhoneInput
        inputClass="phone-field"
        buttonClass="country-field"
        inputProps={{ id, name }}
        country={country}
        isValid={!isError}
        onChange={(value) => onChange({ target: { type: 'tel', value, name } })}
        {...rest}
      />
      {isError && <span className="text-xsm mt-1 text-error">{errorMessage}</span>}
    </div>
  );
};

PhoneField.defaultProps = {
  label: '',
  labelVisible: true,
  disabled: false,
  country: 'ae',
  isError: false,
  errorMessage: '',
};

PhoneField.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  labelVisible: PropTypes.bool,
  disabled: PropTypes.bool,
  country: PropTypes.string,
  isError: PropTypes.bool,
  errorMessage: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

export default PhoneField;
