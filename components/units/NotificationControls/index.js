'use client';

import { useDispatch } from 'react-redux';

import { NotificationControlsPropTypes } from '@/lib/types';

import { Divider } from '@/elements';
import { readAllNotifications } from '@/store/entities/notifications/actions';
import { setFilterParams } from '@/store/entities/notifications/slice';
import NotificationFilter from '@/units/NotificationControls/NotificationFilter';
import NotificationSearch from '@/units/NotificationControls/NotificationSearch';
import NotificationTabs from '@/units/NotificationControls/NotificationTabs';
import { formattetTabValue, options } from '@/utils/helpers';

const NotificationControls = ({ contianerClass, filterParams, unreadCount, readedCount }) => {
  const dispatch = useDispatch();

  const { searchValue, activeTab } = filterParams;

  const convertValueToBool = (value) => formattetTabValue(value) === 'read';

  const handleSearch = ({ target }) => {
    dispatch(setFilterParams({ searchValue: target.value }));
  };

  const handleTab = ({ target }) => {
    dispatch(setFilterParams({ activeTab: target.value, watched: convertValueToBool(target.value) }));
  };

  const handleFilter = ({ value }) => {
    dispatch(setFilterParams({ sortedValue: value }));
  };

  const handleReadAll = () => {
    dispatch(readAllNotifications());
  };

  return (
    <div className={contianerClass}>
      <NotificationSearch value={searchValue} onChange={handleSearch} containerClass="px-8 pt-5" />
      <NotificationTabs
        tabs={options([`Unread (${unreadCount})`, `Read (${readedCount})`])}
        activeTab={activeTab}
        onChange={handleTab}
        onClick={handleReadAll}
        containerClass="px-8 flex justify-between"
      />
      <Divider className="w-full" />
      <NotificationFilter containerClass="px-8 pb-5" onChange={handleFilter} />
    </div>
  );
};

NotificationControls.propTypes = NotificationControlsPropTypes;

export default NotificationControls;
