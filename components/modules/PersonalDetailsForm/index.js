'use client';

import { FormProvider } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import * as yup from 'yup';

import { PersonalDetailsFormPropTypes } from '@/lib/types';

import { ModalFormManager } from '@/common';
import { Title } from '@/elements';
import { personalDetailsSchema } from '@/lib/schemas';
import { updateInfo } from '@/services';
import { fetchUserProfileData } from '@/store/entities/user/actions';
import { getUserDataSelector } from '@/store/selectors';
import { Notes, PersonalDetails } from '@/units';
import { errorToast, useHookFormParams } from '@/utils/hooks';

const PersonalDetailsForm = ({ closeModal }) => {
  const schema = yup.object({ ...personalDetailsSchema() });
  const dispatch = useDispatch();
  const { data } = useSelector(getUserDataSelector);

  const methods = useHookFormParams({ state: data?.personalDetails, schema });

  const onSubmit = async (formData) => {
    const { error } = await updateInfo({ data: formData });

    if (formData === data?.personalDetails) return;

    if (error) {
      errorToast(error?.title, error?.message);
    } else {
      dispatch(fetchUserProfileData());
    }
  };

  return (
    <FormProvider {...methods}>
      <ModalFormManager
        onClose={closeModal}
        submitAction={onSubmit}
        submitButton={{
          text: 'Submit',
          variant: 'primary',
          size: 'large',
          disabled: !methods.formState.isDirty,
        }}
      >
        <Title level="3" className="pb-5 text-lg font-bold capitalize text-black">
          Edit User Details
        </Title>
        <Notes subtitle="Please note that any changes to these fields will require verification by ShipLink." />
        <PersonalDetails onUpdatePage />
      </ModalFormManager>
    </FormProvider>
  );
};

PersonalDetailsForm.propTypes = PersonalDetailsFormPropTypes;

export default PersonalDetailsForm;
