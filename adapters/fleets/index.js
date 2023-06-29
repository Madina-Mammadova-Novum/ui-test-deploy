import EditIcon from '@/assets/images/editAlt.svg';
import ToggleActiveIcon from '@/assets/images/toggleActive.svg';
import ToggleInactiveIcon from '@/assets/images/toggleInactive.svg';
import { ACTIONS, NO_DATA_MESSAGE, TYPE } from '@/lib/constants';
import { transformDate } from '@/utils/date';
import { makeId } from '@/utils/helpers';

export const fleetsHeaderDataAdapter = ({ data }) => {
  if (!data) return null;

  const { title, activeTankers, inActiveTankers } = data;

  return [
    {
      id: makeId(),
      label: 'fleet name',
      text: title ?? '',
    },
    {
      id: makeId(),
      label: 'active',
      text: `${activeTankers ?? '0'} tankers`,
    },
    {
      id: makeId(),
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
      type: TYPE.SEMIBOLD,
      disabled: inActive,
    },
    {
      id,
      value: imo ?? NO_DATA_MESSAGE.IMO,
      disabled: inActive,
    },
    {
      id,
      name: title,
      value: port || NO_DATA_MESSAGE.PORT,
      helperData: inActive && NO_DATA_MESSAGE.HELPER_FLEETS,
      editable: !inActive,
      actions: [
        {
          action: ACTIONS.PORT,
          editIcon: <EditIcon />,
        },
      ],
      disabled: inActive,
    },
    {
      id,
      name: title,
      marked,
      value: date ? transformDate(date, 'MMM dd, yyyy') : NO_DATA_MESSAGE.DATE,
      helperData: inActive && NO_DATA_MESSAGE.HELPER_FLEETS,
      editable: !inActive,
      actions: [
        {
          action: ACTIONS.DATE,
          editIcon: <EditIcon />,
        },
      ],
      disabled: inActive,
    },
    {
      id,
      name: title,
      value: status,
      editable: true,
      actions: [
        {
          editIcon: status ? <ToggleActiveIcon /> : <ToggleInactiveIcon />,
          action: status ? ACTIONS.TANKER_DEACTIVATE : ACTIONS.TANKER_REACTIVATE,
        },
      ],
      disabled: !status,
    },
  ];
};

export const fleetsRowsDataAdapter = ({ data }) => {
  if (!data) return [];

  return data.map((rowData, index) => fleetsRowDataAdapter({ data: rowData, index: index + 1 }));
};

export const fleetsPageHeaderDataAdapter = ({ data }) => {
  if (!data) return null;

  const { name, numberOfVessels } = data;

  return [
    {
      label: 'Fleet name',
      text: name ?? '',
    },
    {
      label: 'Number of tankers',
      text: numberOfVessels || '0',
    },
  ];
};

export const fleetsPageRowDataAdapter = ({ data, index }) => {
  if (!data) return null;

  const { id, name, imo, dwt, category, questionaire, status } = data;

  return [
    {
      value: index,
    },
    {
      id,
      value: name,
      type: TYPE.SEMIBOLD,
    },
    {
      id,
      value: imo,
    },
    {
      id,
      value: dwt,
    },
    {
      id,
      value: category,
    },
    {
      id,
      editable: !!questionaire,
      actions: [
        {
          action: ACTIONS.VIEW_QUESTIONAIRE,
          actionText: 'View',
          actionVariant: 'primary',
          actionSize: 'small',
        },
      ],
    },
    {
      id,
      value: status,
    },
    {
      id,
      editable: true,
      actions: [
        {
          action: ACTIONS.REQUEST_UPDATE_TANKER_INFO,
          actionText: 'Request to update info',
          actionVariant: 'primary',
          actionSize: 'medium',
        },
        {
          action: ACTIONS.DELETE_TANKER,
          actionText: 'Delete',
          actionVariant: 'delete',
          actionSize: 'medium',
        },
      ],
    },
  ];
};

export const fleetsPageRowsDataAdapter = ({ data }) => {
  if (!data) return [];

  return data.map((rowData, index) => fleetsPageRowDataAdapter({ data: rowData, index: index + 1 }));
};

export const requestFleetNameAdapter = ({ data }) => {
  if (!data) return [];
  const { fleetName } = data;

  return {
    name: fleetName,
  };
};

export const responseCreateFleetAdapter = ({ data }) => {
  if (!data) return [];

  return data;
};

export const responseGetFleetsAdapter = ({ data }) => {
  if (!data) return [];
  return data;
};

export const getFleetByIdAdapter = ({ id }) => {
  if (!id) return null;

  return { fleetId: id };
};

export const complexFleetDataAdapter = ({ fleet, fleetDetails }) => {
  if (!fleet) return [];

  return {
    data: {
      ...fleet,
      tankers: fleetDetails?.data,
    },
  };
};
