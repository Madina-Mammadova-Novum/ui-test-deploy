'use client';

import { FormProvider } from 'react-hook-form';

import * as yup from 'yup';

import { DeactivateAccountFormPropTypes } from '@/lib/types';

import { ModalFormManager } from '@/common';
import { PasswordInput, Title } from '@/elements';
import { currentPasswordSchema } from '@/lib/schemas';
import { deactivateAccount } from '@/services/account';
import { successToast, useHookFormParams } from '@/utils/hooks';

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
    const { error, message: successMessage } = await deactivateAccount({ data });
    if (!error) {
      successToast(successMessage);
      closeModal();
    } else {
      console.log(error);
    }
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
    </div>
  );
};

DeactivateAccountForm.propTypes = DeactivateAccountFormPropTypes;

export default DeactivateAccountForm;
