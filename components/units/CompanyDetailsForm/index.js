'use client';

import { useFormContext } from 'react-hook-form';

import classNames from 'classnames';

import { CheckBoxInput, Input, PhoneInput } from '@/elements';

const CompanyDetails = () => {
  const {
    register,
    setValue,
    getValues,
    formState: { errors, isSubmitting },
  } = useFormContext();

  const { pending, pendingRequest, companyName, phone, samePhone } = getValues();

  const handleSamePhone = (event) => {
    const { checked } = event.target;
    setValue('samePhone', checked);
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
      </div>
      <div className="flex flex-col gap-5">
        <div className="col-span-2 row-auto">
          <CheckBoxInput
            name="samePhone"
            onChange={handleSamePhone}
            checked={samePhone}
            labelStyles="text-black text-xsm"
          >
            The company phone number is the same as my personal phone number.
          </CheckBoxInput>
        </div>
        {!samePhone && (
          <div className="grid gap-5 md:grid-cols-2">
            <PhoneInput
              {...register('phone')}
              onBlur={() => {}}
              label="Phone number"
              disabled={isSubmitting}
              error={errors.phone?.message}
              labelBadge={
                pendingRequest ? (
                  <p className={classNames('font-bold', pending?.phone === phone ? 'text-green' : 'text-blue')}>
                    {pending?.phone}
                  </p>
                ) : (
                  '*'
                )
              }
            />
          </div>
        )}
      </div>
    </>
  );
};

export default CompanyDetails;
