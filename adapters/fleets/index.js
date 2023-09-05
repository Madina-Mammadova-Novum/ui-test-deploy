import ClockSVG from '@/assets/images/clock.svg';
import EditIcon from '@/assets/images/editAlt.svg';
import ToggleActiveIcon from '@/assets/images/toggleActive.svg';
import ToggleInactiveIcon from '@/assets/images/toggleInactive.svg';
import TrashIcon from '@/assets/images/trashAlt.svg';
import StatusIndicator from '@/elements/StatusIndicator';
import { ACTIONS, NO_DATA_MESSAGE, TYPE } from '@/lib/constants';
import { transformDate } from '@/utils/date';
import { transformToCapitalize } from '@/utils/helpers';

export const fleetsHeaderDataAdapter = ({ data }) => {
  if (!data) return null;

  const { title, activeTankers, inActiveTankers, fleetId } = data;

  return [
    {
      id: fleetId,
      label: 'fleet name',
      text: title ?? '',
    },
    {
      id: fleetId,
      label: 'active',
      text: `${activeTankers ?? '0'} tankers`,
    },
    {
      id: fleetId,
      label: 'inactive',
      text: `${inActiveTankers ?? '0'} tankers`,
    },
  ];
};

export const fleetsRowDataAdapter = ({ data, index }) => {
  if (!data) return null;

  const { date, id, marked, imo, port, portId, status, title, countryId } = data;

  return [
    {
      value: index,
      disabled: !status,
    },
    {
      id,
      value: transformToCapitalize(title) ?? NO_DATA_MESSAGE.DEFAULT,
      type: TYPE.SEMIBOLD,
      disabled: !status,
    },
    {
      id,
      value: imo ?? NO_DATA_MESSAGE.IMO,
      disabled: !status,
    },
    {
      id,
      date,
      port,
      portId,
      countryId,
      available: status,
      name: status ? title : NO_DATA_MESSAGE.PORT,
      value: status ? port : NO_DATA_MESSAGE.PORT,
      helperData: !status && NO_DATA_MESSAGE.HELPER_FLEETS,
      editable: status,
      actions: [
        {
          action: ACTIONS.PORT,
          editIcon: <EditIcon />,
        },
      ],
      disabled: !status,
    },
    {
      id,
      date,
      port,
      portId,
      marked,
      available: status,
      name: title,
      value: status ? transformDate(date, 'MMM dd, yyyy') : NO_DATA_MESSAGE.DATE,
      helperData: !status && NO_DATA_MESSAGE.HELPER_FLEETS,
      editable: status,
      actions: [
        {
          action: ACTIONS.DATE,
          editIcon: <EditIcon />,
        },
      ],
      disabled: !status,
    },
    {
      id,
      portId,
      date,
      available: status,
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

  const { name, vessels = [] } = data;

  return [
    {
      label: 'Fleet name',
      text: name ?? '',
    },
    {
      label: 'Number of tankers',
      text: vessels?.length || '0',
    },
  ];
};

export const fleetsPageRowDataAdapter = ({ data, index, fleetName }) => {
  if (!data) return null;

  const {
    id,
    details: { name, summerDwt, q88QuestionnarieFile },
    imo,
    vesselSizeCategoryId,
    apearsInSearch,
    status: requestStatus,
  } = data;

  const additionRequested = requestStatus === 'Addition requested';
  const vesselInProgress = requestStatus !== 'Confirmed';

  const status = apearsInSearch ? 'Active' : 'Inactive';

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
      value: summerDwt && `${summerDwt} tons`,
    },
    {
      id,
      value: vesselSizeCategoryId,
    },
    {
      id,
      link: q88QuestionnarieFile && `https://shiplink-api.azurewebsites.net/v1/file/get/${q88QuestionnarieFile}`,
    },
    {
      id,
      value: status,
      icon: <StatusIndicator status={status} />,
    },
    {
      id,
      editable: true,
      name,
      fleetName,
      actions: [
        {
          action: ACTIONS.REQUEST_UPDATE_TANKER_INFO,
          actionText: vesselInProgress ? requestStatus : 'Request to update info',
          actionVariant: 'primary',
          actionSize: 'medium',
          disabled: vesselInProgress,
          editIcon: additionRequested && <ClockSVG viewBox="0 0 14 14" className="fill-blue w-4 h-4 ml-1" />,
          actionStyles: '!w-[165px]',
        },
        {
          action: ACTIONS.DELETE_TANKER_FROM_FLEET,
          editIcon: <TrashIcon viewBox="0 0 24 24" className="fill-red w-5 h-5" />,
          actionVariant: 'delete',
          actionSize: 'medium',
        },
      ],
    },
  ];
};

export const fleetsPageRowsDataAdapter = ({ data, fleetName }) => {
  if (!data) return [];

  return data.map((rowData, index) => fleetsPageRowDataAdapter({ data: rowData, index: index + 1, fleetName }));
};

export const unassignedFleetRowDataAdapter = ({ data, index }) => {
  if (!data) return null;

  const {
    id,
    imo,
    details: { summerDwt, name, q88QuestionnarieFile },
    vesselSizeCategoryId,
    apearsInSearch,
    status: requestStatus,
  } = data;

  const additionRequested = requestStatus === 'Addition requested';
  const vesselInProgress = requestStatus !== 'Confirmed';

  const status = apearsInSearch ? 'Active' : 'Inactive';

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
      value: `${summerDwt} tons`,
    },
    {
      id,
      value: vesselSizeCategoryId,
    },
    {
      id,
      link: q88QuestionnarieFile && `https://shiplink-api.azurewebsites.net/v1/file/get/${q88QuestionnarieFile}`,
    },
    {
      id,
      editable: true,
      value: 'Unassigned',
      type: TYPE.GREY,
      name,
      actions: [
        {
          action: ACTIONS.ASSIGN_FLEET,
          editIcon: <EditIcon />,
        },
      ],
    },
    {
      id,
      value: status,
      icon: <StatusIndicator status={status} />,
    },
    {
      id,
      editable: true,
      name,
      actions: [
        {
          action: ACTIONS.REQUEST_UPDATE_TANKER_INFO,
          actionText: vesselInProgress ? requestStatus : 'Request to update info',
          actionVariant: 'primary',
          actionSize: 'medium',
          disabled: vesselInProgress,
          editIcon: additionRequested && <ClockSVG viewBox="0 0 14 14" className="fill-blue w-4 h-4 ml-1" />,
          actionStyles: '!w-[165px]',
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

export const unassignedFleetRowsDataAdapter = ({ data }) => {
  if (!data) return [];

  return data.map((rowData, index) => unassignedFleetRowDataAdapter({ data: rowData, index: index + 1 }));
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
