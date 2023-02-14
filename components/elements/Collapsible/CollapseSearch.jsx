import { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { SearchIcon } from '@/assets/Icons';
import { setSearch } from '@/store/entities/system/slice';

const CollapseSearch = () => {
  const dispach = useDispatch();
  const { search } = useSelector(({ system }) => system.sidebar);

  const [active, setActive] = useState(false);

  const handleActive = () => setActive(true);
  const handleSearch = useCallback(
    ({ value }) => {
      dispach(setSearch(value));
    },
    [dispach]
  );

  return (
    <div className="flex relative hover:fill-white" aria-hidden="true" onClick={handleActive}>
      <SearchIcon className="absolute left-5 top-3" isActive={active} />
      <input
        type="search"
        placeholder="search"
        value={search}
        onChange={({ target }) => handleSearch(target)}
        className="pr-2 w-full transition-all py-3 pl-14 font-semibold placeholder:capitalize rounded-xl outline-none placeholder:text-white placeholder:text-sm text-sm border-none bg-transparent hover:bg-blue-dark focus:bg-blue"
      />
    </div>
  );
};

export default CollapseSearch;
