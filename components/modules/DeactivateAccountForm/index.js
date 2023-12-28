'use client';

import { useMemo } from 'react';
import { FormProvider } from 'react-hook-form';

import * as yup from 'yup';

import { DeactivateAccountFormPropTypes } from '@/lib/types';

import { ModalFormManager } from '@/common';
import { PasswordInput, Title } from '@/elements';
import { currentPasswordSchema } from '@/lib/schemas';
import { deactivateAccount } from '@/services/account';
import { errorToast, successToast, useHookFormParams } from '@/utils/hooks';

const state = {
  password: '',
};

const schema = yup.object({
  ...currentPasswordSchema(),
});

const DeactivateAccountForm = ({ title, closeModal }) => {
  const methods = useHookFormParams({ state, schema });

  const {
    setValue,
    formState: { errors, isSubmitting },
    clearErrors,
  } = methods;

  const handlePassword = (event) => {
    clearErrors('password');
    const { value } = event.target;
    setValue('password', value);
  };

  const onSubmit = async (data) => {
    const { error, message } = await deactivateAccount({ data });
    if (!error) {
      successToast(message);
      closeModal();
    } else {
      errorToast('Bad request', error.message);
    }
  };

  const printContnet = useMemo(() => {
    return (
      <FormProvider {...methods}>
        <ModalFormManager
          onClose={closeModal}
          className="max-w-[356px]"
          submitAction={onSubmit}
          specialStyle
          submitButton={{ text: 'Deactivate Account', variant: 'delete', size: 'large' }}
        >
          <div className="text-black flex flex-col gap-2.5">
            <Title level="3" className="text-lg font-bold pr-5">
              {title}
            </Title>
            <p className="text-xsm">
              <span className="font-semibold">
                We will deactivate all your tankers and your account will become inactive.&nbsp;
              </span>
              But if you want to reactivate your account, then after logging in, we will automatically reactivate your
              account.
            </p>
          </div>

          <p className="text-xsm font-semibold text-black">Please enter your password to deactivate account</p>
          <PasswordInput
            name="password"
            label="Password"
            placeholder="Enter your password"
            disabled={isSubmitting}
            onChange={handlePassword}
            error={errors.password?.message}
          />
        </ModalFormManager>
      </FormProvider>
    );
  }, [title, errors.password?.message, isSubmitting, closeModal, onSubmit, handlePassword]);

  return printContnet;
};

DeactivateAccountForm.propTypes = DeactivateAccountFormPropTypes;

export default DeactivateAccountForm;
