import { NotificationTabsPropTypes } from '@/lib/types';

import { Button } from '@/elements';
import { Tabs } from '@/units';

const NotificationTabs = ({ tabs, activeTab, onChange, onClick, containerClass }) => {
  return (
    <div className={containerClass}>
      <Tabs tabs={tabs} activeTab={activeTab} onClick={onChange} />
      {activeTab === 'Unread' && (
        <Button
          onClick={onClick}
          customStyles="p-0 underline decoration-dashed"
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
