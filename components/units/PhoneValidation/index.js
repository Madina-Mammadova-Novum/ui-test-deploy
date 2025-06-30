'use client';

import { useEffect, useState } from 'react';

import PropTypes from 'prop-types';

import CheckCircleSVG from '@/assets/images/checkCircle.svg';
import { Button, OTPInput } from '@/elements';
import DynamicCountdownTimer from '@/units/DynamicCountdownTimer';
import { sendOtpCode, verifyOtpCode } from '@/utils/otp';

const PhoneValidation = ({ phone, onVerified, onSendOtp }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [otpCode, setOtpCode] = useState('');
  const [otpId, setOtpId] = useState(null);
  const [expirationDate, setExpirationDate] = useState(null);
  const [codeSent, setCodeSent] = useState(false);

  /* eslint-disable consistent-return */
  useEffect(() => {
    if (isVerified && onVerified) {
      // Add timeout to allow user to see verification success message
      const timeoutId = setTimeout(() => {
        onVerified({ phoneVerified: true, otpId });
      }, 1500);

      // Clean up timeout if component unmounts
      return () => clearTimeout(timeoutId);
    }
  }, [isVerified, onVerified]);

  const handleSendOtp = async () => {
    if (!phone) return;

    setIsLoading(true);

    await sendOtpCode({
      phone,
      onSuccess: (data) => {
        setOtpId(data.otpId);
        setExpirationDate(new Date(data.expirationDate) || null);
        setCodeSent(true);
        onSendOtp(true);
      },
      onComplete: () => setIsLoading(false),
    });
  };

  const handleVerifyOtp = async () => {
    if (!otpCode || !otpId) return;

    setIsLoading(true);

    await verifyOtpCode({
      otpId,
      code: otpCode,
      onSuccess: () => {
        setIsVerified(true);
      },
      onError: (error) => {
        // If no attempts left, reset verification process
        if (error.leftAttempts === 0) {
          setOtpCode('');
          setOtpId(null);
          setExpirationDate(null);
          setCodeSent(false);
        }
      },
      onComplete: () => setIsLoading(false),
    });
  };

  const handleResendOtp = () => {
    setOtpId(null);
    setExpirationDate(null);
    setOtpCode('');
    handleSendOtp();
  };

  if (isVerified) {
    return (
      <div className="rounded-md border border-green-200 bg-green-50 p-3">
        <p className="flex items-center text-xsm text-green-700">
          <CheckCircleSVG className="mr-2 fill-green-700" />
          Phone number verified successfully
        </p>
      </div>
    );
  }

  if (!codeSent) {
    return (
      <div className="flex flex-col gap-4 rounded-md border border-gray-200 px-[14px] py-8 md:px-8">
        <div className="text-center text-black">
          <h4 className="mb-1 text-xsm font-semibold">Phone Verification</h4>
          <p className="text-xs">To verify your phone number, we&apos;ll send you a 6-digit code.</p>
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
    <div className="flex flex-col gap-4 rounded-md border border-gray-200 px-[14px] py-8 md:px-8">
      <div className="text-center text-black">
        <h4 className="mb-1 text-xsm font-semibold">Phone Verification</h4>
        <p className="text-xs">
          {otpId ? 'Enter the verification code sent to your phone' : 'Sending verification code to your phone...'}
        </p>
      </div>

      {otpId && expirationDate && (
        <>
          <div>
            <OTPInput length={6} value={otpCode} onChange={setOtpCode} separator shouldFocus />
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              {expirationDate && (
                <span className="text-xsm text-gray-500">
                  Code expires in: <DynamicCountdownTimer date={expirationDate} variant="secondary" />
                </span>
              )}
              <Button
                buttonProps={{
                  text: 'Resend Code',
                  variant: 'primary',
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
  onSendOtp: PropTypes.func,
};

export default PhoneValidation;
