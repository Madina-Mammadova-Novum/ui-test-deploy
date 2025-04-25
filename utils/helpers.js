/* eslint-disable no-param-reassign */
/* eslint-disable no-nested-ternary */
import { HttpTransportType } from '@microsoft/signalr';
import { addDays } from 'date-fns';
import parse from 'html-react-parser';
import cookie from 'js-cookie';
import dynamic from 'next/dynamic';

import { transformDate } from './date';

import { dropDownOptionsAdapter } from '@/adapters/countryOption';
import { decodedTokenAdapter, userRoleAdapter } from '@/adapters/user';
import { ERROR_MESSAGE, REGEX, RESPONSE_MESSAGES, ROLES, ROUTES, SORT_OPTIONS } from '@/lib/constants';

/**
 * createMarkup
 * @param content
 * @returns {{__html}}
 */
export function createMarkup(content) {
  return { __html: content };
}

/**
 * toCamelCase
 * @param str
 * @returns {string}
 */
export function toCamelCase(str) {
  let newStr = '';
  if (str) {
    const wordArr = str.split(/[-_]/g);
    wordArr.forEach((word, index) => {
      if (index === 0) {
        newStr += word.toLowerCase();
      } else {
        newStr += word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
      }
    });
  }
  return newStr;
}

/**
 * createPathOptions
 * @param data
 * @param type
 * @returns {*}
 */
export function createPathOptions(data, type) {
  if (data === null) return [];
  const { data: items } = data;
  return items.map((item) => {
    const { slug, locale } = item;
    return {
      path: `${type}/${slug}`,
      locale,
    };
  });
}

/**
 * checkIfKeyExist
 * @param objectName
 * @param keyName
 * @returns {boolean}
 */
export function checkIfKeyExist(objectName, keyName) {
  return Object.keys(objectName).some((key) => key === keyName);
}

/**
 * createsUniqueId
 * @returns {string}
 */

export function makeId() {
  let text = '';
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (let i = 0; i < 10; i += 1) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}

export function getHighlightedInput(text, userInput) {
  if (text.match(userInput.charAt(0).toUpperCase() + userInput.slice(1))) {
    return text.replaceAll(
      userInput.charAt(0).toUpperCase() + userInput.slice(1),
      `<b>${userInput.charAt(0).toUpperCase() + userInput.slice(1)}</b>`
    );
  }
  return text
    .replaceAll(userInput.toLowerCase(), `<b>${userInput.toLowerCase()}</b>`)
    .replaceAll(userInput.toUpperCase(), `<b>${userInput.toUpperCase()}</b>`);
}

export function propIsComponent(prop) {
  return typeof prop === 'function' && String(prop).includes('.createElement');
}

export function isMainPage(pageContext) {
  const { slug, localizations } = pageContext;
  return [slug, localizations?.data[0]?.attributes?.slug].includes('main');
}

export function getProportion(constParam, itemParam) {
  return constParam / itemParam;
}

export function uniqueArray(arrayOfObject) {
  return arrayOfObject.filter((value, index) => {
    const itemValue = JSON.stringify(value);
    return (
      index ===
      arrayOfObject.findIndex((obj) => {
        return JSON.stringify(obj) === itemValue;
      })
    );
  });
}

export function getNumbersFromString(str) {
  return str.replace(/\D/g, '');
}

/**
 * Getting middle element of the array
 *
 * @param {Array} array
 * @returns {Array|number}
 */
export function getMiddleElementFromArray(array) {
  const { length } = array;

  if (length === 0) {
    return [48.3794, 31.1656];
  }

  const middleIndex = Math.floor(length / 2);

  const expectedIndex = length % 2 === 0 ? middleIndex - 1 : middleIndex;

  return array[expectedIndex];
}

export function cutStringToLimitation(str, limit) {
  if (str.length < limit) return str;
  return `${str.slice(0, limit)} ...`;
}

export function getCurrentYear() {
  const date = new Date();
  const year = date.getFullYear();
  return year;
}

export function noSSR(Component) {
  return dynamic(() => Promise.resolve(Component), { ssr: false });
}

export const updateFormats = (data = []) => {
  return data
    .map((format) => format)
    .join(', ')
    .replaceAll('.', '');
};

export function hasNestedArrays(data) {
  const isNested = data.every((val) => Array.isArray(val));

  return isNested;
}

export function getFilledArray(length = 1) {
  return Array.from({ length: length || 1 }).map((_, index) => index + 1);
}

export function getValueWithPath(object, path, defaultValue) {
  return (
    path
      // eslint-disable-next-line no-useless-escape
      .replace(/[\[\]]/g, '.')
      .replace(/['"]/g, '')
      .split('.')
      .filter((key) => key)
      .reduce((o, p) => (o ? o[p] : defaultValue), object)
  );
}

export function checkObjectValues({ data }) {
  const isNotNullOrUndefined = Object.keys(data).every((key) => data[key] !== null && data[key] !== undefined);

  if (!isNotNullOrUndefined) {
    return { message: `Error: One or more values not founded.` };
  }

  return { data };
}

export function formatDate(dateString) {
  const date = new Date(dateString);
  const optionsDate = { year: 'numeric', month: 'long', day: 'numeric' };
  const formatter = new Intl.DateTimeFormat('en-US', optionsDate);
  return formatter.format(date);
}

export const disableDefaultBehavior = (e) => e.preventDefault();

export const getButtonClassNames = (variant, size) => {
  // todo: need to connect constants for variants and sizes values
  if (size === 'large') {
    if (variant === 'primary') return 'bg-blue text-white h-10 px-5 py-2.5 rounded-md hover:bg-blue-darker';
    if (variant === 'secondary') return 'bg-black text-white h-10 px-5 py-2.5 rounded-md hover:bg-blue-dark';
    if (variant === 'tertiary')
      return 'bg-white text-black h-10 px-5 py-2.5 rounded-md border border-gray hover:border-black';
    if (variant === 'delete')
      return 'bg-white text-red h-10 px-5 py-2.5 rounded-md border border-red-medium hover:border-red';
  }
  if (size === 'medium') {
    if (variant === 'primary')
      return 'bg-white px-2.5 py-1 h-7 text-blue rounded-md border border-blue hover:border-blue-darker hover:text-blue-darker';
    if (variant === 'secondary')
      return 'bg-white px-2.5 py-1 h-7 text-black rounded-md border border-gray hover:border-black';
    if (variant === 'tertiary')
      return 'bg-white text-black h-7 px-2.5 rounded-md border border-gray hover:border-black';
    if (variant === 'delete')
      return 'bg-white px-2.5 py-1 text-red h-7 rounded-md border border-red-medium hover:border-red';
  }
  if (size === 'small') {
    if (variant === 'primary') return 'bg-transparent p-0 text-blue hover:text-blue-darker';
    if (variant === 'secondary') return 'bg-transparent p-0 text-black hover:text-blue-darker';
    if (variant === 'delete') return 'text-red';
  }
  return null;
};

export const disablePlusMinusSymbols = (e) => {
  const clipboardPasteKey = e.ctrlKey && e.key === 'v';

  const disabledKeyCodes =
    e.keyCode === 38 ||
    e.keyCode === 40 ||
    e.keyCode === 69 ||
    e.keyCode === 107 ||
    e.keyCode === 109 ||
    e.keyCode === 187 ||
    e.keyCode === 189;

  if (disabledKeyCodes || clipboardPasteKey) disableDefaultBehavior(e);
};

export function options(values) {
  return values?.map((value) => ({ label: value, value }));
}

export const countriesOptions = (data) => {
  if (!data) return [];

  return dropDownOptionsAdapter({ data });
};

export const convertDataToOptions = ({ data }, keyValue, keyLabel) => {
  if (!data?.length) return [];

  return data
    .filter(({ [keyValue]: value, [keyLabel]: label }) => value && label)
    .map(({ [keyValue]: value, [keyLabel]: label }) => {
      return { value, label };
    });
};

export const convertPayloadToOptions = (data, keyValue, keyLabel) => {
  if (!data?.length) return [];

  return data
    .filter(({ [keyValue]: value, [keyLabel]: label }) => value && label)
    .map(({ [keyValue]: value, [keyLabel]: label }) => {
      return { value, label };
    });
};

export const removeByIndex = (data, index) => {
  if (data === null || data === undefined) return null;
  return data.filter((_, idx) => {
    return idx !== index;
  });
};

export const filterDataByLowerCase = (inputValue, data = []) => {
  return data?.filter((i) => i.label.toLowerCase().includes(inputValue.toLowerCase()));
};

export const resetObjectFields = ({ initialObject, resetType = null }) => {
  if (!initialObject || typeof initialObject !== 'object') return initialObject;

  const result = { ...initialObject };
  Object.keys(result).forEach((key) => {
    if (result[key] === null || result[key] === undefined) {
      return;
    }

    // Special handling for products array
    if (key === 'products' && Array.isArray(result[key])) {
      result[key] = result[key].map((item) => resetObjectFields({ initialObject: item, resetType }));
    }
    // Special handling for additional discharge form fields sanctionedCountries and excludedCountries
    else if (['sanctionedCountries', 'excludedCountries'].includes(key)) {
      result[key] = [];
    }
    // Special handling for additional discharge form fields additionalDischargeOptions
    else if (key === 'additionalDischargeOptions') {
      result[key] = {};
    }
    // Special handling for additional discharge form fields excludeInternationallySanctioned
    else if (['excludeInternationallySanctioned', 'showAdditionalDischarge'].includes(key)) {
      result[key] = false;
    }
    // For all other fields that are objects or arrays, just set to null
    else if (typeof result[key] === 'object') {
      result[key] = null;
    }
    // For primitive values
    else {
      result[key] = resetType;
    }
  });

  return result;
};

export const resetForm = (methods, type) => {
  if (!methods) return;

  const formValues = methods.getValues();
  const resetValues = resetObjectFields({ initialObject: formValues, resetType: type });

  // Reset the form with the cleaned values
  methods.reset(resetValues);
};

export const sleep = (ms) => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
};

export const isEmpty = (value) => {
  if (value === undefined || value === null) return true;
  if (Array.isArray(value) && value.length === 0) return true;
  return typeof value === 'object' && Object.keys(value).length === 0;
};

export const transformInvalidLoginMessage = (msg) => {
  return msg
    ?.split('_')
    .map((word, index) => {
      if (index === 0) {
        return word;
      }
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(' ');
};

export const isEmptyChildren = (children) => (Array.isArray(children) ? children.every((child) => child) : !!children);
export const isDocument = (value) => value === 'doc';

export const checkEmailPrefix = (email) => {
  if (!email) return false;

  const regExpCase = /\S+@\S+\.\S+/;

  return regExpCase.test(email);
};

export const checkPhoneValue = (value) => {
  if (!value) {
    return true;
  }

  const regex = REGEX.PHONE;
  return regex.test(value);
};

export const checkAuthRoute = (req, pathName) => {
  return req.nextUrl.pathname.includes(pathName);
};

export const formatErrors = (errors) => {
  if (!errors) return ERROR_MESSAGE;

  // eslint-disable-next-line no-unused-vars
  return Object.entries(errors).map(([key, value]) => {
    return `${value}`;
  })[0];
};

export const formattedPhoneNumber = (phone) => {
  if (typeof phone !== 'undefined' || phone !== '') return phone?.replace('+', '');
  return null;
};

export const ensurePlusPrefix = (phone) => {
  if (!phone) return '';
  return phone.startsWith('+') ? phone : `+${phone}`;
};

export const sortByType = (a, b, ascSort) => {
  const sortOrder = ascSort ? 1 : -1;
  const aType = a.type === SORT_OPTIONS.asc ? 1 : a.type === SORT_OPTIONS.dsc ? -1 : 0;
  const bType = b.type === SORT_OPTIONS.asc ? 1 : b.type === SORT_OPTIONS.dsc ? -1 : 0;
  return sortOrder * (aType - bType);
};

export const imoFormatter = (str) => str?.replace(/IMO/g, '');

export const isIdExist = ({ data }) => {
  if (!data) return false;

  return data.map(({ value }) => !!value);
};

export const findValueById = ({ data, id }) => {
  if (!data) return [];

  const result = data.find((obj) => obj.value === id);

  return [result];
};

export const getUserType = (isCharterer, isOwner) => {
  if (isCharterer) return 'Charterer';
  if (isOwner) return 'Owner';
  return '';
};

export const getRoleIdentity = ({ role }) => {
  if (!role) return '';

  return {
    isOwner: role === ROLES.OWNER,
    isCharterer: role === ROLES.CHARTERER,
    isAnon: role === ROLES.ANON,
  };
};

export const generateRedirectPath = ({ role }) => {
  if (!role) return { path: window.location.href };

  const { isOwner } = getRoleIdentity({ role });

  if (isOwner) {
    return { path: ROUTES.ACCOUNT_POSITIONS };
  }

  return { path: ROUTES.ACCOUNT_SEARCH };
};

export const calculateIntDigit = (digit, coefficient) => +(digit * coefficient).toFixed(0);

export const calculateTotal = (array, key) =>
  +array
    ?.filter((item) => item)
    ?.map(({ [key]: itemValue }) => itemValue)
    ?.reduce((a, b) => +a + +b);

export const extractTimeFromDate = (dateString, settings = { hour: 'numeric', minute: 'numeric', hour12: true }) =>
  new Date(dateString).toLocaleString('en-US', settings);

export const addLocalDateFlag = (dateString = '') => (dateString.endsWith('Z') ? dateString : `${dateString}Z`);

export const parseErrors = (errors) => parse(Object.values(errors).join('<br />'));

export const calculateAmountOfPages = (recordsTotal, recordsFiltered) => {
  return Math.ceil(recordsTotal / recordsFiltered);
};

export const extractTime = (string) => {
  const timePattern = /\d{2}:\d{2}/; // Matches the pattern HH:MM
  const match = string.match(timePattern);
  return match ? match[0] : null; // Return the matched time or null if no match found
};

export const setSkippedValue = (pageValue, perPageValue) => {
  if (pageValue === 1) return 0;
  return (pageValue - 1) * perPageValue;
};

export const transformToCapitalize = (str = '') => {
  return str
    ?.split(' ')
    .map((word) => word[0]?.toUpperCase() + word.substring(1))
    .join(' ');
};

export const generateMessageByActionType = ({ action }) => RESPONSE_MESSAGES[action];

export const getCountryById = ({ id, data = [] }) => {
  return data?.find((country) => country.countryId === id);
};

export const sortFromCurrentToPast = (a, b) => new Date(b?.createdAt) - new Date(a?.createdAt);
export const sortFromPastToToday = (a, b) => new Date(a?.createdAt) - new Date(b?.createdAt);

export const formattedBySpaces = ({ string }) => {
  if (!string) return '';

  return string.replace(/([a-z])([A-Z])/g, '$1 $2');
};

export const getFormattedDays = () => {
  const today = new Date().toISOString().split('T')[0];
  const yesterdayDate = new Date();
  yesterdayDate.setDate(yesterdayDate.getDate() - 1);

  const yesterday = yesterdayDate.toISOString().split('T')[0];

  return { today, yesterday };
};

export const getLocode = (locode) => {
  if (!locode) return null;

  return locode.slice(0, 2).toLowerCase();
};

export const getListOfDataByDays = (data) => {
  const { today, yesterday } = getFormattedDays();

  return Object.entries(data).map(([key, value]) => {
    if (key === today) key = 'Today';
    else if (key === yesterday) key = 'Yesterday';
    else key = transformDate(key, 'MMM dd, yyyy');

    return { title: key, data: value };
  });
};

export const calculateCountdown = (expiresAt, frozenAt) => {
  const currentUTCtime = Date.now();

  let millisecondsUntilExpiration = 0;
  if (frozenAt) {
    millisecondsUntilExpiration = new Date(expiresAt).getTime() - new Date(frozenAt).getTime();
  } else {
    millisecondsUntilExpiration = new Date(expiresAt).getTime() - currentUTCtime;
  }

  return millisecondsUntilExpiration < 0 ? Date.now() : Date.now() + millisecondsUntilExpiration;
};

export const formattedTabValue = (value) => value?.split(' ')[0]?.toLowerCase();
export const isReadValue = (value) => value === 'read';

export const sortTable = (array, index, sortDirection, sortType = 'numeric') => {
  const isNumericType = sortType === 'numeric';
  const transformValue = (value) => (isNumericType ? +value.match(/\d+/)[0] : value.toLowerCase());

  if (sortDirection === 'asc') {
    const ascSorted = array.sort((a, b) => {
      if (transformValue(a.data[index].value) > transformValue(b.data[index].value)) return 1;
      if (transformValue(a.data[index].value) < transformValue(b.data[index].value)) return -1;
      return 0;
    });
    return ascSorted;
  }
  const descSorted = array.sort((a, b) => {
    if (transformValue(a.data[index].value) > transformValue(b.data[index].value)) return -1;
    if (transformValue(a.data[index].value) < transformValue(b.data[index].value)) return 1;
    return 0;
  });
  return descSorted;
};

export const getSocketConnectionsParams = (token) => {
  return {
    accessTokenFactory: () => `${token}`,
    skipNegotiation: true,
    transport: HttpTransportType.WebSockets,
  };
};

export const clientIdentification = ({ senderId, clientId, role }) => {
  return senderId === clientId ? role : ROLES.BROKER;
};

export const getAppropriateFailedBy = ({ failedBy, role }) => {
  let failedByText = failedBy;
  if (ROLES[String(failedBy).toUpperCase()]) {
    failedByText = role === failedBy.toLowerCase() ? 'Me' : 'Counterparty';
  }
  return failedByText;
};

export const getFileUrl = ({ url }) => {
  const token = getCookieFromBrowser('session-access-token');

  return {
    url,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export const handleFileView = async (url) => {
  try {
    const { url: fileUrl, headers } = getFileUrl({ url });
    const response = await fetch(fileUrl, { headers });
    const blob = await response.blob();
    const objectUrl = URL.createObjectURL(blob);
    window.open(objectUrl, '_blank');
    URL.revokeObjectURL(objectUrl);
  } catch (error) {
    console.error('Error viewing file:', error);
  }
};

export const handleViewDocument = async (url) => {
  if (!url) return;
  let pdfBlobUrl;

  try {
    const fileApiUrl = `${process.env.NEXT_PUBLIC_FILE_API_URL}/v1/file/get/${url}`;
    const { url: requestUrl, headers } = getFileUrl({ url: fileApiUrl });

    const response = await fetch(requestUrl, { headers });

    if (!response.ok) {
      throw new Error(`Download failed with status: ${response.status}`);
    }

    // Create blob and open in new tab
    const blob = await response.blob();
    pdfBlobUrl = URL.createObjectURL(blob);
    window.open(pdfBlobUrl, '_blank');
  } catch (error) {
    console.error('View Error:', error.message);
    throw error;
  } finally {
    if (pdfBlobUrl) {
      URL.revokeObjectURL(pdfBlobUrl);
    }
  }
};

export const downloadFile = async ({ url, fileName }) => {
  try {
    // Extract file API URL to constants
    const fileApiUrl = `${process.env.NEXT_PUBLIC_FILE_API_URL}/v1/file/get/${url}`;

    // Get auth headers and configured URL
    const { url: requestUrl, headers } = getFileUrl({ url: fileApiUrl });

    const response = await fetch(requestUrl, {
      headers,
    });

    if (!response.ok) {
      throw new Error(`Download failed with status: ${response.status}`);
    }

    // Create blob and trigger download
    const blob = await response.blob();
    const downloadLink = document.createElement('a');
    downloadLink.href = URL.createObjectURL(blob);
    downloadLink.download = fileName;
    downloadLink.click();

    // Cleanup
    URL.revokeObjectURL(downloadLink.href);
    downloadLink.remove();
  } catch (error) {
    // Use standard error handling
    console.error('File download failed:', error);
    throw new Error(parseErrorMessage(error));
  }
};

export const transformBytes = ({ format = 'mb', value }) => {
  if (format === 'mb') return value / 1e6;
  return 0;
};

export const trimTonValue = (number) => {
  const strNumber = String(number);
  const numValue = parseFloat(number);

  // For large numbers (≥ 1000), convert to tons format without rounding
  if (numValue >= 1000) {
    const tonValue = (numValue / 1000).toString();
    // Remove any decimal part and add ,***
    return `${tonValue.split('.')[0]},***`;
  }

  // For numbers with decimal point, remove decimal
  if (strNumber.includes('.')) {
    return `${strNumber.split('.')[0]},***`;
  }

  // For numbers without decimal
  return `${strNumber},***`;
};

export const counterofferMinimumImprovementAchieved = ({ initialOffer, counterOffer }) => {
  const layTimeImprovement = initialOffer.layTime - counterOffer.layTime >= 6;
  const demurrageRateImprovement = initialOffer.demurrageRate * 1.05 <= counterOffer.demurrageRate;
  const freightImprovement = initialOffer.value * 1.05 <= counterOffer.value;
  const isMinimalImprovementMet = [layTimeImprovement, demurrageRateImprovement, freightImprovement].some(
    (value) => value
  );
  return isMinimalImprovementMet;
};

export const processTooltipData = ({ text, length }) => {
  return {
    disableTooltip: !(text?.length >= length),
    tooltipText: text,
    trimmedText: text?.length >= length ? `${text?.slice(0, length / 2)}...` : text,
  };
};

export const containsOnlyNumbers = (str) => /^\d+$/.test(str);

export function checkTankerStatus(date) {
  const openDate = new Date(date);
  const today = new Date();

  return today > openDate;
}

export const getLineCoordinate = ({ data }) => {
  if (!data) return [];

  const { fromPort, toPort } = data;

  if (fromPort === null || toPort === null) return [];

  return [fromPort.coordinates, toPort.coordinates];
};

export const formattedNumber = (value) => {
  if (value === null) return '';
  return value?.toFixed(2);
};

export const formattedDay = (number) => {
  if (number === null || number === undefined) return '';
  const hoursInADay = 24;
  const days = number / hoursInADay;
  return days.toFixed(2);
};

export const parseErrorMessage = (responseError = {}) => {
  try {
    const {
      message: { Errors },
      errors,
    } = responseError;
    const parsedErrorMessages = parse(Object.values({ ...Errors, errors }).join('<br />'));
    return parsedErrorMessages;
  } catch {
    return 'Something went wrong. Please, contact Ship.Link support for detailed information.';
  }
};

export const sortChatMessagesByDay = (array) =>
  array
    .map((day) => {
      day.data = day.data.sort((a, b) => {
        const timeA = new Date(a.time);
        const timeB = new Date(b.time);
        return timeA - timeB;
      });
      return day;
    })
    .sort((a, b) => {
      const customDates = {
        Today: new Date(),
        Yesterday: addDays(new Date(), -1),
      };

      const current = customDates[a.title] || a.title;
      const next = customDates[b.title] || b.title;
      if (new Date(current) - new Date(next) >= 1) return -1;
      if (new Date(current) - new Date(next) < 1) return 1;
      return 0;
    });

export const freightFormatter = ({ value, format }) => {
  const response = {
    Lumpsum: `${format} $${value}`,
    '$/mt': `${value} ${format}`,
    WS: `${format} ${value}`,
  };

  return response[format];
};

export function lowerCaseFormat(obj) {
  if (!obj || typeof obj !== 'object') {
    return obj;
  }

  return Object.keys(obj).reduce((newObj, key) => {
    const newKey = key.toLowerCase();
    newObj[newKey] = key === 'Errors' || key === 'errors' ? obj[key] : lowerCaseFormat(obj[key]);
    return newObj;
  }, {});
}

export const errorMessage = ({ errors }) => {
  if (errors?.message === 'Internal server error') {
    return {
      message: 'External server error',
    };
  }

  if (errors?.message === 'Bad Request') {
    return {
      message: 'Something went wrong. Please, contact Ship.Link support for detailed information.',
    };
  }

  return { message: formatErrors(errors?.errors) };
};

export const setCookie = (key, value) => {
  cookie.set(key, value, {
    path: '/',
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'Lax',
    expires: 1,
  });
};

export const removeCookie = (key) => {
  cookie.remove(key, {
    expires: 0,
  });
};

export const getCookieFromBrowser = (key) => {
  return cookie.get(key);
};

export const getCookieFromServer = (key, req) => {
  if (!req.headers.cookie) {
    return undefined;
  }

  const rawCookie = req.headers.cookie.split(';').find((c) => c.trim().startsWith(`${key}=`));

  if (!rawCookie) {
    return undefined;
  }

  return rawCookie.split('=')[1];
};

export const sessionCookieCleaner = () => {
  removeCookie('session-access-token');
  removeCookie('session-refresh-token');
  removeCookie('session-user-role');
  removeCookie('session-user-id');
  removeCookie('session-user-email');
};

export const sessionCookieData = (data) => {
  if (!data) throw new Error('Unauthorized');

  const { sub, role } = decodedTokenAdapter(data.access_token);

  setCookie('session-access-token', data.access_token);
  setCookie('session-refresh-token', data.refresh_token);
  setCookie('session-user-role', userRoleAdapter({ data: role }));
  setCookie('session-user-id', sub);
};

export const urlParser = (data) => {
  const match = data?.match(/tankerId%3D([A-Za-z0-9-_]*)/);

  if (match) {
    return match[1];
  }

  return data;
};

export const getIdFromUrl = (url) => {
  const idRegex = /[a-zA-Z0-9-_]{36}/;

  const match = idRegex.exec(url);

  return match ? match[0] : null;
};

export const stageFormatter = (stage) => {
  const stageToPage = {
    Fleets: ROUTES.ACCOUNT_POSITIONS,
    Negotiating: ROUTES.ACCOUNT_NEGOTIATING,
    Pre_Fixture: ROUTES.ACCOUNT_PREFIXTURE,
    On_Subs: ROUTES.ACCOUNT_ONSUBS,
    Fixture: ROUTES.ACCOUNT_FIXTURE,
    Post_Fixture: ROUTES.ACCOUNT_POSTFIXTURE,
  };

  return stageToPage[stage];
};

const urlStatusFormatter = ({ isFailed }) => {
  if (isFailed) return 'failed';

  return 'incoming';
};

const urlStatusFormatterForPreFixture = ({ data }) => {
  if (data?.proposedBaseCharterParty || data?.charterPartyOptions) return '&status=charter-party';

  return '';
};

export const notificationPathGenerator = ({ data, role }) => {
  if (!data?.stage) return null;

  const { isOwner } = getRoleIdentity({ role });
  const initialPath = stageFormatter(data.stage);
  const statusTab = urlStatusFormatter({ isFailed: data.isFailed });
  const preFixtureTab = urlStatusFormatterForPreFixture({ data });

  const routeByStage = {
    Negotiating: `${initialPath}/${isOwner ? data?.vessel?.id : data?.searchedCargo?.id}?fleetId=${
      data.id
    }&status=${statusTab}`,
    Pre_Fixture: `${initialPath}/${data?.searchedCargo?.id}?code=${data?.searchedCargo?.code}${preFixtureTab}`,
    On_Subs: `${initialPath}/${data?.searchedCargo?.id}?code=${data?.searchedCargo?.code}`,
    Fixture: `${initialPath}/${data?.searchedCargo?.id}?code=${data?.searchedCargo?.code}`,
    Post_Fixture: `${initialPath}/${data?.searchedCargo?.id}?code=${data?.searchedCargo?.code}`,
  };

  return routeByStage[data.stage];
};

export const getOfferTotalMinQuantity = ({ data }) => {
  if (!data) return null;

  return data.map(({ quantity }) => +quantity).reduce((a, b) => a + b);
};

export const getFieldFromKey = (key) => {
  const errorByKey = {
    Email: 'email',
    Phone: 'phone',
    SecondaryPhone: 'secondaryPhone',
  };

  return errorByKey[key];
};

export const getBrowser = (environment) => {
  if (environment.indexOf('Firefox') !== -1) {
    return 'firefox';
  }
  if (environment.indexOf('Chrome') !== -1) {
    return 'chrome';
  }
  if (environment.indexOf('Safari') !== -1) {
    return 'safari';
  }
  if (environment.indexOf('MSIE') !== -1 || environment.indexOf('Trident/') !== -1) {
    return 'internet explorer';
  }
  return 'unknown';
};

/**
 * Ensures a filename has the correct extension
 * @param {string} fileName - The name of the file
 * @param {string} extension - The desired extension (with or without dot)
 * @returns {string} Filename with proper extension
 */
export const ensureFileExtension = (fileName, extension) => {
  // Normalize the extension to include the dot
  const normalizedExtension = extension.startsWith('.') ? extension : `.${extension}`;

  // Get the base name without any extensions
  const lastDotIndex = fileName.lastIndexOf('.');
  const baseName = lastDotIndex === -1 ? fileName : fileName.slice(0, lastDotIndex);

  // Return the base name with the new extension
  return `${baseName}${normalizedExtension}`;
};

export const fixLongitudeWrapping = (coordinates) => {
  if (!coordinates || coordinates.length < 2) return coordinates;

  const result = [];
  let previousLon = coordinates[0][1];
  let offset = 0;

  coordinates.forEach((coord) => {
    const [lat, lon] = coord;
    const diff = lon - previousLon;

    // If there's a large jump in longitude (crossing meridian)
    if (Math.abs(diff) > 180) {
      // If moving from negative to positive (e.g., -179 to 179)
      if (diff > 0) {
        offset -= 360;
      }
      // If moving from positive to negative (e.g., 179 to -179)
      else {
        offset += 360;
      }
    }

    result.push([lat, lon + offset]);
    previousLon = lon;
  });

  return result;
};

export const formatStageText = (stage) => {
  if (!stage) return '';
  return stage.replace(/_/g, ' ');
};

/**
 * @util convertToKilotons
 * @description Formats tonnage values to kilotons (kt) with one decimal place
 * @param {number|string} tons - Weight value
 * @returns {string} Weight formatted with kt unit
 * @example convertToKilotons(45) // returns "45.0 kt"
 */
export const convertToKilotons = (tons) => {
  if (!tons) return '0.0 kt';

  // Convert to number if it's a string
  const numericValue = typeof tons === 'string' ? parseFloat(tons.replace(/,/g, '')) : tons;

  // Check if it's a valid number
  if (Number.isNaN(numericValue)) return '0.0 kt';

  // Format to 1 decimal place
  const formattedValue = numericValue.toFixed(1);

  return `${formattedValue} kt`;
};
