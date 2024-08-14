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
import { deleteCompany } from '@/services';
import { clearSession } from '@/store/entities/auth/slice';
import { resetChat } from '@/store/entities/chat/slice';
import { resetNotificationData } from '@/store/entities/notifications/slice';
import { Notes } from '@/units';
import { errorToast, successToast, useHookFormParams } from '@/utils/hooks';

const DeleteAccountForm = ({ title, closeModal }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const schema = yup.object({ ...currentPasswordSchema() });

  const methods = useHookFormParams({ schema });

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

  const handleSignOut = (message) => {
    successToast(message);

    dispatch(clearSession());
  };

  const onSubmit = async (data) => {
    const { error, message } = await deleteCompany({ data });

    // if (pendingRequest) {
    //   errorToast('Bad request', 'You have pending personal request');
    // }

    if (!error) {
      handleSignOut(message);
      router.replace(ROUTES.LOGIN);
      dispatch(resetNotificationData());
      dispatch(resetChat());
      router.refresh();
    } else {
      errorToast('Bad request', error.title);
    }
  };

  return (
    <FormProvider {...methods}>
      <ModalFormManager
        onClose={closeModal}
        className="max-w-[652px]"
        submitAction={onSubmit}
        submitButton={{ text: 'Submit a Request to Delete ', variant: 'delete', size: 'large' }}
      >
        <div className="flex flex-col gap-2.5 text-black">
          <Title level="3" className="text-lg font-bold">
            {title}
          </Title>
          <Notes title="Please note!">
            <div className="grid gap-1.5 text-xs-sm text-black">
              <p>We delete all of your personal accounts from our database and the account cannot be restored.</p>
              <p>
                You can register again with the same ships, user information, company information, etc. if you would
                like to come back to us.
              </p>
            </div>
            <p className="text-xxs font-bold uppercase text-black">
              When reviewing your application, your account will be deactivated
            </p>
          </Notes>
        </div>
        <p className="font-semibold text-black">Please enter your password to delete account</p>
        <div className="w-72">
          <PasswordInput
            name="password"
            label="Password"
            placeholder="Enter your password"
            disabled={isSubmitting}
            onChange={handlePassword}
            error={errors.password?.message}
          />
        </div>
        <p className="text-xsm font-semibold text-red">
          If you send a request to delete your account, but then change your mind, it will be impossible to suspend the
          process of considering your request.
        </p>
      </ModalFormManager>
    </FormProvider>
  );
};

export default DeleteAccountForm;
