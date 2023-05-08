import { NO_DATA_MESSAGE, TYPE } from '@/lib/constants';
import { transformDate } from '@/utils/date';

export const prefixtureHeaderDataAdapter = ({ data }) => {
  if (data === null) return null;

  const { cargoId, cargoType, quantity, loadPort, laycanStart, laycanEnd, creationDate, countdown } = data;

  return [
    {
      label: 'Cargo id',
      text: cargoId || '',
    },
    {
      label: 'Cargo type',
      text: cargoType || '',
    },
    {
      label: 'Quantity',
      text: quantity || '',
    },
    {
      label: 'Load port',
      text: loadPort || '',
    },
    {
      label: 'Laycan start',
      text: laycanStart || '',
    },
    {
      label: 'Laycan end',
      text: laycanEnd || '',
    },
    {
      label: 'Creation date',
      text: creationDate || '',
    },
    {
      label: 'Countdown',
      text: countdown || '',
    },
  ];
};

export const prefixtureRowDataAdapter = ({ data }) => {
  if (data === null) return null;
  const { id, dockId, title, comment, docName, extension, size, dateAdded } = data;

  return {
    id,
    dockId: {
      value: dockId ?? '-',
    },
    title: {
      value: title ?? '-',
    },
    comment: {
      value: comment ?? '-',
    },
    docName: {
      value: docName ?? '-',
    },
    extension: {
      value: extension ?? '-',
    },
    size: {
      value: size ?? '-',
    },
    dateAdded: {
      value: dateAdded ? transformDate(dateAdded, 'MMM dd, yyyy') : NO_DATA_MESSAGE.DATE,
    },
  };
};

export const prefixtureRowsDataAdapter = ({ data }) => {
  if (data === null || data === undefined) return [];

  return data.map((rowData) => prefixtureRowDataAdapter({ data: rowData }));
};

export const prefixtureTableCellAdapter = ({ data, index }) => {
  if (data === null || data === undefined) return [];

  const { id, dockId = {}, title = {}, comment = {}, docName = {}, extension = {}, size = {}, dateAdded = {} } = data;

  if (!dockId.value) return [];

  return [
    {
      value: dockId.value ? index : null,
    },
    {
      id,
      value: dockId.value,
      type: TYPE.TANKER_NAME,
    },
    {
      id,
      value: title.value,
      type: TYPE.IMO,
    },
    {
      id,
      type: TYPE.PORT,
      value: comment.value || '---',
    },
    {
      id,
      type: TYPE.DATE,
      value: docName.value,
    },
    {
      id,
      type: TYPE.DATE,
      value: extension.value,
    },
    {
      id,
      type: TYPE.DATE,
      value: size.value,
    },
    {
      id,
      type: TYPE.DATE,
      value: dateAdded.value,
    },
  ];
};
