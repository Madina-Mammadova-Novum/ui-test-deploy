'use client';

import { ContentTypeJson } from '@/lib/constants';
import { postData } from '@/utils/dataFetching';

/**
 * Sends a one-time password to the given phone number
 * @param {Object} params - Parameters for the OTP sending
 * @param {string} params.receiver - User's phone number to receive OTP
 * @returns {Promise} A promise that resolves with the response including otpId and expiration date
 */
export async function sendOtp({ receiver }) {
  const response = await postData('otp/send', { receiver }, { headers: { ...ContentTypeJson() } });

  return {
    ...response,
  };
}

/**
 * Validates a one-time password with the given code
 * @param {Object} params - Parameters for the OTP validation
 * @param {string} params.id - The OTP ID received from sendOtp response
 * @param {string} params.code - The OTP code entered by the user
 * @returns {Promise} A promise that resolves with the validation response
 */
export async function validateOtp({ id, code }) {
  const response = await postData('otp/validate', { id, code }, { headers: { ...ContentTypeJson() } });

  return {
    ...response,
  };
}
