'use client';

import { FormProvider } from 'react-hook-form';

import PropTypes from 'prop-types';
import * as yup from 'yup';

import { FormManager } from '@/common';
import { Input, Title } from '@/elements';
import { updatePasswordSchema } from '@/lib/schemas';
import { PasswordValidation } from '@/units';
import { useHookFormParams } from '@/utils/hooks';

const state = {
  currentPassword: '12345678',
  password: '',
  confirmPassword: '',
};

const schema = yup.object({ ...updatePasswordSchema() });

const PasswordInfoForm = ({ title }) => {
  const methods = useHookFormParams({ state, schema });

  const {
    register,
    formState: { errors },
  } = methods;

  const onSubmit = (data) => {
    return data;
  };

  return (
    <FormProvider {...methods}>
      <FormManager submitAction={onSubmit} submitButton={{ text: 'Update password', variant: 'primary', size: 'large' }}>
        <Title component="h3" className="text-lg text-black font-bold capitalize pb-5">
          {title}
        </Title>
        <Input
          {...register('currentPassword')}
          type="password"
          label="Current password"
          error={errors.currentPassword?.message}
          disabled
        />
        <hr />
        <PasswordValidation />
      </FormManager>
    </FormProvider>
  );
};

PasswordInfoForm.defaultProps = {
  title: '',
};

PasswordInfoForm.propTypes = {
  title: PropTypes.string,
};

export default PasswordInfoForm;
