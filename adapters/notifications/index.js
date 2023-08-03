/* eslint-disable no-param-reassign */
import { convertDate, transformDate, transformTime } from '@/utils/date';
import { getFormattedDays, makeId, sortFromCurrentToPast } from '@/utils/helpers';

export const notificationsResponseAdapter = (data) => {
  if (!data) return [];

  return data;
};

export const notificationAdapter = (data) => {
  if (!data) return {};

  return {
    id: data?.id,
    date: transformDate(data?.createdAt, 'MMM dd, yyyy'),
    time: transformTime(data?.createdAt),
    watched: data?.isOpened,
    title: data?.title,
    description: data?.description,
    topic: data?.origin,
    url: data?.url,
  };
};

const formattedNotificationsDataAdapter = (data) => {
  const { today, yesterday } = getFormattedDays();

  return Object.entries(data).map(([key, value]) => {
    if (key === today) key = 'today';
    else if (key === yesterday) key = 'yesterday';
    else key = transformDate(key, 'MMM dd, yyyy');

    return { id: makeId(), title: key, data: value };
  });
};

export const notificationsDataAdapter = ({ data }) => {
  if (!data) return [];

  const sortedArray = data?.map((el) => el).sort(sortFromCurrentToPast);

  const notificationsByDate = sortedArray.reduce((acc, currentValue) => {
    const date = convertDate(currentValue?.createdAt);

    acc[date] = [...(acc[date] ?? []), notificationAdapter(currentValue)];

    return acc;
  }, {});

  return formattedNotificationsDataAdapter(notificationsByDate);
};

export const notificationParamsAdapter = ({ data }) => {
  if (!data) return {};

  return {
    search: data?.searchValue,
    filteredBy: data?.sortedValue,
    watched: data?.watched,
    skip: data?.skip,
    take: data?.take,
  };
};
