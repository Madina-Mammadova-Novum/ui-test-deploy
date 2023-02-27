'use client';

import { FormProvider, useForm } from 'react-hook-form';

import PropTypes from 'prop-types';

const FormManager = ({ children, options }) => {
  const methods = useForm(options);

  return <FormProvider {...methods}>{children}</FormProvider>;
};

FormManager.propTypes = {
  options: PropTypes.shape({}).isRequired,
};

export default FormManager;
