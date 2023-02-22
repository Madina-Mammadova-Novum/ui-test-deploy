'use client';

import { FormProvider, useForm } from 'react-hook-form';
import { Provider as RTKProvider } from 'react-redux';
import { ToastContainer } from 'react-toastify';

import store from '@/store/store';
import { options } from '@/utils/formOptions';

export default function ProviderManager({ children }) {
  const methods = useForm(options);

  return (
    <RTKProvider store={store}>
      <ToastContainer position="top-right" closeOnClick={false} closeButton={false} autoClose={false} hideProgressBar />
      <FormProvider {...methods}>{children}</FormProvider>
    </RTKProvider>
  );
}
