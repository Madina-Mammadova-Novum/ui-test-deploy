import CommentIcon from '@/assets/images/commentMessage.svg';
import { ACTIONS, NO_DATA_MESSAGE, TYPE } from '@/lib/constants';
import { transformDate } from '@/utils/date';

export const postFixtureHeaderDataAdapter = ({ data }) => {
  if (!data) return null;

  const { cargoId, tankerName, cargoType, quantity, loadPort, laycanStart, laycanEnd, fixtureDate } = data;

  return [
    {
      label: 'Cargo id',
      text: cargoId || '',
    },
    {
      label: 'Tanker name',
      text: tankerName || '',
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
      label: 'Fixture date',
      text: fixtureDate || '',
    },
  ];
};

export const postFixtureRowDataAdapter = ({ data, index }) => {
  if (!data) return null;
  const { id, docId, title, comment, docName, extension, size, dateAdded, status } = data;

  return [
    {
      value: index,
    },
    {
      id,
      value: docId,
      type: TYPE.SEMIBOLD,
    },
    {
      id,
      value: title,
    },
    {
      id,
      editable: true,
      actions: [
        {
          editIcon: comment ? <CommentIcon /> : '---',
        },
      ],
    },
    {
      id,
      value: docName,
    },
    {
      id,
      value: extension,
    },
    {
      id,
      value: size,
    },
    {
      id,
      value: dateAdded ? transformDate(dateAdded, 'MMM dd, yyyy') : NO_DATA_MESSAGE.DATE,
    },
    {
      id,
      value: status,
      type: TYPE.SEMIBOLD,
    },
    {
      id,
      actions: [
        {
          action: ACTIONS.DOWNLOAD,
          actionText: 'Download',
          actionVariant: 'primary',
          actionSize: 'medium',
        },
        {
          action: ACTIONS.DELETE,
          actionText: 'Delete',
          actionVariant: 'delete',
          actionSize: 'medium',
        },
      ],
      editable: true,
    },
  ];
};

export const postFixtureRowsDataAdapter = ({ data }) => {
  if (!data) return [];

  return data.map((rowData, index) => postFixtureRowDataAdapter({ data: rowData, index: index + 1 }));
};
