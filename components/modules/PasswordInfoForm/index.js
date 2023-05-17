'use client';

import { FormProvider } from 'react-hook-form';

import * as yup from 'yup';

import { PasswordInfoFormPropTypes } from '@/lib/types';

import { ModalFormManager } from '@/common';
import { Divider, PasswordInput, Title } from '@/elements';
import { updatePasswordSchema } from '@/lib/schemas';
import { updatePassword } from '@/services';
import { PasswordValidation } from '@/units';
import { successToast, useHookFormParams } from '@/utils/hooks';

const PasswordInfoForm = ({ closeModal }) => {
  const schema = yup.object({ ...updatePasswordSchema() });

  const state = {
    password: '',
    confirmPassword: '',
  };

  const methods = useHookFormParams({ state, schema });

  const onSubmit = async (data) => {
    const { message } = await updatePassword({ data });
    successToast(message);
  };

  const {
    clearErrors,
    setValue,
    formState: { errors, isSubmitting },
  } = methods;

  const handleCurrentPassword = (event) => {
    clearErrors('currentPassword');
    const { value } = event.target;
    setValue('currentPassword', value);
  };

  return (
    <FormProvider {...methods}>
      <ModalFormManager
        submitAction={onSubmit}
        onClose={closeModal}
        submitButton={{ text: 'Update password', variant: 'primary', size: 'large' }}
      >
        <Title level="3" className="text-lg text-black font-bold capitalize pb-5">
          Change Your Password
        </Title>
        <div className="w-2/3">
          <PasswordInput
            name="currentPassword"
            label="Current password"
            placeholder="Enter your current password"
            error={errors.currentPassword?.message}
            disabled={isSubmitting}
            onChange={handleCurrentPassword}
          />
        </div>
        <Divider />
        <PasswordValidation />
      </ModalFormManager>
    </FormProvider>
  );
};

PasswordInfoForm.propTypes = PasswordInfoFormPropTypes


export default PasswordInfoForm;
