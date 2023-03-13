'use client';

import { FormProvider } from 'react-hook-form';

import PropTypes from 'prop-types';
import * as yup from 'yup';

import { FormManager } from '@/common';
import { Title } from '@/elements';
import { personalDetailsSchema } from '@/lib/schemas';
import { Notes, PersonalDetails } from '@/units';
import { makeId } from '@/utils/helpers';
import { useHookFormParams } from '@/utils/hooks';

const schema = yup.object({ ...personalDetailsSchema() });

const state = {
  firstName: 'John',
  lastName: 'Doe',
  email: ' john_doe@ship.link.com',
  primaryPhoneNumber: '971457753981',
  secondaryPhoneNumber: '',
};

const PersonalInfoForm = ({ title }) => {
  const methods = useHookFormParams({ state, schema });

  const onSubmit = (data) => {
    return data;
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
        submitAction={onSubmit}
        submitProps={{ text: 'Edit personal details', variant: 'primary', size: 'large' }}
      >
        <Title component="h3" className="text-lg text-black font-bold capitalize pb-5">
          {title}
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

PersonalInfoForm.defaultProps = {
  title: '',
};

PersonalInfoForm.propTypes = {
  title: PropTypes.string,
};

export default PersonalInfoForm;
