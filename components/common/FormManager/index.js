'use client';

import { useFormContext } from 'react-hook-form';

import PropTypes from 'prop-types';

import { Form } from '@/elements';

const FormManager = ({ children, submitAction, submitProps }) => {
  const {
    handleSubmit,
    formState: { isSubmitting },
    reset,
  } = useFormContext();

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
