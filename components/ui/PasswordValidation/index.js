/* eslint-disable no-unused-expressions */
/* eslint-disable no-useless-escape */
import React, { useState } from 'react';

import classnames from 'classnames';
import PropTypes from 'prop-types';

import TickInCircleSVG from '@/assets/images/tickInCircle.svg';
import { PasswordInput } from '@/elements';

const initialState = [
  {
    text: 'At least 8 characters',
    isValidated: false,
  },
  {
    text: 'One lower case letter',
    isValidated: false,
  },
  {
    text: 'One upper case letter',
    isValidated: false,
  },
  {
    text: 'At least one digit',
    isValidated: false,
  },
  {
    text: 'One special symbol',
    isValidated: false,
  },
];

const PasswordValidation = ({ title, customStyles }) => {
  const [validation, setValidation] = useState(initialState);

  const passwordValidation = (password) => {
    const validationValues = [];
    password.length >= 8 ? validationValues.push(true) : validationValues.push(false);
    password.match(/[a-z]/g) ? validationValues.push(true) : validationValues.push(false);
    password.match(/[A-Z]/g) ? validationValues.push(true) : validationValues.push(false);
    password.match(/\d/g) ? validationValues.push(true) : validationValues.push(false);
    password.match(/[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/g)
      ? validationValues.push(true)
      : validationValues.push(false);
    setValidation((prevValue) =>
      prevValue.map((validationObject, index) => ({ ...validationObject, isValidated: validationValues[index] }))
    );
  };

  return (
    <div className={classnames('max-w-[612px]', customStyles)}>
      <h3>{title}</h3>
      <div className="flex mt-4">
        <div className="w-[296px]">
          <PasswordInput label="chose password" placeholder="Enter your password" onChange={passwordValidation} />
          <PasswordInput label="confirm password" placeholder="Enter your password" customStyles="mt-4" />
        </div>

        <div className="ml-5">
          <h4>Password requirements</h4>

          <ul className="mt-2 text-[12px] text-black">
            {validation.map(({ text, isValidated }, index) => (
              <li className={classnames('flex items-center', index && 'mt-1.5')}>
                <TickInCircleSVG fill={isValidated ? 'green' : 'black'} />
                <span className="ml-1.5">{text}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

PasswordValidation.defaultProps = {
  customStyles: '',
};

PasswordValidation.propTypes = {
  title: PropTypes.string.isRequired,
  customStyles: PropTypes.string,
};

export default PasswordValidation;
