'use client';

import { useSelector } from 'react-redux';

import { NotificationTabsPropTypes } from '@/lib/types';

import { Button } from '@/elements';
import { getNotificationsDataSelector } from '@/store/selectors';
import { Tabs } from '@/units';

const NotificationTabs = ({ activeTab, onChange, onClick, containerClass, disabled }) => {
  const { unreadCounter, readedCounter, unwatchedData } = useSelector(getNotificationsDataSelector);

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
      <Tabs tabs={options} activeTab={activeTab} onClick={onChange} disabled={disabled} />
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
