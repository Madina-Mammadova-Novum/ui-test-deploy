'use client';

import { useEffect, useState } from 'react';
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
import { getFieldFromKey } from '@/utils/helpers';
import { errorToast, useHookFormParams } from '@/utils/hooks';

const PersonalDetailsForm = ({ closeModal }) => {
  const dispatch = useDispatch();
  const { data } = useSelector(getUserDataSelector);
  const [hasPhoneChanged, setHasPhoneChanged] = useState(false);

  const schema = yup.object({ ...personalDetailsSchema({ isRegister: false, hasPhoneChanged }) });
  const methods = useHookFormParams({ state: data?.personalDetails, schema });

  // Watch for changes to the phone field
  const phoneValue = methods.watch('phone');

  // Track if the phone value has changed from the original
  useEffect(() => {
    if (data?.personalDetails?.phone !== phoneValue && phoneValue !== undefined) {
      setHasPhoneChanged(true);
    } else {
      setHasPhoneChanged(false);
    }

    // Trigger revalidation when phone value changes
    methods.trigger('phone');
  }, [phoneValue, data?.personalDetails?.phone, methods]);

  const onSubmit = async (formData) => {
    const { error } = await updateInfo({ data: formData });

    if (formData === data?.personalDetails) return;

    if (error) {
      const errorKeys = Object.keys(error?.errors || {});

      errorKeys?.forEach((key) => {
        if (error?.errors[key]?.length > 0) {
          methods.setError(getFieldFromKey(key), {
            message: error?.errors[key][0],
          });
        }
      });

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
        <Notes subtitle="Please note that any changes to these fields will require verification by Ship.Link." />
        <PersonalDetails onUpdatePage />
      </ModalFormManager>
    </FormProvider>
  );
};

PersonalDetailsForm.propTypes = PersonalDetailsFormPropTypes;

export default PersonalDetailsForm;
