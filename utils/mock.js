import usFlag from '@/assets/images/flag.png';

export const fleetsTableHeader = [
  {
    text: '#',
  },
  {
    text: 'tanker name',
  },
  {
    text: 'imo',
  },
  {
    text: 'open port',
  },
  {
    text: 'open date',
  },
  {
    text: 'tanker status',
  },
];

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

export const negotiatingCounterofferTableHeader = [
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
export const negotiatingFailedTableHeader = [
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
    text: 'date failed',
  },
  {
    text: 'reason',
  },
  {
    text: '',
  },
];

export const negotiatingExpandableRowHeader = [
  [
    {
      label: 'tanker name',
      content: {
        text: 'Harvey Deep Sea',
        image: null,
      },
    },
    {
      label: 'imo',
      content: {
        text: '9131034',
        image: null,
      },
    },
    {
      label: 'fleet name',
      content: {
        text: 'Fleet Base West',
        image: null,
      },
    },
    {
      label: 'open date',
      content: {
        text: 'Dec 21, 2021',
        image: null,
      },
    },
    {
      label: 'open port',
      content: {
        text: 'Botas Natural Gas Terminal, ESBCN',
        image: null,
      },
    },
  ],
  [
    {
      label: 'tanker name',
      content: {
        text: 'Harvey Deep Sea',
        image: null,
      },
    },
    {
      label: 'imo',
      content: {
        text: '9131034',
        image: null,
      },
    },
    {
      label: 'fleet name',
      content: {
        text: 'Fleet Base West',
        image: null,
      },
    },
    {
      label: 'open date',
      content: {
        text: 'Dec 21, 2021',
        image: null,
      },
    },
    {
      label: 'open port',
      content: {
        text: 'Botas Natural Gas Terminal, ESBCN',
        image: null,
      },
    },
  ],
  [
    {
      label: 'tanker name',
      content: {
        text: 'Harvey Deep Sea',
        image: null,
      },
    },
    {
      label: 'imo',
      content: {
        text: '9131034',
        image: null,
      },
    },
    {
      label: 'fleet name',
      content: {
        text: 'Fleet Base West',
        image: null,
      },
    },
    {
      label: 'open date',
      content: {
        text: 'Dec 21, 2021',
        image: null,
      },
    },
    {
      label: 'open port',
      content: {
        text: 'Botas Natural Gas Terminal, ESBCN',
        image: null,
      },
    },
  ],
];

export const fleetsTableRow = [
  [
    {
      text: '1',
    },
    {
      countryFlag: usFlag,
      text: 'Harvey Deep Sea',
    },
    {
      text: '9581291',
    },
    {
      countryFlag: usFlag,
      text: 'Castellon de la Plana',
    },
    {
      text: 'Dec 19, 2021',
      badge: '',
    },
    {
      toggle: true,
    },
  ],
  [
    {
      text: '2',
    },
    {
      countryFlag: usFlag,
      text: 'Harvey Deep Sea 2',
    },
    {
      text: '546456',
    },
    {
      countryFlag: usFlag,
      text: 'Castellon de la Plana 2',
    },
    {
      text: 'Dec 19, 2054',
      badge: 'rolled',
    },
    {
      toggle: true,
    },
  ],
];

export const negotiatingIncomingTableRow = [
  [
    {
      text: '1',
    },
    {
      text: 'QW1122',
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
      actions: ['View offer'],
    },
  ],
  [
    {
      text: '2',
    },
    {
      text: 'QW1122',
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
      actions: ['View offer'],
    },
  ],
];
export const negotiatingCounterofferTableRow = [
  [
    {
      text: '1',
    },
    {
      text: 'AS5566',
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
      actions: ['View counteroffer'],
    },
  ],
  [
    {
      text: '2',
    },
    {
      text: 'QW1122',
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
      actions: ['View counteroffer'],
    },
  ],
];
export const negotiatingFailedTableRow = [
  [
    {
      text: '1',
    },
    {
      text: 'ZX9988',
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
      actions: ['View failed offer'],
    },
  ],
  [
    {
      text: '2',
    },
    {
      text: 'QW1122',
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
      actions: ['View failed offer'],
    },
  ],
];

export const sidebarData = [
  {
    id: 1,
    title: 'My positions',
    variant: 'positions',
    path: '/',
    items: [],
  },
  {
    id: 2,
    title: 'Offers',
    variant: 'offers',
    items: [
      {
        id: Math.random(),
        label: 'offer stage #1',
        title: 'Negotiating',
        path: '/',
      },
      {
        id: Math.random(),
        label: 'offer stage #2',
        title: 'Pre-fixture',
        path: '/',
      },
      {
        id: Math.random(),
        label: 'offer stage #3',
        title: 'On subs',
        path: '/',
      },
      {
        id: Math.random(),
        label: 'offer stage #4',
        title: 'Fixture',
        path: '/',
      },
      {
        id: Math.random(),
        label: 'offer stage #5',
        title: 'Post-fixture',
        path: '/',
      },
    ],
  },
  {
    id: 3,
    title: 'Fleets',
    variant: 'fleets',
    path: '/',
    items: [],
  },
  {
    id: 4,
    title: 'FAQ',
    variant: 'faq',
    path: '/',
    items: [],
  },
];

export const dropdownOptions = [
  {
    countryFlag: usFlag,
    value: 'Agioi Theodoroi, GRAGT',
  },
  {
    countryFlag: usFlag,
    value: 'Akrotiri, CYAKT',
  },
  {
    countryFlag: usFlag,
    value: 'Castellon de la Plana, ESCAS',
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

export const expandedNegotiatingRowTabs = [
  {
    value: 'incoming',
    label: 'Incoming',
  },
  {
    value: 'counteroffers',
    label: 'Sent counteroffers',
  },
  {
    value: 'failed',
    label: 'Failed',
  },
];
