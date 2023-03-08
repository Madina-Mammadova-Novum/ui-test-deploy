'use client';

import { Form, Input, NextLink, PasswordInput } from '@/elements';
import { useHookForm } from '@/utils/hooks';

const LoginForm = () => {
  const { register, handleSubmit, reset, formState } = useHookForm();
  const { errors, isSubmitting } = formState;

  const onSubmit = async (data) => {
    reset();
    return data;
  };

  return (
    <Form
      className="flex flex-col gap-4"
      onSubmit={handleSubmit(onSubmit)}
      disabled={isSubmitting}
      ctaProps={{ text: 'Log in', variant: 'primary', size: 'large' }}
    >
      <Input
        {...register('email')}
        type="email"
        label="email"
        placeholder="Enter your email"
        error={errors?.email?.message}
        required
      />
      <PasswordInput
        {...register('password')}
        label="password"
        placeholder="Enter your password"
        error={errors?.password?.message}
        required
      />
      <div className="ml-auto">
        <NextLink href="/forgot-password" className="text-blue underline text-xsm">
          Forgot your password
        </NextLink>
      </div>
    </Form>
  );
};

export default LoginForm;
