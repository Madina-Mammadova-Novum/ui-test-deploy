import React from 'react';

import classnames from 'classnames';
import PropTypes from 'prop-types';

const TextArea = ({ label, type, disabled, placeholder, customStyles, id, ...rest }) => {
  return (
    <div className={disabled && 'opacity-50 pointer-events-none'}>
      <label htmlFor={id} className="block text-gray text-[12px] font-semibold uppercase">
        {label}
      </label>
      <textarea
        className={classnames(
          'border border-gray-darker rounded-md resize-none outline-none text-xsm border-box px-4 py-2.5 min-h-[60px] min-w-[296px] hover:border-blue focus:border-blue',
          customStyles
        )}
        type={type}
        disabled={disabled}
        placeholder={placeholder}
        id={id}
        {...rest}
      />
    </div>
  );
};

TextArea.defaultProps = {
  label: '',
  type: 'text',
  placeholder: '',
  customStyles: '',
  disabled: false,
};

TextArea.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  customStyles: PropTypes.string,
  disabled: PropTypes.bool,
};

export default TextArea;
