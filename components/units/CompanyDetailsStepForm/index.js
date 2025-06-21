'use client';

import React from 'react';
import { FormProvider } from 'react-hook-form';

import PropTypes from 'prop-types';
import * as yup from 'yup';

import { FormManager } from '@/common';
import { companyAddressesSchema, companyDetailsSchema } from '@/lib/schemas';
import { CompanyAddresses, CompanyDetails } from '@/units';
import { useHookFormParams } from '@/utils/hooks';

const CompanyDetailsStepForm = ({ onFormValid, onMethodsReady, initialData = {}, countries = [] }) => {
  const [sameAddress, setSameAddress] = React.useState(false);

  const schema = yup.object().shape({
    ...companyDetailsSchema(false), // No same phone for this step
    ...companyAddressesSchema(sameAddress),
  });

  const methods = useHookFormParams({
    schema,
    state: initialData,
    mode: 'onChange',
  });

  const {
    formState: { isValid },
    watch,
    setValue,
  } = methods;

  // Watch all form values to detect changes
  const formValues = watch();
  const addressValue = watch('sameAddresses', sameAddress);

  React.useEffect(() => {
    setValue('sameAddresses', addressValue);
    setSameAddress(addressValue);
  }, [addressValue, setValue]);

  // Notify parent component about form validity
  React.useEffect(() => {
    onFormValid(isValid, formValues);
  }, [isValid, formValues, onFormValid]);

  // Expose form methods to parent component
  React.useEffect(() => {
    if (onMethodsReady) {
      onMethodsReady(methods);
    }
  }, [methods, onMethodsReady]);

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
