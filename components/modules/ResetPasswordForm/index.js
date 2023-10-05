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
      resetObjectFields(formValues, '');
      return formValues;
    });
  };

  const onSubmit = async (formData) => {
    const { status, message } = await resetPassword({ data: { ...formData, ...params } });
    if (status === 200) {
      successToast('You have successfully changed your password');
      handleResetFields();
    }
    if (message) {
      errorToast(message);
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
        <PasswordValidation
          helperData={{
            password: { label: 'chose password', placeholder: 'Enter your password' },
            confirm: { label: 'confirm password', placeholder: 'Enter your password' },
          }}
        />
      </FormManager>
    </FormProvider>
  );
};

ResetPasswordForm.propTypes = ResetPasswordFormPropTypes;

export default ResetPasswordForm;
