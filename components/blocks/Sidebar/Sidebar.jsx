import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import PropTypes from 'prop-types';

import { Logo } from '@/assets/Icons';
import { Collapsible } from '@/elements';
import CollapseSearch from '@/elements/Collapsible/CollapseSearch';
import { setSearch } from '@/store/entities/system/slice';

const Sidebar = ({ data }) => {
  const dispatch = useDispatch();
  const { search } = useSelector(({ system }) => system.sidebar);

  const handleSearch = useCallback(
    ({ value }) => {
      dispatch(setSearch(value));
    },
    [dispatch]
  );

  const printMenu = (item) => <Collapsible key={item?.id} data={item} />;
  return (
    <aside className="flex flex-col px-5 py-3 w-64 bg-black text-white">
      <Logo />
      <div className="mt-8 flex flex-col gap-1.5 relative">
        <CollapseSearch value={search} onChange={({ target }) => handleSearch(target)} />
        {data?.map(printMenu)}
      </div>
    </aside>
  );
};

Sidebar.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

export default Sidebar;
