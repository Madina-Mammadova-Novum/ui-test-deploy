'use client';

import { FormProvider, useForm } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { FormManager } from '@/common';
import { passwordValidationSchema } from '@/lib/schemas';
import { resetPassword } from '@/services/user';
import { PasswordValidation } from '@/units';
import { errorToast, successToast } from '@/utils/hooks';

const schema = yup.object(passwordValidationSchema()).required();

const ResetPasswordForm = () => {
  const methods = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (formData) => {
    const { data, error } = await resetPassword({ data: formData });
    if (data.status === 200) {
      successToast('You have successfully changed your password');
      methods.reset();
    }
    if (error) {
      errorToast(error.message, error.description);
    }
  };

  return (
    <FormProvider {...methods}>
      <FormManager
        submitButton={{
          text: 'Reset password',
          variant: 'primary',
          size: 'large',
        }}
        submitAction={onSubmit}
      >
        <PasswordValidation />
      </FormManager>
    </FormProvider>
  );
};

export default ResetPasswordForm;
