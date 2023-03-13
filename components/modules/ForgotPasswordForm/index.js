'use client';

import { FormProvider, useForm } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { FormManager } from '@/common';
import { Input } from '@/elements';
import { forgotPassword } from '@/services/user';
import { successToast } from '@/utils/hooks';

const schema = yup
  .object({
    email: yup.string().required().email(),
  })
  .required();

const ForgotPasswordForm = () => {
  const methods = useForm({
    resolver: yupResolver(schema),
  });

  const {
    reset,
    register,
    formState: { isSubmitting, errors },
  } = methods;
  const onSubmit = async (data) => {
    const { message } = await forgotPassword({ data });
    successToast(message, 'Some description');
    reset();
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
