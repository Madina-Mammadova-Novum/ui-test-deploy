'use client';

import { FormProvider, useForm } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { FormManager } from '@/common';
import { Input, NextLink, PasswordInput } from '@/elements';
import { emailSchema, passwordSchema } from '@/lib/schemas';

const schema = yup
  .object({
    email: emailSchema().required(),
    password: passwordSchema(),
  })
  .required();

const LoginForm = () => {
  const methods = useForm({
    resolver: yupResolver(schema),
  });

  const {
    register,
    formState: { errors },
  } = methods;

  const onSubmit = (data) => {
    console.log('data: ', data);
  };

  return (
    <FormProvider {...methods}>
      <FormManager submitAction={onSubmit} submitProps={{ text: 'Log in', variant: 'primary', size: 'large' }}>
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
      <div className="ml-auto">
        <NextLink href="/forgot-password" className="text-blue underline text-xsm">
          Forgot your password
        </NextLink>
      </div>
    </FormProvider>
  );
};

export default LoginForm;
