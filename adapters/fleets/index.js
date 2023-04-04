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

  const inActive = port === null || date === null;

  return {
    id,
    imo: {
      value: imo ?? NO_DATA_MESSAGE.IMO,
      editable: false,
      disabled: inActive,
    },
    port: {
      value: port ?? NO_DATA_MESSAGE.PORT,
      editable: port !== null,
      disabled: inActive,
    },
    tankerName: {
      value: title ?? NO_DATA_MESSAGE.DEFAULT,
      editable: false,
      disabled: inActive,
    },
    tankerStatus: {
      value: status ?? false,
      editable: false,
      disabled: inActive,
    },
    date: {
      value: date ? transformDate(date, 'MMM dd, yyyy') : NO_DATA_MESSAGE.DATE,
      editable: date !== null,
      disabled: inActive,
    },
  };
};

export const fleetsRowsDataAdapter = ({ data }) => {
  if (data === null || data === undefined) return [];

  return data.map((rowData) => fleetsRowDataAdapter({ data: rowData }));
};

export const fleetTableCellAdapter = ({ data, index }) => {
  if (data === null || data === undefined) return [];

  const { tankerName, imo, port, tankerStatus, date, id } = data;

  return [
    {
      text: index,
      disabled: tankerName.disabled,
    },
    {
      id,
      text: tankerName.value,
      editable: tankerName.editable,
      disabled: tankerName.disabled,
      fontStyle: {
        semibold: true,
        color: 'black',
      },
    },
    {
      id,
      text: imo.value,
      editable: imo.editable,
      disabled: imo.disabled,
      fontStyle: {
        semibold: false,
        color: 'black',
      },
    },
    {
      id,
      name: tankerName.value,
      text: port.value,
      editable: port.editable,
      disabled: port.disabled,
      fontStyle: {
        semibold: false,
        color: 'black',
      },
    },
    {
      id,
      name: tankerName.value,
      text: date.value,
      editable: date.editable,
      disabled: date.disabled,
      fontStyle: {
        semibold: false,
        color: 'black',
      },
    },
    {
      id,
      toggle: {
        value: tankerStatus.value,
      },
      editable: tankerStatus.editable,
      disabled: tankerStatus.disabled,
      fontStyle: {
        semibold: false,
        color: 'black',
      },
    },
  ];
};
