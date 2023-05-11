import { StoreManager } from '@/common';
import { BaseLayout } from '@/layouts';
import { ROUTES } from '@/lib';
import { AccountContainer, AccountFooter, AccountHeader, Sidebar } from '@/modules';
import { makeId } from '@/utils/helpers';

const AccountLayout = ({ children }) => {
  const sidebarData = [
    {
      id: makeId(),
      title: 'Search',
      variant: 'search',
      path: ROUTES.ACCOUNT_SEARCH,
      items: [],
    },
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

  // todo: https://github.com/shadcn/taxonomy - example

  return (
    <BaseLayout className="bg-gray-light flex min-h-screen max-w-screen-2xl">
      <StoreManager>
        <Sidebar data={sidebarData} containerStyles="z-50 fixed top-0 left-0 h-screen" />
        <AccountContainer>
          <AccountHeader />
          <main className="grow">{children}</main>
          <AccountFooter />
        </AccountContainer>
      </StoreManager>
    </BaseLayout>
  );
};

export default AccountLayout;
