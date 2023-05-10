'use client';

import { FormProvider } from 'react-hook-form';

import * as yup from 'yup';

import { PersonalDetailsFormPropTypes } from '@/lib/types';

import { FormManager } from '@/common';
import { Title } from '@/elements';
import { personalDetailsSchema } from '@/lib/schemas';
import { updateInfo } from '@/services';
import { Notes, PersonalDetails } from '@/units';
import { makeId } from '@/utils/helpers';
import { successToast, useHookFormParams } from '@/utils/hooks';

const state = {
  firstName: 'John',
  lastName: 'Doe',
  email: 'john_doe@shiplink.com',
  primaryPhoneNumber: '971457753981',
};

const PersonalDetailsForm = ({ closeModal }) => {

  const schema = yup.object({ ...personalDetailsSchema() });

  const methods = useHookFormParams({ state, schema });
  const onSubmit = async (data) => {
    const { message } = await updateInfo({ data });
    successToast(message, 'You will be notified soon. The rest of the changes have been edited');
  };

  const noteList = [
    {
      id: makeId(),
      label: null,
      list: ['First Name', 'Last name', 'Email'],
    },
  ];

  return (
    <FormProvider {...methods}>
      <FormManager
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
      </FormManager>
    </FormProvider>
  );
};

PersonalDetailsForm.propTypes = PersonalDetailsFormPropTypes

export default PersonalDetailsForm;
