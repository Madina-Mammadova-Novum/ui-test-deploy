'use client';

import { FormProvider } from 'react-hook-form';

import * as yup from 'yup';

import { DeactivateAccountFormPropTypes } from '@/lib/types';

import { ModalFormManager } from '@/common';
import { Input, Title } from '@/elements';
import { useHookFormParams } from '@/utils/hooks';

const state = {
  password: '',
};

const schema = yup.object({ password: yup.string().required('Required field') });

const DeactivateAccountForm = ({ title, closeModal }) => {
  const methods = useHookFormParams({ state, schema });

  const {
    register,
    formState: { errors },
  } = methods;

  const onSubmit = (data) => {
    return data;
  };

  return (
    <div className="w-[356px]">
      <FormProvider {...methods}>
        <ModalFormManager
          onClose={closeModal}
          className="max-w-sm "
          submitAction={onSubmit}
          specialStyle
          submitButton={{ text: 'Deactivate Account', variant: 'delete', size: 'large' }}
        >
          <div className="text-black flex flex-col gap-2.5">
            <Title level="3" className="text-lg font-bold">
              {title}
            </Title>
            <p className="text-xsm">
              <span className="font-bold">
                We will deactivate all your tankers and your account will become inactive.
              </span>
              But if you want to reactivate your account, then after logging in, we will automatically reactivate your
              account.
            </p>
          </div>

          <p className="font-bold text-black">Please enter your password to deactivate account</p>
          <Input {...register('password')} type="password" label="password" error={errors.password?.message} />
        </ModalFormManager>
      </FormProvider>
    </div>

  );
};

DeactivateAccountForm.propTypes = DeactivateAccountFormPropTypes;

export default DeactivateAccountForm;
