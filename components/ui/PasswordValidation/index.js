/* eslint-disable no-unused-expressions */
/* eslint-disable no-useless-escape */
import React, { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';

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

const PasswordValidation = ({ title, customStyles, submitCount }) => {
  const [validation, setValidation] = useState(initialState);
  const { register } = useFormContext();

  useEffect(() => {
    if (submitCount) setValidation(initialState);
  }, [submitCount]);

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
      <div className="grid gap-5 grid-cols-1 md:grid-cols-2">
        <div className="w-full md:w-[296px]">
          <PasswordInput
            submitCount={submitCount}
            register={register}
            name="user.password"
            label="chose password"
            placeholder="Enter your password"
            onChange={passwordValidation}
          />
          <PasswordInput
            submitCount={submitCount}
            register={register}
            name="user.confirm_password"
            label="confirm password"
            placeholder="Enter your password"
            customStyles="mt-4"
            required
          />
        </div>

        <div className="pl-0 md:pl-5">
          <h4 className="whitespace-nowrap">Password requirements</h4>

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
  submitCount: 0,
};

PasswordValidation.propTypes = {
  title: PropTypes.string.isRequired,
  customStyles: PropTypes.string,
  submitCount: PropTypes.number,
};

export default PasswordValidation;
