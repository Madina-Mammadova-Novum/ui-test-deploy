'use client';

import { FormProvider } from 'react-hook-form';

import * as yup from 'yup';

import { FormManager } from '@/common';
import { PasswordInput, Title } from '@/elements';
import { updatePasswordSchema } from '@/lib/schemas';
import { updatePassword } from '@/services';
import { PasswordValidation } from '@/units';
import { successToast, useHookFormParams } from '@/utils/hooks';

const state = {
  currentPassword: '12345678',
  password: '',
  confirmPassword: '',
};

const schema = yup.object({ ...updatePasswordSchema() });

const PasswordInfoForm = () => {
  const methods = useHookFormParams({ state, schema });

  const {
    register,
    formState: { errors },
  } = methods;

  const onSubmit = async (data) => {
    const { message } = await updatePassword({ data });
    successToast(message);
  };

  return (
    <FormProvider {...methods}>
      <FormManager
        submitAction={onSubmit}
        submitButton={{ text: 'Update password', variant: 'primary', size: 'large' }}
      >
        <Title component="h3" className="text-lg text-black font-bold capitalize pb-5">
          Change Your Password
        </Title>
        <PasswordInput
          {...register('currentPassword')}
          label="Current password"
          placeholder="Enter your password"
          error={errors.currentPassword?.message}
          disabled
        />
        <hr />
        <PasswordValidation />
      </FormManager>
    </FormProvider>
  );
};

export default PasswordInfoForm;
