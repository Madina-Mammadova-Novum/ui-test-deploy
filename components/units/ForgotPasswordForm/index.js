'use client';

import { useState } from 'react';
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
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmit = async (data) => {
    setButtonDisabled(true);
    const { message } = await forgotPassword({ data });
    successToast(message, 'Some description');
    reset();
    setButtonDisabled(false);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input
        {...register('email')}
        label="Email"
        placeholder="Enter your email"
        customStyles="mt-4"
        type="email"
        disabled={buttonDisabled}
        error={errors.email?.message}
      />
      <Button
        type="submit"
        buttonProps={{
          text: buttonDisabled ? 'Please wait...' : 'Get a new password',
          variant: buttonDisabled ? 'secondary' : 'primary',
          size: 'large',
        }}
        disabled={buttonDisabled}
        customStyles="mt-4 w-full"
      />
    </form>
  );
};

export default ForgotPasswordForm;
