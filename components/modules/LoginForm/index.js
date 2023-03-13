'use client';

import { FormProvider } from 'react-hook-form';

import * as yup from 'yup';

import { FormManager } from '@/common';
import { Input, PasswordInput } from '@/elements';
import { emailSchema, passwordSchema } from '@/lib/schemas';
import { login } from '@/services';
import { successToast, useHookFormParams } from '@/utils/hooks';

const schema = yup
  .object({
    email: emailSchema().required(),
    password: passwordSchema().required(),
  })
  .required();

const LoginForm = () => {
  const methods = useHookFormParams({ schema });

  const {
    register,
    reset,
    formState: { errors, isSubmitting },
  } = methods;

  const onSubmit = async (data) => {
    const { message } = await login({ data });
    successToast(message, 'Some description');
    reset();
  };

  return (
    <FormProvider {...methods}>
      <FormManager
        submitButton={{
          text: 'Log in',
          variant: 'primary',
          size: 'large',
        }}
        submitAction={onSubmit}
      >
        <Input
          {...register('email')}
          label="Email"
          placeholder="Enter your email"
          type="email"
          disabled={isSubmitting}
          error={errors?.email?.message}
        />
        <PasswordInput
          {...register('password')}
          label="Password"
          placeholder="Enter your password"
          disabled={isSubmitting}
          error={errors?.password?.message}
        />
      </FormManager>
    </FormProvider>
  );
};

export default LoginForm;
