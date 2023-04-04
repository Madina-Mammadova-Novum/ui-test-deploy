'use client';

import { useEffect, useRef } from 'react';
import { useFormContext } from 'react-hook-form';

import { Input } from '@/elements';
import { disableDefaultBehaviour, disablePlusMinusSymbols } from '@/utils/helpers';

const CompanyDetails = () => {
  const inputYearsRef = useRef(null);
  const {
    register,
    setValue,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useFormContext();

  useEffect(() => {
    if (inputYearsRef.current) {
      inputYearsRef.current.addEventListener('wheel', disableDefaultBehaviour);
      inputYearsRef.current.addEventListener('keydown', disablePlusMinusSymbols);
    }
  }, [inputYearsRef]);

  const handleNumberOfOperation = () => {
    clearErrors('companyNumberOfOperation');
    setValue('companyNumberOfOperation', inputYearsRef.current.value);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      <Input
        {...register('companyName')}
        label="Company name"
        placeholder="Company"
        error={errors.companyName?.message}
        disabled={isSubmitting}
      />
      <Input
        type="number"
        name="companyNumberOfOperation"
        label="Years of operation"
        placeholder="Years"
        ref={inputYearsRef}
        onChange={handleNumberOfOperation}
        disabled={isSubmitting}
        error={errors.companyNumberOfOperation?.message}
      />
    </div>
  );
};

CompanyDetails.propTypes = {};

export default CompanyDetails;
