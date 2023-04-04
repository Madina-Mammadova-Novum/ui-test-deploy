import { NO_DATA_MESSAGE } from '@/lib/constants';
import { transformDate } from '@/utils/date';

export const fleetsHeaderDataAdapter = ({ data }) => {
  if (data === null) return null;

  const { title, activeTankers, inActiveTankers } = data;

  return [
    {
      label: 'fleet name',
      text: title ?? '',
    },
    {
      label: 'active',
      text: `${activeTankers ?? '0'} tankers`,
    },
    {
      label: 'inactive',
      text: `${inActiveTankers ?? '0'} tankers`,
    },
  ];
};

export const fleetsRowDataAdapter = ({ data }) => {
  if (data === null) return null;

  const { date, id, imo, port, status, title } = data;

  return {
    id,
    imo: imo ?? NO_DATA_MESSAGE.IMO,
    port: port ?? NO_DATA_MESSAGE.PORT,
    tankerName: title ?? NO_DATA_MESSAGE.DEFAULT,
    tankerStatus: status ?? false,
    date: date ? transformDate(date, 'MMM dd, yyyy') : NO_DATA_MESSAGE.DATE,
  };
};

export const fleetsRowsDataAdapter = ({ data }) => {
  if (data === null || data === undefined) return [];

  return data.map((rowData) => fleetsRowDataAdapter({ data: rowData }));
};

export const tableRowsAdapter = ({ data, index }) => {
  if (data === null || data === undefined) return [];

  const { tankerName, imo, port, tankerStatus, date, id } = data;

  return [
    {
      text: index,
      disabled: port === NO_DATA_MESSAGE.PORT || date === NO_DATA_MESSAGE.DATE,
    },
    {
      id,
      text: tankerName,
      semibold: true,
      editable: false,
      disabled: port === NO_DATA_MESSAGE.PORT || date === NO_DATA_MESSAGE.DATE,
    },
    {
      id,
      text: imo,
      editable: false,
      disabled: port === NO_DATA_MESSAGE.PORT || date === NO_DATA_MESSAGE.DATE,
    },
    {
      id,
      text: port,
      editable: port !== NO_DATA_MESSAGE.PORT,
      disabled: port === NO_DATA_MESSAGE.PORT || date === NO_DATA_MESSAGE.DATE,
    },
    {
      id,
      text: date,
      editable: date !== NO_DATA_MESSAGE.DATE,
      disabled: port === NO_DATA_MESSAGE.PORT || date === NO_DATA_MESSAGE.DATE,
    },
    {
      id,
      toggle: {
        value: tankerStatus,
      },
      disabled: port === NO_DATA_MESSAGE.PORT || date === NO_DATA_MESSAGE.DATE,
    },
  ];
};
