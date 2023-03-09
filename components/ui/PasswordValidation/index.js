'use client';

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
    expression: /^.{8,}/g,
  },
  {
    text: 'One lower case letter',
    isValidated: false,
    expression: /[a-z]/g,
  },
  {
    text: 'One upper case letter',
    isValidated: false,
    expression: /[A-Z]/g,
  },
  {
    text: 'At least one digit',
    isValidated: false,
    expression: /\d/g,
  },
  {
    text: 'One special symbol',
    isValidated: false,
    expression: /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/g,
  },
];

const PasswordValidation = ({ title, customStyles, submitCount }) => {
  const [validation, setValidation] = useState(initialState);
  const { register } = useFormContext();
  useEffect(() => {
    if (submitCount) setValidation(initialState);
  }, [submitCount]);

  const passwordValidation = (password) => {
    setValidation((conditions) =>
      conditions.map((validationObject) => {
        return {
          ...validationObject,
          isValidated: password.match(validationObject.expression),
        };
      })
    );
  };

  return (
    <div className={classnames('max-w-[612px]', customStyles)}>
      {title !== '' ?? <h3>{title}</h3>}
      <div className="flex gap-5">
        <div className="w-full w-[296px]">
          <PasswordInput
            submitCount={submitCount}
            register={register}
            name="user.password"
            label="chose password"
            placeholder="Enter your password"
            onChange={passwordValidation}
            required
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
  title: '',
};

PasswordValidation.propTypes = {
  title: PropTypes.string,
  customStyles: PropTypes.string,
  submitCount: PropTypes.number,
};

export default PasswordValidation;
