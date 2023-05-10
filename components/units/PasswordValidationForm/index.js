'use client';

import { useEffect, useState } from 'react';

import classnames from 'classnames';

import { PasswordValidationPropTypes } from '@/lib/types';

import TickInCircleSVG from '@/assets/images/tickInCircle.svg';
import { PasswordInput, Title } from '@/elements';
import { useHookForm } from '@/utils/hooks';

const initialState = [
  {
    text: 'At least 8 characters',
    isValidated: false,
    expression: /.{8,}/,
  },
  {
    text: 'One lower case letter',
    isValidated: false,
    expression: /.*[a-z]/,
  },
  {
    text: 'One upper case letter',
    isValidated: false,
    expression: /.*[A-Z]/,
  },
  {
    text: 'At least one digit',
    isValidated: false,
    expression: /.*\d/,
  },
  {
    text: 'One special symbol',
    isValidated: false,
    expression: /.*[!@#$%^&*()_+={}[\]\\|;:'",.<>/?-]/,
  },
];

const PasswordValidation = ({ title = '', customStyles = '' }) => {
  const [validation, setValidation] = useState(initialState);
  const {
    clearErrors,
    setValue,
    formState: { isSubmitSuccessful, isSubmitting },
  } = useHookForm();

  useEffect(() => {
    if (isSubmitSuccessful) setValidation(initialState);
  }, [isSubmitSuccessful]);

  const passwordValidation = (event) => {
    clearErrors(['password', 'confirmPassword']);
    const { value, name } = event.target;
    setValidation((conditions) =>
      conditions.map((validationObject) => {
        return {
          ...validationObject,
          isValidated: value.match(validationObject.expression),
        };
      })
    );

    if (validation) setValue(name, value);
  };

  return (
    <div className={classnames(customStyles, 'pt-4')}>
      {title !== '' ?? <Title level="3">{title}</Title>}
      <div className="flex items-start gap-x-5 min-w-[450px]">
        <div className="w-full flex flex-col gap-y-5 justify-between">
          <PasswordInput
            name="password"
            label="Chose password"
            placeholder="Enter your password"
            disabled={isSubmitting}
            onChange={passwordValidation}
          />
          <PasswordInput
            name="confirmPassword"
            label="Confirm password"
            placeholder="Enter your password"
            disabled={isSubmitting}
            customStyles="mt-4"
            onChange={passwordValidation}
          />
        </div>
        <div className="pl-0 md:pl-5">
          <Title level="4" className="whitespace-nowrap">
            Password requirements
          </Title>
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

PasswordValidation.propTypes = PasswordValidationPropTypes;

export default PasswordValidation;
