import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import PropTypes from 'prop-types';

import { SearchIcon } from '@/assets/Icons';
import { setFocus, setSearch } from '@/store/entities/system/slice';

const AccordionSearchXL = ({ value, onChange }) => {
  const ref = useRef(null);

  const dispatch = useDispatch();
  const { onFocus } = useSelector(({ system }) => system.sidebar);

  const handleActive = () => dispatch(setFocus(true));

  useEffect(() => {
    if (onFocus) {
      ref.current.focus();
      dispatch(setFocus(true));
    }
    return () => {
      dispatch(setSearch(''));
      dispatch(setFocus(false));
    };
  }, [dispatch, onFocus]);

  return (
    <div className="flex relative hover:fill-white" aria-hidden="true" onClick={handleActive}>
      <SearchIcon className="absolute left-5 top-3" isActive={onFocus} />
      <input
        ref={ref}
        type="search"
        placeholder="search"
        value={value}
        onChange={onChange}
        className="pr-2 w-full transition-all py-3 pl-14 font-semibold placeholder:capitalize rounded-xl outline-none placeholder:text-white placeholder:text-sm text-sm border-none bg-transparent hover:bg-blue-dark focus:bg-blue"
      />
    </div>
  );
};

AccordionSearchXL.defaultProps = {
  value: '',
  isResized: false,
  onChange: () => {},
};

AccordionSearchXL.propTypes = {
  value: PropTypes.string,
  isResized: PropTypes.bool,
  onChange: PropTypes.func,
};

export default AccordionSearchXL;
