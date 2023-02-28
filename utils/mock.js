import usFlag from '@/assets/images/flag.png';

export const fleetsHeader = [
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
