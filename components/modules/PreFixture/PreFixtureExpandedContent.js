import React, { useState } from 'react';

import DetailsContent from './DetailsContent';
import DocumentsContent from './DocumentsContent';

import { PreFixtureExpandedContentPropTypes } from '@/lib/types';

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

const PreFixtureExpandedContent = ({ underNegotiation, rowsData }) => {
  const [currentTab, setCurrentTab] = useState(tabs[0].value);

  const tabContent = () => {
    switch (currentTab) {
      case 'documents':
        return <DocumentsContent rowsData={rowsData} />;
      default:
        return <DetailsContent underNegotiation={underNegotiation} />;
    }
  };

  return (
    <div>
      <div className="relative">
        <Tabs
          activeTab={currentTab}
          tabs={tabs}
          onClick={({ target }) => setCurrentTab(target.value)}
          customStyles="mx-auto mt-5 mb-10 lg:mb-3"
        />
        <Button
          buttonProps={{ text: 'Extend the response time by 15min', variant: 'primary', size: 'small' }}
          customStyles="border border-blue hover:border-blue-darker !px-2.5 !py-0.5 uppercase text-[10px] font-bold absolute left-1/2 lg:left-[unset] -translate-x-1/2 lg:translate-x-[unset] lg:right-0 bottom-[10%] lg:bottom-[unset] lg:top-[50%] lg:translate-y-[-75%] whitespace-nowrap"
        />
      </div>
      {tabContent()}
    </div>
  );
};

PreFixtureExpandedContent.propTypes = PreFixtureExpandedContentPropTypes;

export default PreFixtureExpandedContent;
