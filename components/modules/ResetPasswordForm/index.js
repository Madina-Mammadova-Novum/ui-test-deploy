'use client';

import { FormProvider, useForm } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { ResetPasswordFormPropTypes } from '@/lib/types';

import { FormManager } from '@/common';
import { passwordValidationSchema } from '@/lib/schemas';
import { resetPassword } from '@/services/user';
import { PasswordValidation } from '@/units';
import { resetObjectFields } from '@/utils/helpers';
import { errorToast, successToast } from '@/utils/hooks';

const schema = yup.object(passwordValidationSchema()).required();

const ResetPasswordForm = ({ params }) => {
  const methods = useForm({
    resolver: yupResolver(schema),
  });

  const handleResetFields = () => {
    methods.reset((formValues) => {
      const resetValues = resetObjectFields({ initialObject: formValues, resetType: '' });
      return resetValues;
    });
  };

  const onSubmit = async (formData) => {
    const { error } = await resetPassword({ data: { ...formData, ...params } });

    if (!error) {
      successToast('You have successfully reset your password');
    } else {
      errorToast(error.title, error.message);
    }

    handleResetFields();
  };

  return (
    <FormProvider {...methods}>
      <FormManager
        submitButton={{
          text: 'Reset password',
          variant: 'primary',
          size: 'large',
          className: '!mt-0 w-full',
        }}
        submitAction={onSubmit}
        className="mx-auto flex w-full max-w-[546px] flex-col gap-y-8 rounded-[10px] bg-gray-medium p-10"
      >
        <PasswordValidation
          helperData={{
            password: { label: 'chose new password', placeholder: 'Enter your password' },
            confirm: { label: 'confirm new password', placeholder: 'Enter your password' },
          }}
        />
      </FormManager>
    </FormProvider>
  );
};

ResetPasswordForm.propTypes = ResetPasswordFormPropTypes;

export default ResetPasswordForm;
