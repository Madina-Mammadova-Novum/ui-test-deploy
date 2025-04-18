'use client';

import { useEffect, useState } from 'react';

import PropTypes from 'prop-types';

import { Button, OTPInput } from '@/elements';
import { sendOtp, validateOtp } from '@/services';
import DynamicCountdownTimer from '@/units/DynamicCountdownTimer';
import { errorToast, successToast } from '@/utils/hooks';

const PhoneValidation = ({ phone, onVerified }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [otpCode, setOtpCode] = useState('');
  const [otpId, setOtpId] = useState(null);
  const [expirationDate, setExpirationDate] = useState(null);
  const [codeSent, setCodeSent] = useState(false);

  useEffect(() => {
    if (isVerified && onVerified) {
      onVerified(true);
    }
  }, [isVerified, onVerified]);

  const handleSendOtp = async () => {
    if (!phone) return;

    setIsLoading(true);

    try {
      const { error, data } = await sendOtp({ receiver: phone });

      if (error) {
        errorToast('Error', error?.message || 'Failed to send verification code');
      } else {
        setOtpId(data.otpId);
        setExpirationDate(new Date(data.expirationDate));
        setCodeSent(true);
        successToast('Success', 'Verification code sent to your phone');
      }
    } catch (error) {
      errorToast('Error', 'Failed to send verification code');
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    if (!otpCode || !otpId) return;

    setIsLoading(true);

    try {
      const { error } = await validateOtp({ id: otpId, code: otpCode });

      if (error) {
        errorToast('Error', error?.message || 'Invalid verification code');
      } else {
        setIsVerified(true);
        successToast('Success', 'Phone number successfully verified');
      }
    } catch (error) {
      errorToast('Error', 'Failed to verify code');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOtp = () => {
    setOtpId(null);
    setExpirationDate(null);
    setOtpCode('');
    handleSendOtp();
  };

  if (isVerified) {
    return (
      <div className="mt-4 rounded-md border border-green-200 bg-green-50 p-3">
        <p className="flex items-center text-green-700">
          <svg className="mr-2 h-5 w-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            />
          </svg>
          Phone number verified successfully
        </p>
      </div>
    );
  }

  if (!codeSent) {
    return (
      <div className="mt-4 rounded-md border border-gray-200 p-4">
        <div className="mb-3">
          <h4 className="mb-1 text-sm font-semibold">Phone Verification</h4>
          <p className="text-xs text-gray-600">To verify your phone number, we&apos;ll send you a 6-digit code.</p>
        </div>
        <Button
          buttonProps={{
            text: 'Send Code',
            variant: 'primary',
            size: 'medium',
          }}
          onClick={handleSendOtp}
          disabled={isLoading || !phone}
          isLoading={isLoading}
        />
      </div>
    );
  }

  return (
    <div className="mt-4 rounded-md border border-gray-200 p-4">
      <div className="mb-3">
        <h4 className="mb-1 text-sm font-semibold">Phone Verification</h4>
        <p className="text-xs text-gray-600">
          {otpId ? 'Enter the verification code sent to your phone' : 'Sending verification code to your phone...'}
        </p>
      </div>

      {otpId && expirationDate && (
        <>
          <div className="mb-3">
            <OTPInput
              label="Verification Code"
              labelBadge="*"
              length={6}
              value={otpCode}
              onChange={setOtpCode}
              separator
              shouldFocus
            />
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-500">
                Code expires in: <DynamicCountdownTimer date={expirationDate} />
              </span>
              <Button
                buttonProps={{
                  text: 'Resend Code',
                  variant: 'link',
                  size: 'small',
                }}
                onClick={handleResendOtp}
                disabled={isLoading}
              />
            </div>
            <Button
              buttonProps={{
                text: 'Verify Code',
                variant: 'primary',
                size: 'medium',
              }}
              onClick={handleVerifyOtp}
              disabled={isLoading || otpCode.length !== 6}
              isLoading={isLoading}
            />
          </div>
        </>
      )}

      {!otpId && (
        <div className="flex justify-center">
          <div className="animate-pulse text-blue">Sending verification code...</div>
        </div>
      )}
    </div>
  );
};

PhoneValidation.propTypes = {
  phone: PropTypes.string.isRequired,
  onVerified: PropTypes.func,
};

export default PhoneValidation;
