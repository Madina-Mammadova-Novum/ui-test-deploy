'use client';

import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { NotificationTabsPropTypes } from '@/lib/types';

import { Button } from '@/elements';
import { setActiveTab } from '@/store/entities/notifications/slice';
import { getNotificationsDataSelector } from '@/store/selectors';
import { Tabs } from '@/units';

const NotificationTabs = ({ onClick, containerClass }) => {
  const dispatch = useDispatch();

  const { unreadCounter, readedCounter, activeTab, unwatchedData } = useSelector(getNotificationsDataSelector);

  const handleTabChange = useCallback(
    ({ target }) => {
      dispatch(setActiveTab(target.value));
    },
    [dispatch]
  );

  const options = [
    {
      label: `Unread (${unreadCounter})`,
      value: 'unread',
    },
    {
      label: `Read (${readedCounter})`,
      value: 'read',
    },
  ];

  return (
    <div className={containerClass}>
      <Tabs tabs={options} activeTab={activeTab} onClick={handleTabChange} />
      {activeTab === 'unread' && unwatchedData[0]?.data?.length > 0 && (
        <Button
          onClick={onClick}
          customStyles="!p-0 underline decoration-dashed"
          buttonProps={{
            size: 'small',
            text: 'Mark all as read',
            variant: 'primary',
          }}
        />
      )}
    </div>
  );
};

NotificationTabs.propTypes = NotificationTabsPropTypes;

export default NotificationTabs;
