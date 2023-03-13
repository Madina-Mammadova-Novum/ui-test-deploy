'use client';

import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { Button } from '@/elements';
import { passwordValidationSchema } from '@/lib/schemas';
import { resetPassword } from '@/services/user';
import { PasswordValidation } from '@/units';
import { successToast } from '@/utils/hooks';

const schema = yup.object(passwordValidationSchema()).required();

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
