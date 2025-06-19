'use client';

import React from 'react';
import { FormProvider } from 'react-hook-form';

import PropTypes from 'prop-types';
import * as yup from 'yup';

import { FormManager } from '@/common';
import { companyDetailsSchema } from '@/lib/schemas';
import { CompanyDetails } from '@/units';
import { useHookFormParams } from '@/utils/hooks';

const CompanyDetailsStepForm = ({ onFormValid, initialData = {} }) => {
  const schema = yup.object().shape({
    ...companyDetailsSchema(false), // No same phone for this step
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
        className="flex flex-col gap-6"
        submitAction={() => {}} // No submit action as it's handled by parent
        hideSubmitButton
      >
        <CompanyDetails />
      </FormManager>
    </FormProvider>
  );
};

CompanyDetailsStepForm.propTypes = {
  onFormValid: PropTypes.func.isRequired,
  initialData: PropTypes.shape(),
};

export default CompanyDetailsStepForm;
