import dynamic from 'next/dynamic';

import { countryOptionsAdapter } from '@/adapters/countryOption';

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
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  const formatter = new Intl.DateTimeFormat('en-US', options);
  return formatter.format(date);
}

export const disableDefaultBehaviour = (e) => e.preventDefault();

export const getButtonClassNames = (variant, size) => {
  // todo: need to connect constants for variants and sizes values
  if (size === 'large') {
    if (variant === 'primary') return 'bg-blue text-white h-10 px-5 py-2.5 hover:bg-blue-darker';
    if (variant === 'secondary') return 'bg-black text-white h-10 px-5 py-2.5 hover:bg-blue-dark';
    if (variant === 'tertiary') return 'bg-white text-black h-10 px-5 py-2.5 border border-gray hover:border-black';
    if (variant === 'delete') return 'bg-white text-red h-10 px-5 py-2.5 border border-red-medium hover:border-red';
  }
  if (size === 'medium') {
    if (variant === 'primary')
      return 'bg-white px-2.5 py-1 h-7 text-blue rounded-md border border-blue hover:border-blue-darker hover:text-blue-darker';
    if (variant === 'secondary')
      return 'bg-white px-2.5 py-1 h-7 text-black rounded-md border border-gray hover:border-black';
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

export const options = (values) => values?.map((value) => ({ label: value, value }));

export const countriesOptions = (data) => countryOptionsAdapter(data);

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

  return data.filter((_, idx) => idx !== index);
};

export const filterDataByLowerCase = (inputValue, data) => {
  return data.filter((i) => i.label.toLowerCase().includes(inputValue.toLowerCase()));
};

export const resetObjectFields = (initialObject, resetType = null) => {
  Object.keys(initialObject).forEach((key) => {
    if (Array.isArray(initialObject[key])) {
      initialObject[key].map((arrayItem) => resetObjectFields(arrayItem));
    } else {
      initialObject[key] = resetType;
    }
  });
};

export const resetForm = (methods) => {
  methods.reset((formValues) => {
    resetObjectFields(formValues);
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
