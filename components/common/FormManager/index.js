'use client';

import { FormProvider, useForm } from 'react-hook-form';

// import PropTypes from 'prop-types';

const FormManager = ({ children }) => {
  const methods = useForm();
  const onSubmit = (data) => {
    console.log({ formData: data });
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>{children}</form>
    </FormProvider>
  );
};

FormManager.propTypes = {};

export default FormManager;
