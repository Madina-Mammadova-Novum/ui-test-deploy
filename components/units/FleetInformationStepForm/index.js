'use client';

import React, { useEffect, useMemo } from 'react';
import { FormProvider } from 'react-hook-form';

import PropTypes from 'prop-types';
import * as yup from 'yup';

import { FormManager } from '@/common';
import { captchaSchema, tankerSlotsDetailsSchema, termsAndConditionsSchema } from '@/lib/schemas';
import { Captcha, TankerSlotsDetailsForm, TermsAndConditions } from '@/units';
import { scrollToFirstError, shouldShowCaptcha } from '@/utils/helpers';
import { useHookFormParams } from '@/utils/hooks';

const FleetInformationStepForm = ({ onFormValid, onMethodsReady, initialData = {}, serverErrors = {} }) => {
  const [captcha, setCaptcha] = React.useState('');

  const schema = yup.object().shape({
    ...tankerSlotsDetailsSchema(),
    ...termsAndConditionsSchema(),
    ...(shouldShowCaptcha() ? captchaSchema() : {}),
  });

  const methods = useHookFormParams({
    schema,
    state: initialData,
    mode: 'onChange',
  });

  const {
    formState: { isValid, errors },
    watch,
    setValue,
  } = methods;

  // Watch all form values to detect changes
  const formValues = watch();

  // Stabilize formValues for comparison using JSON string
  const stableFormValues = useMemo(() => JSON.stringify(formValues), [formValues]);

  useEffect(() => {
    if (shouldShowCaptcha()) {
      setValue('captcha', captcha);
    }
  }, [captcha, setValue]);

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
      scrollToFirstError(errors);
    }
  }, [errors]);

  return (
    <FormProvider {...methods}>
      <FormManager
        className="flex flex-col"
        submitAction={() => {}} // No submit action as it's handled by parent
        hideSubmitButton
      >
        <div>
          <h3 className="mb-4 text-lg font-semibold text-black">Fleet & Operations</h3>
          <p className="mb-6 text-sm text-gray-600">Please provide information about your fleet.</p>

          <TankerSlotsDetailsForm applyHelper />
        </div>
        <div>
          <TermsAndConditions />
          {shouldShowCaptcha() && <Captcha onChange={setCaptcha} />}
        </div>
      </FormManager>
    </FormProvider>
  );
};

FleetInformationStepForm.propTypes = {
  onFormValid: PropTypes.func.isRequired,
  onMethodsReady: PropTypes.func,
  initialData: PropTypes.shape(),
  serverErrors: PropTypes.shape(),
};

export default FleetInformationStepForm;
