'use client';

import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { Button } from '@/elements';
import { resetPassword } from '@/services/user';
import { PasswordValidation } from '@/units';
import { successToast } from '@/utils/hooks';

const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+={}[\]\\|;:'",.<>/?-]).{8,}$/;
const schema = yup
  .object({
    password: yup
      .string()
      .required()
      .matches(
        passwordPattern,
        'Password must contain at least 8 characters, one uppercase, one number and one special case character'
      ),
    confirmPassword: yup
      .string()
      .required()
      .matches(
        passwordPattern,
        'Password must contain at least 8 characters, one uppercase, one number and one special case character'
      ),
  })
  .required();

const ResetPasswordForm = () => {
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const methods = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    setButtonDisabled(true);
    const { message } = await resetPassword({ data });
    successToast(message, 'Some description');
    methods.reset();
    setButtonDisabled(false);
  };

  const { handleSubmit } = methods;
  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <PasswordValidation />
        <Button
          type="submit"
          buttonProps={{
            text: buttonDisabled ? 'Please wait...' : 'Reset password',
            variant: buttonDisabled ? 'secondary' : 'primary',
            size: 'large',
          }}
          disabled={buttonDisabled}
          customStyles="mt-4 w-full"
        />
      </form>
    </FormProvider>
  );
};

export default ResetPasswordForm;
