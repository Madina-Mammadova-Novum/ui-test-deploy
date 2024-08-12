'use client';

import { useFormContext } from 'react-hook-form';

import { ModalFormManagerPropTypes } from '@/lib/types';

import { Button } from '@/elements';

const ModalFormManager = ({ onClose, children, submitAction, submitButton, className = '', specialStyle = '' }) => {
  const {
    handleSubmit,
    formState: { isSubmitting },
  } = useFormContext();
  const { text, variant, size, disabled, className: buttonClassName = '' } = submitButton;

  return (
    <form className={`${className} flex flex-col gap-5 overflow-clip`} onSubmit={handleSubmit(submitAction)}>
      {children}
      <div
        className={`flex bg-white ${
          specialStyle ? 'justify-between items-start' : 'justify-end'
        } gap-x-2.5 whitespace-nowrap`}
      >
        <Button
          onClick={onClose}
          customStyles="w-full"
          customStylesFromWrap={specialStyle && `flex-1`}
          disabled={isSubmitting}
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
    </form>
  );
};

ModalFormManager.propTypes = ModalFormManagerPropTypes;

export default ModalFormManager;
