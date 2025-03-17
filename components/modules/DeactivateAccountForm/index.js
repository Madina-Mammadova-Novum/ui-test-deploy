/* eslint-disable react/prop-types */

'use client';

import { FormProvider } from 'react-hook-form';
import { useDispatch } from 'react-redux';

import { useRouter } from 'next/navigation';
import * as yup from 'yup';

import { ModalFormManager } from '@/common';
import { PasswordInput, Title } from '@/elements';
import { ROUTES } from '@/lib';
import { currentPasswordSchema } from '@/lib/schemas';
import { deactivateAccount } from '@/services/account';
import { clearSession } from '@/store/entities/auth/slice';
import { resetChat } from '@/store/entities/chat/slice';
import { resetNotificationData } from '@/store/entities/notifications/slice';
import { errorToast, useHookFormParams } from '@/utils/hooks';

const DeactivateAccountForm = ({ title, closeModal }) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const schema = yup.object({ ...currentPasswordSchema() });

  const methods = useHookFormParams({ state: { password: '' }, schema });

  const {
    setValue,
    clearErrors,
    formState: { errors, isSubmitting },
  } = methods;

  const handlePassword = (event) => {
    clearErrors('password');
    const { value } = event.target;
    setValue('password', value);
  };

  const onSubmit = async (data) => {
    const { error } = await deactivateAccount({ data });

    if (!error) {
      closeModal();
      router.replace(ROUTES.LOGIN);
      dispatch(clearSession());
      dispatch(resetNotificationData());
      dispatch(resetChat());
      router.refresh();
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
        onClose={closeModal}
        submitButton={{ text: 'Deactivate Account', variant: 'delete', size: 'large' }}
      >
        <div className="flex flex-col gap-2.5 text-black">
          <Title level="3" className="pr-5 text-lg font-bold">
            {title}
          </Title>
          <p className="text-xsm">
            <span className="font-semibold">We will deactivate...&nbsp;</span>
            However, if you choose to reactivate your account at a future time, simply log in, and your account will be
            reactivated automatically.
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

export default DeactivateAccountForm;
