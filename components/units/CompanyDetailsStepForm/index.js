'use client';

import React, { useMemo } from 'react';
import { FormProvider } from 'react-hook-form';

import PropTypes from 'prop-types';
import * as yup from 'yup';

import { FormManager } from '@/common';
import { companyAddressesSchema, companyDetailsSchema } from '@/lib/schemas';
import { CompanyAddresses, CompanyDetails } from '@/units';
import { scrollToFirstError } from '@/utils/helpers';
import { useHookFormParams } from '@/utils/hooks';

const CompanyDetailsStepForm = ({ onFormValid, onMethodsReady, initialData = {}, countries = [] }) => {
  const [sameAddress, setSameAddress] = React.useState(initialData.sameAddresses || false);
  const [samePhone, setSamePhone] = React.useState(initialData.samePhone || false);

  // Create dynamic schema based on samePhone state
  const schema = React.useMemo(() => {
    return yup.object().shape({
      ...companyDetailsSchema(samePhone),
      ...companyAddressesSchema(sameAddress),
      samePhone: yup.boolean().nullable(),
      sameAddresses: yup.boolean().nullable(),
    });
  }, [samePhone, sameAddress]);

  const methods = useHookFormParams({
    schema,
    state: initialData,
    mode: 'onChange', // Back to onChange for immediate error clearing
  });

  const {
    formState: { isValid, errors },
    watch,
    setValue,
    trigger,
  } = methods;

  // Watch all form values to detect changes
  const formValues = watch();
  const addressValue = watch('sameAddresses', sameAddress);
  const phoneValue = watch('samePhone', samePhone);

  // Stabilize formValues for comparison using JSON string
  const stableFormValues = useMemo(() => JSON.stringify(formValues), [formValues]);

  React.useEffect(() => {
    if (addressValue !== sameAddress) {
      setValue('sameAddresses', addressValue);
      setSameAddress(addressValue);
      // Re-trigger validation after schema change
      trigger();
    }
  }, [addressValue, setValue, sameAddress, trigger]);

  React.useEffect(() => {
    if (phoneValue !== samePhone) {
      setValue('samePhone', phoneValue);
      setSamePhone(phoneValue);
      // Re-trigger validation after schema change
      trigger();
    }
  }, [phoneValue, setValue, samePhone, trigger]);

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

  // Scroll to first error when validation fails
  React.useEffect(() => {
    if (errors && Object.keys(errors).length > 0) {
      scrollToFirstError(errors);
    }
  }, [errors]);

  return (
    <FormProvider {...methods}>
      <FormManager
        className="flex flex-col gap-6"
        submitAction={() => {}} // No submit action as it's handled by parent
        hideSubmitButton
      >
        <CompanyDetails />
        <CompanyAddresses countries={countries} />
      </FormManager>
    </FormProvider>
  );
};

CompanyDetailsStepForm.propTypes = {
  onFormValid: PropTypes.func.isRequired,
  onMethodsReady: PropTypes.func,
  initialData: PropTypes.shape(),
  countries: PropTypes.arrayOf(PropTypes.shape()),
};

export default CompanyDetailsStepForm;
