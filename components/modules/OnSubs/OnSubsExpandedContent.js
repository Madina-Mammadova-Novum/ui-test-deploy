import { useMemo, useState } from 'react';

import { Tabs } from '@/units';

const tabs = [
  {
    label: 'Details',
    value: 'details',
  },
  {
    label: 'Documents',
    value: 'documents',
  },
];

const OnSubsExpandedContent = () => {
  const [currentTab, setCurrentTab] = useState(tabs[0].value);

  const tabContent = useMemo(() => {
    switch (currentTab) {
      case 'documents':
        return <div>Documents</div>;
      default:
        return <div>Details</div>;
    }
  }, [currentTab]);

  return (
    <div>
      <Tabs
        activeTab={currentTab}
        tabs={tabs}
        onClick={({ target }) => setCurrentTab(target.value)}
        customStyles="mx-auto mt-5 mb-10 lg:mb-3"
      />
      {tabContent}
    </div>
  );
};

export default OnSubsExpandedContent;
