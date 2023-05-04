'use client';

import { FormProvider } from 'react-hook-form';

import * as yup from 'yup';

import { FormManager } from '@/common';
import { Divider, PasswordInput, Title } from '@/elements';
import { updatePasswordSchema } from '@/lib/schemas';
import { updatePassword } from '@/services';
import { PasswordValidation } from '@/units';
import { successToast, useHookFormParams } from '@/utils/hooks';

const PasswordInfoForm = () => {
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
    register,
    formState: { errors, isSubmitting },
  } = methods;

  return (
    <FormProvider {...methods}>
      <FormManager
        submitAction={onSubmit}
        submitButton={{ text: 'Update password', variant: 'primary', size: 'large' }}
      >
        <Title level="3" className="text-lg text-black font-bold capitalize pb-5">
          Change Your Password
        </Title>
        <div className="w-2/3">
          <PasswordInput
            {...register('currentPassword')}
            label="Current password"
            placeholder="Enter your current password"
            error={errors.currentPassword?.message}
            disabled={isSubmitting}
          />
        </div>
        <Divider />
        <PasswordValidation />
      </FormManager>
    </FormProvider>
  );
};

export default PasswordInfoForm;
