'use client';

import { useMemo } from 'react';
import { useFormContext } from 'react-hook-form';

import { FormManagerPropTypes } from '@/lib/types';

import { ResetButton, SubmitButton } from '@/elements';

const FormManager = ({
  children,
  submitAction,
  onErrorAction = () => {},
  submitButton,
  showReset = false,
  resetAction,
  className = 'flex flex-col gap-5',
}) => {
  const {
    handleSubmit,
    formState: { isSubmitting, isDirty },
  } = useFormContext();

  const {
    text,
    variant,
    size,
    disabled,
    icon,
    className: buttonClassName = 'w-full',
    buttonContainerClassName,
  } = submitButton;

  const printCta = useMemo(() => {
    return showReset ? (
      <div className={`flex gap-x-2.5 ${buttonContainerClassName}`}>
        <SubmitButton
          text={text}
          variant={variant}
          size={size}
          isSubmitting={isSubmitting}
          disabled={disabled || isSubmitting}
          customStyles={`${buttonClassName} whitespace-nowrap`}
          icon={icon}
        />
        <ResetButton
          text="Reset all"
          variant="tertiary"
          onClick={resetAction}
          customStyles="!text-blue whitespace-nowrap"
          icon={icon}
        />
      </div>
    ) : (
      <SubmitButton
        text={text}
        variant={variant}
        size={size}
        isSubmitting={isSubmitting}
        disabled={disabled || isSubmitting}
        customStyles={`${buttonClassName} whitespace-nowrap mt-5`}
        icon={icon}
      />
    );
  }, [showReset, text, variant, size, isSubmitting, disabled, buttonClassName, icon, resetAction, isDirty]);

  return (
    <form className={className} onSubmit={handleSubmit(submitAction, onErrorAction)}>
      {children}
      {printCta}
    </form>
  );
};

FormManager.propTypes = FormManagerPropTypes;

export default FormManager;
