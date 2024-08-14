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

  const { title, fleetId, tankers } = data;

  const activeTankers = tankers?.filter((fleet) => fleet?.status === true).length;
  const inActiveTankers = tankers?.filter((fleet) => fleet?.status !== true).length;

  return [
    {
      id: fleetId,
      label: 'fleet name',
      text: title ?? '',
      disableTooltip: true,
    },
    {
      id: fleetId,
      label: 'active',
      text: `${activeTankers ?? '0'} ${activeTankers > 1 ? 'tankers' : 'tanker'}`,
    },
    {
      id: fleetId,
      label: 'inactive',
      text: `${inActiveTankers ?? '0'} ${inActiveTankers > 1 ? 'tankers' : 'tanker'}`,
    },
  ];
};

export const fleetsRowDataAdapter = ({ data, index }) => {
  if (!data) return null;

  const { date, id, marked, imo, port, portId, status, title, countryId, countryCode, notified, rolled } = data;

  return [
    {
      value: index,
      disabled: !status,
      notified: notified || false,
    },
    {
      id,
      value: transformToCapitalize(title) || NO_DATA_MESSAGE.DEFAULT,
      type: TYPE.SEMIBOLD,
      disabled: !status,
      notified: notified || false,
    },
    {
      id,
      value: imo ?? NO_DATA_MESSAGE.IMO,
      disabled: !status,
      notified: notified || false,
    },
    {
      id,
      date,
      port,
      portId,
      countryCode,
      countryId,
      available: status,
      name: status ? title : NO_DATA_MESSAGE.PORT,
      value: status ? port : NO_DATA_MESSAGE.PORT,
      helperData: !status && NO_DATA_MESSAGE.HELPER_FLEETS,
      editable: status,
      notified: notified || false,
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
      rolled,
      editable: status,
      notified: notified || false,
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
      notified: notified || false,
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
      disableTooltip: true,
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
    canSendUpdateRequest,
    details: { name, summerDwt, q88QuestionnarieFile, tankerLink },
    imo,
    status: requestStatus,
  } = data;

  const additionRequested = requestStatus === 'Addition requested';
  const vesselInProgress = requestStatus !== 'Confirmed';

  const status = additionRequested ? 'Inactive' : 'Active';

  return [
    {
      value: index,
      disabled: additionRequested,
    },
    {
      id,
      value: name,
      type: TYPE.SEMIBOLD,
      disabled: additionRequested,
    },
    {
      id,
      value: imo,
      disabled: additionRequested,
    },
    {
      id,
      value: summerDwt && `${summerDwt} tons`,
      disabled: additionRequested,
    },
    {
      id,
      value: tankerLink?.name,
      disabled: additionRequested,
    },
    {
      id,
      link: q88QuestionnarieFile && `${process.env.NEXT_PUBLIC_FILE_API_URL}/v1/file/get/${q88QuestionnarieFile}`,
      disabled: additionRequested,
    },
    {
      id,
      value: status,
      icon: <StatusIndicator status={status} />,
      disabled: additionRequested,
    },
    {
      id,
      editable: true,
      name,
      fleetName,
      disabled: additionRequested,
      isValid: canSendUpdateRequest,
      actions: [
        {
          action: ACTIONS.REQUEST_UPDATE_TANKER_INFO,
          actionText: vesselInProgress ? requestStatus : 'Request to update info',
          actionVariant: 'primary',
          actionSize: 'medium',
          disabled: additionRequested,
          editIcon: additionRequested && <ClockSVG viewBox="0 0 14 14" className="ml-1 h-4 w-4 fill-blue" />,
          actionStyles: '!w-[165px]',
        },
        {
          action: ACTIONS.DELETE_TANKER_FROM_FLEET,
          editIcon: <TrashIcon viewBox="0 0 24 24" className="h-5 w-5 fill-red" />,
          actionVariant: 'delete',
          actionSize: 'medium',
          disabled: additionRequested,
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
    canSendUpdateRequest,
    status: requestStatus,
    details: { summerDwt, name, q88QuestionnarieFile, tankerLink },
  } = data;

  const additionRequested = requestStatus === 'Addition requested';
  const vesselInProgress = requestStatus !== 'Confirmed';

  const status = additionRequested ? 'Inactive' : 'Active';

  return [
    {
      id,
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
      value: tankerLink?.name,
    },
    {
      id,
      link: q88QuestionnarieFile && `${process.env.NEXT_PUBLIC_FILE_API_URL}/v1/file/get/${q88QuestionnarieFile}`,
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
      isValid: canSendUpdateRequest,
      actions: [
        {
          action: ACTIONS.REQUEST_UPDATE_TANKER_INFO,
          actionText: vesselInProgress ? requestStatus : 'Request to update info',
          actionVariant: 'primary',
          actionSize: 'medium',
          disabled: additionRequested,
          editIcon: additionRequested && <ClockSVG viewBox="0 0 14 14" className="ml-1 h-4 w-4 fill-blue" />,
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

export const fleetNotificationAdapter = ({ data, id }) => {
  if (!data) return null;

  return {
    ...data,
    tankers: data?.tankers?.map((tanker) => {
      return {
        ...tanker,
        notified: tanker.id === id || false,
      };
    }),
  };
};
