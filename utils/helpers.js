/* eslint-disable no-param-reassign */
/* eslint-disable no-nested-ternary */
import { HttpTransportType } from '@microsoft/signalr';
import parse from 'html-react-parser';
import dynamic from 'next/dynamic';

import { transformDate } from './date';

import { countryOptionsAdapter } from '@/adapters/countryOption';
import { ACTIONS, REGEX, ROLES, SORT_OPTIONS, SYSTEM_ERROR } from '@/lib/constants';
import { providedEmails } from '@/utils/mock';

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

export function getHighlitedInput(text, userInput) {
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

export function getFilledArray(length) {
  return Array.from({ length }).map((_, index) => index + 1);
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

export const disableDefaultBehaviour = (e) => e.preventDefault();

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
    if (variant === 'primary') return 'bg-white p-0 text-blue hover:text-blue-darker';
    if (variant === 'secondary') return 'bg-white p-0 text-black hover:text-blue-darker';
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

  if (disabledKeyCodes || clipboardPasteKey) disableDefaultBehaviour(e);
};

export function options(values) {
  return values?.map((value) => ({ label: value, value }));
}

export const countriesOptions = (data) => {
  if (!data) return [];

  return countryOptionsAdapter({ data });
};

export const convertDataToOptions = ({ data }, keyValue, keyLabel) => {
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

export const filterDataByLowerCase = (inputValue, data) => {
  return data.filter((i) => i.label.toLowerCase().includes(inputValue.toLowerCase()));
};

export const resetObjectFields = (initialObject, resetType = null) => {
  if (typeof initialObject !== 'string') {
    Object.keys(initialObject).forEach((key) => {
      if (Array.isArray(initialObject[key])) {
        initialObject[key].map((arrayItem) => resetObjectFields(arrayItem));
      } else {
        initialObject[key] = resetType;
      }
    });
  }
  // eslint-disable-next-line no-return-assign, no-param-reassign
  return (initialObject = resetType);
};

export const resetForm = (methods, type) => {
  methods.reset((formValues) => {
    resetObjectFields(formValues, type);
    return formValues;
  });
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

export const checkEmailPrefix = (value) => {
  if (!value) return true;

  const emailParts = value?.split('@')[1];

  return !providedEmails.some((prefix) => emailParts?.startsWith(prefix));
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
  if (!errors) return [SYSTEM_ERROR];

  return Object.entries(errors).map(([key, value]) => {
    // eslint-disable-next-line no-param-reassign
    if (key === '_' || key === '') key = 'Exeption';
    return `${key}: ${value}`;
  })[0];
};

export const formattedPhoneNumber = (phone) => {
  if (typeof phone !== 'undefined' || phone !== '') return phone?.replace('+', '');
  return null;
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

export const getRoleIdentity = ({ role }) => {
  if (!role) return '';

  return {
    isOwner: role === ROLES.OWNER,
    isCharterer: role === ROLES.CHARTERER,
  };
};

export const calculateIntDigit = (digit, coefficient) => +(digit * coefficient).toFixed(0);

export const calculateTotal = (array, key) =>
  +array
    .filter((item) => item)
    .map(({ [key]: itemValue }) => itemValue)
    .reduce((a, b) => +a + +b);

export const extractTimeFromDate = (dateString, settings = { hour: 'numeric', minute: 'numeric', hour12: true }) =>
  new Date(dateString).toLocaleString('en-US', settings);

export const parseErrors = (errors) => parse(Object.values(errors).join('<br />'));

export const calculateAmountOfPages = (recordsTotal, recordsFiltered) => {
  return Math.ceil(recordsTotal / recordsFiltered);
};

export const extractTime = (string) => {
  const timePattern = /\d{2}:\d{2}/; // Matches the pattern HH:MM
  const match = string.match(timePattern);
  return match ? match[0] : null; // Return the matched time or null if no match found
};

export const setSkipedValue = (pageValue, perPageValue) => {
  if (pageValue === 1) return 0;
  return (pageValue - 1) * perPageValue;
};

export const transformToCapitalize = (str) => {
  return str
    .split(' ')
    .map((word) => word[0].toUpperCase() + word.substring(1))
    .join(' ');
};

export const generateMessageByActionType = ({ action, status }) => {
  if (status === 200) {
    switch (action) {
      case ACTIONS.DATE:
        return 'You have successfully changed the date';
      case ACTIONS.PORT:
        return 'You have successfully changed the port';
      case ACTIONS.TANKER_DEACTIVATE:
        return 'You have successfully deactivated the tanker';
      case ACTIONS.TANKER_REACTIVATE:
        return 'You have successfully reopened the port and select a date';
      default:
        return null;
    }
  }
  return null;
};

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

export const getListOfDataByDays = (data) => {
  const { today, yesterday } = getFormattedDays();

  return Object.entries(data).map(([key, value]) => {
    if (key === today) key = 'Today';
    else if (key === yesterday) key = 'Yesterday';
    else key = transformDate(key, 'MMM dd, yyyy');

    return { title: key, data: value };
  });
};

export const calculateCountdown = (expiresAt) => {
  const milisecondsInSecond = 1000;
  const milisecondsInMinute = 60 * milisecondsInSecond;
  const milisecondsInHour = 60 * milisecondsInMinute;
  const milisecondsInDay = 24 * milisecondsInHour;
  const currentUTCtime = Date.parse(new Date().toLocaleString('en', { hour12: false, timeZone: 'UTC' }));
  const milisecondsUntilExpiration = new Date(expiresAt).getTime() - currentUTCtime;
  const sign = milisecondsUntilExpiration < 0 ? '-' : '';
  const method = milisecondsUntilExpiration < 0 ? 'ceil' : 'floor';

  const days = Math.abs(Math[method](milisecondsUntilExpiration / milisecondsInDay));
  const hours = Math.abs(Math[method]((milisecondsUntilExpiration % milisecondsInDay) / milisecondsInHour));
  const minutes = Math.abs(
    Math[method](((milisecondsUntilExpiration % milisecondsInDay) % milisecondsInHour) / milisecondsInMinute)
  );

  return `${sign}${days ? `${days}d ` : ''}${hours ? `${hours}h ` : ''}${minutes ? `${minutes}m` : ''}`;
};

export const formattetTabValue = (value) => value?.split(' ')[0]?.toLowerCase();
export const isReadValue = (value) => value === 'read';

export const sortTable = (array, index, sortDirection, sortType = 'numeric') => {
  const isNumericType = sortType === 'numeric';
  const transformValue = (value) => (isNumericType ? +value.match(/\d+/)[0] : value.toLowerCase());

  if (sortDirection === 'asc') {
    const ascSorted = array.sort((a, b) => {
      if (transformValue(a[index].value) > transformValue(b[index].value)) return 1;
      if (transformValue(a[index].value) < transformValue(b[index].value)) return -1;
      return 0;
    });
    return ascSorted;
  }
  const descSorted = array.sort((a, b) => {
    if (transformValue(a[index].value) > transformValue(b[index].value)) return -1;
    if (transformValue(a[index].value) < transformValue(b[index].value)) return 1;
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

export const clientIdentification = ({ senderId, session }) => {
  return senderId === session?.userId ? session?.role : ROLES.BROKER;
};

export const getAppropriateFailedBy = ({ failedBy, role }) => {
  let failedByText = failedBy;
  if (ROLES[String(failedBy).toUpperCase()]) {
    failedByText = role === failedBy.toLowerCase() ? 'Me' : 'Counterparty';
  }
  return failedByText;
};

export const downloadFile = ({ url, fileName }) => {
  fetch(url)
    .then((response) => response.blob())
    .then((blob) => {
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = fileName;
      link.click();
    })
    .catch(console.error);
};

export const transformBytes = ({ format = 'mb', value }) => {
  if (format === 'mb') return value / 1e6;
  return 0;
};

export const trimTonValue = (number) =>
  String(number).length > 3
    ? `${String(number)
        .slice(0, String(number).length - 3)
        .replace('.', '')},***`
    : `${String(number).replace('.', '')},***`;
