import ClockSVG from "@/assets/images/clock.svg";
import CommentIcon from '@/assets/images/commentMessage.svg';
import TooltipIcon from '@/assets/images/infoCircle.svg';
import { ACTIONS, NO_DATA_MESSAGE, TYPE } from '@/lib/constants';
import CargoIdTooltip from '@/units/CargoIdTooltip';
import { transformDate } from '@/utils/date';

export const prefixtureHeaderDataAdapter = ({ data }) => {
  if (!data) return null;

  const { cargoId, cargoType, quantity, loadPort, laycanStart, laycanEnd, creationDate, countdown } = data;

  return [
    {
      label: 'Cargo id',
      text: cargoId || '',
      icon: <TooltipIcon className="w-4 h-4 fill-gray" viewBox="0 0 24 24" />,
      helperData: {
        title: 'Cargo ID',
        description: <CargoIdTooltip />,
      },
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
      textStyles: 'text-red',
      coverImage: <ClockSVG className="w-4 h-4 fill-red" viewBox="0 0 24 24" />,
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
      type: TYPE.SEMIBOLD,
    },
    {
      id,
      value: title,
      type: TYPE.SEMIBOLD,
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
      actions: [
        {
          action: ACTIONS.DOWNLOAD,
          actionText: 'Download',
          actionVariant: 'primary',
          actionSize: 'medium',
        },
      ],
      editable: true,
    },
  ];
};

export const prefixtureRowsDataAdapter = ({ data }) => {
  if (!data) return [];

  return data.map((rowData, index) => prefixtureRowDataAdapter({ data: rowData, index: index + 1 }));
};
