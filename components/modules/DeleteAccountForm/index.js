'use client';

import { FormProvider } from 'react-hook-form';

import * as yup from 'yup';

import { DeleteAccountFormPropTypes } from '@/lib/types';

import { ModalFormManager } from '@/common';
import { Input, Title } from '@/elements';
import { Notes } from '@/units';
import { useHookFormParams } from '@/utils/hooks';

const state = {
  password: '',
};

const schema = yup.object({ password: yup.string().required('Required field') });

const DeleteAccountForm = ({ title, closeModal }) => {
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
      <ModalFormManager
        onClose={closeModal}
        className="max-w-sm"
        submitAction={onSubmit}
        submitButton={{ text: 'Deactivate Account', variant: 'delete', size: 'large' }}
      >
        <div className="text-black flex flex-col gap-2.5">
          <Title level="3" className="text-lg font-bold">
            {title}
          </Title>
          <Notes
            title="Please note!"
            subtitle="We delete all of your personal accounts from our database and the account cannot be restored. You can register again with the same ships, user information, company information, etc. if you would like to come back to us"
          />
        </div>
        <p className="font-bold text-black">Please enter your password to deactivate account</p>
        <Input {...register('password')} type="password" label="password" error={errors.password?.message} />
        <p className="text-red font-semibold text-xsm">
          If you send a request to delete your account, but then change your mind, it will be impossible to suspend the
          process of considering your request.
        </p>
      </ModalFormManager>
    </FormProvider>
  );
};

DeleteAccountForm.propTypes = DeleteAccountFormPropTypes;

export default DeleteAccountForm;
