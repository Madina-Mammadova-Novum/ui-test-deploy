import { format, parseISO } from 'date-fns';

// import { CUSTOM_FORMAT_DATE } from '@/lib/constants';

export const isValidDate = (date) => new Date(date).toString() !== 'Invalid Date' && !Number.isNaN(new Date(date));

export const transformDateToString = ({ dayOfStart, dayOfEnd, startMonth, endMonth, startYear, endYear }) => {
  if (dayOfStart === dayOfEnd && startMonth === endMonth && startYear === endYear) {
    return `${dayOfStart} ${startMonth} ${startYear}`;
  }

  if (startYear !== endYear) {
    return `${dayOfStart} ${startMonth} ${startYear} - ${dayOfEnd} ${endMonth} ${endYear}`;
  }

  if (startMonth === endMonth && startYear === endYear) {
    return `${dayOfStart} - ${dayOfEnd} ${startMonth} ${startYear}`;
  }

  if (startMonth !== endMonth && startYear === endYear) {
    return `${dayOfStart} ${startMonth} - ${dayOfEnd} ${endMonth} ${endYear}`;
  }

  return `${dayOfStart} ${startMonth} ${startYear}`;
};

/**
 * Helper to make date range
 * @param {string} dateStart Date Start
 * @param {string} dateEnd Date End
 * @returns Date with a specific format
 */
// export function getDateRange(dateStart, dateEnd) {
//   if (!dateStart || !isValidDate(dateStart)) {
//     return null;
//   }
//
//   let dateS = new Date(dateStart);
//   let dateE = isValidDate(dateEnd) ? new Date(dateEnd) : null;
//
//   if (dateE && !isAfter(dateE, dateS)) {
//     dateS = new Date(dateEnd);
//     dateE = new Date(dateStart);
//   }
//
//   const result = {
//     dayOfStart: format(dateS, CUSTOM_FORMAT_DATE.DAY),
//     dayOfEnd: dateE ? format(dateE, CUSTOM_FORMAT_DATE.DAY) : '',
//     startMonth: format(dateS, CUSTOM_FORMAT_DATE.MONTH),
//     endMonth: dateE ? format(dateE, CUSTOM_FORMAT_DATE.MONTH) : '',
//     startYear: format(dateS, CUSTOM_FORMAT_DATE.YEAR),
//     endYear: dateE ? format(dateE, CUSTOM_FORMAT_DATE.YEAR) : '',
//   };
//
//   return transformDateToString(result);
// }

export function transformDate(dateString, dateFormat = 'yyyy-MM-dd') {
  const date = isValidDate(parseISO(dateString)) ? parseISO(dateString) : parseISO(new Date(dateString).toISOString());

  if (isValidDate(date)) {
    return format(date, dateFormat);
  }
  console.error('0005 - Not valid date');
  return null;
}
