'use client';

import { FormProvider } from 'react-hook-form';

import * as yup from 'yup';

import { FormManager } from '@/common';
import { Input } from '@/elements';
import { forgotPasswordSchema } from '@/lib/schemas';
import { forgotPassword } from '@/services/user';
import { errorToast, successToast, useHookFormParams } from '@/utils/hooks';

const ForgotPasswordForm = () => {
  const schema = yup.object().shape({
    ...forgotPasswordSchema(),
  });

  const methods = useHookFormParams({ schema });

  const {
    reset,
    register,
    formState: { isSubmitting, errors },
  } = methods;
  const onSubmit = async (formData) => {
    const { error, message } = await forgotPassword({ data: formData });

    if (!error) {
      successToast(message);
      reset();
    }

    errorToast(error.message, error.errors);
  };

  return (
    <FormProvider {...methods}>
      <FormManager
        className="pt-4"
        submitButton={{
          text: 'Get a new password',
          variant: 'primary',
          size: 'large',
        }}
        submitAction={onSubmit}
      >
        <Input
          {...register('email')}
          label="Email"
          placeholder="Enter your email"
          customStyles="mt-4"
          type="email"
          disabled={isSubmitting}
          error={errors.email?.message}
        />
      </FormManager>
    </FormProvider>
  );
};

export default ForgotPasswordForm;
