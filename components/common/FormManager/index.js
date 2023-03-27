'use client';

import { useFormContext } from 'react-hook-form';

import PropTypes from 'prop-types';

import { Button } from '@/elements';
import { SIZES, STYLES } from '@/lib/constants';

const FormManager = ({ children, submitAction, submitButton, className }) => {
  const {
    handleSubmit,
    formState: { isSubmitting },
  } = useFormContext();
  const { text, variant, size, className: buttonClassName } = submitButton;

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
        disabled={isSubmitting}
        customStyles={`${buttonClassName} mt-4 w-full`}
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
    variant: PropTypes.oneOf(STYLES),
    size: PropTypes.oneOf(SIZES.BUTTONS),
  }.isRequired,
  submitAction: PropTypes.func.isRequired,
  className: PropTypes.string,
};

export default FormManager;
