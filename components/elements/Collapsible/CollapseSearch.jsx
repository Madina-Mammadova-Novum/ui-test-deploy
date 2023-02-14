import { useState } from 'react';

import PropTypes from 'prop-types';

import { SearchIcon } from '@/assets/Icons';

const CollapseSearch = ({ value, onChange }) => {
  const [active, setActive] = useState(false);
  const handleActive = () => setActive(true);

  return (
    <div className="flex relative hover:fill-white" aria-hidden="true" onClick={handleActive}>
      <SearchIcon className="absolute left-5 top-3" isActive={active} />
      <input
        type="search"
        placeholder="search"
        value={value}
        onChange={onChange}
        className="pr-2 w-full transition-all py-3 pl-14 font-semibold placeholder:capitalize rounded-xl outline-none placeholder:text-white placeholder:text-sm text-sm border-none bg-transparent hover:bg-blue-dark focus:bg-blue"
      />
    </div>
  );
};

CollapseSearch.defaultProps = {
  value: '',
  onChange: () => {},
};

CollapseSearch.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
};

export default CollapseSearch;
