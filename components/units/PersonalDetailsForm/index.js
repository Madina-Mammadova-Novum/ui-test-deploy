'use client';

import { useState } from 'react';

import classNames from 'classnames';

import { PersonalDetailsFormPropTypes } from '@/lib/types';

import { Button, Input, PhoneInput } from '@/elements';
import PhoneValidation from '@/units/PhoneValidation';
import { useHookForm } from '@/utils/hooks';

const PersonalDetails = ({ onUpdatePage = false }) => {
  const {
    register,
    getValues,
    setValue,
    formState: { errors, isSubmitting },
  } = useHookForm();

  const values = getValues();
  const [showPhoneValidation, setShowPhoneValidation] = useState(false);
  const [isPhoneVerified, setIsPhoneVerified] = useState(false);

  const { pending, pendingRequest, firstName, lastName, email, userPhone } = values;

  // Helper function to render label badge based on conditions
  const renderLabelBadge = (pendingValue, currentValue, fieldName) => {
    if (pendingRequest) {
      const isPending = pendingValue === currentValue;
      return <p className={classNames('font-bold', isPending ? 'text-green' : 'text-blue')}>{pendingValue}</p>;
    }

    if (onUpdatePage && fieldName !== 'email') {
      return '';
    }

    return '*';
  };

  const handlePhoneValidationClick = () => {
    if (userPhone) {
      setShowPhoneValidation(true);
    }
  };

  const handlePhoneVerified = (verified) => {
    setIsPhoneVerified(verified);
    if (verified) {
      setValue('phoneVerified', true);
    }
  };

  return (
    <>
      <div className="grid grid-cols-2 gap-5">
        <Input
          {...register('firstName')}
          label="First name"
          labelBadge={renderLabelBadge(pending?.name, firstName, 'firstName')}
          placeholder="John"
          error={errors.firstName?.message}
          disabled={isSubmitting || onUpdatePage}
        />
        <Input
          {...register('lastName')}
          label="Last name"
          labelBadge={renderLabelBadge(pending?.surname, lastName, 'lastName')}
          placeholder="Doe"
          error={errors.lastName?.message}
          disabled={isSubmitting || onUpdatePage}
        />
        <Input
          {...register('email')}
          label="Email"
          labelBadge={renderLabelBadge(pending?.email, email, 'email')}
          placeholder="Enter your email"
          error={errors.email?.message}
          disabled={isSubmitting}
        />
      </div>
      <div className="flex flex-col gap-5">
        <p className="pt-5 text-sm font-semibold text-black">Contact Information</p>
        <div className="flex flex-col gap-5 md:flex-row">
          <div className="flex-1">
            <PhoneInput
              {...register('userPhone')}
              onBlur={() => {}}
              label="Phone number"
              disabled={isSubmitting || isPhoneVerified}
              error={errors.userPhone?.message}
              dropdownClass={onUpdatePage ? '-top-[220px] h-[200px] overflow-x-hidden' : ''}
              labelBadge={isPhoneVerified ? '✓' : '*'}
            />
          </div>
          <div className="flex items-end">
            <Button
              buttonProps={{
                text: isPhoneVerified ? 'Verified' : 'Validate',
                variant: isPhoneVerified ? 'success' : 'primary',
                size: 'medium',
              }}
              className="mb-0.5"
              disabled={!userPhone || isSubmitting || isPhoneVerified}
              onClick={handlePhoneValidationClick}
            />
          </div>
        </div>
        {showPhoneValidation && !isPhoneVerified && (
          <PhoneValidation phone={userPhone} onVerified={handlePhoneVerified} />
        )}
        {errors.phoneVerified && <p className="text-xs mt-1 text-red">{errors.phoneVerified.message}</p>}
      </div>
    </>
  );
};

PersonalDetails.propTypes = PersonalDetailsFormPropTypes;

export default PersonalDetails;
