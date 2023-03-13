'use client';

import PropTypes from 'prop-types';

import { Form } from '@/elements';
import { useHookForm } from '@/utils/hooks';

const FormManager = ({ children, submitAction, submitButton, className }) => {
  const {
    handleSubmit,
    formState: { isSubmitting },
    reset,
  } = useHookForm();

  const onSubmit = async (data) => {
    submitAction(data);
    reset();
  };

  return (
    <Form
      className={`${className} flex flex-col gap-4`}
      onSubmit={handleSubmit(onSubmit)}
      disabled={isSubmitting}
      submitButton={submitButton}
    >
      {children}
    </Form>
  );
};

FormManager.defaultProps = {
  className: ''
};

FormManager.propTypes = {
  submitButton: PropTypes.shape({}).isRequired,
  submitAction: PropTypes.func.isRequired,
  className: PropTypes.string
};

export default FormManager;
