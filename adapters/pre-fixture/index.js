import CommentIcon from '@/assets/images/comment.svg';
import { NO_DATA_MESSAGE, TYPE } from '@/lib/constants';
import { transformDate } from '@/utils/date';

export const prefixtureHeaderDataAdapter = ({ data }) => {
  if (!data) return null;

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

export const prefixtureRowDataAdapter = ({ data, index }) => {
  if (!data) return null;
  const { id, docId, title, comment, docName, extension, size, dateAdded } = data;

  return [
    {
      value: index,
    },
    {
      id,
      value: docId,
      type: TYPE.TANKER_NAME,
    },
    {
      id,
      value: title,
      type: TYPE.IMO,
    },
    {
      id,
      editable: true,
      editIcon: comment ? <CommentIcon /> : '---',
    },
    {
      id,
      type: TYPE.DATE,
      value: docName,
    },
    {
      id,
      type: TYPE.DATE,
      value: extension,
    },
    {
      id,
      type: TYPE.DATE,
      value: size,
    },
    {
      id,
      type: TYPE.DATE,
      value: dateAdded ? transformDate(dateAdded, 'MMM dd, yyyy') : NO_DATA_MESSAGE.DATE,
    },
  ];
};

export const prefixtureRowsDataAdapter = ({ data }) => {
  if (!data) return [];

  return data.map((rowData, index) => prefixtureRowDataAdapter({ data: rowData, index: index + 1 }));
};
