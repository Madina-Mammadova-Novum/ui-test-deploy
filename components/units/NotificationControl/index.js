'use client';

import { useDispatch, useSelector } from 'react-redux';

import { NotificationControlPropTypes } from '@/lib/types';

import { Divider } from '@/elements';
import { readAllNotifications } from '@/store/entities/notifications/actions';
import { setFilterParams } from '@/store/entities/notifications/slice';
import { getNotificationsDataSelector } from '@/store/selectors';
import NotificationFilter from '@/units/NotificationControl/NotificationFilter';
import NotificationSearch from '@/units/NotificationControl/NotificationSearch';
import NotificationTabs from '@/units/NotificationControl/NotificationTabs';
import { formattetTabValue, options } from '@/utils/helpers';

const NotificationControl = ({ contianerClass }) => {
  const dispatch = useDispatch();

  const { read, unread, filterParams } = useSelector(getNotificationsDataSelector);

  const convertValueToBool = (value) => formattetTabValue(value) === 'read';

  const handleSearch = ({ target: { value } }) => {
    dispatch(setFilterParams({ searchValue: value, skip: 0, take: 100 }));
  };

  const handleTab = ({ target: { value } }) => {
    dispatch(setFilterParams({ activeTab: value, watched: convertValueToBool(value), skip: 0, take: 50 }));
  };

  const handleFilter = ({ value }) => {
    dispatch(setFilterParams({ sortedValue: value, skip: 0, take: 100 }));
  };

  const handleReadAll = () => {
    dispatch(readAllNotifications());
  };

  return (
    <div className={contianerClass}>
      <NotificationSearch value={filterParams?.searchValue} onChange={handleSearch} containerClass="px-8 pt-5" />
      <NotificationTabs
        tabs={options([`Unread (${unread})`, `Read (${read})`])}
        activeTab={filterParams?.activeTab}
        onChange={handleTab}
        onClick={handleReadAll}
        containerClass="px-8 flex justify-between"
      />
      <Divider className="w-full" />
      <NotificationFilter containerClass="px-8 pb-5" value={filterParams?.sortedValue} onChange={handleFilter} />
    </div>
  );
};

NotificationControl.propTypes = NotificationControlPropTypes;

export default NotificationControl;
