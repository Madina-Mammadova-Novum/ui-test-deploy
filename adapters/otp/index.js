/**
 * Adapter for OTP sending request
 * @param {Object} params - The parameters for the adapter
 * @param {Object} params.data - The data containing the receiver's phone number
 * @returns {Object} - Formatted data for the API request
 */
export const sendOtpAdapter = ({ data }) => {
  return {
    receiver: data?.receiver,
    channel: data?.channel,
  };
};

/**
 * Adapter for OTP response after sending
 * @param {Object} params - The parameters for the adapter
 * @param {Object} params.data - The response data from the OTP send API
 * @returns {Object} - Formatted response data
 */
export const sendOtpResponseAdapter = ({ data }) => {
  return {
    otpId: data?.otpId,
    expirationDate: data?.expirationDate,
  };
};

/**
 * Adapter for OTP validation request
 * @param {Object} params - The parameters for the adapter
 * @param {Object} params.data - The data containing the OTP ID and code
 * @returns {Object} - Formatted data for the API request
 */
export const validateOtpAdapter = ({ data }) => {
  return {
    id: data?.id,
    code: data?.code,
  };
};

/**
 * Adapter for OTP validation response
 * @param {Object} params - The parameters for the adapter
 * @param {Object} params.data - The response data from the OTP validation API
 * @returns {Object} - Formatted response data
 */
export const validateOtpResponseAdapter = ({ data }) => {
  return {
    isValidated: data?.isValidated,
    leftAttempts: data?.leftAttempts,
  };
};
