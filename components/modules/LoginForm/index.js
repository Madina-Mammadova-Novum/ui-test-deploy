'use client';

import { FormProvider } from 'react-hook-form';

import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import * as yup from 'yup';

import { signInAdapter } from '@/adapters/user';
import { FormManager } from '@/common';
import { Input, PasswordInput } from '@/elements';
import { loginSchema } from '@/lib/schemas';
import { errorToast, useHookFormParams } from '@/utils/hooks';

const LoginForm = () => {
  const router = useRouter();

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
    const { ok, error, url } = await signIn('credentials', signInAdapter({ data }));
    if (ok) {
      router.push(url);
      reset();
    }
    if (error === 'CredentialsSignin') errorToast('Bad request', 'Incorrect email or password');
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
          className: 'mt-0 w-full',
        }}
        className="pt-5 flex flex-col gap-y-5"
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
