'use client';

import { FormProvider } from 'react-hook-form';

import { signIn } from 'next-auth/react';
import * as yup from 'yup';

import { FormManager } from '@/common';
import { Input, PasswordInput } from '@/elements';
import { ROUTES } from '@/lib';
import { loginSchema } from '@/lib/schemas';
import { useHookFormParams } from '@/utils/hooks';

const LoginForm = () => {
  const schema = yup.object().shape({
    ...loginSchema(),
  });

  const methods = useHookFormParams({ schema });

  const {
    register,
    setValue,
    clearErrors,
    reset,
    formState: { errors, isSubmitting },
  } = methods;

  const onSubmit = async (data) => {
    await signIn('credentials', {
      email: data?.email,
      password: data?.password,
      redirect: true,
      callbackUrl: ROUTES.ACCOUNT_INFO,
    });
    reset();
  };

  const handlePassword = (event) => {
    clearErrors('password');
    const { value } = event.target;
    setValue('password', value);
  };

  return (
    <FormProvider {...methods}>
      <FormManager
        submitButton={{
          text: 'Log in',
          variant: 'primary',
          size: 'large',
        }}
        className="pt-5"
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
          name="password"
          label="Password"
          placeholder="Enter your password"
          disabled={isSubmitting}
          onChange={handlePassword}
          error={errors?.password?.message}
        />
      </FormManager>
    </FormProvider>
  );
};

export default LoginForm;
