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
    const response = await forgotPassword({ data: formData });
    if (response.status === 200) {
      successToast('Password reset sent!', "You'll receive an email, if you are registered on our system");
      reset();
    }
    if (response.error) {
      errorToast(response.error.message, response.error.description);
    }
  };

  return (
    <FormProvider {...methods}>
      <FormManager
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
