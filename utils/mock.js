import { makeId } from './helpers';

import usFlag from '@/assets/images/flag.png';
import { ROUTES } from '@/lib';

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
    id: makeId(),
    title: 'My positions',
    variant: 'positions',
    path: ROUTES.ACCOUNT_POSITIONS,
    items: [],
  },
  {
    id: makeId(),
    title: 'Offers',
    variant: 'offers',
    items: [
      {
        id: makeId(),
        label: 'offer stage #1',
        title: 'Negotiating',
        path: ROUTES.NEGOTIATING,
      },
      {
        id: makeId(),
        label: 'offer stage #2',
        title: 'Pre-fixture',
        path: ROUTES.ACCOUNT_PREFIXTURE,
      },
      {
        id: makeId(),
        label: 'offer stage #3',
        title: 'On subs',
        path: ROUTES.ACCOUNT_ONSUBS,
      },
      {
        id: makeId(),
        label: 'offer stage #4',
        title: 'Fixture',
        path: ROUTES.ACCOUNT_FIXTURE,
      },
      {
        id: makeId(),
        label: 'offer stage #5',
        title: 'Post-fixture',
        path: ROUTES.ACCOUNT_POSTFIXTURE,
      },
    ],
  },
  {
    id: makeId(),
    title: 'Fleets',
    variant: 'fleets',
    path: ROUTES.FLEETS,
    items: [],
  },
  {
    id: makeId(),
    title: 'FAQ',
    variant: 'faq',
    path: ROUTES.FAQ,
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

export const incomingOfferVoyageDetailData = {
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

export const preFixtureHeaderData = [
  [
    {
      label: 'cargo id',
      content: {
        text: 'TY7621',
      },
    },
    {
      label: 'tanker name',
      content: {
        text: 'Harvey Deep Sea',
        image: usFlag,
      },
    },
    {
      label: 'cargo type',
      content: {
        text: 'Gas (Liquified)',
      },
    },
    {
      label: 'quantity',
      content: {
        text: '24,118 tons',
      },
    },
    {
      label: 'load port',
      content: {
        text: 'Botas Natural Gas T... ESBCN',
        image: usFlag,
      },
    },
    {
      label: 'laycan start',
      content: {
        text: 'Dec 21, 2021',
      },
    },
    {
      label: 'laycan end',
      content: {
        text: 'Dec 30, 2021',
      },
    },
    {
      label: 'countdown',
      content: {
        text: '15min',
      },
    },
  ],
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
