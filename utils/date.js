import { format, parseISO } from 'date-fns';

const isValidDate = (date) => new Date(date).toString() !== 'Invalid Date' && !Number.isNaN(new Date(date));

export function transformDate(dateString, dateFormat = 'yyyy-MM-dd') {
  if (!dateString) return '';
  const date = isValidDate(parseISO(dateString)) ? parseISO(dateString) : parseISO(new Date(dateString).toISOString());

  if (isValidDate(date)) {
    return format(date, dateFormat);
  }
  console.error('0005 - Not valid date');
  return null;
}

export const convertDate = (date) => new Date(date)?.toISOString().slice(0, 10);
