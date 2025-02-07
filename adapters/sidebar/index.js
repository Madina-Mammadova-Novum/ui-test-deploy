import { ROUTES } from '@/lib';

export const ownerSidebarAdapter = ({ role }) => {
  if (!role) return [];

  return [
    {
      id: 1,
      title: 'My positions',
      variant: 'positions',
      path: ROUTES.ACCOUNT_POSITIONS,
      items: [],
    },
    {
      id: 2,
      title: 'Offers',
      variant: 'offers',
      items: [
        {
          id: 1,
          label: 'offer stage #1',
          title: 'Negotiating',
          path: ROUTES.ACCOUNT_NEGOTIATING,
        },
        {
          id: 2,
          label: 'offer stage #2',
          title: 'Pre-fixture',
          path: ROUTES.ACCOUNT_PREFIXTURE,
        },
        {
          id: 3,
          label: 'offer stage #3',
          title: 'On subs',
          path: ROUTES.ACCOUNT_ONSUBS,
        },
        {
          id: 4,
          label: 'offer stage #4',
          title: 'Fixture',
          path: ROUTES.ACCOUNT_FIXTURE,
        },
        {
          id: 5,
          label: 'offer stage #5',
          title: 'Post-fixture',
          path: ROUTES.ACCOUNT_POSTFIXTURE,
        },
        {
          id: 6,
          title: 'Failed Offers',
          path: ROUTES.ACCOUNT_FAILED_OFFERS,
        },
      ],
    },
    {
      id: 6,
      title: 'Tanker List',
      variant: 'fleets',
      path: ROUTES.ACCOUNT_FLEETS,
      items: [],
    },
    {
      id: 7,
      title: 'Tools',
      variant: 'tools',
      path: ROUTES.ACCOUNT_TOOLS,
      items: [],
    },
    // {
    //   id: 7,
    //   title: 'FAQ',
    //   variant: 'faq',
    //   path: ROUTES.FAQ,
    //   items: [],
    // },
  ];
};

export const chartererSidebarAdapter = ({ role }) => {
  if (!role) return [];

  return [
    {
      id: 1,
      title: 'Search',
      variant: 'search',
      path: ROUTES.ACCOUNT_SEARCH,
      items: [],
    },
    {
      id: 2,
      title: 'Offers',
      variant: 'offers',
      items: [
        {
          id: 1,
          label: 'offer stage #1',
          title: 'Negotiating',
          path: ROUTES.ACCOUNT_NEGOTIATING,
        },
        {
          id: 2,
          label: 'offer stage #2',
          title: 'Pre-fixture',
          path: ROUTES.ACCOUNT_PREFIXTURE,
        },
        {
          id: 3,
          label: 'offer stage #3',
          title: 'On subs',
          path: ROUTES.ACCOUNT_ONSUBS,
        },
        {
          id: 4,
          label: 'offer stage #4',
          title: 'Fixture',
          path: ROUTES.ACCOUNT_FIXTURE,
        },
        {
          id: 5,
          label: 'offer stage #5',
          title: 'Post-fixture',
          path: ROUTES.ACCOUNT_POSTFIXTURE,
        },
        {
          id: 6,
          title: 'Failed Offers',
          path: ROUTES.ACCOUNT_FAILED_OFFERS,
        },
      ],
    },
    {
      id: 3,
      title: 'Tools',
      variant: 'tools',
      path: ROUTES.ACCOUNT_TOOLS,
      items: [],
    },
    // {
    //   id: 4,
    //   title: 'FAQ',
    //   variant: 'faq',
    //   path: ROUTES.FAQ,
    //   items: [],
    // },
  ];
};
