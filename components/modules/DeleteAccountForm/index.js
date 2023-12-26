'use client';

import { useMemo } from 'react';
import { FormProvider } from 'react-hook-form';

import { signOut } from 'next-auth/react';
import * as yup from 'yup';

import { DeleteAccountFormPropTypes } from '@/lib/types';

import { ModalFormManager } from '@/common';
import { PasswordInput, Title } from '@/elements';
import { ROUTES } from '@/lib';
import { currentPasswordSchema } from '@/lib/schemas';
import { deleteCompany } from '@/services';
import { Notes } from '@/units';
import { errorToast, successToast, useHookFormParams } from '@/utils/hooks';

const DeleteAccountForm = ({ title, closeModal }) => {
  const schema = yup.object({
    ...currentPasswordSchema(),
  });

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

  const onSubmit = async (data) => {
    const { error, message } = await deleteCompany({ data });

    if (!error) {
      successToast(message);
      closeModal();
      await signOut({ callbackUrl: ROUTES.ROOT });
    } else {
      errorToast('Bad request', error?.message);
    }
  };

  const printContnet = useMemo(() => {
    return (
      <FormProvider {...methods}>
        <ModalFormManager
          onClose={closeModal}
          className="max-w-[652px]"
          submitAction={onSubmit}
          submitButton={{ text: 'Submit a Request to Delete ', variant: 'delete', size: 'large' }}
        >
          <div className="text-black flex flex-col gap-2.5">
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
              <p className="text-xxs text-black font-bold uppercase">
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
          <p className="text-red font-semibold text-xsm">
            If you send a request to delete your account, but then change your mind, it will be impossible to suspend
            the process of considering your request.
          </p>
        </ModalFormManager>
      </FormProvider>
    );
  }, [onSubmit, isSubmitting, errors?.password, handlePassword, title, closeModal]);

  return printContnet;
};

DeleteAccountForm.propTypes = DeleteAccountFormPropTypes;

export default DeleteAccountForm;
