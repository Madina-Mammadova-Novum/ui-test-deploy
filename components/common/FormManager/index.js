'use client';

import { FormProvider, useForm } from 'react-hook-form';

const FormManager = ({ children }) => {
  const methods = useForm();

  return <FormProvider {...methods}>{children}</FormProvider>;
};

export default FormManager;
