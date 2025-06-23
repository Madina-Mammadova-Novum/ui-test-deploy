'use client';

import React, { useMemo } from 'react';
import { FormProvider } from 'react-hook-form';

import PropTypes from 'prop-types';
import * as yup from 'yup';

import { FormManager } from '@/common';
import { passwordValidationSchema, personalDetailsSchema } from '@/lib/schemas';
import { PasswordValidation, PersonalDetails } from '@/units';
import { scrollToFirstError } from '@/utils/helpers';
import { useHookFormParams } from '@/utils/hooks';

const PersonalDetailsStepForm = ({ onFormValid, onMethodsReady, initialData = {}, serverErrors = {} }) => {
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
    formState: { isValid, errors },
    watch,
  } = methods;

  // Watch all form values to detect changes
  const formValues = watch();

  // Stabilize formValues for comparison using JSON string
  const stableFormValues = useMemo(() => JSON.stringify(formValues), [formValues]);

  // Notify parent component about form validity
  React.useEffect(() => {
    onFormValid(isValid, formValues);
  }, [isValid, stableFormValues, onFormValid]); // Use stable reference

  // Expose form methods to parent component
  React.useEffect(() => {
    if (onMethodsReady) {
      onMethodsReady(methods);
    }
  }, [methods, onMethodsReady]);

  // Handle server errors from parent component
  React.useEffect(() => {
    if (serverErrors && Object.keys(serverErrors).length > 0) {
      // Set server errors on the form
      Object.entries(serverErrors).forEach(([fieldName, errorMessage]) => {
        methods.setError(fieldName, {
          type: 'server',
          message: errorMessage,
        });
      });
    }
  }, [serverErrors, methods]);

  // Scroll to first error when validation fails
  React.useEffect(() => {
    if (errors && Object.keys(errors).length > 0) {
      const firstErrorField = Object.keys(errors)[0];

      // For phoneVerified errors, scroll to the phone input directly
      if (firstErrorField === 'phoneVerified') {
        setTimeout(() => {
          const phoneInput =
            document.querySelector('.react-tel-input input') ||
            document.querySelector('input[name="userPhone"]') ||
            document.querySelector('input[name="phone"]');
          if (phoneInput) {
            phoneInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
            phoneInput.focus();
          }
        }, 150);
      } else {
        // For other errors, use the general scroll function
        scrollToFirstError(errors, 150);
      }
    }
  }, [errors]);

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
  onMethodsReady: PropTypes.func,
  initialData: PropTypes.shape(),
  serverErrors: PropTypes.shape(),
};

export default PersonalDetailsStepForm;
