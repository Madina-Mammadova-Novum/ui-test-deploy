'use client';

import { useEffect, useState } from 'react';

import classNames from 'classnames';

import { PersonalDetailsFormPropTypes } from '@/lib/types';

import CheckCircleSVG from '@/assets/images/checkCircle.svg';
import { Button, Input, PhoneInput, TextWithLabel } from '@/elements';
import PhoneValidation from '@/units/PhoneValidation';
import { useHookForm } from '@/utils/hooks';

const PersonalDetails = ({ onUpdatePage = false }) => {
  const {
    register,
    getValues,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useHookForm();

  const values = getValues();
  const [showPhoneValidation, setShowPhoneValidation] = useState(false);
  const [isPhoneVerified, setIsPhoneVerified] = useState(false);
  const [phoneValue, setPhoneValue] = useState('');

  const { pending, pendingRequest, firstName, lastName, email } = values;

  // Watch for changes to the userPhone field
  const userPhone = watch('userPhone');

  // Update phoneValue when userPhone changes
  useEffect(() => {
    setPhoneValue(userPhone || '');
  }, [userPhone]);

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
    if (phoneValue) {
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
          <div className="grid w-full gap-5 md:grid-cols-2">
            <PhoneInput
              {...register('userPhone')}
              onBlur={() => {}}
              label="Phone number"
              disabled={isSubmitting || isPhoneVerified}
              error={errors.userPhone?.message}
              dropdownClass={onUpdatePage ? '-top-[220px] h-[200px] overflow-x-hidden' : ''}
              labelBadge={isPhoneVerified ? '✓' : '*'}
            />

            {phoneValue && !isPhoneVerified && (
              <Button
                buttonProps={{
                  text: 'Validate',
                  variant: 'secondary',
                  size: 'large',
                }}
                customStylesFromWrap="!items-start !justify-end"
                disabled={isSubmitting}
                onClick={handlePhoneValidationClick}
              />
            )}

            {isPhoneVerified && (
              <TextWithLabel
                label="Status"
                text="Verified"
                coverImage={<CheckCircleSVG className="fill-green" />}
                textStyles="text-green font-semibold"
                customStyles="!flex-col !items-start [&>div]:!ml-0 !gap-0"
                textGroupStyle="h-full"
              />
            )}
          </div>
        </div>
        {showPhoneValidation && !isPhoneVerified && (
          <PhoneValidation phone={phoneValue} onVerified={handlePhoneVerified} />
        )}
        {errors.phoneVerified && <p className="text-xs mt-1 text-red">{errors.phoneVerified.message}</p>}
      </div>
    </>
  );
};

PersonalDetails.propTypes = PersonalDetailsFormPropTypes;

export default PersonalDetails;
