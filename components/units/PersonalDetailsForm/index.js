'use client';

import { useEffect, useRef, useState } from 'react';

import classNames from 'classnames';

import { PersonalDetailsFormPropTypes } from '@/lib/types';

import CheckCircleSVG from '@/assets/images/checkCircle.svg';
import RefreshSVG from '@/assets/images/refresh.svg';
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
    trigger,
  } = useHookForm();

  const values = getValues();
  const [showPhoneValidation, setShowPhoneValidation] = useState(false);
  const [isPhoneVerified, setIsPhoneVerified] = useState(false);
  const [phoneValue, setPhoneValue] = useState('');
  const [validationInProgress, setValidationInProgress] = useState(false);

  const phoneVerifiedErrorRef = useRef(null);

  // Determine which field name to use based on onUpdatePage prop
  const phoneFieldName = onUpdatePage ? 'phone' : 'userPhone';

  const { pending, pendingRequest, firstName, lastName, email } = values;

  // Watch for changes to the phone field
  const userPhone = watch(phoneFieldName);

  // Initialize phoneVerified to false on component mount
  useEffect(() => {
    setValue('phoneVerified', false);
  }, [setValue]);

  // Update phoneValue when userPhone changes
  useEffect(() => {
    setPhoneValue(userPhone || '');
  }, [userPhone]);

  // Scroll to phoneVerified error when it's the only error
  useEffect(() => {
    if (errors && Object.keys(errors).length === 1 && errors.phoneVerified) {
      if (phoneVerifiedErrorRef.current) {
        phoneVerifiedErrorRef.current.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
        });
      }
    }
  }, [errors]);

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

  const handlePhoneVerified = ({ phoneVerified, otpId }) => {
    setIsPhoneVerified(phoneVerified);
    setValidationInProgress(false);
    if (phoneVerified) {
      setValue('phoneVerified', true);
      // Trigger validation to clear any errors
      trigger('phoneVerified');
      setValue('otpId', otpId);
    }
  };

  const handleRefreshValidation = () => {
    // Reset all validation states
    setShowPhoneValidation(false);
    setValidationInProgress(false);
    setIsPhoneVerified(false);
    setValue('phoneVerified', false);
    setValue('otpId', null);
    // Trigger validation to show errors if needed
    trigger('phoneVerified');
  };

  const handleSendOtp = (sendOtp) => {
    if (sendOtp) {
      setValidationInProgress(true);
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
          <div className="w-full">
            <div className="grid w-full gap-5 md:grid-cols-2">
              <PhoneInput
                {...register(phoneFieldName)}
                onBlur={() => {}}
                label="Phone number"
                disabled={isSubmitting || isPhoneVerified || (validationInProgress && !isPhoneVerified)}
                error={errors[phoneFieldName]?.message}
                dropdownClass={onUpdatePage ? '-top-[220px] h-[200px] overflow-x-hidden' : ''}
                labelBadge={isPhoneVerified ? '✓' : '*'}
              />

              <div className="flex items-end justify-start gap-2">
                {phoneValue && !isPhoneVerified && (
                  <Button
                    buttonProps={{
                      text: 'Validate',
                      variant: 'secondary',
                      size: 'large',
                    }}
                    // customStylesFromWrap="!items-start !justify-end"
                    disabled={isSubmitting}
                    onClick={handlePhoneValidationClick}
                  />
                )}
                {validationInProgress && !isPhoneVerified && (
                  <Button
                    buttonProps={{
                      text: 'Reset',
                      variant: 'tertiary',
                      size: 'large',
                      icon: { before: <RefreshSVG className="fill-black" /> },
                    }}
                    // customStylesFromWrap="!items-start !justify-end"
                    disabled={isSubmitting}
                    onClick={handleRefreshValidation}
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
            {errors.phoneVerified && (
              <div className="md:col-span-3" ref={phoneVerifiedErrorRef}>
                <p className="text-xs-sm text-red">{errors.phoneVerified.message}</p>
              </div>
            )}
          </div>
        </div>
        {showPhoneValidation && !isPhoneVerified && (
          <PhoneValidation phone={phoneValue} onVerified={handlePhoneVerified} onSendOtp={handleSendOtp} />
        )}

        {/* Hidden input for phoneVerified validation */}
        <input type="hidden" {...register('phoneVerified')} />
      </div>
    </>
  );
};

PersonalDetails.propTypes = PersonalDetailsFormPropTypes;

export default PersonalDetails;
