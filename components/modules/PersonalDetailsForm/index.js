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
import { errorToast, successToast, useHookFormParams } from '@/utils/hooks';

const PersonalDetailsForm = ({ closeModal }) => {
  const schema = yup.object({ ...personalDetailsSchema() });
  const dispatch = useDispatch();
  const { data } = useSelector(getUserDataSelector);

  const methods = useHookFormParams({ state: data?.personalDetails, schema });
  const onSubmit = async (formData) => {
    const { status, error } = await updateInfo({ data: formData });

    if (status === 200) {
      dispatch(fetchUserProfileData());
      successToast(
        'Your request has been sent for review',
        'You will be notified soon. The rest of the changes have been edited'
      );
    }

    if (error) errorToast(error?.title, error?.message);
    return null;
  };

  const noteList = [
    {
      id: 1,
      label: null,
      list: ['First Name', 'Last name', 'Email'],
    },
  ];

  return (
    <FormProvider {...methods}>
      <ModalFormManager
        onClose={closeModal}
        submitAction={onSubmit}
        submitButton={{ text: 'Edit personal details', variant: 'primary', size: 'large' }}
      >
        <Title level="3" className="text-lg text-black font-bold capitalize pb-5">
          Edit Personal Details
        </Title>
        <Notes
          title="Please note!"
          subtitle="This is a list of fields that you can edit, but for this you need to submit a data change request, which can be considered up to 24 hours, and upon confirmation, your data will be updated automatically."
          data={noteList}
        />
        <PersonalDetails />
      </ModalFormManager>
    </FormProvider>
  );
};

PersonalDetailsForm.propTypes = PersonalDetailsFormPropTypes;

export default PersonalDetailsForm;
