import React, { useState } from 'react';
import PropTypes from 'prop-types'
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

const PreFixtureExpandedContent = ({ underNegotiation }) => {
  const [currentTab, setCurrentTab] = useState(tabs[0].value);

  const tabContent = () => {
    switch (currentTab) {
      case 'documents':
        return <DocumentsContent />;
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
          customStyles="mx-auto mt-5 mb-10 md:mb-3"
        />
        <Button
          buttonProps={{ text: 'Extend the response time by 15min', variant: 'primary', size: 'small' }}
          customStyles="border border-blue hover:border-blue-darker !px-2.5 !py-0.5 uppercase text-[10px] font-bold absolute left-1/2 md:left-[unset] -translate-x-1/2 md:translate-x-[unset] md:right-0 bottom-[10%] md:bottom-[unset] md:top-[50%] md:translate-y-[-75%] whitespace-nowrap"
        />
      </div>
      {tabContent()}
    </div>
  );
};

PreFixtureExpandedContent.propTypes = {
  underNegotiation: PropTypes.bool.isRequired
}

export default PreFixtureExpandedContent;
