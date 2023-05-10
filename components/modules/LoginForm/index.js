'use client';

import { FormProvider } from 'react-hook-form';

import * as yup from 'yup';

import { FormManager } from '@/common';
import { Input, PasswordInput } from '@/elements';
import { loginSchema } from '@/lib/schemas';
import { login } from '@/services';
import { useHookFormParams } from '@/utils/hooks';

const LoginForm = () => {
  const schema = yup.object().shape({
    ...loginSchema(),
  });

  const methods = useHookFormParams({ schema });

  const {
    register,
    reset,
    formState: { errors, isSubmitting },
  } = methods;

  const onSubmit = async (data) => {
    await login({ data });
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
