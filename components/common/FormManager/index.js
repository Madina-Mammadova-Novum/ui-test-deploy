'use client';

import { useMemo } from 'react';
import { useFormContext } from 'react-hook-form';

import { FormManagerPropTypes } from '@/lib/types';

import { ResetButton, SubmitButton } from '@/elements';

const FormManager = ({
  children,
  submitAction,
  submitButton,
  showReset = false,
  resetAction,
  className = 'flex flex-col gap-5',
}) => {
  const {
    handleSubmit,
    formState: { isSubmitting },
  } = useFormContext();

  const { text, variant, size, disabled, className: buttonClassName = '' } = submitButton;

  const printCta = useMemo(() => {
    return showReset ? (
      <div className="flex flex-row-reverse 3md:flex-row gap-x-2.5">
        <SubmitButton
          text={text}
          variant={variant}
          size={size}
          isSubmitting={isSubmitting}
          disabled={disabled || isSubmitting}
          customStyles={`${buttonClassName} whitespace-nowrap`}
        />
        <ResetButton
          text="Reset all"
          variant="tertiary"
          onClick={resetAction}
          // customStyles={`${!isDirty ? '!text-gray' : '!text-blue'} whitespace-nowrap`}
          // disabled={!isDirty}
        />
      </div>
    ) : (
      <SubmitButton
        text={text}
        variant={variant}
        size={size}
        isSubmitting={isSubmitting}
        disabled={disabled || isSubmitting}
        customStyles={`${buttonClassName} w-full whitespace-nowrap mt-5`}
      />
    );
  }, [showReset, isSubmitting, text, variant, size, disabled, buttonClassName, resetAction]);

  return (
    <form className={className} onSubmit={handleSubmit(submitAction)}>
      {children}
      {printCta}
    </form>
  );
};

FormManager.propTypes = FormManagerPropTypes;

export default FormManager;
