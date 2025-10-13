import { arrayAdapter } from '@/adapters/common';
import ClockSVG from '@/assets/images/clock.svg';
import EditIcon from '@/assets/images/editAlt.svg';
import ToggleActiveIcon from '@/assets/images/toggleActive.svg';
import ToggleInactiveIcon from '@/assets/images/toggleInactive.svg';
import TrashIcon from '@/assets/images/trashAlt.svg';
import StatusIndicator from '@/elements/StatusIndicator';
import { ACTIONS, NO_DATA_MESSAGE, TYPE } from '@/lib/constants';
import { transformDate } from '@/utils/date';
import { getLocode, transformToCapitalize } from '@/utils/helpers';

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

const fleetsRowDataAdapter = ({ data, index }) => {
  if (!data) return null;

  const {
    date,
    id,
    marked,
    imo,
    port,
    portId,
    status,
    title,
    countryId,
    countryCode,
    notified,
    rolled,
    flagOfRegistry,
  } = data;

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
      flagOfRegistry,
      available: status,
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

const fleetsPageRowDataAdapter = ({ data, index, fleetName }) => {
  if (!data) return null;

  const {
    id,
    appearsInSearch,
    details: { name, summerDwt, tankerLink, flagOfRegistry, portOfRegistry },
    imo,
    status: requestStatus,
  } = data;

  const additionRequested = requestStatus === 'Addition requested' || requestStatus === 'Q88Processing';

  const status = additionRequested ? 'Inactive' : 'Active';
  const tankersStatus = appearsInSearch ? 'Active' : 'Inactive';
  const tankerName = portOfRegistry?.locode ? `${name}, ${portOfRegistry?.locode}` : name;

  return [
    {
      value: index,
      disabled: additionRequested,
    },
    {
      id,
      value: tankerName,
      type: TYPE.SEMIBOLD,
      disabled: additionRequested,
      flagOfRegistry: getLocode(flagOfRegistry?.codeISO2) || getLocode(flagOfRegistry?.codeISO3),
      available: status,
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
      value:
        tankerLink?.vesselType?.name && tankerLink?.vesselCategoryOne?.name
          ? `${tankerLink.vesselType.name} - ${tankerLink.vesselCategoryOne.name}`
          : null,
      disabled: additionRequested,
    },
    {
      id,
      rowType: 'category-two',
      editable: tankerLink?.vesselCategoryOne?.vesselCategoryTwoOptions?.length > 0,
      value: tankerLink?.vesselCategoryTwos?.name,
      name,
      vesselId: id,
      vesselCategoryOneId: tankerLink?.vesselCategoryOne?.id,
      vesselTypeId: tankerLink?.vesselType?.id,
      vesselCategoryTwoOptions: tankerLink?.vesselCategoryOne?.vesselCategoryTwoOptions,
      actions: [
        {
          action: ACTIONS.UPDATE_VESSEL_CATEGORY_TWO,
          editIcon: <EditIcon />,
          disabled: additionRequested,
        },
      ],
    },
    {
      id,
      editable: true,
      value: fleetName || 'Assigned',
      type: fleetName ? null : TYPE.GREY,
      name,
      disabled: additionRequested,
      actions: [
        {
          action: ACTIONS.ASSIGN_FLEET,
          editIcon: <EditIcon />,
        },
      ],
    },
    {
      id,
      value: tankersStatus,
      icon: <StatusIndicator status={tankersStatus} />,
      disabled: additionRequested,
    },
    {
      id,
      value:
        requestStatus === 'Update Requested'
          ? 'Pending'
          : requestStatus === 'Q88Processing'
            ? 'Q88 Processing'
            : requestStatus,
      icon: <StatusIndicator status={requestStatus} />,
      disabled: additionRequested,
    },
    {
      id,
      editable: true,
      name,
      fleetName,
      disabled: additionRequested,
      isValid: requestStatus !== 'Update Requested',
      actions: [
        {
          action: ACTIONS.REQUEST_UPDATE_TANKER_INFO,
          actionText: 'Request to update info',
          actionVariant: 'primary',
          actionSize: 'medium',
          disabled: additionRequested,
          editIcon: additionRequested && <ClockSVG viewBox="0 0 14 14" className="ml-1 h-4 w-4 fill-blue" />,
          actionStyles: additionRequested ? '!w-[190px]' : '!w-[165px]',
        },
        {
          action: ACTIONS.DELETE_TANKER,
          actionText: 'Delete tanker',
          editIcon: <TrashIcon viewBox="0 0 24 24" className="h-5 w-5 fill-red" />,
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

const unassignedFleetRowDataAdapter = ({ data, index }) => {
  if (!data) return null;

  const {
    id,
    imo,
    status: requestStatus,
    appearsInSearch,
    details: { summerDwt, name, tankerLink, flagOfRegistry, portOfRegistry },
  } = data;

  const additionRequested = requestStatus === 'Addition requested' || requestStatus === 'Q88Processing';

  const status = additionRequested ? 'Inactive' : 'Active';
  const tankersStatus = appearsInSearch ? 'Active' : 'Inactive';
  const tankerName = portOfRegistry?.locode ? `${name}, ${portOfRegistry?.locode}` : name;

  return [
    {
      id,
      value: index,
      disabled: additionRequested,
    },
    {
      id,
      value: tankerName,
      type: TYPE.SEMIBOLD,
      flagOfRegistry: getLocode(flagOfRegistry?.codeISO2) || getLocode(flagOfRegistry?.codeISO3),
      available: status,
      disabled: additionRequested,
    },
    {
      id,
      value: imo,
      disabled: additionRequested,
    },
    {
      id,
      value: `${summerDwt} tons`,
      disabled: additionRequested,
    },
    {
      id,
      value:
        tankerLink?.vesselType?.name && tankerLink?.vesselCategoryOne?.name
          ? `${tankerLink.vesselType.name} - ${tankerLink.vesselCategoryOne.name}`
          : null,
      disabled: additionRequested,
    },
    {
      id,
      rowType: 'category-two',
      editable: tankerLink?.vesselCategoryOne?.vesselCategoryTwoOptions?.length > 0,
      value: tankerLink?.vesselCategoryTwos?.name,
      name,
      vesselId: id,
      vesselCategoryOneId: tankerLink?.vesselCategoryOne?.id,
      vesselTypeId: tankerLink?.vesselType?.id,
      vesselCategoryTwoOptions: tankerLink?.vesselCategoryOne?.vesselCategoryTwoOptions,
      actions: [
        {
          action: ACTIONS.UPDATE_VESSEL_CATEGORY_TWO,
          editIcon: <EditIcon />,
          disabled: additionRequested,
        },
      ],
    },
    {
      id,
      editable: true,
      value: 'Unassigned',
      type: TYPE.GREY,
      name,
      disabled: additionRequested,
      actions: [
        {
          action: ACTIONS.ASSIGN_FLEET,
          editIcon: <EditIcon />,
        },
      ],
    },
    {
      id,
      value: tankersStatus,
      icon: <StatusIndicator status={tankersStatus} />,
      disabled: additionRequested,
    },
    {
      id,
      value:
        requestStatus === 'Update Requested'
          ? 'Pending'
          : requestStatus === 'Q88Processing'
            ? 'Q88 Processing'
            : requestStatus,
      icon: <StatusIndicator status={requestStatus} />,
      disabled: additionRequested,
    },
    {
      id,
      editable: true,
      name,
      disabled: additionRequested,
      isValid: requestStatus !== 'Update Requested',
      actions: [
        {
          action: ACTIONS.REQUEST_UPDATE_TANKER_INFO,
          actionText: 'Request to update info',
          actionVariant: 'primary',
          actionSize: 'medium',
          disabled: additionRequested,
          editIcon: additionRequested && <ClockSVG viewBox="0 0 14 14" className="ml-1 h-4 w-4 fill-blue" />,
          actionStyles: '!w-[190px]',
        },
        {
          action: ACTIONS.DELETE_TANKER,
          actionText: 'Delete tanker',
          actionVariant: 'delete',
          actionSize: 'medium',
          editIcon: <TrashIcon viewBox="0 0 24 24" className="h-5 w-5 fill-red" />,
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
  return arrayAdapter(data);
};

export const responseGetFleetsAdapter = ({ data }) => {
  return arrayAdapter(data);
};

export const getFleetByIdAdapter = ({ id }) => {
  if (!id) return null;

  return { fleetId: id };
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
