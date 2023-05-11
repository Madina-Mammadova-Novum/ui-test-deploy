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
    type: 'TANKER_STATUS',
    width: 125,
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M7.99968 7.33337C7.82287 7.33337 7.6533 7.40361 7.52827 7.52864C7.40325 7.65366 7.33301 7.82323 7.33301 8.00004V10.6667C7.33301 10.8435 7.40325 11.0131 7.52827 11.1381C7.6533 11.2631 7.82287 11.3334 7.99968 11.3334C8.17649 11.3334 8.34606 11.2631 8.47108 11.1381C8.59611 11.0131 8.66634 10.8435 8.66634 10.6667V8.00004C8.66634 7.82323 8.59611 7.65366 8.47108 7.52864C8.34606 7.40361 8.17649 7.33337 7.99968 7.33337ZM8.25301 4.72004C8.0907 4.65336 7.90865 4.65336 7.74634 4.72004C7.66451 4.75177 7.58975 4.79935 7.52634 4.86004C7.46746 4.92484 7.4201 4.99925 7.38634 5.08004C7.34902 5.15916 7.33076 5.24592 7.33301 5.33337C7.3325 5.42111 7.34932 5.50809 7.3825 5.58931C7.41567 5.67054 7.46456 5.74441 7.52634 5.80671C7.59114 5.86559 7.66555 5.91295 7.74634 5.94671C7.84734 5.9882 7.95699 6.00425 8.06564 5.99345C8.1743 5.98265 8.27863 5.94532 8.36949 5.88475C8.46034 5.82419 8.53492 5.74223 8.58668 5.64609C8.63845 5.54995 8.6658 5.44256 8.66634 5.33337C8.66389 5.15686 8.59483 4.9878 8.47301 4.86004C8.40961 4.79935 8.33485 4.75177 8.25301 4.72004ZM7.99968 1.33337C6.68114 1.33337 5.3922 1.72437 4.29588 2.45691C3.19955 3.18945 2.34506 4.23064 1.84048 5.44882C1.3359 6.66699 1.20387 8.00744 1.46111 9.30064C1.71834 10.5938 2.35328 11.7817 3.28563 12.7141C4.21798 13.6464 5.40587 14.2814 6.69908 14.5386C7.99228 14.7958 9.33273 14.6638 10.5509 14.1592C11.7691 13.6547 12.8103 12.8002 13.5428 11.7038C14.2753 10.6075 14.6663 9.31858 14.6663 8.00004C14.6663 7.12456 14.4939 6.25766 14.1589 5.44882C13.8238 4.63998 13.3328 3.90505 12.7137 3.286C12.0947 2.66694 11.3597 2.17588 10.5509 1.84084C9.74206 1.50581 8.87516 1.33337 7.99968 1.33337ZM7.99968 13.3334C6.94484 13.3334 5.9137 13.0206 5.03664 12.4345C4.15957 11.8485 3.47599 11.0156 3.07232 10.041C2.66865 9.06648 2.56303 7.99412 2.76882 6.95956C2.97461 5.92499 3.48256 4.97468 4.22844 4.2288C4.97432 3.48292 5.92463 2.97497 6.9592 2.76919C7.99376 2.5634 9.06612 2.66902 10.0407 3.07268C11.0152 3.47635 11.8481 4.15994 12.4342 5.037C13.0202 5.91406 13.333 6.94521 13.333 8.00004C13.333 9.41453 12.7711 10.7711 11.7709 11.7713C10.7707 12.7715 9.41417 13.3334 7.99968 13.3334Z"
          fill="#072D46"
        />
      </svg>
    ),
    helperData: {
      title: 'tanker status',
      description:
        'By deactivating your tanker you make it temporarily inaccessible for charterers. You will not be able to update its open position while inactive. You can reactivate the tanker and update its open positions at any time',
    },
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
