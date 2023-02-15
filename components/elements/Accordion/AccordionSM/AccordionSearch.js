import { memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { SearchIcon } from '@/assets/Icons';
import { setFocus, setResize } from '@/store/entities/system/slice';

const AccordionSearchSM = memo(() => {
  const dispatch = useDispatch();
  const { onFocus } = useSelector(({ system }) => system.sidebar);

  const handleActive = () => {
    dispatch(setFocus(true));
    dispatch(setResize());
  };

  return (
    <button
      type="button"
      className={`${
        onFocus ? 'bg-blue' : 'hover:bg-blue-dark fill-w'
      } flex flex-col text-sm font-semibold capitalize py-2 rounded-md px-2`}
      onClick={handleActive}
    >
      <SearchIcon isActive={onFocus} />
    </button>
  );
});

export default AccordionSearchSM;
