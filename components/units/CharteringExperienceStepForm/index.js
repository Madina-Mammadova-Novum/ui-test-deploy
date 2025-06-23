'use client';

import React, { useEffect, useMemo, useRef } from 'react';
import { FormProvider } from 'react-hook-form';

import PropTypes from 'prop-types';
import * as yup from 'yup';

import { FormManager } from '@/common';
import { Input } from '@/elements';
import { captchaSchema, cargoesSlotsDetailsSchema, termsAndConditionsSchema } from '@/lib/schemas';
import { Captcha, CargoesSlotsDetailsForm, TermsAndConditions } from '@/units';
import {
  disableDefaultBehavior,
  disablePlusMinusSymbols,
  scrollToFirstError,
  shouldShowCaptcha,
} from '@/utils/helpers';
import { useHookFormParams } from '@/utils/hooks';

const CharteringExperienceStepForm = ({ onFormValid, onMethodsReady, initialData = {} }) => {
  const inputYearsRef = useRef(null);
  const [captcha, setCaptcha] = React.useState('');

  const schema = yup.object().shape({
    ...cargoesSlotsDetailsSchema(),
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
    clearErrors,
    getValues,
  } = methods;

  const { companyYearsOfOperation } = getValues();

  // Watch all form values to detect changes
  const formValues = watch();

  // Stabilize formValues for comparison using JSON string
  const stableFormValues = useMemo(() => JSON.stringify(formValues), [formValues]);

  useEffect(() => {
    if (inputYearsRef.current) {
      inputYearsRef.current.addEventListener('wheel', disableDefaultBehavior);
      inputYearsRef.current.addEventListener('keydown', disablePlusMinusSymbols);
      inputYearsRef.current.value = companyYearsOfOperation;
    }
  }, [companyYearsOfOperation, inputYearsRef]);

  React.useEffect(() => {
    if (shouldShowCaptcha()) {
      setValue('captcha', captcha);
    }
  }, [captcha, setValue]);

  const handleNumberOfOperation = () => {
    clearErrors('companyYearsOfOperation');
    setValue('companyYearsOfOperation', inputYearsRef.current.value);
  };

  // Notify parent component about form validity
  React.useEffect(() => {
    onFormValid(isValid, formValues);
  }, [isValid, stableFormValues, onFormValid]);

  // Expose form methods to parent component
  React.useEffect(() => {
    if (onMethodsReady) {
      onMethodsReady(methods);
    }
  }, [methods, onMethodsReady]);

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
          <h3 className="mb-4 text-lg font-semibold text-black">Recent Chartering Experience</h3>
          <p className="mb-6 text-sm text-gray-600">
            Please provide information about your recent chartering experience and cargo requirements.
          </p>
          <div className="mb-6">
            <Input
              ref={inputYearsRef}
              type="number"
              name="companyYearsOfOperation"
              label="Years in operation"
              labelBadge="*"
              placeholder="Years"
              value={inputYearsRef.current?.value ?? ''}
              onChange={handleNumberOfOperation}
              disabled={methods.formState.isSubmitting}
              error={errors.companyYearsOfOperation?.message}
            />
          </div>
          <CargoesSlotsDetailsForm applyHelper />
        </div>
        <div>
          <TermsAndConditions />
          {shouldShowCaptcha() && <Captcha onChange={setCaptcha} />}
        </div>
      </FormManager>
    </FormProvider>
  );
};

CharteringExperienceStepForm.propTypes = {
  onFormValid: PropTypes.func.isRequired,
  onMethodsReady: PropTypes.func,
  initialData: PropTypes.shape(),
};

export default CharteringExperienceStepForm;
