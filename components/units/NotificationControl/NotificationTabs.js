'use client';

import { useSelector } from 'react-redux';

import { NotificationTabsPropTypes } from '@/lib/types';

import { Button } from '@/elements';
import { getNotificationsDataSelector } from '@/store/selectors';
import { Tabs } from '@/units';

const NotificationTabs = ({ activeTab, onChange, onClick, containerClass }) => {
  const { unreadCounter, unwatchedData } = useSelector(getNotificationsDataSelector);

  const unreadLabel = unreadCounter === '0' ? 'Unread' : `Unread (${unreadCounter})`;

  const options = [
    {
      label: unreadLabel,
      value: 'unread',
    },
    {
      label: 'Read',
      value: 'read',
    },
  ];

  return (
    <div className={containerClass}>
      <Tabs tabs={options} activeTab={activeTab} onClick={onChange} />
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
