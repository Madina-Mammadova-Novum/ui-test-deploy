'use client';

import { useEffect, useRef, useState } from 'react';

import classNames from 'classnames';

import { PersonalDetailsFormPropTypes } from '@/lib/types';

import CheckCircleSVG from '@/assets/images/checkCircle.svg';
import RefreshSVG from '@/assets/images/refresh.svg';
import { Button, Input, Label, PhoneInput, TextWithLabel } from '@/elements';
import { checkPhoneAvailability } from '@/services/user';
import PhoneValidation from '@/units/PhoneValidation';
import { clearPhoneValidationState, loadPhoneValidationState, savePhoneValidationState } from '@/utils/helpers';
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

  // New: State for verification channel selection
  const [verificationOptions, setVerificationOptions] = useState([]);
  const [selectedChannel, setSelectedChannel] = useState(null);

  const phoneInputRef = useRef(null);
  const VerificationChannel = { SMS: 'Sms', WHATSAPP: 'WhatsApp' };
  // Determine which field name to use based on onUpdatePage prop
  const phoneFieldName = onUpdatePage ? 'phone' : 'userPhone';

  const { pending, pendingRequest, firstName, lastName, email, confirmEmail } = values;

  // Watch for changes to the phone field
  const userPhone = watch(phoneFieldName);

  // Determine context for phone validation storage
  const getValidationContext = () => (onUpdatePage ? 'update' : 'registration');

  // Load phone validation state from sessionStorage
  const loadSavedPhoneValidation = () => {
    const savedState = loadPhoneValidationState(userPhone, getValidationContext());
    if (savedState) {
      setIsPhoneVerified(true);
      setValue('phoneVerified', true);
      if (savedState.otpId) {
        setValue('otpId', savedState.otpId);
      }
      // Clear any existing phone field errors
      setError(phoneFieldName, null);
      trigger(phoneFieldName);
      return true;
    }
    return false;
  };

  // Initialize phoneVerified to false on component mount and check sessionStorage
  useEffect(() => {
    // First set default values
    setValue('phoneVerified', false);

    // Then try to load saved phone validation state
    if (userPhone) {
      loadSavedPhoneValidation();
    }
  }, [setValue, userPhone]);

  // Set initial confirmEmail value only once on component mount
  useEffect(() => {
    if (email && !getValues('confirmEmail')) {
      setValue('confirmEmail', email);
    }
  }, []);

  // Update phoneValue when userPhone changes
  useEffect(() => {
    const newPhoneValue = userPhone || '';
    setPhoneValue(newPhoneValue);

    // If phone number changed, reset verification state and clear sessionStorage
    if (newPhoneValue && newPhoneValue !== phoneValue) {
      // Check if we have a saved state for this phone number
      const hasValidState = loadSavedPhoneValidation();
      if (!hasValidState) {
        // Reset verification state if no valid saved state
        setIsPhoneVerified(false);
        setValue('phoneVerified', false);
        setValue('otpId', null);
        clearPhoneValidationState(getValidationContext());
      }
    }
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

      const { available, message, canSendSms, canSendWhatsApp } = response.data;

      if (available) {
        // Present verification options to the user
        const options = [];
        if (canSendSms) options.push(VerificationChannel.SMS);
        if (canSendWhatsApp) options.push(VerificationChannel.WHATSAPP);
        setVerificationOptions(options);

        if (options.length === 0) {
          // No method available, mark as verified directly
          setIsPhoneVerified(true);
          setValidationInProgress(false);
          setValue('phoneVerified', true);
          setError(phoneFieldName, null);
          trigger(phoneFieldName);
          savePhoneValidationState(phoneValue, true, null, getValidationContext());
        } else if (options.length === 1) {
          // Only one channel, select automatically
          setSelectedChannel(options[0]);
          setError(phoneFieldName, null);
          trigger(phoneFieldName);
          setShowPhoneValidation(true);
        } else {
          // Both channels available, let user choose
          setSelectedChannel(null);
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
      // Save to sessionStorage
      savePhoneValidationState(phoneValue, true, otpId, getValidationContext());
    }
  };

  const handleRefreshValidation = () => {
    // Reset all validation states
    setShowPhoneValidation(false);
    setValidationInProgress(false);
    setIsPhoneVerified(false);
    setValue('phoneVerified', false);
    setValue('otpId', null);
    // Clear from sessionStorage
    clearPhoneValidationState(getValidationContext());
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
        {/* Verification method selection UI */}
        {verificationOptions.length > 0 && !isPhoneVerified && (
          <div className="flex items-center gap-4">
            <Label className="mr-2 text-xs-sm">Select verification channel:</Label>
            {verificationOptions.map((channel) => (
              <Button
                key={channel}
                buttonProps={{
                  text: channel,
                  variant: selectedChannel === channel || verificationOptions.length === 1 ? 'primary' : 'secondary',
                  size: 'medium',
                }}
                onClick={() => {
                  setSelectedChannel(channel);
                  setShowPhoneValidation(true);
                  setError(phoneFieldName, null);
                  trigger(phoneFieldName);
                }}
                disabled={verificationOptions.length === 1}
              />
            ))}
          </div>
        )}
        {/* Verification screen */}
        {showPhoneValidation && !isPhoneVerified && selectedChannel && (
          <PhoneValidation
            phone={phoneValue}
            onVerified={handlePhoneVerified}
            onSendOtp={handleSendOtp}
            channel={selectedChannel}
          />
        )}
        {/* Hidden input for phoneVerified validation */}
        <input type="hidden" {...register('phoneVerified')} />
      </div>
    </div>
  );
};

PersonalDetails.propTypes = PersonalDetailsFormPropTypes;

export default PersonalDetails;
