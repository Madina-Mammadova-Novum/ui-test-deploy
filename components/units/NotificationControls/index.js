'use client';

import { useDispatch, useSelector } from 'react-redux';

import { NotificationControlsPropTypes } from '@/lib/types';

import { Divider } from '@/elements';
import { readAllNotifications } from '@/store/entities/notifications/actions';
import { setFilterParams } from '@/store/entities/notifications/slice';
import { getNotificationsDataSelector } from '@/store/selectors';
import NotificationFilter from '@/units/NotificationControls/NotificationFilter';
import NotificationSearch from '@/units/NotificationControls/NotificationSearch';
import NotificationTabs from '@/units/NotificationControls/NotificationTabs';

const NotificationControls = ({ contianerClass }) => {
  const { filterParams } = useSelector(getNotificationsDataSelector);
  const dispatch = useDispatch();

  const { searchValue, tabs, activeTab } = filterParams;

  const convertValueToBool = (value) => value?.toLowerCase() === 'read';

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
        tabs={tabs}
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
