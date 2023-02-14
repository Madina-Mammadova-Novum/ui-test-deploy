import { memo } from 'react';

import PropTypes from 'prop-types';

import { Logo } from '@/assets/Icons';
import { Collapsible } from '@/elements';
import CollapseSearch from '@/elements/Collapsible/CollapseSearch';

const Sidebar = memo(({ data }) => {
  const printMenu = (item) => <Collapsible key={item?.id} data={item} />;

  return (
    <aside className="flex flex-col px-5 py-3 w-64 bg-black text-white">
      <Logo />
      <div className="mt-8 flex flex-col gap-1.5 relative">
        <CollapseSearch />
        {data?.map(printMenu)}
      </div>
    </aside>
  );
});

Sidebar.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

export default Sidebar;
