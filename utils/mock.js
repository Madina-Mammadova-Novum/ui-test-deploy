import usFlag from '@/assets/images/flag.png';

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

export const tabs = [
  {
    value: 'value-1',
    label: 'tab-1',
  },
  {
    value: 'value-2',
    label: 'tab-2',
  },
];

export const signUpTab = {
  tabs: [
    {
      id: 1,
      label: 'I am vessel owner',
      value: 'owner',
    },
    {
      id: 2,
      label: 'I am a charterer',
      value: 'charterer',
    },
  ],
};

export const searchRowHeaders = {
  exactResults: [
    [
      {
        label: 'tanker name',
        content: {
          text: 'Hidden name',
        },
      },
      {
        label: 'imo',
        content: {
          text: 'Hidden number',
        },
      },
      {
        label: 'flag',
        content: {
          text: 'United States',
          image: usFlag,
        },
      },
      {
        label: 'dwt',
        content: {
          text: '140,*** tons',
        },
      },
      {
        label: 'estimated arrival',
        content: {
          text: 'Dec 11, 2021',
        },
      },
      {
        label: 'ballast leg',
        content: {
          text: 'Short',
        },
      },
    ],
    [
      {
        label: 'tanker name',
        content: {
          text: 'Hidden name',
        },
      },
      {
        label: 'imo',
        content: {
          text: 'Hidden number',
        },
      },
      {
        label: 'flag',
        content: {
          text: 'United States',
          image: usFlag,
        },
      },
      {
        label: 'dwt',
        content: {
          text: '140,*** tons',
        },
      },
      {
        label: 'estimated arrival',
        content: {
          text: 'Dec 11, 2021',
        },
      },
      {
        label: 'ballast leg',
        content: {
          text: 'Short',
        },
      },
    ],
  ],
  partialResults: [
    [
      {
        label: 'tanker name',
        content: {
          text: 'Hidden name',
        },
      },
      {
        label: 'imo',
        content: {
          text: 'Hidden number',
        },
      },
      {
        label: 'flag',
        content: {
          text: 'United States',
          image: usFlag,
        },
      },
      {
        label: 'dwt',
        content: {
          text: '140,*** tons',
        },
      },
      {
        label: 'estimated arrival',
        content: {
          text: 'Dec 11, 2021',
        },
      },
      {
        label: 'ballast leg',
        content: {
          text: 'Short',
        },
      },
    ],
  ],
};

export const unauthorizedSearchExpandedData = {
  vesselOwnerData: [
    {
      title: 'Years in Operation',
      description: 'Hidden info',
    },
    {
      title: 'Number of Tankers',
      description: 'Hidden info',
    },
    {
      title: 'Estimated average tanker DWT',
      description: 'Hidden info',
    },
  ],
  tankerData: [
    {
      title: 'Ship age',
      description: '≤ 5',
    },
    {
      title: 'Cubic capacity 98%',
      description: '25,*** m³',
    },
    {
      title: 'Number of Segregations',
      description: 'Hidden info',
    },
    {
      title: 'LOA',
      description: 'Hidden info',
    },
    {
      title: 'Beam',
      description: 'Hidden info',
    },
    {
      title: 'Type of Hull',
      description: 'Hidden info',
    },
  ],
  countryData: [
    {
      title: 'Country of Registered Owner',
      description: 'Hidden info',
    },
    {
      title: 'Country of Disponent Owner',
      description: 'Hidden info',
    },
    {
      title: 'Country of Technical Operator',
      description: 'Hidden info',
    },
    {
      title: 'Country of Commercial Operator',
      description: 'Hidden info',
    },
  ],
};

export const tankerInformationTooltipData = [
  {
    title: 'Tanker name',
    description: 'Hidden info',
  },
  {
    title: 'IMO',
    description: 'Hidden info',
  },
  {
    title: 'Flag',
    description: 'Turkey',
    countryCode: 'us',
  },
  {
    title: 'DWT',
    description: '140,*** tons',
  },
  {
    title: 'Estimated Arrival',
    description: 'Dec 11, 2021',
  },
  {
    title: 'Ballast Leg',
    description: 'Short',
  },
  {
    title: 'Ship Age',
    description: '≤ 5 years',
  },
  {
    title: 'Cubic Capacity 98%',
    description: '25,*** m³',
  },
  {
    title: 'Number of Segregations',
    description: '5',
  },
  {
    title: 'LOA',
    description: '100 m',
  },
  {
    title: 'Beam',
    description: '23 m',
  },
  {
    title: 'Type of Hull',
    description: 'Double Hull',
  },
  {
    title: 'Country of Registered Owner',
    description: 'Turkey',
    countryCode: 'us',
  },
  {
    title: 'Country of Disponent Owner',
    description: 'The Netherlands',
    countryCode: 'us',
  },
  {
    title: 'Country of Technical Operator',
    description: 'The Netherlands',
    countryCode: 'us',
  },
  {
    title: 'Country of Commercial Operator',
    description: 'Turkey',
    countryCode: 'us',
  },
];

export const incomingOfferCommentsData = [
  {
    title:
      'Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing is placeholder text commonly. ',
    date: 'Friday, December 3, 2021',
    time: '10:16 AM',
  },
  {
    title: 'Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing',
    date: 'Friday, December 3, 2021',
    time: '10:16 AM',
  },
  {
    title: 'Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing',
    date: 'Friday, December 3, 2021',
    time: '10:16 AM',
    latest: true,
  },
];

export const voyageDetailData = {
  dates: [
    [
      {
        key: 'Laycan start',
        label: 'Dec 18, 2021',
      },
      {
        key: 'Laycan end',
        label: 'Dec 30, 2021',
      },
    ],
  ],
  ports: [
    [
      {
        key: 'Load port',
        label: 'Barcelona, ESBCN',
        countryFlag: usFlag,
      },
      {
        key: 'Load terminal',
        label: 'Oil terminal #1',
      },
    ],
    [
      {
        key: 'Discharge port',
        label: 'Benghazi, LYBEN',
        countryFlag: usFlag,
      },
      {
        key: 'Discharge terminal',
        label: 'Oil terminal #4',
      },
    ],
  ],
};

export const COTData = {
  cargo: [
    {
      key: 'Cargo Type',
      label: 'Crude Oil',
    },
  ],
  products: [
    [
      {
        key: 'Product #1',
        label: 'Light Crude Oil',
      },
      {
        key: 'Density',
        label: '0.764 mt/m3',
      },
      {
        key: 'Min quantity',
        label: '24,118 tons',
      },
    ],
    [
      {
        key: 'Product #2',
        label: 'Medium Crude Oil',
      },
      {
        key: 'Density',
        label: '0.803 mt/m3',
      },
      {
        key: 'Min quantity',
        label: '19,001 tons',
      },
    ],
  ],
  details: [
    {
      key: 'Freight',
      label: 'WS 110',
    },
    {
      key: 'Demurrage rate',
      label: '$17,000 per day',
    },
    {
      key: 'Laytime + NOR',
      label: '72 hrs + (6 + 6 hrs)',
    },
    {
      key: 'Undisputed demurrage payment terms',
      label: '3 days undisputed demmurage to be paid along with freight',
    },
    {
      key: 'Payment terms',
      label: 'Total freight amount to be paid before breaking bulk (BBB)',
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

export const negotiatingIncomingTableRows = [
  [
    {
      text: '1',
    },
    {
      actions: [{ text: 'QW1122', value: 'charterer_info', size: 'small' }],
      semibold: true,
      color: 'blue',
    },
    {
      text: 'Dec 18, 2021',
    },
    {
      text: 'Dec 19, 2021',
    },
    {
      text: 'Barcelona, ESBCN',
      countryFlag: usFlag,
    },
    {
      text: 'New offer',
      status: 'new',
      semibold: true,
    },
    {
      text: 'Dec 19, 2021',
    },
    {
      text: '1d 1h 50m',
      timer: true,
      color: 'red',
    },
    {
      actions: [{ text: 'View offer', value: 'view_offer' }],
    },
  ],
  [
    {
      text: '2',
    },
    {
      actions: [{ text: 'QW6969', value: 'charterer_info', size: 'small' }],
      semibold: true,
      color: 'blue',
    },
    {
      text: 'Dec 18, 2021',
    },
    {
      text: 'Dec 19, 2021',
    },
    {
      text: 'Barcelona, ESBCN',
      countryFlag: usFlag,
    },
    {
      text: 'Counteroffer',
      status: 'counteroffer',
      semibold: true,
    },
    {
      text: 'Dec 19, 2021',
    },
    {
      text: '1d 1h 50m',
      timer: true,
      color: 'red',
    },
    {
      actions: [{ text: 'View offer', value: 'view_offer' }],
    },
  ],
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

export const negotiatingCounterofferTableRows = [
  [
    {
      text: '1',
    },
    {
      actions: [{ text: 'AS5566', value: 'charterer_info', size: 'small' }],
      semibold: true,
      color: 'blue',
    },
    {
      text: 'Dec 18, 2021',
    },
    {
      text: 'Dec 19, 2021',
    },
    {
      text: 'Barcelona, ESBCN',
      countryFlag: usFlag,
    },
    {
      text: 'Dec 19, 2021',
    },
    {
      text: '1d 1h 50m',
      timer: true,
      color: 'red',
    },
    {
      actions: [{ text: 'View counteroffer', value: 'view_counteroffer' }],
    },
  ],
  [
    {
      text: '2',
    },
    {
      actions: [{ text: 'QW1122', value: 'charterer_info', size: 'small' }],
      semibold: true,
      color: 'blue',
    },
    {
      text: 'Dec 18, 2021',
    },
    {
      text: 'Dec 19, 2021',
    },
    {
      text: 'Barcelona, ESBCN',
      countryFlag: usFlag,
    },
    {
      text: 'Dec 19, 2021',
    },
    {
      text: '1d 1h 50m',
      timer: true,
      color: 'red',
    },
    {
      actions: [{ text: 'View counteroffer', value: 'view_counteroffer' }],
    },
  ],
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

export const negotiatingFailedTableRows = [
  [
    {
      text: '1',
    },
    {
      actions: [{ text: 'ZX9988', value: 'charterer_info', size: 'small' }],
      semibold: true,
      color: 'blue',
    },
    {
      text: 'Dec 18, 2021',
    },
    {
      text: 'Dec 19, 2021',
    },
    {
      text: 'Barcelona, ESBCN',
      countryFlag: usFlag,
    },
    {
      text: 'Dec 19, 2021',
    },
    {
      text: 'Offer timed out',
      semibold: true,
    },
    {
      actions: [{ text: 'View failed offer', value: 'view_failed_offer' }],
    },
  ],
  [
    {
      text: '2',
    },
    {
      actions: [{ text: 'QW1122', value: 'charterer_info', size: 'small' }],
      semibold: true,
      color: 'blue',
    },
    {
      text: 'Dec 18, 2021',
    },
    {
      text: 'Dec 19, 2021',
    },
    {
      text: 'Barcelona, ESBCN',
      countryFlag: usFlag,
    },
    {
      text: 'Dec 19, 2021',
    },
    {
      text: 'Offer declined by me',
      semibold: true,
    },
    {
      actions: [{ text: 'View failed offer', value: 'view_failed_offer' }],
    },
  ],
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
    text: 'Q88 Questionnaire',
    type: 'EXTENSION',
    width: 110,
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
    text: 'Q88 Questionnaire',
    type: 'EXTENSION',
    width: 110,
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
