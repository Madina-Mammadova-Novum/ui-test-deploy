'use client';

import React from 'react';
import { FormProvider } from 'react-hook-form';

import PropTypes from 'prop-types';
import * as yup from 'yup';

import { FormManager } from '@/common';
import { passwordValidationSchema, personalDetailsSchema } from '@/lib/schemas';
import { PasswordValidation, PersonalDetails } from '@/units';
import { useHookFormParams } from '@/utils/hooks';

const PersonalDetailsStepForm = ({ onFormValid, initialData = {} }) => {
  const schema = yup.object().shape({
    ...personalDetailsSchema({ isRegister: true }),
    ...passwordValidationSchema(),
  });

  const methods = useHookFormParams({
    schema,
    state: initialData,
    mode: 'onChange',
  });

  const {
    formState: { isValid },
    watch,
  } = methods;

  // Watch all form values to detect changes
  const formValues = watch();

  // Notify parent component about form validity
  React.useEffect(() => {
    onFormValid(isValid, formValues);
  }, [isValid, formValues, onFormValid]);

  return (
    <FormProvider {...methods}>
      <FormManager
        className="flex flex-col gap-8"
        submitAction={() => {}} // No submit action as it's handled by parent
        hideSubmitButton
      >
        <PersonalDetails />

        <div className="flex flex-col gap-6">
          <p className="text-sm font-semibold text-black">Enter a strong password according to our requirements</p>
          <PasswordValidation
            helperData={{
              password: { label: 'Choose password', placeholder: 'Enter your password' },
              confirm: { label: 'Confirm password', placeholder: 'Enter your password' },
            }}
            inputGroupClassName="md:flex-row md:justify-normal gap-x-4"
          />
        </div>
      </FormManager>
    </FormProvider>
  );
};

PersonalDetailsStepForm.propTypes = {
  onFormValid: PropTypes.func.isRequired,
  initialData: PropTypes.shape(),
};

export default PersonalDetailsStepForm;
