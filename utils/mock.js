export const fleetsHeader = [
  {
    text: '#',
    type: 'INDEX',
    width: 40,
  },
  {
    text: 'tanker name',
    type: 'TANKER_NAME',
    width: 234,
  },
  {
    text: 'imo',
    type: 'IMO',
    width: 78,
  },
  {
    text: 'open port',
    type: 'OPEN_PORT',
    width: 234,
  },
  {
    text: 'open date',
    type: 'OPEN_DATE',
    width: 234,
  },
  {
    text: 'tanker status',
    type: 'TANKER_DEACTIVATE',
    width: 125,
  },
];

export const prefixtureHeader = [
  {
    text: '#',
    type: 'INDEX',
    width: 40,
  },
  {
    text: 'Doc id',
    type: 'DOC_ID',
    width: 134,
  },
  {
    text: 'Title',
    type: 'TITLE',
    width: 171,
  },
  {
    text: 'Comment',
    type: 'COMMENT',
    width: 105,
  },
  {
    text: 'Doc name',
    type: 'DOC_NAME',
    width: 166,
  },
  {
    text: 'Extension',
    type: 'EXTENSION',
    width: 110,
  },
  {
    text: 'Size',
    type: 'SIZE',
    width: 112,
  },
  {
    text: 'Date added',
    type: 'DATE_ADDED',
    width: 130,
  },
  {
    text: '',
    type: 'DOWNLOAD',
    width: 127,
  },
];

export const onSubsHeader = [
  {
    text: '#',
    type: 'INDEX',
    width: 40,
  },
  {
    text: 'Doc id',
    type: 'DOC_ID',
    width: 134,
  },
  {
    text: 'Title',
    type: 'TITLE',
    width: 171,
  },
  {
    text: 'Comment',
    type: 'COMMENT',
    width: 105,
  },
  {
    text: 'Doc name',
    type: 'DOC_NAME',
    width: 166,
  },
  {
    text: 'Extension',
    type: 'EXTENSION',
    width: 110,
  },
  {
    text: 'Size',
    type: 'SIZE',
    width: 112,
  },
  {
    text: 'Date added',
    type: 'DATE_ADDED',
    width: 130,
  },
  {
    text: 'Status',
    type: 'STATUS',
    width: 130,
  },
];

export const signUpTab = {
  tabs: [
    {
      id: 1,
      label: 'I am a vessel owner',
      value: 'owner',
    },
    {
      id: 2,
      label: 'I am a charterer',
      value: 'charterer',
    },
  ],
};

export const negotiatingIncomingTableHeader = [
  {
    text: '#',
  },
  {
    text: 'cargo id',
  },
  {
    text: 'laycan start',
  },
  {
    text: 'laycan end',
  },
  {
    text: 'load port',
  },
  {
    text: 'status',
  },
  {
    text: 'date received',
  },
  {
    text: 'countdown',
  },
  {
    text: '',
  },
];
export const negotiatingSentOffersTableHeader = [
  {
    text: '#',
  },
  {
    text: 'Name',
  },
  {
    text: 'Open port',
  },
  {
    text: 'Open date',
  },
  {
    text: 'DWT',
  },
  {
    text: 'Status',
  },
  {
    text: 'Date sent',
  },
  {
    text: 'Countdown',
  },
  {
    text: '',
  },
];

export const ownerNegotiatingCounterofferTableHeader = [
  {
    text: '#',
  },
  {
    text: 'cargo id',
  },
  {
    text: 'laycan start',
  },
  {
    text: 'laycan end',
  },
  {
    text: 'load port',
  },
  {
    text: 'date sent',
  },
  {
    text: 'countdown',
  },
  {
    text: '',
  },
];

export const chartererNegotiatingCounterofferTableHeader = [
  {
    text: '#',
  },
  {
    text: 'Name',
  },
  {
    text: 'Open port',
  },
  {
    text: 'Open date',
  },
  {
    text: 'DWT',
  },
  {
    text: 'Date received',
  },
  {
    text: 'countdown',
  },
  {
    text: '',
  },
];

export const ownerNegotiatingFailedTableHeader = [
  {
    text: '#',
  },
  {
    text: 'cargo id',
  },
  {
    text: 'laycan start',
  },
  {
    text: 'laycan end',
  },
  {
    text: 'load port',
  },
  {
    text: 'Date Declined',
  },
  {
    text: 'reason',
  },
  {
    text: '',
  },
];
export const chartererNegotiatingFailedTableHeader = [
  {
    text: '#',
  },
  {
    text: 'Name',
  },
  {
    text: 'Open port',
  },
  {
    text: 'Open date',
  },
  {
    text: 'DWT',
  },
  {
    text: 'Date Declined',
  },
  {
    text: 'reason',
  },
  {
    text: '',
  },
];

export const fixtureHeader = [
  {
    text: '#',
    type: 'INDEX',
    width: 40,
  },
  {
    text: 'Doc id',
    type: 'DOC_ID',
    width: 134,
  },
  {
    text: 'Title',
    type: 'TITLE',
    width: 171,
  },
  {
    text: 'Comment',
    type: 'COMMENT',
    width: 105,
  },
  {
    text: 'Doc name',
    type: 'DOC_NAME',
    width: 166,
  },
  {
    text: 'Extension',
    type: 'EXTENSION',
    width: 110,
  },
  {
    text: 'Size',
    type: 'SIZE',
    width: 112,
  },
  {
    text: 'Date added',
    type: 'DATE_ADDED',
    width: 130,
  },
  {
    text: 'Status',
    type: 'STATUS',
    width: 130,
  },
];

export const fleetsPageHeader = [
  {
    text: '#',
    type: 'INDEX',
    width: 40,
  },
  {
    text: 'Tanker name',
    type: 'DOC_ID',
    width: 134,
    isSortable: true,
    sortType: 'alphabetical',
  },
  {
    text: 'Imo',
    type: 'TITLE',
    width: 171,
  },
  {
    text: 'Dwt',
    type: 'COMMENT',
    width: 105,
    isSortable: true,
  },
  {
    text: 'Tanker category',
    type: 'DOC_NAME',
    width: 166,
    isSortable: true,
    sortType: 'alphabetical',
  },
  {
    text: 'Dirty/Clean',
    type: 'SIZE',
    width: 112,
  },
  {
    text: 'Assigned fleet',
    type: 'SIZE',
    width: 112,
  },
  {
    text: 'Tanker status',
    type: 'SIZE',
    width: 112,
    isSortable: true,
    sortType: 'alphabetical',
  },
  {
    text: 'Info status',
    type: 'SIZE',
    width: 110,
    isSortable: true,
    sortType: 'alphabetical',
  },
];

export const unassignedFleetHeader = [
  {
    text: '#',
    type: 'INDEX',
    width: 40,
  },
  {
    text: 'Tanker name',
    type: 'DOC_ID',
    width: 134,
    isSortable: true,
    sortType: 'alphabetical',
  },
  {
    text: 'Imo',
    type: 'TITLE',
    width: 171,
  },
  {
    text: 'Dwt',
    type: 'COMMENT',
    width: 105,
    isSortable: true,
  },
  {
    text: 'Tanker category',
    type: 'DOC_NAME',
    width: 166,
    isSortable: true,
    sortType: 'alphabetical',
  },
  {
    text: 'Dirty/Clean',
    type: 'SIZE',
    width: 112,
  },
  {
    text: 'Assigned fleet',
    type: 'SIZE',
    width: 112,
  },
  {
    text: 'Tanker status',
    type: 'SIZE',
    width: 112,
    isSortable: true,
    sortType: 'alphabetical',
  },
  {
    text: 'Info status',
    type: 'SIZE',
    width: 110,
    isSortable: true,
    sortType: 'alphabetical',
  },
];

export const imoClassOptions = [
  { label: '1', value: '1' },
  { label: '2', value: '2' },
  { label: '3', value: '3' },
  { label: 'N/A', value: 'N/A' },
];

export const toolsCalculatorOptions = [
  { label: 'Freight Estimation', value: 'freightestimation' },
  { label: 'Distance and Duration', value: 'distanceandduration' },
];

export const hullTypeOptions = [
  { label: 'Single hull', value: 'Single hull' },
  { label: 'Single hull double bottom', value: 'Single hull double bottom' },
  { label: 'Double hull', value: 'Double hull' },
  { label: 'LNG Carrier Hull', value: 'LNG Carrier Hull' },
  { label: 'Ice-Class Hull', value: 'Ice-Class Hull' },
];

export const recentActiveCargoesHeader = [
  {
    text: '#',
    type: 'INDEX',
    width: 40,
  },
  {
    text: 'IMO',
    type: 'TITLE',
    width: 110,
  },
  {
    text: 'LOAD PORT',
    type: 'PORT',
    width: 320,
  },
  {
    text: 'OPEN DATE',
    type: 'DATE',
    width: 130,
  },
];

export const counterofferPointsToImprove = ['Reduce laytime', 'Increase demurrage', 'Increase freight'];

export const steps = {
  1: {
    key: 'role',
    support: {
      message: 'Hello! Tell us more about you. Are you potential charterer or owner?',
      isBroker: true,
      sender: 'support',
    },
    userProps: [
      {
        text: 'Charterer',
        value: 'charterer',
      },
      {
        text: 'Owner',
        value: 'VesselOwner',
      },
    ],
  },
  2: {
    key: 'name',
    support: {
      message: 'Tell us about yourself. Please enter your first name.',
      isBroker: true,
      sender: 'support',
    },
    userProps: {
      label: 'First name',
      placeholder: 'Enter the first name',
      customStyles: 'w-full',
      type: 'text',
    },
  },
  3: {
    key: 'surname',
    support: {
      message: 'Please enter your last name.',
      isBroker: true,
      sender: 'support',
    },
    userProps: {
      label: 'Last name',
      placeholder: 'Enter the last name',
      customStyles: 'w-full',
      type: 'text',
    },
  },
  4: {
    key: 'company',
    support: {
      message: 'Please enter your company name.',
      isBroker: true,
      sender: 'support',
    },
    userProps: {
      label: 'Company name',
      placeholder: 'Enter the company name',
      customStyles: 'w-full',
      type: 'text',
    },
  },
  5: {
    key: 'location',
    support: {
      message: 'Please choose the place of registration below.',
      isBroker: true,
      sender: 'support',
    },
    userProps: {},
  },
  6: {
    key: 'phone',
    support: {
      message: 'To proceed please enter your valid phone number.',
      isBroker: true,
      sender: 'support',
    },
    userProps: {
      label: 'Phone number',
      type: 'number',
      placeholder: 'Enter phone number',
      customStyles: 'w-full',
    },
  },
  7: {
    key: 'email',
    support: {
      message: 'To finish please enter your valid email.',
      isBroker: true,
      sender: 'support',
    },
    userProps: {
      label: 'Email',
      placeholder: 'Enter your email',
      type: 'email',
      customStyles: 'w-full',
    },
  },
  8: {
    key: 'connection',
    support: null,
    userProps: null,
  },
  9: {
    key: 'question',
    support: {
      message: 'Please describe your question below and we will get in touch with you.',
      isBroker: true,
      sender: 'support',
    },
    userProps: null,
  },
};
