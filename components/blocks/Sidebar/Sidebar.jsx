import { memo } from 'react';

import PropTypes from 'prop-types';

import { Logo } from '@/assets/Icons';
import { Collapsible } from '@/elements';

const Sidebar = memo(({ data = [] }) => {
  const dummyData = [
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

  return (
    <aside className="flex flex-col px-5 py-3 w-64 bg-black text-white">
      <Logo />
      <div className="mt-8">
        {dummyData.map((element) => (
          <Collapsible key={element.id} data={element} />
        ))}
      </div>
    </aside>
  );
});

Sidebar.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

export default Sidebar;
