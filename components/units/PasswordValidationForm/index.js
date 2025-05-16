'use client';

import { useEffect, useState } from 'react';

import classNames from 'classnames';

import { PasswordValidationPropTypes } from '@/lib/types';

import TickInCircleSVG from '@/assets/images/checkCircle.svg';
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

const PasswordValidation = ({ title = '', customStyles = '', helperData }) => {
  const [validation, setValidation] = useState(initialState);

  const {
    clearErrors,
    setValue,
    formState: { isSubmitSuccessful, isSubmitting },
  } = useHookForm();

  const { password, confirm } = helperData;

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
    <div className={customStyles}>
      {title !== '' ?? <Title level="3">{title}</Title>}
      <div className="flex flex-col items-start gap-3">
        <div className="flex w-full flex-col justify-between gap-y-4">
          <PasswordInput
            name="password"
            label={password?.label}
            placeholder={password?.placeholder}
            disabled={isSubmitting}
            onChange={passwordValidation}
            autoComplete="off"
            aria-autocomplete="none"
            inputStyles="bg-white"
          />
          <PasswordInput
            name="confirmPassword"
            label={confirm?.label}
            placeholder={confirm?.placeholder}
            disabled={isSubmitting}
            onChange={passwordValidation}
            autoComplete="off"
            aria-autocomplete="none"
            inputStyles="bg-white"
          />
        </div>

        <ul className="text-[12px] leading-[130%] text-black">
          {validation.map(({ text, isValidated }, index) => (
            <li key={text} className={classNames('flex items-center', index && 'mt-1')}>
              <TickInCircleSVG className={`${isValidated ? 'fill-green' : 'fill-blue'} h-5 w-5`} viewBox="0 0 24 24" />
              <span className="ml-1">{text}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

PasswordValidation.propTypes = PasswordValidationPropTypes;

export default PasswordValidation;
