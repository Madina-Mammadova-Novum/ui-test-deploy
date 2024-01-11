'use client';

import { FormProvider } from 'react-hook-form';

import PropTypes from 'prop-types';
import * as yup from 'yup';

import { ModalFormManager } from '@/common';
import { PasswordInput, Title } from '@/elements';
import { currentPasswordSchema } from '@/lib/schemas';
import { deactivateAccount } from '@/services/account';
import { errorToast, successToast, useHookFormParams } from '@/utils/hooks';

const DeactivateAccountForm = ({ title, pendingRequest }) => {
  const schema = yup.object({ ...currentPasswordSchema() });

  const methods = useHookFormParams({ state: { password: '' }, schema });

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

    if (pendingRequest) {
      errorToast('Bad request', "Since you have an ongoing deal, you can't deactivate your account");
    }

    if (!error) {
      successToast(message);
    } else {
      errorToast('Bad request', error.message);
    }
  };

  return (
    <FormProvider {...methods}>
      <ModalFormManager
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
};

DeactivateAccountForm.propTypes = {
  title: PropTypes.string,
  pendingRequest: PropTypes.bool.isRequired,
};

export default DeactivateAccountForm;
