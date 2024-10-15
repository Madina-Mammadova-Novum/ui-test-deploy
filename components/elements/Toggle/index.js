'use client';

import { useState } from 'react';

import PropTypes from 'prop-types';

const Toggle = ({ value = false, id, disabled = false, children, className = '' }) => {
  const [toggle, setToggle] = useState(value);

  return (
    <>
      <label htmlFor={id} className={`relative inline-block h-[18px] w-[30px] ${className}`}>
        <input
          id={id}
          disabled={disabled}
          checked={toggle}
          onChange={() => setToggle(!toggle)}
          type="checkbox"
          className="peer hidden"
        />
        <span className="absolute bottom-0 left-0 right-0 top-0 w-[30px] cursor-pointer rounded-[25px] bg-gray-darker transition before:absolute before:left-0.5 before:top-[50%] before:h-3 before:w-3 before:translate-y-[-50%] before:rounded-[50%] before:bg-white before:transition before:content-[''] peer-checked:bg-blue peer-checked:before:translate-x-[13px]" />
      </label>
      {children}
    </>
  );
};

Toggle.propTypes = {
  value: PropTypes.string,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  id: PropTypes.oneOf([PropTypes.string, PropTypes.number]).isRequired,
};

export default Toggle;
