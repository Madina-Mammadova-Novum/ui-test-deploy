'use client';

import { useForm } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { Button, Input } from '@/elements';
import { forgotPassword } from '@/services/user';
import { successToast } from '@/utils/hooks';

const schema = yup
  .object({
    email: yup.string().required().email(),
  })
  .required();

const ForgotPasswordForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmit = async (data) => {
    const { message } = await forgotPassword({ data });
    successToast(message, 'Some description');
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input
        {...register('email')}
        label="Email"
        placeholder="Enter your email"
        customStyles="mt-4"
        type="email"
        disabled={isSubmitting}
        error={errors.email?.message}
      />
      <Button
        type="submit"
        buttonProps={{
          text: isSubmitting ? 'Please wait...' : 'Get a new password',
          variant: isSubmitting ? 'secondary' : 'primary',
          size: 'large',
        }}
        disabled={isSubmitting}
        customStyles="mt-4 w-full"
      />
    </form>
  );
};

export default ForgotPasswordForm;
