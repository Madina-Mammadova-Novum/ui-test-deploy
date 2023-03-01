import { useCallback, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import PropTypes from 'prop-types';

import SideBarSM from './SideBarSM';
import SideBarXL from './SideBarXL';

import { setFocus, setOpen, setResize, setSearch } from '@/store/entities/system/slice';

const Sidebar = ({ data, containerStyles }) => {
  const dispatch = useDispatch();

  const { search, resize, open } = useSelector(({ system }) => system.sidebar);

  const handleSearch = useCallback(
    ({ value }) => {
      dispatch(setSearch(value));
    },
    [dispatch]
  );

  useEffect(() => {
    if (!resize && open) dispatch(setOpen(true));

    return () => {
      dispatch(setOpen(false));
      dispatch(setFocus(false));
    };
  }, [dispatch, open, resize]);

  const handleResize = useCallback(() => {
    dispatch(setResize());
  }, [dispatch]);

  const printSideBar = useMemo(() => {
    switch (resize) {
      case true:
        return <SideBarSM data={data} isResized={resize} onResize={handleResize} />;
      default:
        return (
          <SideBarXL
            data={data}
            isResized={resize}
            searchVal={search}
            onSearch={({ target }) => handleSearch(target)}
            onResize={handleResize}
          />
        );
    }
  }, [data, handleResize, handleSearch, resize, search]);

  return (
    <aside
      className={`flex flex-col px-3.5 py-5 gap-2 bg-black text-white ${containerStyles} ${resize ? ' w-16' : ' w-64'}`}
    >
      {printSideBar}
    </aside>
  );
};

Sidebar.defaultProps = {
  containerStyles: '',
};

Sidebar.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  containerStyles: PropTypes.string,
};

export default Sidebar;
