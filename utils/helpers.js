import dynamic from 'next/dynamic';

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
  return Array.from({ length });
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
