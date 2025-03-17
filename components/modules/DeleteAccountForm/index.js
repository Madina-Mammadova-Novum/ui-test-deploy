'use client';

import { FormProvider } from 'react-hook-form';
import { useDispatch } from 'react-redux';

import { useRouter } from 'next/navigation';
import PropTypes from 'prop-types';
import * as yup from 'yup';

import { ModalFormManager } from '@/common';
import { Button, PasswordInput, Title } from '@/elements';
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

  const handleRedirectToDeactivate = () => {
    closeModal();
    setTimeout(() => {
      const deactivateButton = document.querySelector('[data-deactivate-account-action="deactivate-account-button"]');
      if (deactivateButton) {
        deactivateButton.click();
      }
    }, 100);
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
              <p>Deleting you account will delete all of the account data from our platform.</p>
              <p>This deletion is not reversible. You will not be able to restore the account, once deleted.</p>
            </div>
            <p className="text-xxs font-bold uppercase text-black">
              If you wish to stop using the platform temporarily, you can deactivate, instead of deleting it.
              <Button
                buttonProps={{
                  text: 'Go to Deactivation',
                  variant: 'secondary',
                  size: 'small',
                }}
                customStyles="ml-2 !py-1 !px-2 text-xxs uppercase font-bold"
                onClick={handleRedirectToDeactivate}
              />
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
      </ModalFormManager>
    </FormProvider>
  );
};

DeleteAccountForm.propTypes = {
  title: PropTypes.string,
  closeModal: PropTypes.func,
};

export default DeleteAccountForm;
