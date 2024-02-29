import { convertDate, transformDate } from '@/utils/date';
import { addLocalDateFlag, extractTimeFromDate, getListOfDataByDays, sortFromCurrentToPast } from '@/utils/helpers';

export const notificationsResponseAdapter = (data) => {
  if (!data) return [];

  return data;
};

export const notificationAdapter = (data) => {
  if (!data) return {};

  return {
    id: data?.id,
    date: transformDate(addLocalDateFlag(data?.createdAt), 'MMM dd, yyyy'),
    time: extractTimeFromDate(addLocalDateFlag(data?.createdAt)),
    watched: data?.isOpened,
    title: data?.title,
    description: data?.description,
    topic: data?.origin,
    url: data?.url,
  };
};

export const notificationsDataAdapter = ({ data }) => {
  if (!data) return [];

  const sortedArray = data?.map((el) => el).sort(sortFromCurrentToPast);

  const notificationsByDate = sortedArray.reduce((acc, currentValue) => {
    const date = convertDate(currentValue?.createdAt);

    acc[date] = [...(acc[date] ?? []), notificationAdapter(currentValue)];

    return acc;
  }, {});

  return getListOfDataByDays(notificationsByDate);
};

export const notificationParamsAdapter = ({ data }) => {
  if (!data) return null;

  return {
    skip: data?.skip ?? 0,
    take: data?.take ?? 20,
    query: data.searchValue,
    isOpened: data?.watched ?? false,
    origin: data.sortedValue === 'all' ? null : data.sortedValue,
  };
};
