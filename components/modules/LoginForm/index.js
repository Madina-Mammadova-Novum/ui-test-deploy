'use client';

import { FormProvider } from 'react-hook-form';

import * as yup from 'yup';

import { FormManager } from '@/common';
import { Input, PasswordInput } from '@/elements';
import { emailSchema, passwordSchema } from '@/lib/schemas';
import { useHookFormParams } from '@/utils/hooks';

const schema = yup
  .object({
    email: emailSchema().required(),
    password: passwordSchema(),
  })
  .required();

const LoginForm = () => {
  const methods = useHookFormParams({ schema });

  const {
    register,
    formState: { errors },
  } = methods;

  const onSubmit = (data) => {
    return data;
  };

  return (
    <FormProvider {...methods}>
      <FormManager submitAction={onSubmit} submitButton={{ text: 'Log in', variant: 'primary', size: 'large' }}>
        <Input
          {...register('email')}
          type="email"
          label="email"
          placeholder="Enter your email"
          error={errors?.email?.message}
        />
        <PasswordInput
          {...register('password')}
          label="password"
          placeholder="Enter your password"
          error={errors?.password?.message}
        />
      </FormManager>
    </FormProvider>
  );
};

export default LoginForm;
