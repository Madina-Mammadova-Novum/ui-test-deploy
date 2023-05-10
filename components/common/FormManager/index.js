'use client';

import { useFormContext } from 'react-hook-form';

import { FormManagerPropTypes } from '@/lib/types';

import { Button } from '@/elements';

const FormManager = ({ onClose, children, submitAction, submitButton, className = '', specialStyle }) => {
  const {
    handleSubmit,
    formState: { isSubmitting },
  } = useFormContext();
  const { text, variant, size, disabled, className: buttonClassName } = submitButton;







  return (
    <form className={`${className} flex flex-col gap-5`} onSubmit={handleSubmit(submitAction)}>
      {children}
      <div className={`flex ${specialStyle ? 'justify-between items-start' : "justify-end"} gap-x-2.5`}>
        <Button
          onClick={onClose}
          customStyles="w-[100%]"
          customStylesFromWrap={specialStyle && `flex-1`}
          buttonProps={{ text: 'Cancel', variant: 'tertiary', size: 'large' }}
        />
        <Button
          type="submit"
          buttonProps={{
            text: isSubmitting ? 'Please wait...' : text,
            variant: isSubmitting ? 'secondary' : variant,
            size,
          }}
          disabled={disabled || isSubmitting}
          customStyles={`${buttonClassName} w-full`}
          customStylesFromWrap={specialStyle && `flex-1`}
        />
      </div>
    </form >
  );
};

FormManager.propTypes = FormManagerPropTypes;

export default FormManager;
