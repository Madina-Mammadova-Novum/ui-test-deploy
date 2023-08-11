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

const NotificationControl = () => {
  const dispatch = useDispatch();

  const { filterParams } = useSelector(getNotificationsDataSelector);

  const handleSearch = ({ target: { value } }) => {
    dispatch(setFilterParams({ searchValue: value, skip: 0, take: 100 }));
  };

  const handleFilter = ({ value }) => {
    dispatch(setFilterParams({ sortedValue: value, skip: 0, take: 100 }));
  };

  const handleReadAll = () => {
    dispatch(readAllNotifications());
  };

  return (
    <div className="flex flex-col gap-y-5 h-[25vh]">
      <NotificationSearch value={filterParams?.searchValue} onChange={handleSearch} containerClass="px-8 pt-5" />
      <NotificationTabs onClick={handleReadAll} containerClass="px-8 flex justify-between" />
      <Divider className="w-full" />
      <NotificationFilter containerClass="px-8 pb-5" value={filterParams?.sortedValue} onChange={handleFilter} />
    </div>
  );
};

NotificationControl.propTypes = NotificationControlPropTypes;

export default NotificationControl;
