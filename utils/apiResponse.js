/**
 * Utility functions for handling API responses
 */

import { errorToast, successToast } from '@/utils/hooks';

/**
 * Handle API response with automatic toast notifications
 *
 * @param {Object} response - API response object
 * @param {Object} options - Configuration options
 * @param {Function} options.onSuccess - Success callback function
 * @param {Function} options.onError - Error callback function
 * @param {boolean} options.showSuccessToast - Whether to show success toast (default: true)
 * @param {boolean} options.showErrorToast - Whether to show error toast (default: true)
 * @param {string} options.successTitle - Custom success toast title
 * @param {string} options.errorTitle - Custom error toast title
 * @returns {Object} The original response object
 */
export const handleApiResponse = (
  response,
  {
    onSuccess = () => {},
    onError = () => {},
    showSuccessToast = true,
    showErrorToast = true,
    successTitle = 'Success',
    errorTitle = 'Error',
  } = {}
) => {
  const { message, error } = response || {};

  if (error) {
    if (showErrorToast) {
      errorToast(errorTitle, error.message || error.title || 'An error occurred');
    }
    onError(error);
  } else if (message) {
    if (showSuccessToast) {
      successToast(successTitle, message);
    }
    onSuccess(response);
  }

  return response;
};

/**
 * Handle form submission with automatic loading state and toast notifications
 *
 * @param {Function} apiCall - API function to call
 * @param {Object} options - Configuration options
 * @param {Function} options.onSuccess - Success callback function
 * @param {Function} options.onError - Error callback function
 * @param {Function} options.onFinally - Function to call when request completes
 * @param {boolean} options.showSuccessToast - Whether to show success toast
 * @param {boolean} options.showErrorToast - Whether to show error toast
 * @param {string} options.successTitle - Custom success toast title
 * @param {string} options.errorTitle - Custom error toast title
 * @returns {Function} Async function that handles submission
 */
export const createSubmitHandler = (
  apiCall,
  {
    onSuccess = () => {},
    onError = () => {},
    onFinally = () => {},
    showSuccessToast = true,
    showErrorToast = true,
    successTitle = 'Success',
    errorTitle = 'Error',
  } = {}
) => {
  return async (...args) => {
    try {
      const response = await apiCall(...args);

      handleApiResponse(response, {
        onSuccess,
        onError,
        showSuccessToast,
        showErrorToast,
        successTitle,
        errorTitle,
      });

      return response;
    } catch (error) {
      if (showErrorToast) {
        errorToast(errorTitle, 'An unexpected error occurred');
      }
      onError(error);
      return { error };
    } finally {
      onFinally();
    }
  };
};
