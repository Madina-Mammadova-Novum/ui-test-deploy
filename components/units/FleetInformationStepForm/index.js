'use client';

import React, { useEffect, useRef } from 'react';
import { FormProvider } from 'react-hook-form';

import PropTypes from 'prop-types';
import * as yup from 'yup';

import { FormManager } from '@/common';
import { Input } from '@/elements';
import { cargoesSlotsDetailsSchema } from '@/lib/schemas';
import { CargoesSlotsDetails } from '@/units';
import { disableDefaultBehavior, disablePlusMinusSymbols } from '@/utils/helpers';
import { useHookFormParams } from '@/utils/hooks';

const FleetInformationStepForm = ({ onFormValid, initialData = {} }) => {
  const inputYearsRef = useRef(null);

  const schema = yup.object().shape({
    ...cargoesSlotsDetailsSchema(),
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

  useEffect(() => {
    if (inputYearsRef.current) {
      inputYearsRef.current.addEventListener('wheel', disableDefaultBehavior);
      inputYearsRef.current.addEventListener('keydown', disablePlusMinusSymbols);
      inputYearsRef.current.value = companyYearsOfOperation;
    }
  }, [companyYearsOfOperation, inputYearsRef]);

  const handleNumberOfOperation = () => {
    clearErrors('companyYearsOfOperation');
    setValue('companyYearsOfOperation', inputYearsRef.current.value);
  };

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
          <CargoesSlotsDetails applyHelper />
        </div>
      </FormManager>
    </FormProvider>
  );
};

FleetInformationStepForm.propTypes = {
  onFormValid: PropTypes.func.isRequired,
  initialData: PropTypes.shape(),
};

export default FleetInformationStepForm;
