'use client';

import { useEffect, useRef, useState } from 'react';

import classNames from 'classnames';

import { PersonalDetailsFormPropTypes } from '@/lib/types';

import CheckCircleSVG from '@/assets/images/checkCircle.svg';
import RefreshSVG from '@/assets/images/refresh.svg';
import { Button, Input, PhoneInput, TextWithLabel } from '@/elements';
import { checkPhoneAvailability } from '@/services/user';
import PhoneValidation from '@/units/PhoneValidation';
import { useHookForm } from '@/utils/hooks';

const PersonalDetails = ({ onUpdatePage = false }) => {
  const {
    register,
    getValues,
    setValue,
    watch,
    formState: { errors, isSubmitting },
    setError,
    trigger,
  } = useHookForm();

  const values = getValues();
  const [showPhoneValidation, setShowPhoneValidation] = useState(false);
  const [isPhoneVerified, setIsPhoneVerified] = useState(false);
  const [phoneValue, setPhoneValue] = useState('');
  const [validationInProgress, setValidationInProgress] = useState(false);
  const [isCheckingAvailability, setIsCheckingAvailability] = useState(false);

  const phoneInputRef = useRef(null);

  // Determine which field name to use based on onUpdatePage prop
  const phoneFieldName = onUpdatePage ? 'phone' : 'userPhone';

  const { pending, pendingRequest, firstName, lastName, email, confirmEmail } = values;

  // Watch for changes to the phone field
  const userPhone = watch(phoneFieldName);

  // Initialize phoneVerified to false on component mount
  useEffect(() => {
    setValue('phoneVerified', false);
    setValue('confirmEmail', email);
  }, [setValue]);

  // Update phoneValue when userPhone changes
  useEffect(() => {
    setPhoneValue(userPhone || '');
  }, [userPhone]);

  // Helper function to scroll to phone input
  const scrollToPhoneInput = () => {
    setTimeout(() => {
      const phoneInput =
        phoneInputRef.current ||
        document.querySelector('.react-tel-input input') ||
        document.querySelector(`input[name="${phoneFieldName}"]`);

      if (phoneInput) {
        phoneInput.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
        });
        phoneInput.focus();
      }
    }, 100);
  };

  // Set phone verification error when phoneVerified validation fails
  useEffect(() => {
    if (errors.phoneVerified && !isPhoneVerified) {
      setError(phoneFieldName, {
        type: 'manual',
        message: 'Phone verification is required',
      });
    }
  }, [errors.phoneVerified, isPhoneVerified, setError, phoneFieldName]);

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

  const handlePhoneValidationClick = async () => {
    if (!phoneValue) return;

    setIsCheckingAvailability(true);

    try {
      const response = await checkPhoneAvailability({ phone: phoneValue });

      if (response.error) {
        // Handle API error
        setShowPhoneValidation(false);
        setValidationInProgress(false);
        setError(phoneFieldName, {
          type: 'manual',
          message: response.message || 'Failed to check phone availability',
        });
        scrollToPhoneInput();
        return;
      }

      const { available, message, canSendSms } = response.data;

      if (available) {
        if (!canSendSms) {
          // Phone is available but SMS cannot be sent, mark as verified and finish validation
          setIsPhoneVerified(true);
          setValidationInProgress(false);
          setValue('phoneVerified', true);
          setError(phoneFieldName, null);
          trigger(phoneFieldName);
        } else {
          // Phone is available and SMS can be sent, proceed with OTP verification
          setError(phoneFieldName, null);
          trigger(phoneFieldName);
          setShowPhoneValidation(true);
        }
      } else {
        // Phone is not available, reset validation states and show error message
        setShowPhoneValidation(false);
        setValidationInProgress(false);
        setError(phoneFieldName, {
          type: 'manual',
          message: message || 'This phone number is already registered',
        });
        scrollToPhoneInput();
      }
    } catch (error) {
      // Handle network or other errors
      setShowPhoneValidation(false);
      setValidationInProgress(false);
      setError(phoneFieldName, {
        type: 'manual',
        message: 'Failed to check phone availability. Please try again.',
      });
      scrollToPhoneInput();
    } finally {
      setIsCheckingAvailability(false);
    }
  };

  const handlePhoneVerified = ({ phoneVerified, otpId }) => {
    setIsPhoneVerified(phoneVerified);
    setValidationInProgress(false);
    if (phoneVerified) {
      setValue('phoneVerified', true);
      // Clear any phone field errors when verification succeeds
      setError(phoneFieldName, null);
      trigger(phoneFieldName);
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
    // Set phone verification error
    setError(phoneFieldName, {
      type: 'manual',
      message: 'Phone verification is required',
    });
    scrollToPhoneInput();
  };

  const handleSendOtp = (sendOtp) => {
    if (sendOtp) {
      setValidationInProgress(true);
    }
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="grid grid-cols-2 gap-4">
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
        <Input
          {...register('confirmEmail')}
          label="Confirm email"
          labelBadge={renderLabelBadge(pending?.email, confirmEmail, 'confirmEmail')}
          placeholder="Enter your email"
          error={errors.confirmEmail?.message}
          disabled={isSubmitting}
        />
      </div>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-5 md:flex-row">
          <div className="w-full">
            <div className="grid w-full gap-2 md:grid-cols-2 md:gap-4">
              <div>
                <PhoneInput
                  {...register(phoneFieldName)}
                  ref={phoneInputRef}
                  onBlur={() => {}}
                  label="Phone number"
                  disabled={isSubmitting || isPhoneVerified || (validationInProgress && !isPhoneVerified)}
                  error={errors[phoneFieldName]?.message}
                  dropdownClass={onUpdatePage ? '-top-[220px] h-[200px] overflow-x-hidden' : ''}
                  labelBadge={isPhoneVerified ? '✓' : '*'}
                />
              </div>

              <div
                className={classNames('flex justify-start gap-2', {
                  'items-center': errors[phoneFieldName]?.message,
                  'items-end': !errors[phoneFieldName]?.message,
                })}
              >
                {phoneValue && !isPhoneVerified && (
                  <Button
                    buttonProps={{
                      text: 'Validate',
                      variant: 'primary',
                      size: 'large',
                    }}
                    disabled={isSubmitting || isCheckingAvailability}
                    isLoading={isCheckingAvailability}
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
                {(validationInProgress || isPhoneVerified) && (
                  <Button
                    buttonProps={{
                      text: 'Reset',
                      variant: 'tertiary',
                      size: 'large',
                      icon: { before: <RefreshSVG className="fill-black" /> },
                    }}
                    disabled={isSubmitting}
                    onClick={handleRefreshValidation}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
        {showPhoneValidation && !isPhoneVerified && (
          <PhoneValidation phone={phoneValue} onVerified={handlePhoneVerified} onSendOtp={handleSendOtp} />
        )}

        {/* Hidden input for phoneVerified validation */}
        <input type="hidden" {...register('phoneVerified')} />
      </div>
    </div>
  );
};

PersonalDetails.propTypes = PersonalDetailsFormPropTypes;

export default PersonalDetails;
