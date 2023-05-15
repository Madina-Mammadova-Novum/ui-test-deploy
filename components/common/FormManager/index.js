'use client';

import { useFormContext } from 'react-hook-form';

import { FormManagerPropTypes } from '@/lib/types';

import { Button } from '@/elements';

const FormManager = ({ children, submitAction, submitButton, className = '' }) => {
  const {
    handleSubmit,
    formState: { isSubmitting },
  } = useFormContext();
  const { text, variant, size, disabled, className: buttonClassName } = submitButton;

  return (
    <form className={`${className} flex flex-col gap-5`} onSubmit={handleSubmit(submitAction)}>
      {children}
      <Button
        type="submit"
        buttonProps={{
          text: isSubmitting ? 'Please wait...' : text,
          variant: isSubmitting ? 'secondary' : variant,
          size,
        }}
        disabled={disabled || isSubmitting}
        customStyles={`${buttonClassName} w-full`}
      />
    </form>
  );
};

FormManager.propTypes = FormManagerPropTypes;

export default FormManager;
