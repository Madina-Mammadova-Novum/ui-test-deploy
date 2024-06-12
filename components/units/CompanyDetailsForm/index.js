'use client';

import { useEffect, useRef } from 'react';
import { useFormContext } from 'react-hook-form';

import classnames from 'classnames';

import { CompanyDetailsPropTypes } from '@/lib/types';

import { Input } from '@/elements';
import { disableDefaultBehaviour, disablePlusMinusSymbols } from '@/utils/helpers';

const CompanyDetails = ({ notEditable }) => {
  const inputYearsRef = useRef(null);
  const {
    register,
    setValue,
    clearErrors,
    getValues,
    formState: { errors, isSubmitting },
  } = useFormContext();

  const { companyYearsOfOperation, pending, pendingRequest, companyName } = getValues();

  useEffect(() => {
    if (inputYearsRef.current) {
      inputYearsRef.current.addEventListener('wheel', disableDefaultBehaviour);
      inputYearsRef.current.addEventListener('keydown', disablePlusMinusSymbols);
      inputYearsRef.current.value = companyYearsOfOperation;
    }
  }, [companyYearsOfOperation, inputYearsRef]);

  const handleNumberOfOperation = () => {
    clearErrors('companyYearsOfOperation');
    setValue('companyYearsOfOperation', inputYearsRef.current.value);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      <Input
        {...register('companyName')}
        labelBadge={
          pendingRequest ? (
            <p className={classnames('font-bold', pending?.name === companyName ? 'text-green' : 'text-blue')}>
              {pending?.name}
            </p>
          ) : null
        }
        label="Company name"
        placeholder="Company"
        error={errors.companyName?.message}
        disabled={isSubmitting}
      />
      <Input
        ref={inputYearsRef}
        type="number"
        name="companyYearsOfOperation"
        label="Years in operation"
        placeholder="Years"
        value={inputYearsRef.current?.value ?? ''}
        onChange={handleNumberOfOperation}
        disabled={isSubmitting || notEditable}
        error={errors.companyYearsOfOperation?.message}
      />
    </div>
  );
};

CompanyDetails.propTypes = CompanyDetailsPropTypes;

export default CompanyDetails;
