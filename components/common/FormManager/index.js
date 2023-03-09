'use client';

import PropTypes from 'prop-types';

import { Form } from '@/elements';
import { useHookForm } from '@/utils/hooks';

const FormManager = ({ children, submitAction, submitProps }) => {
  const {
    handleSubmit,
    formState: { isSubmitting },
    reset,
  } = useHookForm();

  const onSubmit = async (data) => {
    reset();
    submitAction(data);
  };

  return (
    <Form
      className="flex flex-col gap-4"
      onSubmit={handleSubmit(onSubmit)}
      disabled={isSubmitting}
      ctaProps={submitProps}
    >
      {children}
    </Form>
  );
};

FormManager.propTypes = {
  submitProps: PropTypes.shape({}).isRequired,
  submitAction: PropTypes.func.isRequired,
};

export default FormManager;
