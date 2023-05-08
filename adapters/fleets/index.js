import EditIcon from '@/assets/images/edit.svg';
import ToggleActiveIcon from '@/assets/images/toggleActive.svg';
import ToggleInactiveIcon from '@/assets/images/toggleInactive.svg';
import { NO_DATA_MESSAGE, TYPE } from '@/lib/constants';
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

  const { date, id, marked, imo, port, status, title } = data;

  const inActive = port === null || date === null;

  return {
    id,
    imo: {
      value: imo ?? NO_DATA_MESSAGE.IMO,
      editable: {
        isEdit: false,
        icon: null,
      },
      disabled: inActive,
    },
    port: {
      value: port ?? NO_DATA_MESSAGE.PORT,
      helperData: inActive && NO_DATA_MESSAGE.HELPER_FLEETS,
      editable: {
        isEdit: !inActive,
        icon: <EditIcon />,
      },
      disabled: inActive,
    },
    tankerName: {
      value: title ?? NO_DATA_MESSAGE.DEFAULT,
      editable: {
        isEdit: false,
        icon: null,
      },
      disabled: inActive,
    },
    tankerStatus: {
      value: status ?? false,
      editable: {
        isEdit: !inActive,
        icon: status ? <ToggleActiveIcon /> : <ToggleInactiveIcon />,
      },
      disabled: inActive,
    },
    date: {
      value: date ? transformDate(date, 'MMM dd, yyyy') : NO_DATA_MESSAGE.DATE,
      marked,
      editable: {
        isEdit: !inActive,
        icon: <EditIcon />,
      },
      helperData: inActive && NO_DATA_MESSAGE.HELPER_FLEETS,
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

  const { tankerName = {}, imo = {}, port = {}, tankerStatus = {}, date = {}, id } = data;

  if (!imo.value) return [];

  return [
    {
      value: imo.value ? index : null,
      disabled: tankerName.disabled,
    },
    {
      id,
      value: tankerName.value,
      type: TYPE.TANKER_NAME,
      editable: tankerName.editable?.isEdit,
      editIcon: tankerName.editable?.icon,
      disabled: tankerName.disabled,
    },
    {
      id,
      value: imo.value,
      type: TYPE.IMO,
      editable: imo.editable?.isEdit,
      editIcon: imo.editable?.icon,
      disabled: imo.disabled,
    },
    {
      id,
      name: tankerName.value,
      type: TYPE.PORT,
      value: port.value,
      helperData: port.helperData,
      editable: port.editable?.isEdit,
      editIcon: port.editable?.icon,
      disabled: port.disabled,
    },
    {
      id,
      type: TYPE.DATE,
      name: tankerName.value,
      marked: date.marked,
      value: date.value,
      helperData: date.helperData,
      editable: date.editable?.isEdit,
      editIcon: date.editable?.icon,
      disabled: date.disabled,
    },
    {
      id,
      toggle: {
        value: tankerStatus.value,
        name: tankerName.value,
      },
      type: TYPE.TANKER_STATUS,
      editable: tankerStatus.editable?.isEdit,
      editIcon: tankerStatus.editable?.icon,
      disabled: tankerStatus.disabled,
    },
  ];
};
