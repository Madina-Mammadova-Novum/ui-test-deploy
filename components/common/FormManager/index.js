'use client';

import { useFormContext } from 'react-hook-form';

import PropTypes from 'prop-types';

import { buttonSizesPropTypes, buttonVariantsPropTypes } from '@/lib/types';

import { Button } from '@/elements';

const FormManager = ({ children, submitAction, submitButton, className }) => {
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

FormManager.defaultProps = {
  className: '',
};

FormManager.propTypes = {
  submitButton: {
    text: PropTypes.string,
    icon: PropTypes.node,
    disabled: PropTypes.bool,
    variant: PropTypes.oneOf(STYLES),
    size: PropTypes.oneOf(SIZES.BUTTONS),
  }.isRequired,
  submitAction: PropTypes.func.isRequired,
  className: PropTypes.string,
};

export default FormManager;
