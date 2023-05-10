import EditIcon from '@/assets/images/edit.svg';
import ToggleActiveIcon from '@/assets/images/toggleActive.svg';
import ToggleInactiveIcon from '@/assets/images/toggleInactive.svg';
import { ACTIONS, NO_DATA_MESSAGE, TYPE } from '@/lib/constants';
import { transformDate } from '@/utils/date';

export const fleetsHeaderDataAdapter = ({ data }) => {
  if (!data) return null;

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

export const fleetsRowDataAdapter = ({ data, index }) => {
  if (!data) return null;

  const { date, id, marked, imo, port, status, title } = data;

  const inActive = port === null || date === null;

  return [
    {
      value: index,
      disabled: inActive,
    },
    {
      id,
      value: title ?? NO_DATA_MESSAGE.DEFAULT,
      action: ACTIONS.TANKER_NAME,
      type: TYPE.SEMIBOLD,
      disabled: inActive,
    },
    {
      id,
      value: imo ?? NO_DATA_MESSAGE.IMO,
      action: ACTIONS.IMO,
      disabled: inActive,
    },
    {
      id,
      name: title,
      action: ACTIONS.PORT,
      value: port || NO_DATA_MESSAGE.PORT,
      helperData: inActive && NO_DATA_MESSAGE.HELPER_FLEETS,
      editable: !inActive,
      editIcon: <EditIcon />,
      disabled: inActive,
    },
    {
      id,
      action: ACTIONS.DATE,
      name: title,
      marked,
      value: date ? transformDate(date, 'MMM dd, yyyy') : NO_DATA_MESSAGE.DATE,
      helperData: inActive && NO_DATA_MESSAGE.HELPER_FLEETS,
      editable: !inActive,
      editIcon: <EditIcon />,
      disabled: inActive,
    },
    {
      id,
      toggle: {
        value: status || false,
        name: title,
      },
      action: ACTIONS.TANKER_STATUS,
      editable: !inActive,
      editIcon: status ? <ToggleActiveIcon /> : <ToggleInactiveIcon />,
      disabled: inActive,
    },
  ];
};


export const fleetsRowsDataAdapter = ({ data }) => {
  if (!data) return [];

  return data.map((rowData, index) => fleetsRowDataAdapter({ data: rowData, index: index + 1 }));
};
