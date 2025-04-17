'use client';

import { useEffect, useRef } from 'react';
import { useFormContext } from 'react-hook-form';

import classNames from 'classnames';

import { CompanyDetailsPropTypes } from '@/lib/types';

import { Input, PhoneInput } from '@/elements';
import { disableDefaultBehavior, disablePlusMinusSymbols } from '@/utils/helpers';

const CompanyDetails = ({ notEditable = false }) => {
  const inputYearsRef = useRef(null);
  const {
    register,
    setValue,
    clearErrors,
    getValues,
    formState: { errors, isSubmitting },
  } = useFormContext();

  const { companyYearsOfOperation, pending, pendingRequest, companyName, primaryPhone, secondaryPhone } = getValues();

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

  return (
    <>
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <Input
          {...register('companyName')}
          labelBadge={
            pendingRequest ? (
              <p className={classNames('font-bold', pending?.name === companyName ? 'text-green' : 'text-blue')}>
                {pending?.name}
              </p>
            ) : (
              '*'
            )
          }
          label="Company name"
          placeholder="Company"
          error={errors.companyName?.message}
          disabled={isSubmitting}
        />
        {!notEditable && (
          <Input
            ref={inputYearsRef}
            type="number"
            name="companyYearsOfOperation"
            label="Years in operation"
            labelBadge="*"
            placeholder="Years"
            value={inputYearsRef.current?.value ?? ''}
            onChange={handleNumberOfOperation}
            disabled={isSubmitting}
            error={errors.companyYearsOfOperation?.message}
          />
        )}
      </div>
      <div className="mt-5 flex flex-col gap-5">
        <p className="text-sm font-semibold text-black">Company Contact Information</p>
        <div className="grid gap-5 md:grid-cols-2">
          <PhoneInput
            {...register('primaryPhone')}
            onBlur={() => {}}
            label="Primary phone number"
            disabled={isSubmitting}
            error={errors.primaryPhone?.message}
            labelBadge={
              pendingRequest ? (
                <p
                  className={classNames(
                    'font-bold',
                    pending?.primaryPhone === primaryPhone ? 'text-green' : 'text-blue'
                  )}
                >
                  {pending?.primaryPhone}
                </p>
              ) : (
                '*'
              )
            }
          />
          <PhoneInput
            {...register('secondaryPhone')}
            onBlur={() => {}}
            label="Secondary phone number (optional)"
            disabled={isSubmitting}
            error={errors.secondaryPhone?.message}
            labelBadge={
              pendingRequest && pending?.secondaryPhone ? (
                <p
                  className={classNames(
                    'font-bold',
                    pending?.secondaryPhone === secondaryPhone ? 'text-green' : 'text-blue'
                  )}
                >
                  {pending?.secondaryPhone}
                </p>
              ) : null
            }
          />
        </div>
      </div>
    </>
  );
};

CompanyDetails.propTypes = CompanyDetailsPropTypes;

export default CompanyDetails;
