/**
 * Common adapter utilities for handling null/undefined data
 */

/**
 * Returns an empty array if data is null/undefined, otherwise returns the data
 * @param {*} data - The data to check
 * @returns {Array} - The original data or an empty array
 */
export const arrayAdapter = (data) => {
  if (!data) return [];
  return data;
};

/**
 * Returns an empty object if data is null/undefined, otherwise returns the data
 * @param {*} data - The data to check
 * @returns {Object} - The original data or an empty object
 */
export const objectAdapter = (data) => {
  if (!data) return {};
  return data;
};

/**
 * Returns null if data is null/undefined, otherwise returns the data
 * @param {*} data - The data to check
 * @returns {*} - The original data or null
 */
export const nullAdapter = (data) => {
  if (!data) return null;
  return data;
};

/**
 * Returns the data wrapped in an object with a data property if it's not already in that format
 * Returns null wrapped in a data property if data is null/undefined
 * @param {*} data - The data to check
 * @returns {Object} - Object with data property
 */
export const dataObjectAdapter = (data) => {
  if (!data) return { data: null };
  if (Object.prototype.hasOwnProperty.call(data, 'data')) {
    return data;
  }
  return { data };
};
