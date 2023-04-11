'use client';

import { useState } from 'react';

import PropTypes from 'prop-types';

const Toggle = ({ value, id, disabled, children, className }) => {
  const [toggle, setToggle] = useState(value);

  return (
    <>
      <label htmlFor={id} className={`relative inline-block w-[30px] h-[18px] ${className}`}>
        <input
          id={id}
          disabled={disabled}
          checked={toggle}
          onChange={() => setToggle(!toggle)}
          type="checkbox"
          className="hidden peer"
        />
        <span className="absolute cursor-pointer bg-gray-darker rounded-[25px] w-[30px] top-0 left-0 bottom-0 right-0 transition before:absolute before:content-[''] before:left-0.5 before:top-[50%] before:translate-y-[-50%] before:w-3 before:h-3 before:rounded-[50%] before:bg-white before:transition peer-checked:bg-blue peer-checked:before:translate-x-[13px]" />
      </label>
      {children}
    </>
  );
};

Toggle.defaultProps = {
  value: false,
  disabled: false,
  className: '',
};

Toggle.propTypes = {
  value: PropTypes.string,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  id: PropTypes.oneOf([PropTypes.string, PropTypes.number]).isRequired,
};

export default Toggle;
