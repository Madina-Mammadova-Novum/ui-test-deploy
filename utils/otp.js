/**
 * Utility functions for OTP (One-Time Password) operations
 */

import { nullableDataObjectAdapter } from '@/adapters/common';
import { sendOtp, validateOtp } from '@/services';
import { ensurePlusPrefix } from '@/utils/helpers';
import { errorToast, successToast } from '@/utils/hooks';

/**
 * Send OTP code to a phone number
 *
 * @param {Object} params - Parameters for sending OTP
 * @param {string} params.phone - Phone number to send code to
 * @param {Function} params.onSuccess - Function to call on success with data
 * @param {Function} params.onError - Function to call on error
 * @param {Function} params.onComplete - Function to call when operation completes (regardless of outcome)
 * @param {boolean} params.showToasts - Whether to show toast notifications (default: true)
 * @returns {Promise<Object>} Response data or error
 */
export const sendOtpCode = async ({
  phone,
  onSuccess = () => {},
  onError = () => {},
  onComplete = () => {},
  showToasts = true,
}) => {
  try {
    const { error, data } = await sendOtp({ receiver: ensurePlusPrefix(phone) });

    if (error) {
      if (showToasts) {
        errorToast('Error', error?.message || 'Failed to send verification code');
      }
      onError(error);
      return { error };
    }

    if (showToasts) {
      successToast('Success', 'Verification code sent to your phone');
    }
    onSuccess(data);
    return nullableDataObjectAdapter(data);
  } catch (error) {
    if (showToasts) {
      errorToast('Error', 'Failed to send verification code');
    }
    onError(error);
    return { error };
  } finally {
    onComplete();
  }
};

/**
 * Verify an OTP code
 *
 * @param {Object} params - Parameters for verifying OTP
 * @param {string} params.otpId - ID of the OTP to verify
 * @param {string} params.code - OTP code to verify
 * @param {Function} params.onSuccess - Function to call on success with data
 * @param {Function} params.onError - Function to call on error
 * @param {Function} params.onComplete - Function to call when operation completes
 * @param {boolean} params.showToasts - Whether to show toast notifications (default: true)
 * @returns {Promise<Object>} Response data or error
 */
export const verifyOtpCode = async ({
  otpId,
  code,
  onSuccess = () => {},
  onError = () => {},
  onComplete = () => {},
  showToasts = true,
}) => {
  try {
    const { error, data } = await validateOtp({ id: otpId, code });

    if (error) {
      if (showToasts) {
        errorToast('Error', error?.message || 'Invalid verification code');
      }
      onError(error);
      return { error };
    }

    if (data?.isValidated) {
      if (showToasts) {
        successToast('Success', 'Phone number successfully verified');
      }
      onSuccess(data);
      return nullableDataObjectAdapter(data);
    }

    // Handle unsuccessful validation but not an error
    const attemptsMessage =
      data?.leftAttempts > 0
        ? `Incorrect code. ${data.leftAttempts} attempts remaining.`
        : 'No attempts remaining. Please request a new code.';

    if (showToasts) {
      errorToast('Error', attemptsMessage);
    }

    onError({ message: attemptsMessage, leftAttempts: data?.leftAttempts });
    return { error: { message: attemptsMessage }, data };
  } catch (error) {
    if (showToasts) {
      errorToast('Error', 'Failed to verify code');
    }
    onError(error);
    return { error };
  } finally {
    onComplete();
  }
};
