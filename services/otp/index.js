'use client';

import { ContentTypeJson } from '@/lib/constants';
import { postData } from '@/utils/dataFetching';

/**
 * Sends a one-time password to the given phone number via specified channel
 * @param {Object} params - Parameters for the OTP sending
 * @param {string} params.receiver - User's phone number to receive OTP
 * @param {string} params.channel - Channel to send OTP ('sms' or 'whatsapp')
 * @returns {Promise} A promise that resolves with the response including otpId and expiration date
 */
export async function sendOtp({ receiver, channel }) {
  const response = await postData('otp/send', { receiver, channel }, { headers: { ...ContentTypeJson() } });

  if (response.error && response.status === 429)
    response.error.message = 'Sending limit exceeded. Please try again later.';

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
