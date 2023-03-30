import React, { useState } from 'react';

import DetailsContent from './DetailsContent';
import DocumentsContent from './DocumentsContent';

import { Button } from '@/elements';
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

const PreFixtureExpandedContent = () => {
  const [currentTab, setCurrentTab] = useState(tabs[0].value);

  const tabContent = () => {
    switch (currentTab) {
      case 'documents':
        return <DocumentsContent />;
      default:
        return <DetailsContent />;
    }
  };

  return (
    <div>
      <div className="relative">
        <Tabs
          activeTab={currentTab}
          tabs={tabs}
          onClick={({ target }) => setCurrentTab(target.value)}
          customStyles="mx-auto mt-5 mb-3"
        />
        <Button
          buttonProps={{ text: 'Extend the response time by 15min', variant: 'primary', size: 'small' }}
          customStyles="border border-blue hover:border-blue-darker !px-2.5 !py-0.5 uppercase text-[10px] font-bold absolute right-0 top-[50%] translate-y-[-50%]"
        />
      </div>
      {tabContent()}
    </div>
  );
};

export default PreFixtureExpandedContent;
