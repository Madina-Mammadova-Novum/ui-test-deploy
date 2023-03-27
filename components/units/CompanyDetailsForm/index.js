'use client';

import { useFormContext } from 'react-hook-form';

import { Input } from '@/elements';

const CompanyDetails = () => {
  const {
    register,
    formState: { errors, isSubmitting },
  } = useFormContext();

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
        {...register('companyNumberOfOperation')}
        label="Years of operation"
        placeholder="Years"
        error={errors.companyNumberOfOperation?.message}
        disabled={isSubmitting}
        type="number"
      />
    </div>
  );
};

CompanyDetails.propTypes = {};

export default CompanyDetails;
