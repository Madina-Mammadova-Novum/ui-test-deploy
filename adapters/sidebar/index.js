import { ROUTES } from '@/lib';
import { makeId } from '@/utils/helpers';

export const ownerSidebarAdapter = ({ role }) => {
  if (!role) return [];

  return [
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
          path: ROUTES.ACCOUNT_NEGOTIATING,
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
      path: ROUTES.ACCOUNT_FLEETS,
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
};

export const chartererSidebarAdapter = ({ role }) => {
  if (!role) return [];

  return [
    {
      id: makeId(),
      title: 'Search',
      variant: 'search',
      path: ROUTES.ACCOUNT_SEARCH,
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
          path: ROUTES.ACCOUNT_NEGOTIATING,
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
      title: 'Tools',
      variant: 'tools',
      path: ROUTES.ACCOUNT_TOOLS,
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
};
